import { biomes } from "../data/biomes";
import { buildIdeas } from "../data/buildIdeas";
import { interiorIdeas } from "../data/interiors";
import { materialSets } from "../data/materials";
import { petProfiles } from "../data/pets";
import { purposes } from "../data/purposes";
import { themes } from "../data/themes";
import type {
  BiomeId,
  BuildIdea,
  BuildSize,
  GeneratedBuild,
  GeneratorOptions,
  InteriorIdea,
  MaterialSet,
  PetProfile,
  PurposeId,
  ThemeId
} from "../types/build";
import { createRng, pickOne, sampleUnique, weightedPick } from "./random";

const sizeOrder: BuildSize[] = ["tiny", "small", "medium", "large", "epic"];

function resolveSeed(seed?: number): number {
  return seed ?? Date.now();
}

function chooseTheme(random: () => number, forced?: ThemeId): ThemeId {
  return forced ?? pickOne(themes.map((theme) => theme.id), random);
}

function chooseSize(random: () => number, forced?: BuildSize): BuildSize {
  return forced ?? pickOne(sizeOrder, random);
}

function chooseBiome(random: () => number, forced?: BiomeId): BiomeId {
  return forced ?? pickOne(biomes.map((biome) => biome.id), random);
}

function choosePurpose(random: () => number, forced?: PurposeId): PurposeId {
  return forced ?? pickOne(purposes.map((purpose) => purpose.id), random);
}

function scoreBuildIdea(
  idea: BuildIdea,
  theme: ThemeId,
  size: BuildSize,
  biome: BiomeId,
  purpose: PurposeId
): number {
  let score = 1;
  if (idea.themes.includes(theme)) score += 4;
  if (idea.sizes.includes(size)) score += 3;
  if (idea.biomes.includes(biome)) score += 3;
  if (idea.purposes.includes(purpose)) score += 4;
  return score;
}

function scoreMaterialSet(set: MaterialSet, theme: ThemeId, biome: BiomeId): number {
  let score = 1;
  if (set.themes.includes(theme)) score += 4;
  if (set.biomes.includes(biome)) score += 3;
  return score;
}

function scoreInterior(
  interior: InteriorIdea,
  theme: ThemeId,
  size: BuildSize,
  purpose: PurposeId
): number {
  let score = 1;
  if (interior.themes.includes(theme)) score += 3;
  if (interior.sizes.includes(size)) score += 2;
  if (interior.purposes.includes(purpose)) score += 4;
  return score;
}

function scorePet(pet: PetProfile, theme: ThemeId, biome: BiomeId): number {
  let score = 1;
  if (pet.themes.includes(theme)) score += 3;
  if (pet.biomes.includes(biome)) score += 3;
  return score;
}

function chooseBuildIdea(
  theme: ThemeId,
  size: BuildSize,
  biome: BiomeId,
  purpose: PurposeId,
  random: () => number
): BuildIdea {
  const exact = buildIdeas.filter(
    (idea) =>
      idea.themes.includes(theme) &&
      idea.sizes.includes(size) &&
      idea.biomes.includes(biome) &&
      idea.purposes.includes(purpose)
  );
  const close = buildIdeas.filter(
    (idea) =>
      idea.themes.includes(theme) ||
      idea.sizes.includes(size) ||
      idea.biomes.includes(biome) ||
      idea.purposes.includes(purpose)
  );
  const pool = exact.length > 0 ? exact : close.length > 0 ? close : buildIdeas;

  return weightedPick(
    pool,
    (idea) => scoreBuildIdea(idea, theme, size, biome, purpose),
    random
  );
}

function chooseMaterialSet(theme: ThemeId, biome: BiomeId, random: () => number): MaterialSet {
  const close = materialSets.filter(
    (set) => set.themes.includes(theme) || set.biomes.includes(biome)
  );
  const pool = close.length > 0 ? close : materialSets;
  return weightedPick(pool, (set) => scoreMaterialSet(set, theme, biome), random);
}

function chooseInteriors(
  theme: ThemeId,
  size: BuildSize,
  purpose: PurposeId,
  random: () => number
): string[] {
  const close = interiorIdeas.filter(
    (idea) =>
      idea.themes.includes(theme) || idea.sizes.includes(size) || idea.purposes.includes(purpose)
  );
  const pool = close.length > 0 ? close : interiorIdeas;
  const ordered = [...pool].sort(
    (left, right) => scoreInterior(right, theme, size, purpose) - scoreInterior(left, theme, size, purpose)
  );
  const count = size === "tiny" ? 3 : size === "small" ? 4 : 5;
  return sampleUnique(ordered, count, random).map((interior) => interior.label);
}

function choosePet(theme: ThemeId, biome: BiomeId, random: () => number): PetProfile {
  const close = petProfiles.filter(
    (pet) => pet.themes.includes(theme) || pet.biomes.includes(biome)
  );
  const pool = close.length > 0 ? close : petProfiles;
  return weightedPick(pool, (pet) => scorePet(pet, theme, biome), random);
}

function chooseNames(names: string[], random: () => number): string[] {
  return sampleUnique(names, Math.min(4, names.length), random);
}

function buildIdFromContent(build: Omit<GeneratedBuild, "createdAt" | "id">): string {
  const raw = JSON.stringify(build);
  let hash = 0;
  for (let index = 0; index < raw.length; index += 1) {
    hash = (hash << 5) - hash + raw.charCodeAt(index);
    hash |= 0;
  }
  return `build-${Math.abs(hash)}`;
}

function buildLayoutPlan(size: BuildSize, purposeLabel: string, biomeLabel: string): string[] {
  const sizeGuide: Record<BuildSize, string> = {
    tiny: "Keep the footprint to a compact rectangle or soft L-shape so every block feels intentional.",
    small: "Use a simple main room plus one supporting zone to keep the layout easy to build.",
    medium: "Break the build into a front-facing feature room, a utility core, and a back support wing.",
    large: "Plan three clear zones so the build feels readable instead of sprawling.",
    epic: "Use a landmark centerpiece with two or more side wings to make the build feel grand."
  };

  return [
    `${sizeGuide[size]}`,
    `Shape the entrance so it feels natural for a ${biomeLabel.toLowerCase()} setting before placing detail blocks.`,
    `Reserve the best view or highest point for the main ${purposeLabel.toLowerCase()} area so the theme reads immediately.`,
    "Outline paths, fences, stairs, or bridges early so movement around the build feels designed instead of accidental."
  ];
}

function buildVisualMockup(
  themeLabel: string,
  biomeLabel: string,
  purposeLabel: string
): string[] {
  return [
    `Silhouette: push for a ${themeLabel.toLowerCase()} profile that looks strong from far away.`,
    `Palette: let the materials feel believable in a ${biomeLabel.toLowerCase()} biome first, then add one standout accent.`,
    `Focal point: give the build one clear hero feature tied to the ${purposeLabel.toLowerCase()} goal.`,
    "Detail rhythm: repeat windows, beams, lanterns, and trim in a pattern so the whole structure feels intentional."
  ];
}

function buildStepList(buildIdea: string, purposeLabel: string): string[] {
  return [
    `Mark the footprint for ${buildIdea} with temporary blocks so the shape is easy to adjust.`,
    "Build the floor and core wall outline before committing to decorative trims.",
    "Complete the roofline early so the silhouette locks in and guides the rest of the build.",
    `Add the main ${purposeLabel.toLowerCase()} features next so the build works before decorating.`,
    "Finish with lighting, landscaping, and pet space to make the whole build feel alive."
  ];
}

function buildSceneDetails(
  themeLabel: string,
  biome: BiomeId,
  biomeLabel: string,
  purposeLabel: string
) {
  const sceneByBiome: Record<
    BiomeId,
    { title: string; moodLine: string; sky: string; ground: string; accent: string; props: string[] }
  > = {
    forest: {
      title: "Forest Edge View",
      moodLine: `A ${themeLabel.toLowerCase()} build tucked between trees and warm lights.`,
      sky: "#91c9ff",
      ground: "#55753f",
      accent: "#3c5a2d",
      props: ["pine", "pine", "lantern", "shrub"]
    },
    plains: {
      title: "Open Plains View",
      moodLine: `A ${purposeLabel.toLowerCase()} build with plenty of breathing room around it.`,
      sky: "#97d2ff",
      ground: "#7cab51",
      accent: "#d3c27a",
      props: ["shrub", "hay", "fence", "shrub"]
    },
    coast: {
      title: "Coastal Lookout",
      moodLine: `A ${themeLabel.toLowerCase()} build with a breeze, water, and a strong silhouette.`,
      sky: "#8fd7ff",
      ground: "#4e8f7a",
      accent: "#2d6ca1",
      props: ["dock", "dock", "lantern", "shrub"]
    },
    mountain: {
      title: "Mountain Shelf View",
      moodLine: `A bold build perched high with a big shape and a clear lookout.`,
      sky: "#8db9ff",
      ground: "#6f7a7f",
      accent: "#c5d8e8",
      props: ["peak", "peak", "pine", "lantern"]
    },
    desert: {
      title: "Desert Courtyard View",
      moodLine: `A bright build framed by sand, shade, and strong warm colors.`,
      sky: "#f0c88c",
      ground: "#d0a160",
      accent: "#b96535",
      props: ["cactus", "arch", "arch", "lantern"]
    },
    snowy: {
      title: "Snowfield View",
      moodLine: `A cozy-looking build standing out against cool snow and pale light.`,
      sky: "#c2ddff",
      ground: "#dfe8f4",
      accent: "#87a3bf",
      props: ["snow-pine", "snow-pine", "lantern", "peak"]
    },
    swamp: {
      title: "Swamp Boardwalk View",
      moodLine: `A moody build with moss, water, and glowing little details.`,
      sky: "#83b6a3",
      ground: "#5f6f3d",
      accent: "#355146",
      props: ["mushroom", "shrub", "dock", "lantern"]
    },
    jungle: {
      title: "Jungle Canopy View",
      moodLine: `A lively build hidden inside thick leaves and bold color.`,
      sky: "#8ed1a8",
      ground: "#4c7b3b",
      accent: "#2f5831",
      props: ["palm", "palm", "vine-post", "flower"]
    }
  };

  const scene = sceneByBiome[biome];

  return {
    title: scene.title,
    moodLine: `${scene.moodLine} Perfect for a ${biomeLabel.toLowerCase()} biome.`,
    sky: scene.sky,
    ground: scene.ground,
    accent: scene.accent,
    props: scene.props
  };
}

export function createGeneratedBuild(options: GeneratorOptions = {}): GeneratedBuild {
  const seed = resolveSeed(options.seed);
  const random = createRng(seed);
  const theme = chooseTheme(random, options.theme);
  const size = chooseSize(random, options.size);
  const biome = chooseBiome(random, options.biome);
  const purpose = choosePurpose(random, options.purpose);
  const themeMeta = themes.find((entry) => entry.id === theme)!;
  const biomeMeta = biomes.find((entry) => entry.id === biome)!;
  const purposeMeta = purposes.find((entry) => entry.id === purpose)!;
  const idea = chooseBuildIdea(theme, size, biome, purpose, random);
  const materialSet = chooseMaterialSet(theme, biome, random);
  const pet = choosePet(theme, biome, random);

  const baseBuild: Omit<GeneratedBuild, "createdAt" | "id"> = {
    theme,
    themeLabel: themeMeta.label,
    size,
    biome,
    biomeLabel: biomeMeta.label,
    purpose,
    purposeLabel: purposeMeta.label,
    buildIdea: idea.title,
    buildSummary: idea.summary,
    materials: {
      walls: pickOne(materialSet.walls, random),
      floor: pickOne(materialSet.floors, random),
      roof: pickOne(materialSet.roofs, random)
    },
    interiorIdeas: chooseInteriors(theme, size, purpose, random),
    pet: {
      type: pet.id,
      label: pet.label,
      nameSuggestions: chooseNames(pet.nameIdeas, random)
    },
    scene: buildSceneDetails(themeMeta.label, biome, biomeMeta.label, purposeMeta.label),
    layoutPlan: buildLayoutPlan(size, purposeMeta.label, biomeMeta.label),
    visualMockup: buildVisualMockup(themeMeta.label, biomeMeta.label, purposeMeta.label),
    buildSteps: buildStepList(idea.title, purposeMeta.label)
  };

  return {
    ...baseBuild,
    id: buildIdFromContent(baseBuild),
    createdAt: new Date(seed).toISOString()
  };
}

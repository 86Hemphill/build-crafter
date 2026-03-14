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

function materialColor(material: string, role: "walls" | "roof" | "floor" | "trim") {
  const normalized = material.toLowerCase();

  if (normalized.includes("weathered copper")) {
    return role === "roof"
      ? "#4a7e74"
      : role === "trim"
        ? "#8ec5b2"
        : "#5f9b8d";
  }

  if (normalized.includes("copper")) {
    return role === "roof"
      ? "#8a5635"
      : role === "trim"
        ? "#d89a69"
        : "#b16c45";
  }

  if (normalized.includes("red sandstone")) return "#c46e40";
  if (normalized.includes("sandstone")) return "#d3b074";
  if (normalized.includes("terracotta")) {
    if (normalized.includes("green")) return "#5d8c61";
    if (normalized.includes("cyan")) return "#63b6bb";
    if (normalized.includes("white")) return "#ddd8cb";
    if (normalized.includes("orange")) return "#c97c39";
    if (normalized.includes("brown")) return "#8d5b39";
    return "#b77d59";
  }
  if (normalized.includes("quartz") || normalized.includes("calcite") || normalized.includes("diorite")) {
    return role === "trim" ? "#ffffff" : "#e8e2d7";
  }
  if (normalized.includes("glass")) return "#bfdde2";
  if (normalized.includes("moss") || normalized.includes("leaf")) return "#5f8d4e";
  if (normalized.includes("mud")) return "#84644f";
  if (normalized.includes("dirt")) return "#7a5c3b";
  if (normalized.includes("deepslate")) return "#5f646c";
  if (normalized.includes("stone") || normalized.includes("cobblestone") || normalized.includes("andesite")) {
    return "#8b9199";
  }
  if (normalized.includes("cherry")) return "#c58d8f";
  if (normalized.includes("birch")) return "#d6bd8f";
  if (normalized.includes("mangrove")) return "#8e5e4d";
  if (normalized.includes("jungle")) return "#b58a57";
  if (normalized.includes("dark oak")) return "#5a402d";
  if (normalized.includes("oak")) return "#a97b4f";
  if (normalized.includes("spruce")) return "#7c5737";
  if (normalized.includes("bamboo")) return "#c8b66a";
  return role === "roof" ? "#5f432b" : "#8d7d6f";
}

function buildSceneDetails(
  themeLabel: string,
  biome: BiomeId,
  biomeLabel: string,
  purposeLabel: string,
  walls: string,
  roof: string,
  floor: string,
  petType: string
) {
  const sceneByBiome: Record<
    BiomeId,
    {
      title: string;
      moodLine: string;
      skyTop: string;
      skyBottom: string;
      ground: string;
      groundEdge: string;
      props: string[];
    }
  > = {
    forest: {
      title: "Forest Edge View",
      moodLine: `A ${themeLabel.toLowerCase()} build tucked between trees and warm lights.`,
      skyTop: "#88c2f6",
      skyBottom: "#dff0ff",
      ground: "#55753f",
      groundEdge: "#3c5a2d",
      props: ["pine", "pine", "lantern", "shrub"]
    },
    plains: {
      title: "Open Plains View",
      moodLine: `A ${purposeLabel.toLowerCase()} build with plenty of breathing room around it.`,
      skyTop: "#8fccff",
      skyBottom: "#e7f6ff",
      ground: "#7cab51",
      groundEdge: "#d3c27a",
      props: ["shrub", "hay", "fence", "shrub"]
    },
    coast: {
      title: "Coastal Lookout",
      moodLine: `A ${themeLabel.toLowerCase()} build with a breeze, water, and a strong silhouette.`,
      skyTop: "#89d1ff",
      skyBottom: "#e4fbff",
      ground: "#4e8f7a",
      groundEdge: "#2d6ca1",
      props: ["dock", "dock", "lantern", "shrub"]
    },
    mountain: {
      title: "Mountain Shelf View",
      moodLine: `A bold build perched high with a big shape and a clear lookout.`,
      skyTop: "#8bb6f0",
      skyBottom: "#edf5ff",
      ground: "#6f7a7f",
      groundEdge: "#c5d8e8",
      props: ["peak", "peak", "pine", "lantern"]
    },
    desert: {
      title: "Desert Courtyard View",
      moodLine: `A bright build framed by sand, shade, and strong warm colors.`,
      skyTop: "#efc486",
      skyBottom: "#fff2cf",
      ground: "#d0a160",
      groundEdge: "#b96535",
      props: ["cactus", "arch", "arch", "lantern"]
    },
    snowy: {
      title: "Snowfield View",
      moodLine: `A cozy-looking build standing out against cool snow and pale light.`,
      skyTop: "#c3ddff",
      skyBottom: "#f5fbff",
      ground: "#dfe8f4",
      groundEdge: "#87a3bf",
      props: ["snow-pine", "snow-pine", "lantern", "peak"]
    },
    swamp: {
      title: "Swamp Boardwalk View",
      moodLine: `A moody build with moss, water, and glowing little details.`,
      skyTop: "#7daea0",
      skyBottom: "#d8efe8",
      ground: "#5f6f3d",
      groundEdge: "#355146",
      props: ["mushroom", "shrub", "dock", "lantern"]
    },
    jungle: {
      title: "Jungle Canopy View",
      moodLine: `A lively build hidden inside thick leaves and bold color.`,
      skyTop: "#87c89d",
      skyBottom: "#dcf5df",
      ground: "#4c7b3b",
      groundEdge: "#2f5831",
      props: ["palm", "palm", "vine-post", "flower"]
    }
  };

  const scene = sceneByBiome[biome];
  const petPropByType: Record<string, string> = {
    wolf: "pet-wolf",
    cat: "pet-cat",
    horse: "pet-horse",
    donkey: "pet-donkey",
    mule: "pet-mule",
    parrot: "pet-parrot",
    llama: "pet-llama"
  };

  return {
    title: scene.title,
    moodLine: `${scene.moodLine} Perfect for a ${biomeLabel.toLowerCase()} biome.`,
    skyTop: scene.skyTop,
    skyBottom: scene.skyBottom,
    ground: scene.ground,
    groundEdge: scene.groundEdge,
    structure: {
      walls: materialColor(walls, "walls"),
      roof: materialColor(roof, "roof"),
      door: materialColor(floor, "floor"),
      window: walls.toLowerCase().includes("glass") ? "#dff8ff" : "#f7dfa0",
      trim: materialColor(walls, "trim")
    },
    props: scene.props,
    petProp: petPropByType[petType] ?? "pet-cat"
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
  const walls = pickOne(materialSet.walls, random);
  const floor = pickOne(materialSet.floors, random);
  const roof = pickOne(materialSet.roofs, random);
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
      walls,
      floor,
      roof
    },
    interiorIdeas: chooseInteriors(theme, size, purpose, random),
    pet: {
      type: pet.id,
      label: pet.label,
      nameSuggestions: chooseNames(pet.nameIdeas, random)
    },
    scene: buildSceneDetails(
      themeMeta.label,
      biome,
      biomeMeta.label,
      purposeMeta.label,
      walls,
      roof,
      floor,
      pet.id
    ),
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

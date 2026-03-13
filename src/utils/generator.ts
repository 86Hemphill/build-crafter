import { buildIdeas } from "../data/buildIdeas";
import { interiorIdeas } from "../data/interiors";
import { materialSets } from "../data/materials";
import { petProfiles } from "../data/pets";
import { themes } from "../data/themes";
import type {
  BuildIdea,
  BuildSize,
  GeneratedBuild,
  GeneratorOptions,
  InteriorIdea,
  MaterialSet,
  PetProfile,
  ThemeId
} from "../types/build";
import { createRng, pickOne, sampleUnique, weightedPick } from "./random";

const sizeOrder: BuildSize[] = ["small", "medium", "big"];

function resolveSeed(seed?: number): number {
  return seed ?? Date.now();
}

function scoreBuildIdea(idea: BuildIdea, theme: ThemeId, size: BuildSize): number {
  let score = 1;
  if (idea.themes.includes(theme)) score += 4;
  if (idea.sizes.includes(size)) score += 3;
  return score;
}

function scoreMaterialSet(set: MaterialSet, theme: ThemeId): number {
  return set.themes.includes(theme) ? 5 : 1;
}

function scoreInterior(interior: InteriorIdea, theme: ThemeId, size: BuildSize): number {
  let score = 1;
  if (interior.themes.includes(theme)) score += 4;
  if (interior.sizes.includes(size)) score += 2;
  return score;
}

function scorePet(pet: PetProfile, theme: ThemeId): number {
  return pet.themes.includes(theme) ? 5 : 1;
}

function chooseTheme(random: () => number, forcedTheme?: ThemeId): ThemeId {
  if (forcedTheme) {
    return forcedTheme;
  }

  return pickOne(
    themes.map((theme) => theme.id),
    random
  );
}

function chooseSize(random: () => number, forcedSize?: BuildSize): BuildSize {
  if (forcedSize) {
    return forcedSize;
  }

  return pickOne(sizeOrder, random);
}

function chooseBuildIdea(theme: ThemeId, size: BuildSize, random: () => number): BuildIdea {
  const perfectMatches = buildIdeas.filter(
    (idea) => idea.themes.includes(theme) && idea.sizes.includes(size)
  );
  const themeMatches = buildIdeas.filter((idea) => idea.themes.includes(theme));
  const sizeMatches = buildIdeas.filter((idea) => idea.sizes.includes(size));
  const candidates =
    perfectMatches.length > 0
      ? perfectMatches
      : themeMatches.length > 0 && sizeMatches.length > 0
        ? buildIdeas.filter((idea) => idea.themes.includes(theme) || idea.sizes.includes(size))
        : themeMatches.length > 0
          ? themeMatches
          : sizeMatches.length > 0
            ? sizeMatches
            : buildIdeas;

  return weightedPick(candidates, (idea) => scoreBuildIdea(idea, theme, size), random);
}

function chooseMaterialSet(theme: ThemeId, random: () => number): MaterialSet {
  const candidates = materialSets.filter((set) => set.themes.includes(theme));
  const pool = candidates.length > 0 ? candidates : materialSets;
  return weightedPick(pool, (set) => scoreMaterialSet(set, theme), random);
}

function chooseInteriors(theme: ThemeId, size: BuildSize, random: () => number): string[] {
  const exact = interiorIdeas.filter(
    (interior) => interior.themes.includes(theme) && interior.sizes.includes(size)
  );
  const themeOnly = interiorIdeas.filter((interior) => interior.themes.includes(theme));
  const pool = exact.length >= 3 ? exact : themeOnly.length >= 3 ? themeOnly : interiorIdeas;
  const ordered = [...pool].sort(
    (left, right) => scoreInterior(right, theme, size) - scoreInterior(left, theme, size)
  );
  const count = 3 + Math.floor(random() * 3);

  return sampleUnique(ordered, count, random).map((interior) => interior.label);
}

function choosePet(theme: ThemeId, random: () => number): PetProfile {
  const candidates = petProfiles.filter((pet) => pet.themes.includes(theme));
  const pool = candidates.length > 0 ? candidates : petProfiles;
  return weightedPick(pool, (pet) => scorePet(pet, theme), random);
}

function chooseNames(names: string[], random: () => number): string[] {
  const count = Math.min(names.length, 3 + Math.floor(random() * 3));
  return sampleUnique(names, count, random);
}

function buildIdFromContent(
  theme: ThemeId,
  size: BuildSize,
  idea: BuildIdea,
  walls: string,
  floor: string,
  roof: string,
  interiors: string[],
  pet: PetProfile,
  names: string[]
): string {
  const raw = [
    theme,
    size,
    idea.id,
    walls,
    floor,
    roof,
    interiors.join("|"),
    pet.id,
    names.join("|")
  ].join("::");

  let hash = 0;
  for (let index = 0; index < raw.length; index += 1) {
    hash = (hash << 5) - hash + raw.charCodeAt(index);
    hash |= 0;
  }

  return `build-${Math.abs(hash)}`;
}

export function createGeneratedBuild(options: GeneratorOptions = {}): GeneratedBuild {
  const seed = resolveSeed(options.seed);
  const random = createRng(seed);
  const theme = chooseTheme(random, options.theme);
  const size = chooseSize(random, options.size);
  const themeMeta = themes.find((entry) => entry.id === theme)!;
  const buildIdea = chooseBuildIdea(theme, size, random);
  const materialSet = chooseMaterialSet(theme, random);
  const walls = pickOne(materialSet.walls, random);
  const floor = pickOne(materialSet.floors, random);
  const roof = pickOne(materialSet.roofs, random);
  const interiors = chooseInteriors(theme, size, random);
  const pet = choosePet(theme, random);
  const names = chooseNames(pet.nameIdeas, random);

  return {
    id: buildIdFromContent(theme, size, buildIdea, walls, floor, roof, interiors, pet, names),
    createdAt: new Date(seed).toISOString(),
    theme,
    themeLabel: themeMeta.label,
    size,
    buildIdea: buildIdea.title,
    buildSummary: buildIdea.summary,
    materials: {
      walls,
      floor,
      roof
    },
    interiorIdeas: interiors,
    pet: {
      type: pet.id,
      label: pet.label,
      nameSuggestions: names
    }
  };
}

export function normalizeBuildSignature(build: GeneratedBuild): string {
  return JSON.stringify({
    theme: build.theme,
    size: build.size,
    buildIdea: build.buildIdea,
    materials: build.materials,
    interiorIdeas: [...build.interiorIdeas].sort(),
    pet: {
      type: build.pet.type,
      names: [...build.pet.nameSuggestions].sort()
    }
  });
}

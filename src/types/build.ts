export type ThemeId =
  | "cozy"
  | "fancy"
  | "medieval"
  | "nature"
  | "starter"
  | "survival"
  | "whimsical"
  | "industrial";

export type BuildSize = "tiny" | "small" | "medium" | "large" | "epic";

export type BiomeId =
  | "forest"
  | "plains"
  | "coast"
  | "mountain"
  | "desert"
  | "snowy"
  | "swamp"
  | "jungle";

export type PurposeId =
  | "starter-home"
  | "farming"
  | "defense"
  | "storage"
  | "luxury"
  | "redstone"
  | "enchanting";

export type PetType =
  | "wolf"
  | "cat"
  | "horse"
  | "donkey"
  | "mule"
  | "parrot"
  | "llama";

export interface ThemeMeta {
  id: ThemeId;
  label: string;
  description: string;
  accent: string;
}

export interface BiomeMeta {
  id: BiomeId;
  label: string;
  description: string;
}

export interface PurposeMeta {
  id: PurposeId;
  label: string;
  description: string;
}

export interface BuildIdea {
  id: string;
  title: string;
  summary: string;
  themes: ThemeId[];
  sizes: BuildSize[];
  biomes: BiomeId[];
  purposes: PurposeId[];
}

export interface MaterialSet {
  id: string;
  label: string;
  themes: ThemeId[];
  biomes: BiomeId[];
  walls: string[];
  floors: string[];
  roofs: string[];
}

export interface InteriorIdea {
  id: string;
  label: string;
  themes: ThemeId[];
  sizes: BuildSize[];
  purposes: PurposeId[];
}

export interface PetProfile {
  id: PetType;
  label: string;
  themes: ThemeId[];
  biomes: BiomeId[];
  nameIdeas: string[];
}

export interface GeneratorOptions {
  theme?: ThemeId;
  size?: BuildSize;
  biome?: BiomeId;
  purpose?: PurposeId;
  seed?: number;
}

export interface GeneratedBuild {
  id: string;
  createdAt: string;
  theme: ThemeId;
  themeLabel: string;
  size: BuildSize;
  biome: BiomeId;
  biomeLabel: string;
  purpose: PurposeId;
  purposeLabel: string;
  buildIdea: string;
  buildSummary: string;
  materials: {
    walls: string;
    floor: string;
    roof: string;
  };
  interiorIdeas: string[];
  pet: {
    type: PetType;
    label: string;
    nameSuggestions: string[];
  };
  scene: {
    title: string;
    moodLine: string;
    sky: string;
    ground: string;
    accent: string;
    props: string[];
  };
  layoutPlan: string[];
  visualMockup: string[];
  buildSteps: string[];
}

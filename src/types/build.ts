export type ThemeId =
  | "cozy"
  | "fancy"
  | "medieval"
  | "nature"
  | "starter"
  | "survival";

export type BuildSize = "small" | "medium" | "big";

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

export interface BuildIdea {
  id: string;
  title: string;
  summary: string;
  themes: ThemeId[];
  sizes: BuildSize[];
}

export interface MaterialSet {
  id: string;
  label: string;
  themes: ThemeId[];
  walls: string[];
  floors: string[];
  roofs: string[];
}

export interface InteriorIdea {
  id: string;
  label: string;
  themes: ThemeId[];
  sizes: BuildSize[];
}

export interface PetProfile {
  id: PetType;
  label: string;
  themes: ThemeId[];
  nameIdeas: string[];
}

export interface GeneratorOptions {
  theme?: ThemeId;
  size?: BuildSize;
  seed?: number;
}

export interface GeneratedBuild {
  id: string;
  createdAt: string;
  theme: ThemeId;
  themeLabel: string;
  size: BuildSize;
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
}

export type FavoriteBuild = GeneratedBuild;

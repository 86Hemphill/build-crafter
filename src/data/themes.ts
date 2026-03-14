import type { ThemeMeta } from "../types/build";

export const themes: ThemeMeta[] = [
  {
    id: "cozy",
    label: "Cozy",
    description: "Warm cabins, glowing windows, and snug interiors.",
    accent: "var(--theme-cozy)"
  },
  {
    id: "fancy",
    label: "Fancy",
    description: "Polished materials and high-end statement builds.",
    accent: "var(--theme-fancy)"
  },
  {
    id: "medieval",
    label: "Medieval",
    description: "Stone, timber, banners, and old-world silhouettes.",
    accent: "var(--theme-medieval)"
  },
  {
    id: "nature",
    label: "Nature",
    description: "Garden-forward builds that settle into the landscape.",
    accent: "var(--theme-nature)"
  },
  {
    id: "starter",
    label: "Starter",
    description: "Resource-friendly homes that still feel intentional.",
    accent: "var(--theme-starter)"
  },
  {
    id: "survival",
    label: "Survival",
    description: "Practical forts and working spaces ready for adventure.",
    accent: "var(--theme-survival)"
  },
  {
    id: "whimsical",
    label: "Whimsical",
    description: "Playful shapes, color pops, and storybook energy.",
    accent: "var(--theme-whimsical)"
  },
  {
    id: "industrial",
    label: "Industrial",
    description: "Workshop grit, iron details, and functional layout logic.",
    accent: "var(--theme-industrial)"
  }
];

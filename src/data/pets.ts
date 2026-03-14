import type { PetProfile } from "../types/build";

export const petProfiles: PetProfile[] = [
  {
    id: "wolf",
    label: "Wolf",
    themes: ["cozy", "survival", "medieval", "starter"],
    biomes: ["forest", "snowy", "mountain"],
    nameIdeas: ["Scout", "Shadow", "Rusty", "Timber", "Bolt", "Aspen", "Ranger", "Flint", "Nova", "Trail"]
  },
  {
    id: "cat",
    label: "Cat",
    themes: ["cozy", "fancy", "starter", "whimsical"],
    biomes: ["plains", "desert", "coast", "forest"],
    nameIdeas: ["Mochi", "Pebble", "Marmalade", "Poppy", "Whiskers", "Twinkle", "Miso", "Socks", "Noodle", "Button"]
  },
  {
    id: "horse",
    label: "Horse",
    themes: ["fancy", "medieval", "survival"],
    biomes: ["plains", "desert", "forest"],
    nameIdeas: ["Comet", "Marble", "Biscuit", "Noble", "Saddle", "Dash", "Maple", "Arrow", "Velvet", "Blaze"]
  },
  {
    id: "donkey",
    label: "Donkey",
    themes: ["starter", "survival", "nature"],
    biomes: ["plains", "desert", "forest"],
    nameIdeas: ["Patch", "Brambles", "Pickles", "Dusty", "Acorn", "Clover", "Muffin", "Barley", "Doodle", "Tumble"]
  },
  {
    id: "mule",
    label: "Mule",
    themes: ["survival", "starter", "industrial", "medieval"],
    biomes: ["mountain", "plains", "desert"],
    nameIdeas: ["Trailmix", "Tucker", "Pebbles", "Copper", "Sprocket", "Buck", "Rook", "Cargo", "Dusty", "Anchor"]
  },
  {
    id: "parrot",
    label: "Parrot",
    themes: ["nature", "fancy", "cozy", "whimsical"],
    biomes: ["jungle", "coast"],
    nameIdeas: ["Skittles", "Rio", "Mango", "Feather", "Sunny", "Echo", "Kiwi", "Jellybean", "Lime", "Pico"]
  },
  {
    id: "llama",
    label: "Llama",
    themes: ["nature", "fancy", "survival", "whimsical"],
    biomes: ["mountain", "plains", "snowy"],
    nameIdeas: ["Cloud", "Pebble", "Cinnamon", "Juniper", "Pico", "Patches", "Tango", "Alpine", "Taffy", "Marzipan"]
  }
];

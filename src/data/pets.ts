import type { PetProfile } from "../types/build";

export const petProfiles: PetProfile[] = [
  {
    id: "wolf",
    label: "Wolf",
    themes: ["cozy", "survival", "medieval", "starter"],
    nameIdeas: ["Scout", "Shadow", "Rusty", "Timber", "Bolt", "Aspen", "Ranger", "Flint", "Nova", "Trail"]
  },
  {
    id: "cat",
    label: "Cat",
    themes: ["cozy", "fancy", "starter"],
    nameIdeas: ["Mochi", "Pebble", "Marmalade", "Poppy", "Whiskers", "Twinkle", "Miso", "Socks", "Noodle", "Button"]
  },
  {
    id: "horse",
    label: "Horse",
    themes: ["fancy", "medieval", "survival"],
    nameIdeas: ["Comet", "Marble", "Biscuit", "Noble", "Saddle", "Dash", "Maple", "Arrow", "Velvet", "Blaze"]
  },
  {
    id: "donkey",
    label: "Donkey",
    themes: ["starter", "survival", "nature"],
    nameIdeas: ["Patch", "Brambles", "Pickles", "Dusty", "Acorn", "Clover", "Muffin", "Barley", "Doodle", "Bramble"]
  },
  {
    id: "mule",
    label: "Mule",
    themes: ["survival", "starter", "medieval"],
    nameIdeas: ["Trailmix", "Tucker", "Pebbles", "Copper", "Sprocket", "Buck", "Rook", "Cargo", "Dusty", "Anchor"]
  },
  {
    id: "parrot",
    label: "Parrot",
    themes: ["nature", "fancy", "cozy"],
    nameIdeas: ["Skittles", "Rio", "Mango", "Feather", "Sunny", "Echo", "Kiwi", "Jellybean", "Lime", "Pico"]
  },
  {
    id: "llama",
    label: "Llama",
    themes: ["nature", "fancy", "survival"],
    nameIdeas: ["Cloud", "Pebble", "Cinnamon", "Juniper", "Pico", "Patches", "Tango", "Alpine", "Taffy", "Marzipan"]
  }
];

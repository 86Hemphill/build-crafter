import type { MaterialSet } from "../types/build";

export const materialSets: MaterialSet[] = [
  {
    id: "warm-cabin",
    label: "Warm Cabin",
    themes: ["cozy", "starter"],
    biomes: ["forest", "plains", "snowy"],
    walls: ["Spruce Planks", "Stripped Spruce Logs", "Cobblestone Base"],
    floors: ["Oak Planks", "Spruce Slabs", "Birch Planks"],
    roofs: ["Dark Oak Stairs", "Spruce Stairs", "Brown Terracotta"]
  },
  {
    id: "garden-charm",
    label: "Garden Charm",
    themes: ["nature", "whimsical", "cozy"],
    biomes: ["forest", "plains", "swamp"],
    walls: ["Mossy Stone Bricks", "Oak Logs", "Cherry Planks"],
    floors: ["Cherry Planks", "Bamboo Mosaic", "Oak Slabs"],
    roofs: ["Cherry Stairs", "Green Terracotta", "Mossy Cobblestone Stairs"]
  },
  {
    id: "desert-bright",
    label: "Desert Bright",
    themes: ["fancy", "starter", "whimsical"],
    biomes: ["desert"],
    walls: ["Smooth Sandstone", "Cut Sandstone", "Acacia Trim"],
    floors: ["Smooth Sandstone", "Acacia Planks", "Terracotta Tiles"],
    roofs: ["Red Sandstone Stairs", "Acacia Stairs", "Orange Terracotta"]
  },
  {
    id: "cliff-luxe",
    label: "Cliff Luxe",
    themes: ["fancy", "nature"],
    biomes: ["mountain", "coast"],
    walls: ["Smooth Quartz", "Calcite", "Tinted Glass Panels"],
    floors: ["Polished Diorite", "Birch Planks", "Smooth Quartz Tiles"],
    roofs: ["Quartz Stairs", "Copper Stairs", "White Terracotta"]
  },
  {
    id: "great-hall",
    label: "Great Hall",
    themes: ["medieval", "cozy"],
    biomes: ["forest", "plains", "snowy"],
    walls: ["Oak Logs", "Mud Bricks", "Stripped Dark Oak Logs"],
    floors: ["Dark Oak Planks", "Packed Mud", "Oak Planks"],
    roofs: ["Dark Oak Stairs", "Mud Brick Stairs", "Spruce Stairs"]
  },
  {
    id: "fortress-stone",
    label: "Fortress Stone",
    themes: ["medieval", "survival", "industrial"],
    biomes: ["mountain", "snowy", "plains"],
    walls: ["Stone Bricks", "Cobblestone", "Deepslate Bricks"],
    floors: ["Stone Brick Slabs", "Dark Oak Planks", "Polished Andesite"],
    roofs: ["Stone Brick Stairs", "Deepslate Tile Stairs", "Dark Oak Stairs"]
  },
  {
    id: "dockside",
    label: "Dockside Utility",
    themes: ["industrial", "survival"],
    biomes: ["coast", "swamp"],
    walls: ["Dark Oak Planks", "Stone Bricks", "Weathered Copper"],
    floors: ["Spruce Planks", "Polished Andesite", "Oak Slabs"],
    roofs: ["Dark Oak Stairs", "Copper Stairs", "Stone Brick Stairs"]
  },
  {
    id: "jungle-loft",
    label: "Jungle Loft",
    themes: ["nature", "whimsical", "industrial"],
    biomes: ["jungle", "swamp"],
    walls: ["Jungle Planks", "Mangrove Logs", "Moss Blocks"],
    floors: ["Bamboo Mosaic", "Mangrove Planks", "Rooted Dirt"],
    roofs: ["Jungle Stairs", "Mangrove Stairs", "Leaf Canopy Trim"]
  },
  {
    id: "starter-strong",
    label: "Starter Strong",
    themes: ["starter", "survival"],
    biomes: ["plains", "forest", "desert", "mountain"],
    walls: ["Cobblestone", "Oak Planks", "Stone Bricks"],
    floors: ["Oak Planks", "Stone Slabs", "Spruce Planks"],
    roofs: ["Spruce Stairs", "Cobblestone Stairs", "Stone Brick Stairs"]
  },
  {
    id: "sparkle-workshop",
    label: "Sparkle Workshop",
    themes: ["whimsical", "industrial", "fancy"],
    biomes: ["plains", "jungle", "coast"],
    walls: ["White Concrete", "Copper Grates", "Glass Panes"],
    floors: ["Smooth Stone", "Birch Planks", "Polished Andesite"],
    roofs: ["Copper Stairs", "Quartz Stairs", "Cyan Terracotta"]
  }
];

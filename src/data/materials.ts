import type { MaterialSet } from "../types/build";

export const materialSets: MaterialSet[] = [
  {
    id: "cozy-cabin",
    label: "Cabin Warmth",
    themes: ["cozy", "starter"],
    walls: ["Spruce Planks", "Stripped Spruce Logs", "Cobblestone Base"],
    floors: ["Oak Planks", "Spruce Slabs", "Birch Planks"],
    roofs: ["Dark Oak Stairs", "Spruce Stairs", "Brown Terracotta"]
  },
  {
    id: "cozy-stone",
    label: "Hearthstone Mix",
    themes: ["cozy", "survival", "medieval"],
    walls: ["Stone Bricks", "Andesite", "Spruce Beams"],
    floors: ["Stone Brick Slabs", "Oak Planks", "Polished Andesite"],
    roofs: ["Dark Oak Stairs", "Stone Brick Stairs", "Spruce Stairs"]
  },
  {
    id: "fancy-villa",
    label: "Villa Luxe",
    themes: ["fancy"],
    walls: ["Smooth Quartz", "White Concrete", "Tinted Glass Panels"],
    floors: ["Polished Diorite", "Birch Planks", "Smooth Quartz Tiles"],
    roofs: ["Quartz Stairs", "Dark Prismarine Stairs", "White Terracotta"]
  },
  {
    id: "fancy-garden",
    label: "Garden Estate",
    themes: ["fancy", "nature"],
    walls: ["Calcite", "Mossy Stone Bricks", "Oak Logs"],
    floors: ["Mangrove Planks", "Bamboo Mosaic", "Polished Andesite"],
    roofs: ["Copper Stairs", "Dark Oak Stairs", "Green Terracotta"]
  },
  {
    id: "medieval-fort",
    label: "Fortified Timber",
    themes: ["medieval", "survival"],
    walls: ["Stone Bricks", "Cobblestone", "Spruce Logs"],
    floors: ["Spruce Planks", "Stone Brick Slabs", "Coarse Dirt Paths"],
    roofs: ["Dark Oak Stairs", "Stone Brick Stairs", "Deepslate Tile Stairs"]
  },
  {
    id: "medieval-hall",
    label: "Great Hall",
    themes: ["medieval", "cozy"],
    walls: ["Oak Logs", "Stripped Dark Oak Logs", "Mud Bricks"],
    floors: ["Dark Oak Planks", "Oak Planks", "Packed Mud"],
    roofs: ["Dark Oak Stairs", "Mud Brick Stairs", "Spruce Stairs"]
  },
  {
    id: "nature-hideaway",
    label: "Overgrown Hideaway",
    themes: ["nature", "starter"],
    walls: ["Oak Planks", "Moss Blocks", "Jungle Logs"],
    floors: ["Bamboo Mosaic", "Oak Slabs", "Rooted Dirt"],
    roofs: ["Mossy Cobblestone Stairs", "Jungle Stairs", "Leaf Canopy Trim"]
  },
  {
    id: "survival-stronghold",
    label: "Adventure Ready",
    themes: ["survival", "starter"],
    walls: ["Cobblestone", "Oak Planks", "Stone Bricks"],
    floors: ["Oak Planks", "Stone Slabs", "Spruce Planks"],
    roofs: ["Spruce Stairs", "Cobblestone Stairs", "Stone Brick Stairs"]
  }
];

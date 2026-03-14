import type { GeneratedBuild } from "../types/build";

export function buildScenePrompt(build: GeneratedBuild): string {
  const props = [...build.scene.props, build.scene.petProp].join(", ");

  return [
    "Create a kid-friendly Minecraft-inspired scene image.",
    `Build idea: ${build.buildIdea}.`,
    `Theme: ${build.themeLabel}.`,
    `Biome: ${build.biomeLabel}.`,
    `Build type: ${build.purposeLabel}.`,
    `Scene title: ${build.scene.title}.`,
    `Scene mood: ${build.scene.moodLine}.`,
    `Wall material: ${build.materials.walls}.`,
    `Floor material: ${build.materials.floor}.`,
    `Roof material: ${build.materials.roof}.`,
    `Pet: ${build.pet.label}.`,
    `Include these environment props: ${props}.`,
    "Keep the image polished, readable, playful, and clearly based on block-building game visuals."
  ].join(" ");
}

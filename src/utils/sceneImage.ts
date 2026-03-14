import type { AiSceneResult, GeneratedBuild } from "../types/build";

export class AiSceneError extends Error {
  status?: number;
}

function createPayload(build: GeneratedBuild) {
  return {
    id: build.id,
    buildIdea: build.buildIdea,
    buildSummary: build.buildSummary,
    themeLabel: build.themeLabel,
    biomeLabel: build.biomeLabel,
    purposeLabel: build.purposeLabel,
    size: build.size,
    materials: build.materials,
    pet: {
      type: build.pet.type,
      label: build.pet.label
    },
    scene: {
      title: build.scene.title,
      moodLine: build.scene.moodLine,
      props: build.scene.props,
      petProp: build.scene.petProp
    }
  };
}

export async function requestSceneImage(build: GeneratedBuild): Promise<AiSceneResult> {
  const response = await fetch("/.netlify/functions/generate-scene-image", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(createPayload(build))
  });

  const body = (await response.json().catch(() => null)) as
    | { error?: string; scene?: AiSceneResult }
    | null;

  if (!response.ok || !body?.scene) {
    const error = new AiSceneError(
      body?.error ??
        "AI scene art is not available yet. Add your OpenAI key in Netlify when you're ready."
    );
    error.status = response.status;
    throw error;
  }

  return body.scene;
}

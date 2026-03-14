import type { AiRemixResult, GeneratedBuild } from "../types/build";

export class AiRemixError extends Error {
  status?: number;
}

function createPayload(build: GeneratedBuild) {
  return {
    buildIdea: build.buildIdea,
    buildSummary: build.buildSummary,
    themeLabel: build.themeLabel,
    biomeLabel: build.biomeLabel,
    purposeLabel: build.purposeLabel,
    size: build.size,
    materials: build.materials,
    interiorIdeas: build.interiorIdeas,
    pet: {
      label: build.pet.label,
      nameSuggestions: build.pet.nameSuggestions
    },
    scene: {
      title: build.scene.title,
      moodLine: build.scene.moodLine
    }
  };
}

export async function requestAiRemix(build: GeneratedBuild): Promise<AiRemixResult> {
  const response = await fetch("/.netlify/functions/remix-build", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(createPayload(build))
  });

  const body = (await response.json().catch(() => null)) as
    | { error?: string; remix?: AiRemixResult }
    | null;

  if (!response.ok || !body?.remix) {
    const error = new AiRemixError(
      body?.error ??
        "AI remix is not available yet. Add your OpenAI key in Netlify when you're ready."
    );
    error.status = response.status;
    throw error;
  }

  return body.remix;
}

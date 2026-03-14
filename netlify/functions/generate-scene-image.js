const DEFAULT_MODEL = process.env.OPENAI_SCENE_MODEL || "gpt-image-1-mini";
const REQUEST_TIMEOUT_MS = Number(process.env.OPENAI_SCENE_TIMEOUT_MS || 20000);
const COOLDOWN_MS = Number(process.env.OPENAI_SCENE_COOLDOWN_MS || 8000);
const cooldowns = new Map();

function logSceneEvent(stage, data) {
  console.log(
    JSON.stringify({
      source: "generate-scene-image",
      stage,
      ...data
    })
  );
}

function isStringArray(value) {
  return Array.isArray(value) && value.every((item) => typeof item === "string" && item.trim().length > 0);
}

function isValidBuild(build) {
  return Boolean(
    build &&
      typeof build === "object" &&
      typeof build.id === "string" &&
      typeof build.buildIdea === "string" &&
      typeof build.buildSummary === "string" &&
      typeof build.themeLabel === "string" &&
      typeof build.biomeLabel === "string" &&
      typeof build.purposeLabel === "string" &&
      typeof build.size === "string" &&
      build.materials &&
      typeof build.materials.walls === "string" &&
      typeof build.materials.floor === "string" &&
      typeof build.materials.roof === "string" &&
      build.pet &&
      typeof build.pet.type === "string" &&
      typeof build.pet.label === "string" &&
      build.scene &&
      typeof build.scene.title === "string" &&
      typeof build.scene.moodLine === "string" &&
      isStringArray(build.scene.props) &&
      typeof build.scene.petProp === "string"
  );
}

function createPrompt(build) {
  const props = [...build.scene.props, build.scene.petProp].join(", ");

  return [
    "Create a polished Minecraft-inspired concept art scene for kids and families.",
    "Show one clear build in a blocky game world, with clean shapes and readable materials.",
    `Build idea: ${build.buildIdea}.`,
    `Summary: ${build.buildSummary}.`,
    `Theme: ${build.themeLabel}.`,
    `Biome: ${build.biomeLabel}.`,
    `Purpose: ${build.purposeLabel}.`,
    `Size: ${build.size}.`,
    `Scene title: ${build.scene.title}.`,
    `Mood: ${build.scene.moodLine}.`,
    `Walls should feel like ${build.materials.walls}.`,
    `Floor should feel like ${build.materials.floor}.`,
    `Roof should feel like ${build.materials.roof}.`,
    `Include the pet: ${build.pet.label}.`,
    `Show these supporting details: ${props}.`,
    "Important style notes:",
    "- concept art, not a literal in-game screenshot",
    "- kid-friendly, playful, bright, and easy to read",
    "- pixel-aware block-building style",
    "- one main structure with a strong silhouette",
    "- no text, labels, UI, or split panels"
  ].join(" ");
}

exports.handler = async function handler(event) {
  const startedAt = Date.now();

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed." })
    };
  }

  if (!process.env.OPENAI_API_KEY) {
    return {
      statusCode: 503,
      body: JSON.stringify({
        error: "AI scene art is off right now. Add OPENAI_API_KEY in Netlify to turn it on."
      })
    };
  }

  try {
    const build = JSON.parse(event.body || "{}");
    if (!isValidBuild(build)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Scene image data was missing a few key details." })
      };
    }

    const fingerprint = build.id;
    const lastSeenAt = cooldowns.get(fingerprint) || 0;
    if (Date.now() - lastSeenAt < COOLDOWN_MS) {
      return {
        statusCode: 429,
        body: JSON.stringify({
          error: "That scene button is cooling down. Try again in a few seconds."
        })
      };
    }

    cooldowns.set(fingerprint, Date.now());

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const prompt = createPrompt(build);
      logSceneEvent("request_started", {
        buildIdea: build.buildIdea,
        model: DEFAULT_MODEL,
        timeoutMs: REQUEST_TIMEOUT_MS
      });

      const response = await fetch("https://api.openai.com/v1/images/generations", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        },
        signal: controller.signal,
        body: JSON.stringify({
          model: DEFAULT_MODEL,
          prompt,
          size: "1024x1024",
          quality: "low",
          output_format: "jpeg",
          output_compression: 60,
          moderation: "auto"
        })
      });

      const payload = await response.json();

      if (!response.ok) {
        logSceneEvent("openai_error", {
          buildIdea: build.buildIdea,
          durationMs: Date.now() - startedAt,
          status: response.status
        });
        return {
          statusCode: response.status,
          body: JSON.stringify({
            error:
              payload?.error?.message ||
              "OpenAI image generation failed. If this is your first image call, your org may need verification."
          })
        };
      }

      const imageBase64 = payload?.data?.[0]?.b64_json;
      if (typeof imageBase64 !== "string" || imageBase64.length === 0) {
        return {
          statusCode: 502,
          body: JSON.stringify({
            error: "OpenAI did not return a scene image."
          })
        };
      }

      const revisedPrompt =
        typeof payload?.data?.[0]?.revised_prompt === "string"
          ? payload.data[0].revised_prompt
          : undefined;

      logSceneEvent("request_succeeded", {
        buildIdea: build.buildIdea,
        durationMs: Date.now() - startedAt
      });

      return {
        statusCode: 200,
        body: JSON.stringify({
          scene: {
            imageUrl: `data:image/jpeg;base64,${imageBase64}`,
            revisedPrompt
          }
        })
      };
    } finally {
      setTimeout(() => cooldowns.delete(fingerprint), COOLDOWN_MS);
      clearTimeout(timeoutId);
    }
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      logSceneEvent("request_timed_out", {
        durationMs: Date.now() - startedAt
      });
      return {
        statusCode: 504,
        body: JSON.stringify({
          error:
            "AI scene art took too long. Try again in a moment, or switch the Netlify model to a faster image model."
        })
      };
    }

    logSceneEvent("request_failed", {
      durationMs: Date.now() - startedAt,
      message: error instanceof Error ? error.message : "Unexpected AI scene error."
    });
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error instanceof Error ? error.message : "Unexpected AI scene error."
      })
    };
  }
};

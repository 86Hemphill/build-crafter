const REMIX_SCHEMA = {
  name: "build_remix",
  schema: {
    type: "object",
    additionalProperties: false,
    properties: {
      title: { type: "string" },
      summary: { type: "string" },
      layoutBoost: {
        type: "array",
        items: { type: "string" }
      },
      styleBoost: {
        type: "array",
        items: { type: "string" }
      },
      extraTouches: {
        type: "array",
        items: { type: "string" }
      },
      petMoment: { type: "string" }
    },
    required: ["title", "summary", "layoutBoost", "styleBoost", "extraTouches", "petMoment"]
  },
  strict: true
};

const DEFAULT_MODEL = process.env.OPENAI_REMIX_MODEL || "gpt-5-mini";
const REQUEST_TIMEOUT_MS = Number(process.env.OPENAI_REMIX_TIMEOUT_MS || 12000);
const COOLDOWN_MS = Number(process.env.OPENAI_REMIX_COOLDOWN_MS || 4000);
const remixCooldowns = new Map();

function logRemixEvent(stage, data) {
  console.log(
    JSON.stringify({
      source: "remix-build",
      stage,
      ...data
    })
  );
}

function createFingerprint(build) {
  return JSON.stringify({
    buildIdea: build?.buildIdea,
    themeLabel: build?.themeLabel,
    biomeLabel: build?.biomeLabel,
    purposeLabel: build?.purposeLabel,
    size: build?.size,
    pet: build?.pet?.label
  });
}

function isStringArray(value) {
  return Array.isArray(value) && value.every((item) => typeof item === "string" && item.trim().length > 0);
}

function isValidIncomingBuild(build) {
  return Boolean(
    build &&
      typeof build === "object" &&
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
      isStringArray(build.interiorIdeas) &&
      build.pet &&
      typeof build.pet.label === "string" &&
      isStringArray(build.pet.nameSuggestions)
  );
}

function isValidRemix(remix) {
  return Boolean(
    remix &&
      typeof remix === "object" &&
      typeof remix.title === "string" &&
      remix.title.trim().length > 0 &&
      typeof remix.summary === "string" &&
      remix.summary.trim().length > 0 &&
      isStringArray(remix.layoutBoost) &&
      isStringArray(remix.styleBoost) &&
      isStringArray(remix.extraTouches) &&
      typeof remix.petMoment === "string" &&
      remix.petMoment.trim().length > 0
  );
}

function findJsonText(value) {
  if (!value) {
    return null;
  }

  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed.startsWith("{") ? trimmed : null;
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      const match = findJsonText(item);
      if (match) {
        return match;
      }
    }
    return null;
  }

  if (typeof value === "object") {
    if (typeof value.text === "string") {
      const directText = findJsonText(value.text);
      if (directText) {
        return directText;
      }
    }

    if (typeof value.output_text === "string") {
      const outputText = findJsonText(value.output_text);
      if (outputText) {
        return outputText;
      }
    }

    if (typeof value.arguments === "string") {
      const argsText = findJsonText(value.arguments);
      if (argsText) {
        return argsText;
      }
    }

    for (const key of Object.keys(value)) {
      const match = findJsonText(value[key]);
      if (match) {
        return match;
      }
    }
  }

  return null;
}

function parseRemixPayload(payload) {
  const refusal =
    payload?.refusal ||
    payload?.error?.message ||
    payload?.output?.find?.((item) => item?.type === "refusal")?.content?.[0]?.text;

  if (refusal) {
    throw new Error(typeof refusal === "string" ? refusal : "The AI refused this remix request.");
  }

  const jsonText = findJsonText(payload?.output_text) || findJsonText(payload?.output);

  if (!jsonText) {
    const status = payload?.status ? ` Status: ${payload.status}.` : "";
    const incomplete =
      payload?.incomplete_details?.reason || payload?.status_details?.reason || null;
    const reason = incomplete ? ` Reason: ${incomplete}.` : "";
    throw new Error(`OpenAI returned an empty remix.${status}${reason}`);
  }

  return JSON.parse(jsonText);
}

function createRemixInput(build) {
  const safeBuild = {
    buildIdea: build.buildIdea,
    buildSummary: build.buildSummary,
    themeLabel: build.themeLabel,
    biomeLabel: build.biomeLabel,
    purposeLabel: build.purposeLabel,
    size: build.size,
    materials: build.materials,
    interiorIdeas: Array.isArray(build.interiorIdeas) ? build.interiorIdeas.slice(0, 5) : [],
    pet: build.pet
      ? {
          label: build.pet.label,
          nameSuggestions: Array.isArray(build.pet.nameSuggestions)
            ? build.pet.nameSuggestions.slice(0, 5)
            : []
        }
      : null,
    scene: build.scene
      ? {
          title: build.scene.title,
          moodLine: build.scene.moodLine
        }
      : null
  };

  return [
    {
      role: "system",
      content: [
        {
          type: "input_text",
          text:
            "You create kid-friendly Minecraft build remixes. Keep ideas imaginative, positive, and safe for kids. Build on the provided plan instead of replacing it. Use short, playful wording that still sounds good to adults."
        }
      ]
    },
    {
      role: "user",
      content: [
        {
          type: "input_text",
          text: `Remix this Minecraft build plan. Keep it compact, practical, and fun for kids 8+.

Rules:
- Keep each list item short.
- Do not change the base build idea, biome, or pet.
- Add only believable details that fit the listed materials and vibe.

Build data:
${JSON.stringify(safeBuild, null, 2)}`
        }
      ]
    }
  ];
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
        error: "AI remix is off right now. Add OPENAI_API_KEY in Netlify to turn it on."
      })
    };
  }

  try {
    const build = JSON.parse(event.body || "{}");
    if (!isValidIncomingBuild(build)) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "Build data was missing a few key details."
        })
      };
    }

    const fingerprint = createFingerprint(build);
    const lastSeenAt = remixCooldowns.get(fingerprint) || 0;
    if (Date.now() - lastSeenAt < COOLDOWN_MS) {
      return {
        statusCode: 429,
        body: JSON.stringify({
          error: "That remix button is warming up. Try again in a few seconds."
        })
      };
    }

    remixCooldowns.set(fingerprint, Date.now());
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      logRemixEvent("request_started", {
        model: DEFAULT_MODEL,
        cooldownMs: COOLDOWN_MS,
        timeoutMs: REQUEST_TIMEOUT_MS,
        buildIdea: build.buildIdea
      });

      const response = await fetch("https://api.openai.com/v1/responses", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        },
        signal: controller.signal,
        body: JSON.stringify({
          model: DEFAULT_MODEL,
          input: createRemixInput(build),
          reasoning: {
            effort: "minimal"
          },
          max_output_tokens: 350,
          text: {
            verbosity: "low",
            format: {
              type: "json_schema",
              name: REMIX_SCHEMA.name,
              schema: REMIX_SCHEMA.schema,
              strict: REMIX_SCHEMA.strict
            }
          }
      })
      });

      const payload = await response.json();

      if (!response.ok) {
        logRemixEvent("openai_error", {
          durationMs: Date.now() - startedAt,
          status: response.status,
          buildIdea: build.buildIdea
        });
        return {
          statusCode: response.status,
          body: JSON.stringify({
            error: payload?.error?.message || "OpenAI request failed."
          })
        };
      }

      const remix = parseRemixPayload(payload);
      if (!isValidRemix(remix)) {
        logRemixEvent("invalid_remix_shape", {
          durationMs: Date.now() - startedAt,
          buildIdea: build.buildIdea
        });
        return {
          statusCode: 502,
          body: JSON.stringify({
            error: "The AI remix came back in an unexpected shape."
          })
        };
      }

      logRemixEvent("request_succeeded", {
        durationMs: Date.now() - startedAt,
        buildIdea: build.buildIdea
      });

      return {
        statusCode: 200,
        body: JSON.stringify({
          remix
        })
      };
    } finally {
      setTimeout(() => remixCooldowns.delete(fingerprint), COOLDOWN_MS);
      clearTimeout(timeoutId);
    }
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      logRemixEvent("request_timed_out", {
        durationMs: Date.now() - startedAt
      });
      return {
        statusCode: 504,
        body: JSON.stringify({
          error:
            "AI remix took too long. Try again in a moment, or switch the Netlify model to a faster one like gpt-5-mini."
        })
      };
    }

    logRemixEvent("request_failed", {
      durationMs: Date.now() - startedAt,
      message: error instanceof Error ? error.message : "Unexpected AI remix error."
    });
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error instanceof Error ? error.message : "Unexpected AI remix error."
      })
    };
  }
};

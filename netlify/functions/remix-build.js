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
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
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
        return {
          statusCode: response.status,
          body: JSON.stringify({
            error: payload?.error?.message || "OpenAI request failed."
          })
        };
      }

      const outputText = payload.output_text;

      if (!outputText) {
        return {
          statusCode: 502,
          body: JSON.stringify({ error: "OpenAI returned an empty remix." })
        };
      }

      return {
        statusCode: 200,
        body: JSON.stringify({
          remix: JSON.parse(outputText)
        })
      };
    } finally {
      clearTimeout(timeoutId);
    }
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      return {
        statusCode: 504,
        body: JSON.stringify({
          error:
            "AI remix took too long. Try again in a moment, or switch the Netlify model to a faster one like gpt-5-mini."
        })
      };
    }

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error instanceof Error ? error.message : "Unexpected AI remix error."
      })
    };
  }
};

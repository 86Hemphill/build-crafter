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

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: process.env.OPENAI_REMIX_MODEL || "gpt-5",
        input: [
          {
            role: "system",
            content: [
              {
                type: "input_text",
                text:
                  "You create kid-friendly Minecraft build remixes. Keep ideas imaginative, positive, and safe for kids. Build on the provided plan instead of replacing it."
              }
            ]
          },
          {
            role: "user",
            content: [
              {
                type: "input_text",
                text: `Remix this build plan with extra creative flair. Keep the output short, practical, and fun for kids 8+ while still sounding good to adults.\n\nBuild data:\n${JSON.stringify(
                  build,
                  null,
                  2
                )}`
              }
            ]
          }
        ],
        text: {
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
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error instanceof Error ? error.message : "Unexpected AI remix error."
      })
    };
  }
};

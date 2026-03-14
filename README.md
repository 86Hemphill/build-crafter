# BuildCrafter

Minecraft-inspired build idea generator built with React, Vite, and TypeScript.

## Local Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Netlify Deployment

This repo includes a [`netlify.toml`](/c:/Users/lhemphill/CraftBuilder/craft-builder/netlify.toml) file with the correct settings:

- Build command: `npm run build`
- Publish directory: `dist`

If you connect the GitHub repo in Netlify, it should pick these settings up automatically.

## Optional AI Remix

The app now includes an optional AI remix seam through a Netlify function at [`netlify/functions/remix-build.js`](/c:/Users/lhemphill/CraftBuilder/craft-builder/netlify/functions/remix-build.js).

To turn it on in Netlify:

- Add `OPENAI_API_KEY`
- Optional: add `OPENAI_REMIX_MODEL` if you want a model other than the default. The app now defaults to `gpt-5-mini` for faster Netlify function responses.
- Optional: add `OPENAI_REMIX_TIMEOUT_MS` to tune how quickly the function should fail fast. Default is `12000`.
- Optional: add `OPENAI_REMIX_COOLDOWN_MS` to space out repeat clicks on the same build. Default is `4000`.

Without those env vars, the app still works normally and the remix button simply shows a setup message.

## Future AI Scene Images

The scene preview is now powered by a Netlify function at [`netlify/functions/generate-scene-image.js`](/c:/Users/lhemphill/CraftBuilder/craft-builder/netlify/functions/generate-scene-image.js) and a client helper at [`src/utils/sceneImage.ts`](/c:/Users/lhemphill/CraftBuilder/craft-builder/src/utils/sceneImage.ts).

Optional environment variables:

- `OPENAI_SCENE_MODEL` to override the default image model. The app defaults to `gpt-image-1-mini` for a faster, lower-cost concept-art pass.
- `OPENAI_SCENE_TIMEOUT_MS` to control how quickly the image function should fail fast. Default is `20000`.
- `OPENAI_SCENE_COOLDOWN_MS` to space out repeat scene requests on the same build. Default is `8000`.

OpenAI’s image docs note that the Image API is the best fit for generating a single image from one prompt, that GPT Image models are the recommended family for image generation, and that JPEG output is faster than PNG when latency matters:

- https://developers.openai.com/api/docs/guides/image-generation
- https://platform.openai.com/docs/models/gpt-image-1

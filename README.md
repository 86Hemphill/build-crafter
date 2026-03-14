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
- Optional: add `OPENAI_REMIX_MODEL` if you want a model other than the default

Without those env vars, the app still works normally and the remix button simply shows a setup message.

## Future AI Scene Images

The old hand-drawn scene panel has been replaced with a stronger scene-direction section plus a future image prompt builder in [`src/utils/scenePrompt.ts`](/c:/Users/lhemphill/CraftBuilder/craft-builder/src/utils/scenePrompt.ts).

There is also a placeholder Netlify function at [`netlify/functions/generate-scene-image.js`](/c:/Users/lhemphill/CraftBuilder/craft-builder/netlify/functions/generate-scene-image.js) so the image path can be turned on later without another large refactor.

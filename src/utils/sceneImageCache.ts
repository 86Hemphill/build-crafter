import type { AiSceneResult } from "../types/build";

const CACHE_KEY = "build-crafter-scene-images";
const MAX_ITEMS = 4;

function isAiSceneResult(value: unknown): value is AiSceneResult {
  if (!value || typeof value !== "object") {
    return false;
  }

  const scene = value as Partial<AiSceneResult>;
  return (
    typeof scene.imageUrl === "string" &&
    scene.imageUrl.startsWith("data:image/") &&
    (typeof scene.revisedPrompt === "string" || typeof scene.revisedPrompt === "undefined")
  );
}

function readCache(): Record<string, AiSceneResult> {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const raw = window.sessionStorage.getItem(CACHE_KEY);
    if (!raw) {
      return {};
    }

    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const safeEntries = Object.entries(parsed).filter((entry): entry is [string, AiSceneResult] =>
      isAiSceneResult(entry[1])
    );
    return Object.fromEntries(safeEntries);
  } catch {
    return {};
  }
}

function writeCache(cache: Record<string, AiSceneResult>) {
  if (typeof window === "undefined") {
    return;
  }

  window.sessionStorage.setItem(CACHE_KEY, JSON.stringify(cache));
}

export function loadCachedSceneImage(planId: string): AiSceneResult | null {
  const cache = readCache();
  return cache[planId] ?? null;
}

export function saveCachedSceneImage(planId: string, scene: AiSceneResult) {
  const cache = readCache();
  const nextCache = { ...cache, [planId]: scene };
  const keys = Object.keys(nextCache);

  while (keys.length > MAX_ITEMS) {
    const keyToDrop = keys.shift();
    if (!keyToDrop) {
      break;
    }
    delete nextCache[keyToDrop];
  }

  writeCache(nextCache);
}

export function clearCachedSceneImage(planId: string) {
  const cache = readCache();
  delete cache[planId];
  writeCache(cache);
}

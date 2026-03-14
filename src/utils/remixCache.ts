import type { AiRemixResult } from "../types/build";

const REMIX_CACHE_KEY = "build-crafter-ai-remixes";

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string" && item.length > 0);
}

function isAiRemixResult(value: unknown): value is AiRemixResult {
  if (!value || typeof value !== "object") {
    return false;
  }

  const remix = value as Partial<AiRemixResult>;
  return (
    typeof remix.title === "string" &&
    typeof remix.summary === "string" &&
    isStringArray(remix.layoutBoost) &&
    isStringArray(remix.styleBoost) &&
    isStringArray(remix.extraTouches) &&
    typeof remix.petMoment === "string"
  );
}

function readCache(): Record<string, AiRemixResult> {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const raw = window.localStorage.getItem(REMIX_CACHE_KEY);
    if (!raw) {
      return {};
    }

    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const safeEntries = Object.entries(parsed).filter((entry): entry is [string, AiRemixResult] =>
      isAiRemixResult(entry[1])
    );

    return Object.fromEntries(safeEntries);
  } catch {
    return {};
  }
}

function writeCache(cache: Record<string, AiRemixResult>) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(REMIX_CACHE_KEY, JSON.stringify(cache));
}

export function loadCachedRemix(planId: string): AiRemixResult | null {
  const cache = readCache();
  return cache[planId] ?? null;
}

export function saveCachedRemix(planId: string, remix: AiRemixResult) {
  const cache = readCache();
  cache[planId] = remix;
  writeCache(cache);
}

export function clearCachedRemix(planId: string) {
  const cache = readCache();
  delete cache[planId];
  writeCache(cache);
}

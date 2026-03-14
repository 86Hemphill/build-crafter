import type { GeneratedBuild } from "../types/build";

export const PLANS_STORAGE_KEY = "buildcrafter:plans";

function parsePlans(raw: string | null): GeneratedBuild[] {
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? (parsed as GeneratedBuild[]) : [];
  } catch {
    return [];
  }
}

export function readPlans(storage: Storage = window.localStorage): GeneratedBuild[] {
  return parsePlans(storage.getItem(PLANS_STORAGE_KEY));
}

export function savePlan(build: GeneratedBuild, storage: Storage = window.localStorage): void {
  const existing = readPlans(storage).filter((entry) => entry.id !== build.id);
  storage.setItem(PLANS_STORAGE_KEY, JSON.stringify([build, ...existing].slice(0, 12)));
}

export function findPlanById(
  buildId: string,
  storage: Storage = window.localStorage
): GeneratedBuild | undefined {
  return readPlans(storage).find((entry) => entry.id === buildId);
}

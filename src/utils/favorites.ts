import type { FavoriteBuild, GeneratedBuild } from "../types/build";
import { normalizeBuildSignature } from "./generator";

export const FAVORITES_STORAGE_KEY = "buildcrafter:favorites";

function safeParseFavorites(rawValue: string | null): FavoriteBuild[] {
  if (!rawValue) {
    return [];
  }

  try {
    const parsed = JSON.parse(rawValue) as unknown;
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter((entry): entry is FavoriteBuild => {
      if (!entry || typeof entry !== "object") {
        return false;
      }

      const candidate = entry as Partial<FavoriteBuild>;
      return (
        typeof candidate.id === "string" &&
        typeof candidate.buildIdea === "string" &&
        typeof candidate.theme === "string" &&
        typeof candidate.size === "string" &&
        Array.isArray(candidate.interiorIdeas) &&
        typeof candidate.pet?.type === "string"
      );
    });
  } catch {
    return [];
  }
}

export function readFavorites(storage: Storage = window.localStorage): FavoriteBuild[] {
  return safeParseFavorites(storage.getItem(FAVORITES_STORAGE_KEY));
}

export function writeFavorites(
  favorites: FavoriteBuild[],
  storage: Storage = window.localStorage
): void {
  storage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
}

export function saveFavorite(
  build: GeneratedBuild,
  storage: Storage = window.localStorage
): FavoriteBuild[] {
  const favorites = readFavorites(storage);
  const buildSignature = normalizeBuildSignature(build);
  const alreadySaved = favorites.some(
    (favorite) =>
      favorite.id === build.id || normalizeBuildSignature(favorite) === buildSignature
  );

  if (alreadySaved) {
    return favorites;
  }

  const nextFavorites = [build, ...favorites];
  writeFavorites(nextFavorites, storage);
  return nextFavorites;
}

export function removeFavorite(
  buildId: string,
  storage: Storage = window.localStorage
): FavoriteBuild[] {
  const nextFavorites = readFavorites(storage).filter((favorite) => favorite.id !== buildId);
  writeFavorites(nextFavorites, storage);
  return nextFavorites;
}

import { FAVORITES_STORAGE_KEY, readFavorites, removeFavorite, saveFavorite } from "./favorites";
import { createGeneratedBuild } from "./generator";

describe("favorites storage", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("saves and restores favorites", () => {
    const build = createGeneratedBuild({ seed: 20 });

    saveFavorite(build);

    const favorites = readFavorites();
    expect(favorites).toHaveLength(1);
    expect(favorites[0].id).toBe(build.id);
  });

  it("ignores malformed stored data safely", () => {
    window.localStorage.setItem(FAVORITES_STORAGE_KEY, "{not valid json");

    expect(readFavorites()).toEqual([]);
  });

  it("removes favorites correctly", () => {
    const build = createGeneratedBuild({ seed: 33 });

    saveFavorite(build);
    const favorites = removeFavorite(build.id);

    expect(favorites).toEqual([]);
    expect(readFavorites()).toEqual([]);
  });

  it("prevents duplicate favorites by normalized content", () => {
    const build = createGeneratedBuild({ seed: 44 });

    saveFavorite(build);
    saveFavorite({ ...build, id: `${build.id}-copy` });

    expect(readFavorites()).toHaveLength(1);
  });
});

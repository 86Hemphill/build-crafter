import { createGeneratedBuild } from "./generator";

describe("createGeneratedBuild", () => {
  it("returns a complete build payload", () => {
    const build = createGeneratedBuild({ seed: 42 });

    expect(build.id).toMatch(/^build-/);
    expect(build.buildIdea.length).toBeGreaterThan(0);
    expect(build.materials.walls.length).toBeGreaterThan(0);
    expect(build.interiorIdeas.length).toBeGreaterThanOrEqual(3);
    expect(build.pet.nameSuggestions.length).toBeGreaterThanOrEqual(3);
  });

  it("respects a selected theme", () => {
    const build = createGeneratedBuild({ seed: 8, theme: "medieval" });

    expect(build.theme).toBe("medieval");
    expect(build.themeLabel).toBe("Medieval");
  });

  it("respects a selected size", () => {
    const build = createGeneratedBuild({ seed: 11, size: "big" });

    expect(build.size).toBe("big");
  });

  it("falls back safely when an exact theme and size combo is sparse", () => {
    const build = createGeneratedBuild({ seed: 17, theme: "starter", size: "big" });

    expect(build.theme).toBe("starter");
    expect(build.size).toBe("big");
    expect(build.buildIdea.length).toBeGreaterThan(0);
  });

  it("avoids duplicate interiors and pet names in one build", () => {
    const build = createGeneratedBuild({ seed: 99, theme: "cozy", size: "medium" });

    expect(new Set(build.interiorIdeas).size).toBe(build.interiorIdeas.length);
    expect(new Set(build.pet.nameSuggestions).size).toBe(build.pet.nameSuggestions.length);
  });
});

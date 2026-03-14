import { createGeneratedBuild } from "./generator";

describe("createGeneratedBuild", () => {
  it("returns a complete build payload", () => {
    const build = createGeneratedBuild({ seed: 42 });

    expect(build.id).toMatch(/^build-/);
    expect(build.buildIdea.length).toBeGreaterThan(0);
    expect(build.biomeLabel.length).toBeGreaterThan(0);
    expect(build.purposeLabel.length).toBeGreaterThan(0);
    expect(build.layoutPlan.length).toBeGreaterThanOrEqual(4);
    expect(build.visualMockup.length).toBeGreaterThanOrEqual(4);
    expect(build.buildSteps.length).toBeGreaterThanOrEqual(5);
  });

  it("respects the expanded filters", () => {
    const build = createGeneratedBuild({
      seed: 15,
      theme: "industrial",
      size: "epic",
      biome: "mountain",
      purpose: "redstone"
    });

    expect(build.theme).toBe("industrial");
    expect(build.size).toBe("epic");
    expect(build.biome).toBe("mountain");
    expect(build.purpose).toBe("redstone");
  });

  it("returns unique interior ideas and pet names", () => {
    const build = createGeneratedBuild({ seed: 19, theme: "whimsical", biome: "jungle" });

    expect(new Set(build.interiorIdeas).size).toBe(build.interiorIdeas.length);
    expect(new Set(build.pet.nameSuggestions).size).toBe(build.pet.nameSuggestions.length);
  });
});

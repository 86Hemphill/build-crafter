import { createGeneratedBuild } from "./generator";
import { PLANS_STORAGE_KEY, findPlanById, readPlans, savePlan } from "./plans";

describe("plans storage", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("saves and restores plans", () => {
    const build = createGeneratedBuild({ seed: 80 });

    savePlan(build);

    const plans = readPlans();
    expect(plans).toHaveLength(1);
    expect(plans[0].id).toBe(build.id);
  });

  it("can find a plan by id", () => {
    const build = createGeneratedBuild({ seed: 90 });

    savePlan(build);

    expect(findPlanById(build.id)?.buildIdea).toBe(build.buildIdea);
  });

  it("treats malformed storage as empty", () => {
    window.localStorage.setItem(PLANS_STORAGE_KEY, "{broken");

    expect(readPlans()).toEqual([]);
  });
});

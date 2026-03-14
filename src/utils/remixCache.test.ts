import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { clearCachedRemix, loadCachedRemix, saveCachedRemix } from "./remixCache";
import type { AiRemixResult } from "../types/build";

const sampleRemix: AiRemixResult = {
  title: "Glow-Up Cottage",
  summary: "Add a brighter porch and warmer windows.",
  layoutBoost: ["Push the front steps out by one block."],
  styleBoost: ["Hang lanterns under the roof edge."],
  extraTouches: ["Plant berry bushes by the path."],
  petMoment: "Give the wolf a tiny watch spot near the door."
};

describe("remixCache", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  afterEach(() => {
    window.localStorage.clear();
  });

  it("saves and loads a remix by plan id", () => {
    saveCachedRemix("plan-1", sampleRemix);

    expect(loadCachedRemix("plan-1")).toEqual(sampleRemix);
  });

  it("clears a saved remix", () => {
    saveCachedRemix("plan-1", sampleRemix);
    clearCachedRemix("plan-1");

    expect(loadCachedRemix("plan-1")).toBeNull();
  });

  it("ignores malformed cache entries", () => {
    window.localStorage.setItem(
      "build-crafter-ai-remixes",
      JSON.stringify({
        "plan-1": { title: "Bad Data" }
      })
    );

    expect(loadCachedRemix("plan-1")).toBeNull();
  });
});

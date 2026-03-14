import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MaterialBlockIcon } from "../components/MaterialBlockIcon";
import { PetIcon } from "../components/PetIcon";
import { ScenePanel } from "../components/ScenePanel";
import { requestAiRemix } from "../utils/aiRemix";
import { findPlanById } from "../utils/plans";
import type { AiRemixResult } from "../types/build";

const petNotes: Record<string, { vibe: string; bestSpot: string; detail: string }> = {
  wolf: {
    vibe: "Loyal trail buddy",
    bestSpot: "Front porch, watch post, or campfire edge",
    detail: "Add a bed, lantern, and a small guard nook."
  },
  cat: {
    vibe: "Cozy indoor explorer",
    bestSpot: "Window seat, bookshelf top, or hearth corner",
    detail: "Use carpet, shelves, and a bright resting spot."
  },
  horse: {
    vibe: "Fast adventure partner",
    bestSpot: "Stable lane, fenced yard, or grand entry",
    detail: "Add hay bales, tack space, and a riding gate."
  },
  donkey: {
    vibe: "Helpful supply buddy",
    bestSpot: "Farm path, storage yard, or market corner",
    detail: "Give it pack space and an easy route to storage."
  },
  mule: {
    vibe: "Tough hauling partner",
    bestSpot: "Workshop yard, mine path, or cargo dock",
    detail: "Pair it with crates, barrels, and utility blocks."
  },
  parrot: {
    vibe: "Colorful lookout friend",
    bestSpot: "Beam, balcony, or greenhouse perch",
    detail: "Use fences, leaves, and bright trim nearby."
  },
  llama: {
    vibe: "Funny fancy companion",
    bestSpot: "Courtyard, mountain pen, or banner path",
    detail: "Dress the area with rugs, banners, and flowers."
  }
};

export function BuildPlanPage() {
  const { planId = "" } = useParams();
  const plan = findPlanById(planId);
  const [remix, setRemix] = useState<AiRemixResult | null>(null);
  const [remixError, setRemixError] = useState<string | null>(null);
  const [isLoadingRemix, setIsLoadingRemix] = useState(false);

  if (!plan) {
    return (
      <div className="app-shell">
        <section className="panel empty-state">
          <p className="eyebrow">Guide Missing</p>
          <h2>That guide is not here anymore.</h2>
          <p>Make a new build from the home page and we will open a fresh guide for it.</p>
          <Link className="secondary-button link-button" to="/">
            Back Home
          </Link>
        </section>
      </div>
    );
  }

  const currentPlan = plan;
  const petNote = petNotes[currentPlan.pet.type];

  async function handleRemix() {
    try {
      setIsLoadingRemix(true);
      setRemixError(null);
      const result = await requestAiRemix(currentPlan);
      setRemix(result);
    } catch (error) {
      setRemixError(error instanceof Error ? error.message : "AI remix could not load.");
    } finally {
      setIsLoadingRemix(false);
    }
  }

  return (
    <div className="app-shell app-shell-guide">
      <header className="guide-header panel">
        <div>
          <p className="eyebrow">Build Guide</p>
          <h1>{currentPlan.buildIdea}</h1>
          <p className="hero-text">{currentPlan.buildSummary}</p>
        </div>
        <div className="pill-row">
          <span className={`pill pill-theme pill-${currentPlan.theme}`}>{currentPlan.themeLabel}</span>
          <span className="pill">{currentPlan.biomeLabel}</span>
          <span className="pill">{currentPlan.purposeLabel}</span>
          <span className="pill">{currentPlan.size}</span>
        </div>
      </header>

      <section className="guide-overview panel">
        <div className="overview-card">
          <p className="eyebrow">Blueprint Card</p>
          <h2>Big idea</h2>
          <p>{currentPlan.buildSummary}</p>
        </div>
        <div className="overview-card">
          <p className="eyebrow">Footprint</p>
          <h2>{currentPlan.size}</h2>
          <p>Best for a {currentPlan.biomeLabel.toLowerCase()} setting with a {currentPlan.purposeLabel.toLowerCase()} focus.</p>
        </div>
        <div className="overview-card">
          <p className="eyebrow">Main vibe</p>
          <h2>{currentPlan.themeLabel}</h2>
          <p>Use repeated shapes and matching details so the build feels tied together.</p>
        </div>
      </section>

      <ScenePanel build={currentPlan} />

      <main className="guide-layout">
        <section className="panel guide-column">
          <p className="eyebrow">Materials</p>
          <h2>Palette</h2>
          <div className="material-gallery">
            <div>
              <MaterialBlockIcon material={plan.materials.walls} />
              <p>Walls</p>
            </div>
            <div>
              <MaterialBlockIcon material={currentPlan.materials.floor} />
              <p>Floor</p>
            </div>
            <div>
              <MaterialBlockIcon material={currentPlan.materials.roof} />
              <p>Roof</p>
            </div>
          </div>
          <dl className="favorite-meta">
            <div>
              <dt>Walls</dt>
              <dd>{currentPlan.materials.walls}</dd>
            </div>
            <div>
              <dt>Floor</dt>
              <dd>{currentPlan.materials.floor}</dd>
            </div>
            <div>
              <dt>Roof</dt>
              <dd>{currentPlan.materials.roof}</dd>
            </div>
            <div>
              <dt>Pet</dt>
              <dd className="pet-line">
                <PetIcon pet={currentPlan.pet.type} size={56} />
                <span>{currentPlan.pet.label}</span>
              </dd>
            </div>
          </dl>
        </section>

        <section className="panel guide-column">
          <p className="eyebrow">Layout</p>
          <h2>How to map it out</h2>
          <div className="guide-steps">
            {currentPlan.layoutPlan.map((step, index) => (
              <article className="step-card" key={step}>
                <span className="step-number">0{index + 1}</span>
                <p>{step}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="panel guide-column">
          <p className="eyebrow">Visual Mockup</p>
          <h2>How it should look</h2>
          <div className="guide-steps">
            {currentPlan.visualMockup.map((note, index) => (
              <article className="step-card" key={note}>
                <span className="step-number">0{index + 1}</span>
                <p>{note}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="panel guide-column">
          <p className="eyebrow">AI Remix</p>
          <h2>Try an LLM remix</h2>
          <p className="hero-text">
            This keeps the main build fixed and lets AI add a fresh twist on top.
          </p>
          <button className="secondary-button" onClick={handleRemix} type="button">
            {isLoadingRemix ? "Thinking..." : "Try AI Remix"}
          </button>
          {remixError ? <p className="ai-note">{remixError}</p> : null}
          {remix ? (
            <div className="ai-remix-card">
              <h3>{remix.title}</h3>
              <p>{remix.summary}</p>
              <h4>Layout boost</h4>
              <ul className="guide-list">
                {remix.layoutBoost.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <h4>Style boost</h4>
              <ul className="tag-list">
                {remix.styleBoost.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <h4>Extra touches</h4>
              <ul className="tag-list">
                {remix.extraTouches.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p><strong>Pet moment:</strong> {remix.petMoment}</p>
            </div>
          ) : null}
        </section>

        <section className="panel guide-column">
          <p className="eyebrow">Pet Buddy</p>
          <h2>{currentPlan.pet.label}</h2>
          <div className="pet-showcase">
            <PetIcon pet={currentPlan.pet.type} size={96} />
            <div>
              <p className="pet-badge">{petNote.vibe}</p>
              <p><strong>Best spot:</strong> {petNote.bestSpot}</p>
              <p><strong>Extra detail:</strong> {petNote.detail}</p>
            </div>
          </div>
          <h3>Name ideas</h3>
          <ul className="tag-list">
            {currentPlan.pet.nameSuggestions.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </section>

        <section className="panel guide-column span-two">
          <p className="eyebrow">Build Steps</p>
          <h2>Good order to build it</h2>
          <ol className="guide-list guide-list-numbered">
            {currentPlan.buildSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <h3>Interior ideas</h3>
          <ul className="tag-list">
            {currentPlan.interiorIdeas.map((idea) => (
              <li key={idea}>{idea}</li>
            ))}
          </ul>
          <Link className="secondary-button link-button" to="/">
            Make Another Build
          </Link>
        </section>
      </main>
    </div>
  );
}

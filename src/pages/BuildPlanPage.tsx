import { Link, useParams } from "react-router-dom";
import { MaterialBlockIcon } from "../components/MaterialBlockIcon";
import { findPlanById } from "../utils/plans";

export function BuildPlanPage() {
  const { planId = "" } = useParams();
  const plan = findPlanById(planId);

  if (!plan) {
    return (
      <div className="app-shell">
        <section className="panel empty-state">
          <p className="eyebrow">Guide Missing</p>
          <h2>That build guide is not in local storage anymore.</h2>
          <p>Generate a fresh build from the home page and we will create a new guide for it.</p>
          <Link className="secondary-button link-button" to="/">
            Back Home
          </Link>
        </section>
      </div>
    );
  }

  return (
    <div className="app-shell app-shell-guide">
      <header className="guide-header panel">
        <div>
          <p className="eyebrow">Detailed Guide</p>
          <h1>{plan.buildIdea}</h1>
          <p className="hero-text">{plan.buildSummary}</p>
        </div>
        <div className="pill-row">
          <span className={`pill pill-theme pill-${plan.theme}`}>{plan.themeLabel}</span>
          <span className="pill">{plan.biomeLabel}</span>
          <span className="pill">{plan.purposeLabel}</span>
          <span className="pill">{plan.size}</span>
        </div>
      </header>

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
              <MaterialBlockIcon material={plan.materials.floor} />
              <p>Floor</p>
            </div>
            <div>
              <MaterialBlockIcon material={plan.materials.roof} />
              <p>Roof</p>
            </div>
          </div>
          <dl className="favorite-meta">
            <div>
              <dt>Walls</dt>
              <dd>{plan.materials.walls}</dd>
            </div>
            <div>
              <dt>Floor</dt>
              <dd>{plan.materials.floor}</dd>
            </div>
            <div>
              <dt>Roof</dt>
              <dd>{plan.materials.roof}</dd>
            </div>
            <div>
              <dt>Pet</dt>
              <dd>{plan.pet.label}</dd>
            </div>
          </dl>
        </section>

        <section className="panel guide-column">
          <p className="eyebrow">Layout</p>
          <h2>How to block it out</h2>
          <ul className="guide-list">
            {plan.layoutPlan.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ul>
        </section>

        <section className="panel guide-column">
          <p className="eyebrow">Visual Mockup</p>
          <h2>How it should feel</h2>
          <ul className="guide-list">
            {plan.visualMockup.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </section>

        <section className="panel guide-column span-two">
          <p className="eyebrow">Build Steps</p>
          <h2>Suggested order</h2>
          <ol className="guide-list guide-list-numbered">
            {plan.buildSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <h3>Interior ideas</h3>
          <ul className="tag-list">
            {plan.interiorIdeas.map((idea) => (
              <li key={idea}>{idea}</li>
            ))}
          </ul>
          <h3>Pet name ideas</h3>
          <ul className="tag-list">
            {plan.pet.nameSuggestions.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
          <Link className="secondary-button link-button" to="/">
            Generate Another Build
          </Link>
        </section>
      </main>
    </div>
  );
}

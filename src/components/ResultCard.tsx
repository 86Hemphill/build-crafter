import { Link } from "react-router-dom";
import { MaterialBlockIcon } from "./MaterialBlockIcon";
import type { GeneratedBuild } from "../types/build";

interface ResultCardProps {
  build: GeneratedBuild;
}

export function ResultCard({ build }: ResultCardProps) {
  return (
    <section className="panel result-card" aria-live="polite">
      <div className="result-header">
        <div>
          <p className="eyebrow">Fresh Blueprint</p>
          <h2>{build.buildIdea}</h2>
        </div>
        <div className="pill-row">
          <span className={`pill pill-theme pill-${build.theme}`}>{build.themeLabel}</span>
          <span className="pill">{build.biomeLabel}</span>
          <span className="pill">{build.size}</span>
        </div>
      </div>
      <p className="result-summary">{build.buildSummary}</p>
      <div className="result-grid">
        <article>
          <h3>Walls</h3>
          <MaterialBlockIcon material={build.materials.walls} />
          <p>{build.materials.walls}</p>
        </article>
        <article>
          <h3>Roof</h3>
          <MaterialBlockIcon material={build.materials.roof} />
          <p>{build.materials.roof}</p>
        </article>
        <article>
          <h3>Goal</h3>
          <p>{build.purposeLabel}</p>
        </article>
        <article className="span-two">
          <h3>Guide Preview</h3>
          <ul className="tag-list">
            {build.layoutPlan.slice(0, 2).map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ul>
        </article>
      </div>
      <Link className="secondary-button link-button" to={`/plans/${build.id}`}>
        Open Detailed Build Guide
      </Link>
    </section>
  );
}

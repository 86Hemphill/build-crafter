import type { GeneratedBuild } from "../types/build";

interface ResultCardProps {
  build: GeneratedBuild;
  isSaved: boolean;
  onSave: () => void;
}

export function ResultCard({ build, isSaved, onSave }: ResultCardProps) {
  return (
    <section className="panel result-card" aria-live="polite">
      <div className="result-header">
        <div>
          <p className="eyebrow">Fresh Blueprint</p>
          <h2>{build.buildIdea}</h2>
        </div>
        <div className="pill-row">
          <span className={`pill pill-theme pill-${build.theme}`}>{build.themeLabel}</span>
          <span className="pill">{build.size}</span>
        </div>
      </div>
      <p className="result-summary">{build.buildSummary}</p>
      <div className="result-grid">
        <article>
          <h3>Walls</h3>
          <p>{build.materials.walls}</p>
        </article>
        <article>
          <h3>Floor</h3>
          <p>{build.materials.floor}</p>
        </article>
        <article>
          <h3>Roof</h3>
          <p>{build.materials.roof}</p>
        </article>
        <article className="span-two">
          <h3>Interior Ideas</h3>
          <ul className="tag-list">
            {build.interiorIdeas.map((idea) => (
              <li key={idea}>{idea}</li>
            ))}
          </ul>
        </article>
        <article>
          <h3>Pet</h3>
          <p>{build.pet.label}</p>
        </article>
        <article>
          <h3>Pet Names</h3>
          <ul className="tag-list">
            {build.pet.nameSuggestions.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </article>
      </div>
      <button
        className="secondary-button"
        disabled={isSaved}
        onClick={onSave}
        type="button"
      >
        {isSaved ? "Saved to Favorites" : "Save to Favorites"}
      </button>
    </section>
  );
}

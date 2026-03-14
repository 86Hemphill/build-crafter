import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div className="app-shell">
      <section className="panel empty-state">
        <p className="eyebrow">Not Found</p>
        <h2>This page wandered off the build grid.</h2>
        <p>Head back to the generator and spin up a new guide.</p>
        <Link className="secondary-button link-button" to="/">
          Back Home
        </Link>
      </section>
    </div>
  );
}

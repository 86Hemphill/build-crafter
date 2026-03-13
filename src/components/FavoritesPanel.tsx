import type { FavoriteBuild } from "../types/build";

interface FavoritesPanelProps {
  favorites: FavoriteBuild[];
  onRemove: (id: string) => void;
}

export function FavoritesPanel({ favorites, onRemove }: FavoritesPanelProps) {
  return (
    <section className="panel favorites-panel">
      <div className="section-heading">
        <p className="eyebrow">Saved Picks</p>
        <h2>Favorite build plans stay right on this device.</h2>
      </div>
      {favorites.length === 0 ? (
        <p className="empty-copy">
          Save a build you love and it will show up here for quick inspiration later.
        </p>
      ) : (
        <div className="favorites-grid">
          {favorites.map((favorite) => (
            <article className="favorite-card" key={favorite.id}>
              <div className="favorite-card-header">
                <div>
                  <p className="favorite-theme">{favorite.themeLabel}</p>
                  <h3>{favorite.buildIdea}</h3>
                </div>
                <span className="pill">{favorite.size}</span>
              </div>
              <p>{favorite.buildSummary}</p>
              <dl className="favorite-meta">
                <div>
                  <dt>Walls</dt>
                  <dd>{favorite.materials.walls}</dd>
                </div>
                <div>
                  <dt>Roof</dt>
                  <dd>{favorite.materials.roof}</dd>
                </div>
                <div>
                  <dt>Pet</dt>
                  <dd>{favorite.pet.label}</dd>
                </div>
              </dl>
              <button
                className="ghost-button"
                onClick={() => onRemove(favorite.id)}
                type="button"
              >
                Remove Favorite
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

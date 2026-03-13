import { useEffect, useMemo, useState } from "react";
import { FavoritesPanel } from "./components/FavoritesPanel";
import { FilterPanel } from "./components/FilterPanel";
import { ResultCard } from "./components/ResultCard";
import { themes } from "./data/themes";
import type { BuildSize, FavoriteBuild, GeneratedBuild, ThemeId } from "./types/build";
import { readFavorites, removeFavorite, saveFavorite } from "./utils/favorites";
import { createGeneratedBuild } from "./utils/generator";

export default function App() {
  const [selectedTheme, setSelectedTheme] = useState<ThemeId | undefined>(undefined);
  const [selectedSize, setSelectedSize] = useState<BuildSize | undefined>(undefined);
  const [currentBuild, setCurrentBuild] = useState<GeneratedBuild | undefined>(undefined);
  const [favorites, setFavorites] = useState<FavoriteBuild[]>([]);

  useEffect(() => {
    setFavorites(readFavorites());
  }, []);

  const themeDescription = useMemo(() => {
    if (!selectedTheme) {
      return "Choose any theme for a wider mix of polished Minecraft-inspired ideas.";
    }

    return themes.find((theme) => theme.id === selectedTheme)?.description ?? "";
  }, [selectedTheme]);

  const currentThemeLabel = selectedTheme
    ? themes.find((theme) => theme.id === selectedTheme)?.label
    : "Any theme";

  const isCurrentBuildSaved = currentBuild
    ? favorites.some((favorite) => favorite.id === currentBuild.id)
    : false;

  function handleGenerate() {
    setCurrentBuild(
      createGeneratedBuild({
        theme: selectedTheme,
        size: selectedSize
      })
    );
  }

  function handleSave() {
    if (!currentBuild) {
      return;
    }

    setFavorites(saveFavorite(currentBuild));
  }

  function handleRemoveFavorite(id: string) {
    setFavorites(removeFavorite(id));
  }

  return (
    <div className="app-shell">
      <header className="hero">
        <div className="hero-copy">
          <p className="eyebrow">BuildCrafter</p>
          <h1>Generate a full Minecraft-style build plan in one click.</h1>
          <p className="hero-text">
            Explore curated themes, materials, interiors, and tamable pet pairings for
            polished build inspiration that stays fast, safe, and fully offline.
          </p>
        </div>
        <div className="hero-callout panel">
          <p className="callout-label">Current filter mood</p>
          <h2>{currentThemeLabel}</h2>
          <p>{themeDescription}</p>
        </div>
      </header>

      <main className="main-layout">
        <FilterPanel
          selectedTheme={selectedTheme}
          selectedSize={selectedSize}
          onThemeChange={setSelectedTheme}
          onSizeChange={setSelectedSize}
          onGenerate={handleGenerate}
        />

        {currentBuild ? (
          <ResultCard build={currentBuild} isSaved={isCurrentBuildSaved} onSave={handleSave} />
        ) : (
          <section className="panel empty-state">
            <p className="eyebrow">Ready When You Are</p>
            <h2>Your next build plan will appear here.</h2>
            <p>
              Pick filters if you want a specific vibe, or leave them open and generate a
              surprise blueprint.
            </p>
          </section>
        )}

        <FavoritesPanel favorites={favorites} onRemove={handleRemoveFavorite} />
      </main>
    </div>
  );
}

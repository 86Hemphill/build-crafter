import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { biomes } from "../data/biomes";
import { purposes } from "../data/purposes";
import { themes } from "../data/themes";
import { FilterPanel } from "../components/FilterPanel";
import { ResultCard } from "../components/ResultCard";
import type { BiomeId, BuildSize, GeneratedBuild, PurposeId, ThemeId } from "../types/build";
import { createGeneratedBuild } from "../utils/generator";
import { savePlan } from "../utils/plans";

export function HomePage() {
  const navigate = useNavigate();
  const [selectedTheme, setSelectedTheme] = useState<ThemeId | undefined>(undefined);
  const [selectedSize, setSelectedSize] = useState<BuildSize | undefined>(undefined);
  const [selectedBiome, setSelectedBiome] = useState<BiomeId | undefined>(undefined);
  const [selectedPurpose, setSelectedPurpose] = useState<PurposeId | undefined>(undefined);
  const [currentBuild, setCurrentBuild] = useState<GeneratedBuild | undefined>(undefined);

  const guideCopy = useMemo(() => {
    const vibe = selectedTheme
      ? (themes.find((theme) => theme.id === selectedTheme)?.label ?? "Any vibe")
      : "Any vibe";
    const biome = selectedBiome
      ? (biomes.find((entry) => entry.id === selectedBiome)?.label ?? "Any biome")
      : "Any biome";
    const purpose = selectedPurpose
      ? (purposes.find((entry) => entry.id === selectedPurpose)?.label ?? "Any goal")
      : "Any goal";

    return { vibe, biome, purpose };
  }, [selectedBiome, selectedPurpose, selectedTheme]);

  function handleGenerate() {
    const build = createGeneratedBuild({
      theme: selectedTheme,
      size: selectedSize,
      biome: selectedBiome,
      purpose: selectedPurpose
    });

    savePlan(build);
    setCurrentBuild(build);
  }

  function handleOpenLatestGuide() {
    if (!currentBuild) {
      return;
    }

    navigate(`/plans/${currentBuild.id}`);
  }

  return (
    <div className="app-shell">
      <header className="hero hero-home">
        <div className="hero-copy">
          <p className="eyebrow">BuildCrafter</p>
          <h1>Make a cool build idea, then open a guide to help build it.</h1>
          <p className="hero-text">
            Start with a quick idea here, then jump into a full guide with layout tips,
            look-and-feel notes, and build steps.
          </p>
        </div>
        <div className="hero-callout panel">
          <p className="callout-label">Current Mix</p>
          <h2>{guideCopy.vibe}</h2>
          <p>{guideCopy.biome} biome with a {guideCopy.purpose.toLowerCase()} focus.</p>
          {currentBuild ? (
            <button className="secondary-button" onClick={handleOpenLatestGuide} type="button">
              Open Latest Guide
            </button>
          ) : null}
        </div>
      </header>

      <main className="main-layout">
        <FilterPanel
          selectedTheme={selectedTheme}
          selectedSize={selectedSize}
          selectedBiome={selectedBiome}
          selectedPurpose={selectedPurpose}
          onThemeChange={setSelectedTheme}
          onSizeChange={setSelectedSize}
          onBiomeChange={setSelectedBiome}
          onPurposeChange={setSelectedPurpose}
          onGenerate={handleGenerate}
        />

        {currentBuild ? (
          <ResultCard key={currentBuild.id} build={currentBuild} />
        ) : (
          <section className="panel empty-state">
            <p className="eyebrow">Try These Filters</p>
            <h2>Mix filters together to get cooler results.</h2>
            <div className="idea-grid">
              <article>
                <h3>Biome</h3>
                <p>The same vibe feels really different on a coast, in a jungle, or on a mountain.</p>
              </article>
              <article>
                <h3>Build Type</h3>
                <p>This helps the guide match what the build should do, not just how it looks.</p>
              </article>
              <article>
                <h3>Vibe</h3>
                <p>Pick from cozy, whimsical, industrial, and more to change the whole feel.</p>
              </article>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

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
          <h1>Generate a build idea, then open a real guide page for the layout.</h1>
          <p className="hero-text">
            The home page stays light and playful. Each generated plan gets a dedicated
            guide with layout notes, visual direction, and build steps you can actually follow.
          </p>
        </div>
        <div className="hero-callout panel">
          <p className="callout-label">Current direction</p>
          <h2>{guideCopy.vibe}</h2>
          <p>
            {guideCopy.biome} biome, aimed at a {guideCopy.purpose.toLowerCase()} build.
          </p>
          {currentBuild ? (
            <button className="secondary-button" onClick={handleOpenLatestGuide} type="button">
              Jump to Latest Guide
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
          <ResultCard build={currentBuild} />
        ) : (
          <section className="panel empty-state">
            <p className="eyebrow">New Filter Ideas</p>
            <h2>Try stacking filters for more interesting results.</h2>
            <div className="idea-grid">
              <article>
                <h3>Biome</h3>
                <p>Useful because the same vibe feels very different on a coast, in a jungle, or on a mountain.</p>
              </article>
              <article>
                <h3>Build Goal</h3>
                <p>Helps the generator choose layouts that actually match how the build should be used.</p>
              </article>
              <article>
                <h3>Vibe</h3>
                <p>Now broader, with whimsical and industrial options for more visual personality.</p>
              </article>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

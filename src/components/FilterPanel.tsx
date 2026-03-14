import { biomes } from "../data/biomes";
import { purposes } from "../data/purposes";
import { themes } from "../data/themes";
import type { BiomeId, BuildSize, PurposeId, ThemeId } from "../types/build";

interface FilterPanelProps {
  selectedTheme?: ThemeId;
  selectedSize?: BuildSize;
  selectedBiome?: BiomeId;
  selectedPurpose?: PurposeId;
  onThemeChange: (theme?: ThemeId) => void;
  onSizeChange: (size?: BuildSize) => void;
  onBiomeChange: (biome?: BiomeId) => void;
  onPurposeChange: (purpose?: PurposeId) => void;
  onGenerate: () => void;
}

const sizes: Array<{ value: BuildSize; label: string }> = [
  { value: "tiny", label: "Tiny" },
  { value: "small", label: "Small" },
  { value: "medium", label: "Medium" },
  { value: "large", label: "Large" },
  { value: "epic", label: "Epic" }
];

export function FilterPanel({
  selectedTheme,
  selectedSize,
  selectedBiome,
  selectedPurpose,
  onThemeChange,
  onSizeChange,
  onBiomeChange,
  onPurposeChange,
  onGenerate
}: FilterPanelProps) {
  return (
    <section className="panel filter-panel" aria-label="Build filters">
      <div className="section-heading">
        <p className="eyebrow">Pick Your Build</p>
        <h2>Choose a vibe, a place, and what the build is for.</h2>
      </div>
      <div className="filter-grid filter-grid-wide">
        <label className="field">
          <span>Vibe</span>
          <select
            aria-label="Vibe"
            value={selectedTheme ?? ""}
            onChange={(event) =>
              onThemeChange((event.target.value || undefined) as ThemeId | undefined)
            }
          >
            <option value="">Any vibe</option>
            {themes.map((theme) => (
              <option key={theme.id} value={theme.id}>
                {theme.label}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          <span>Size</span>
          <select
            aria-label="Size"
            value={selectedSize ?? ""}
            onChange={(event) =>
              onSizeChange((event.target.value || undefined) as BuildSize | undefined)
            }
          >
            <option value="">Any size</option>
            {sizes.map((size) => (
              <option key={size.value} value={size.value}>
                {size.label}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          <span>Biome</span>
          <select
            aria-label="Biome"
            value={selectedBiome ?? ""}
            onChange={(event) =>
              onBiomeChange((event.target.value || undefined) as BiomeId | undefined)
            }
          >
            <option value="">Any biome</option>
            {biomes.map((biome) => (
              <option key={biome.id} value={biome.id}>
                {biome.label}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          <span>Build Goal</span>
          <select
            aria-label="Build Goal"
            value={selectedPurpose ?? ""}
            onChange={(event) =>
              onPurposeChange((event.target.value || undefined) as PurposeId | undefined)
            }
          >
            <option value="">Any build type</option>
            {purposes.map((purpose) => (
              <option key={purpose.id} value={purpose.id}>
                {purpose.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <button className="generate-button" onClick={onGenerate} type="button">
        Make a Build Guide
      </button>
    </section>
  );
}

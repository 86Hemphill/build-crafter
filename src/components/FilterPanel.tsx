import { themes } from "../data/themes";
import type { BuildSize, ThemeId } from "../types/build";

interface FilterPanelProps {
  selectedTheme?: ThemeId;
  selectedSize?: BuildSize;
  onThemeChange: (theme?: ThemeId) => void;
  onSizeChange: (size?: BuildSize) => void;
  onGenerate: () => void;
}

const sizes: Array<{ value: BuildSize; label: string }> = [
  { value: "small", label: "Small" },
  { value: "medium", label: "Medium" },
  { value: "big", label: "Big" }
];

export function FilterPanel({
  selectedTheme,
  selectedSize,
  onThemeChange,
  onSizeChange,
  onGenerate
}: FilterPanelProps) {
  return (
    <section className="panel filter-panel" aria-label="Build filters">
      <div className="section-heading">
        <p className="eyebrow">Quick Generate</p>
        <h2>Pick a vibe, or let BuildCrafter surprise you.</h2>
      </div>
      <div className="filter-grid">
        <label className="field">
          <span>Theme</span>
          <select
            aria-label="Theme"
            value={selectedTheme ?? ""}
            onChange={(event) =>
              onThemeChange((event.target.value || undefined) as ThemeId | undefined)
            }
          >
            <option value="">Any theme</option>
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
      </div>
      <button className="generate-button" onClick={onGenerate} type="button">
        Generate Build Plan
      </button>
    </section>
  );
}

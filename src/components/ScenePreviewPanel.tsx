import type { AiSceneResult, GeneratedBuild } from "../types/build";

interface ScenePreviewPanelProps {
  build: GeneratedBuild;
  sceneImage: AiSceneResult | null;
  sceneSource: "fresh" | "saved" | null;
  isLoading: boolean;
  error: string | null;
  onGenerate: () => void;
  onClear: () => void;
}

export function ScenePreviewPanel({
  build,
  sceneImage,
  sceneSource,
  isLoading,
  error,
  onGenerate,
  onClear
}: ScenePreviewPanelProps) {
  return (
    <section className="panel scene-preview-panel">
      <div className="scene-preview-copy">
        <p className="eyebrow">AI Scene Preview</p>
        <h2>{build.scene.title}</h2>
        <p className="hero-text">
          This is concept art for the vibe of the build, not a perfect block-by-block screenshot.
        </p>
        <div className="ai-actions">
          <button className="secondary-button" disabled={isLoading} onClick={onGenerate} type="button">
            {isLoading
              ? "Painting the scene..."
              : sceneImage
                ? "Make Another Scene"
                : "Generate Scene Art"}
          </button>
          {sceneImage ? (
            <button className="ghost-button" onClick={onClear} type="button">
              Clear Scene
            </button>
          ) : null}
        </div>
        <p className="ai-status" aria-live="polite">
          {isLoading
            ? "The AI is sketching a quick concept view."
            : sceneSource === "saved"
              ? "Showing the last scene preview from this session."
              : sceneSource === "fresh"
                ? "Fresh scene preview ready."
                : "No scene image yet. Generate one when you want concept art."}
        </p>
        {error ? <p className="ai-note">{error}</p> : null}
        <div className="scene-preview-facts">
          <div className="overview-card">
            <p className="eyebrow">Look For</p>
            <h3>Core match</h3>
            <p>{build.materials.walls}, {build.materials.roof}, and {build.pet.label} details should show up.</p>
          </div>
          <div className="overview-card">
            <p className="eyebrow">Use It For</p>
            <h3>Fast inspiration</h3>
            <p>Silhouette, mood, colors, and pet placement before you start building.</p>
          </div>
        </div>
      </div>
      <div className="scene-preview-frame">
        {sceneImage ? (
          <>
            <img
              alt={`${build.buildIdea} concept art in the ${build.biomeLabel.toLowerCase()} biome`}
              className="scene-preview-image"
              src={sceneImage.imageUrl}
            />
            {sceneImage.revisedPrompt ? (
              <details className="scene-prompt-preview">
                <summary>See the prompt the model used</summary>
                <p>{sceneImage.revisedPrompt}</p>
              </details>
            ) : null}
          </>
        ) : (
          <div className="scene-preview-empty">
            <p className="eyebrow">Concept Art</p>
            <h3>Ready when you are</h3>
            <p>
              Generate a quick image to help the build feel real before you place the first block.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

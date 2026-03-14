import type { GeneratedBuild } from "../types/build";

interface SceneDirectionPanelProps {
  build: GeneratedBuild;
}

const propLabels: Record<string, string> = {
  pine: "pine trees",
  "snow-pine": "snowy pines",
  palm: "palm trees",
  dock: "dock pieces",
  hay: "hay bales",
  arch: "sandstone arches",
  peak: "mountain peaks",
  mushroom: "mushrooms",
  flower: "flowers",
  fence: "fences",
  "vine-post": "vine posts",
  lantern: "lanterns",
  "pet-wolf": "wolf space",
  "pet-cat": "cat perch",
  "pet-horse": "horse stall",
  "pet-donkey": "donkey pack spot",
  "pet-mule": "mule cargo space",
  "pet-parrot": "parrot perch",
  "pet-llama": "llama yard"
};

export function SceneDirectionPanel({ build }: SceneDirectionPanelProps) {
  const uniqueProps = Array.from(
    new Set([...build.scene.props, build.scene.petProp].map((prop) => propLabels[prop] ?? prop))
  );

  return (
    <section className="guide-overview panel scene-direction-panel">
      <div className="overview-card">
        <p className="eyebrow">Scene Direction</p>
        <h2>{build.scene.title}</h2>
        <p>{build.scene.moodLine}</p>
      </div>
      <div className="overview-card">
        <p className="eyebrow">Best Details</p>
        <h2>What to show</h2>
        <ul className="tag-list">
          {uniqueProps.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="overview-card">
        <p className="eyebrow">AI Art Ready</p>
        <h2>Prompt-ready</h2>
        <p>
          The guide stores scene colors, props, and pet placement so the image preview
          can stay tied to the real build plan.
        </p>
      </div>
    </section>
  );
}

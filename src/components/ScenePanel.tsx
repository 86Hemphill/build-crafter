import type { GeneratedBuild } from "../types/build";

interface ScenePanelProps {
  build: GeneratedBuild;
}

function renderProp(prop: string, index: number) {
  const x = 24 + index * 42;

  switch (prop) {
    case "pet-wolf":
      return (
        <g key={`${prop}-${index}`} transform={`translate(${x} 92)`}>
          <rect x="4" y="6" width="18" height="10" fill="#aeb4ba" />
          <rect x="0" y="8" width="8" height="8" fill="#8b9197" />
          <rect x="16" y="0" width="4" height="4" fill="#7d838a" />
          <rect x="8" y="16" width="4" height="8" fill="#7d838a" />
          <rect x="18" y="16" width="4" height="8" fill="#7d838a" />
        </g>
      );
    case "pet-cat":
      return (
        <g key={`${prop}-${index}`} transform={`translate(${x} 92)`}>
          <rect x="6" y="6" width="14" height="10" fill="#b97b47" />
          <rect x="4" y="2" width="4" height="4" fill="#7a5336" />
          <rect x="18" y="2" width="4" height="4" fill="#7a5336" />
          <rect x="20" y="8" width="4" height="14" fill="#7a5336" />
        </g>
      );
    case "pet-horse":
      return (
        <g key={`${prop}-${index}`} transform={`translate(${x} 88)`}>
          <rect x="4" y="8" width="18" height="10" fill="#93633d" />
          <rect x="18" y="0" width="8" height="12" fill="#6d472b" />
          <rect x="4" y="18" width="4" height="10" fill="#6d472b" />
          <rect x="16" y="18" width="4" height="10" fill="#6d472b" />
        </g>
      );
    case "pet-donkey":
    case "pet-mule":
      return (
        <g key={`${prop}-${index}`} transform={`translate(${x} 88)`}>
          <rect x="4" y="10" width="18" height="10" fill="#88766c" />
          <rect x="18" y="2" width="8" height="12" fill="#64554f" />
          <rect x="18" y="0" width="2" height="8" fill="#3d3430" />
          <rect x="24" y="0" width="2" height="8" fill="#3d3430" />
        </g>
      );
    case "pet-parrot":
      return (
        <g key={`${prop}-${index}`} transform={`translate(${x} 90)`}>
          <rect x="10" y="4" width="10" height="14" fill="#50b95f" />
          <rect x="6" y="8" width="6" height="10" fill="#2d6ab3" />
          <rect x="16" y="2" width="4" height="4" fill="#f2cf4e" />
          <rect x="12" y="18" width="2" height="8" fill="#1f2d3a" />
          <rect x="16" y="18" width="2" height="8" fill="#1f2d3a" />
        </g>
      );
    case "pet-llama":
      return (
        <g key={`${prop}-${index}`} transform={`translate(${x} 86)`}>
          <rect x="8" y="2" width="10" height="16" fill="#eadfcf" />
          <rect x="4" y="16" width="18" height="10" fill="#eadfcf" />
          <rect x="2" y="10" width="4" height="10" fill="#d96f8b" />
          <rect x="20" y="10" width="4" height="10" fill="#d96f8b" />
        </g>
      );
    case "pine":
    case "snow-pine":
      return (
        <g key={`${prop}-${index}`} transform={`translate(${x} 64)`}>
          <rect x="10" y="20" width="6" height="16" fill="#5c3d22" />
          <rect x="2" y="10" width="22" height="12" fill={prop === "snow-pine" ? "#d7eef6" : "#3c6b38"} />
          <rect x="5" y="2" width="16" height="12" fill={prop === "snow-pine" ? "#c0e5ef" : "#4b8845"} />
        </g>
      );
    case "palm":
      return (
        <g key={`${prop}-${index}`} transform={`translate(${x} 64)`}>
          <rect x="11" y="12" width="5" height="24" fill="#7a5632" />
          <rect x="0" y="0" width="28" height="6" fill="#62a355" />
          <rect x="2" y="6" width="10" height="4" fill="#62a355" />
          <rect x="16" y="6" width="10" height="4" fill="#62a355" />
        </g>
      );
    case "dock":
      return (
        <g key={`${prop}-${index}`} transform={`translate(${x} 80)`}>
          <rect x="0" y="10" width="28" height="6" fill="#7c5737" />
          <rect x="4" y="0" width="4" height="16" fill="#5f432b" />
          <rect x="20" y="0" width="4" height="16" fill="#5f432b" />
        </g>
      );
    case "hay":
      return (
        <g key={`${prop}-${index}`} transform={`translate(${x} 82)`}>
          <rect x="4" y="4" width="22" height="14" fill="#d8bd63" />
          <rect x="4" y="10" width="22" height="2" fill="#b5943f" />
        </g>
      );
    case "arch":
      return (
        <g key={`${prop}-${index}`} transform={`translate(${x} 68)`}>
          <rect x="0" y="10" width="6" height="24" fill="#c58a52" />
          <rect x="22" y="10" width="6" height="24" fill="#c58a52" />
          <rect x="0" y="4" width="28" height="8" fill="#dba56c" />
        </g>
      );
    case "peak":
      return (
        <g key={`${prop}-${index}`} transform={`translate(${x} 58)`}>
          <polygon points="0,28 14,0 28,28" fill="#74818b" />
          <polygon points="10,10 14,0 18,10" fill="#eef5fb" />
        </g>
      );
    case "mushroom":
      return (
        <g key={`${prop}-${index}`} transform={`translate(${x} 82)`}>
          <rect x="10" y="10" width="6" height="10" fill="#efe2c1" />
          <rect x="4" y="4" width="18" height="8" fill="#cf6e5a" />
        </g>
      );
    case "flower":
      return (
        <g key={`${prop}-${index}`} transform={`translate(${x} 86)`}>
          <rect x="12" y="4" width="4" height="10" fill="#3d7f39" />
          <rect x="8" y="0" width="12" height="6" fill="#f3ba4f" />
        </g>
      );
    case "fence":
      return (
        <g key={`${prop}-${index}`} transform={`translate(${x} 84)`}>
          <rect x="2" y="0" width="4" height="14" fill="#835c38" />
          <rect x="22" y="0" width="4" height="14" fill="#835c38" />
          <rect x="0" y="4" width="28" height="4" fill="#9b7248" />
        </g>
      );
    case "vine-post":
      return (
        <g key={`${prop}-${index}`} transform={`translate(${x} 70)`}>
          <rect x="12" y="0" width="4" height="30" fill="#6d4e31" />
          <rect x="8" y="8" width="12" height="4" fill="#5fa04f" />
          <rect x="10" y="16" width="10" height="4" fill="#4f8b43" />
        </g>
      );
    case "lantern":
    default:
      return (
        <g key={`${prop}-${index}`} transform={`translate(${x} 78)`}>
          <rect x="12" y="0" width="4" height="10" fill="#5c4a2d" />
          <rect x="8" y="10" width="12" height="12" fill="#ffc969" />
        </g>
      );
  }
}

export function ScenePanel({ build }: ScenePanelProps) {
  return (
    <section className="panel scene-panel">
      <div className="scene-copy">
        <p className="eyebrow">Scene View</p>
        <h2>{build.scene.title}</h2>
        <p>{build.scene.moodLine}</p>
      </div>
      <div className="scene-canvas" aria-hidden="true">
        <svg viewBox="0 0 260 170" className="scene-svg">
          <defs>
            <linearGradient id={`sky-${build.id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={build.scene.skyTop} />
              <stop offset="100%" stopColor={build.scene.skyBottom} />
            </linearGradient>
          </defs>
          <rect width="260" height="170" fill={`url(#sky-${build.id})`} />
          <rect y="106" width="260" height="64" fill={build.scene.ground} />
          <rect y="100" width="260" height="8" fill={build.scene.groundEdge} />

          <g transform="translate(84 48)">
            <rect x="18" y="44" width="60" height="42" fill={build.scene.structure.walls} />
            <rect x="34" y="58" width="12" height="28" fill={build.scene.structure.door} />
            <rect x="54" y="58" width="14" height="12" fill={build.scene.structure.window} />
            <polygon points="10,44 48,18 88,44" fill={build.scene.structure.roof} />
            <rect x="22" y="30" width="6" height="14" fill={build.scene.structure.trim} />
            <rect x="14" y="44" width="4" height="42" fill={build.scene.structure.trim} />
            <rect x="78" y="44" width="4" height="42" fill={build.scene.structure.trim} />
          </g>

          {build.scene.props.map((prop, index) => renderProp(prop, index))}
          {renderProp(build.scene.petProp, 2)}
        </svg>
      </div>
    </section>
  );
}

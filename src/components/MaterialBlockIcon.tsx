interface MaterialBlockIconProps {
  material: string;
  size?: number;
}

interface BlockPalette {
  top: string;
  left: string;
  right: string;
  highlight: string;
  shadow: string;
}

function resolvePalette(material: string): BlockPalette {
  const normalized = material.toLowerCase();

  if (normalized.includes("red sandstone")) {
    return {
      top: "#cb7d4a",
      left: "#9e5933",
      right: "#7f4425",
      highlight: "#eba16c",
      shadow: "#5d2f18"
    };
  }

  if (normalized.includes("sandstone") || normalized.includes("terracotta")) {
    return {
      top: "#d4b276",
      left: "#b48954",
      right: "#976d3f",
      highlight: "#efd4a2",
      shadow: "#6e4d2e"
    };
  }

  if (normalized.includes("weathered copper") || normalized.includes("copper")) {
    return {
      top: "#6fb09e",
      left: "#42766e",
      right: "#2f5652",
      highlight: "#a6d2c6",
      shadow: "#21413d"
    };
  }

  if (normalized.includes("quartz") || normalized.includes("calcite")) {
    return {
      top: "#f0ede4",
      left: "#cbc6bb",
      right: "#aba396",
      highlight: "#ffffff",
      shadow: "#8b8477"
    };
  }

  if (normalized.includes("deepslate") || normalized.includes("stone") || normalized.includes("andesite")) {
    return {
      top: "#8b8f95",
      left: "#63676d",
      right: "#4f5358",
      highlight: "#c4c8cf",
      shadow: "#2f3338"
    };
  }

  if (normalized.includes("moss") || normalized.includes("leaf")) {
    return {
      top: "#7baa55",
      left: "#57793f",
      right: "#415d2f",
      highlight: "#aacd78",
      shadow: "#2f4522"
    };
  }

  if (
    normalized.includes("spruce") ||
    normalized.includes("oak") ||
    normalized.includes("birch") ||
    normalized.includes("jungle") ||
    normalized.includes("mangrove") ||
    normalized.includes("cherry")
  ) {
    return {
      top: "#a97b4f",
      left: "#7c5737",
      right: "#5f432b",
      highlight: "#d3a16e",
      shadow: "#412c1c"
    };
  }

  return {
    top: "#94a2af",
    left: "#697782",
    right: "#4f5b64",
    highlight: "#d2dae1",
    shadow: "#364047"
  };
}

export function MaterialBlockIcon({ material, size = 92 }: MaterialBlockIconProps) {
  const palette = resolvePalette(material);
  const safeId = material.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  return (
    <svg
      aria-hidden="true"
      className="material-block"
      viewBox="0 0 96 96"
      width={size}
      height={size}
    >
      <defs>
        <clipPath id={`top-${safeId}`}>
          <polygon points="48,8 80,24 48,40 16,24" />
        </clipPath>
        <clipPath id={`left-${safeId}`}>
          <polygon points="16,24 48,40 48,76 16,60" />
        </clipPath>
        <clipPath id={`right-${safeId}`}>
          <polygon points="80,24 48,40 48,76 80,60" />
        </clipPath>
      </defs>

      <polygon points="48,8 80,24 48,40 16,24" fill={palette.top} />
      <polygon points="16,24 48,40 48,76 16,60" fill={palette.left} />
      <polygon points="80,24 48,40 48,76 80,60" fill={palette.right} />

      <g clipPath={`url(#top-${safeId})`} opacity="0.9">
        <rect x="28" y="12" width="8" height="8" fill={palette.highlight} />
        <rect x="44" y="16" width="6" height="6" fill={palette.shadow} />
        <rect x="58" y="20" width="10" height="8" fill={palette.highlight} />
      </g>
      <g clipPath={`url(#left-${safeId})`} opacity="0.7">
        <rect x="20" y="32" width="8" height="10" fill={palette.highlight} />
        <rect x="30" y="46" width="8" height="10" fill={palette.shadow} />
        <rect x="22" y="56" width="10" height="8" fill={palette.shadow} />
      </g>
      <g clipPath={`url(#right-${safeId})`} opacity="0.75">
        <rect x="58" y="34" width="10" height="10" fill={palette.highlight} />
        <rect x="66" y="48" width="8" height="8" fill={palette.shadow} />
        <rect x="56" y="58" width="8" height="10" fill={palette.shadow} />
      </g>

      <polyline points="48,8 80,24 48,40 16,24 48,8" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
      <polyline points="16,24 48,40 48,76" fill="none" stroke="rgba(0,0,0,0.32)" strokeWidth="2" />
      <polyline points="80,24 48,40 48,76" fill="none" stroke="rgba(0,0,0,0.42)" strokeWidth="2" />
    </svg>
  );
}

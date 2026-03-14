interface MaterialBlockIconProps {
  material: string;
  size?: number;
}

type MaterialFamily =
  | "copper"
  | "quartz"
  | "stone"
  | "stone-brick"
  | "sandstone"
  | "terracotta"
  | "moss"
  | "glass"
  | "wood-plank"
  | "wood-log"
  | "mud"
  | "dirt";

interface BlockPalette {
  top: string;
  left: string;
  right: string;
  highlight: string;
  shadow: string;
  detail: string;
  family: MaterialFamily;
}

function resolvePalette(material: string): BlockPalette {
  const normalized = material.toLowerCase();

  if (normalized.includes("weathered copper")) {
    return {
      family: "copper",
      top: "#6fb09e",
      left: "#42766e",
      right: "#2f5652",
      highlight: "#a6d2c6",
      shadow: "#21413d",
      detail: "#d68755"
    };
  }

  if (normalized.includes("copper")) {
    return {
      family: "copper",
      top: "#c77b4c",
      left: "#9c5e39",
      right: "#7a472c",
      highlight: "#e1a06f",
      shadow: "#562f1c",
      detail: "#8bc1b1"
    };
  }

  if (normalized.includes("red sandstone")) {
    return {
      family: "sandstone",
      top: "#cb7d4a",
      left: "#9e5933",
      right: "#7f4425",
      highlight: "#eba16c",
      shadow: "#5d2f18",
      detail: "#f7c79f"
    };
  }

  if (normalized.includes("sandstone")) {
    return {
      family: "sandstone",
      top: "#d4b276",
      left: "#b48954",
      right: "#976d3f",
      highlight: "#efd4a2",
      shadow: "#6e4d2e",
      detail: "#f8e7bf"
    };
  }

  if (normalized.includes("terracotta")) {
    return {
      family: "terracotta",
      top: normalized.includes("green")
        ? "#5d8c61"
        : normalized.includes("cyan")
          ? "#66b9c0"
          : normalized.includes("white")
            ? "#ddd8cb"
            : normalized.includes("orange")
              ? "#cf8443"
              : normalized.includes("brown")
                ? "#8e5c3b"
                : "#b57956",
      left: normalized.includes("green")
        ? "#446447"
        : normalized.includes("cyan")
          ? "#4a8c93"
          : normalized.includes("white")
            ? "#bbb4a7"
            : normalized.includes("orange")
              ? "#a1612f"
              : normalized.includes("brown")
                ? "#6d442a"
                : "#8f5b3d",
      right: normalized.includes("green")
        ? "#335036"
        : normalized.includes("cyan")
          ? "#36696f"
          : normalized.includes("white")
            ? "#9a9182"
            : normalized.includes("orange")
              ? "#7c451d"
              : normalized.includes("brown")
                ? "#52311d"
                : "#71462f",
      highlight: "#f1d9bf",
      shadow: "#4d301e",
      detail: "#e7bc95"
    };
  }

  if (normalized.includes("quartz") || normalized.includes("calcite") || normalized.includes("diorite")) {
    return {
      family: "quartz",
      top: "#f0ede4",
      left: "#cbc6bb",
      right: "#aba396",
      highlight: "#ffffff",
      shadow: "#8b8477",
      detail: "#ddd7cb"
    };
  }

  if (normalized.includes("glass")) {
    return {
      family: "glass",
      top: "#c4dfe4",
      left: "#86afb7",
      right: "#628a94",
      highlight: "#ecf9fb",
      shadow: "#42636d",
      detail: "#f8ffff"
    };
  }

  if (normalized.includes("moss") || normalized.includes("leaf")) {
    return {
      family: "moss",
      top: "#7baa55",
      left: "#57793f",
      right: "#415d2f",
      highlight: "#aacd78",
      shadow: "#2f4522",
      detail: "#d3e8a8"
    };
  }

  if (normalized.includes("mud")) {
    return {
      family: "mud",
      top: "#8c6c54",
      left: "#6f533f",
      right: "#563f2f",
      highlight: "#b49273",
      shadow: "#3d2b20",
      detail: "#d2b08d"
    };
  }

  if (normalized.includes("rooted dirt") || normalized.includes("dirt")) {
    return {
      family: "dirt",
      top: "#8e6d45",
      left: "#694e31",
      right: "#523b25",
      highlight: "#bc9765",
      shadow: "#352518",
      detail: "#7db05b"
    };
  }

  if (
    normalized.includes("brick") ||
    normalized.includes("cobblestone") ||
    normalized.includes("packed mud")
  ) {
    return {
      family: "stone-brick",
      top: normalized.includes("deepslate")
        ? "#74787e"
        : normalized.includes("mud")
          ? "#8b7159"
          : "#90949a",
      left: normalized.includes("deepslate")
        ? "#52565b"
        : normalized.includes("mud")
          ? "#6b5543"
          : "#696d73",
      right: normalized.includes("deepslate")
        ? "#3f4247"
        : normalized.includes("mud")
          ? "#554134"
          : "#54585d",
      highlight: "#c9ccd1",
      shadow: "#2d3136",
      detail: "#b3a696"
    };
  }

  if (normalized.includes("stone") || normalized.includes("andesite") || normalized.includes("slab")) {
    return {
      family: "stone",
      top: "#8b8f95",
      left: "#63676d",
      right: "#4f5358",
      highlight: "#c4c8cf",
      shadow: "#2f3338",
      detail: "#a8adb5"
    };
  }

  if (
    normalized.includes("stripped") ||
    normalized.includes("log") ||
    normalized.includes("beam") ||
    normalized.includes("trim")
  ) {
    return {
      family: "wood-log",
      top: "#a3724a",
      left: "#7b5738",
      right: "#5e4129",
      highlight: "#d6a67c",
      shadow: "#3f2a1a",
      detail: "#e8c49d"
    };
  }

  return {
    family: "wood-plank",
    top: normalized.includes("birch")
      ? "#d6bd8f"
      : normalized.includes("cherry")
        ? "#c58d8f"
        : normalized.includes("mangrove")
          ? "#8e5e4d"
          : normalized.includes("jungle")
            ? "#b58a57"
            : "#a97b4f",
    left: normalized.includes("birch")
      ? "#b99c69"
      : normalized.includes("cherry")
        ? "#9e666b"
        : normalized.includes("mangrove")
          ? "#6d4638"
          : normalized.includes("jungle")
            ? "#8c6a42"
            : "#7c5737",
    right: normalized.includes("birch")
      ? "#9a7f51"
      : normalized.includes("cherry")
        ? "#7f4f55"
        : normalized.includes("mangrove")
          ? "#55352a"
          : normalized.includes("jungle")
            ? "#6c4f30"
            : "#5f432b",
    highlight: "#d3a16e",
    shadow: "#412c1c",
    detail: "#e7c89a"
  };
}

function renderPattern(palette: BlockPalette, safeId: string) {
  const topClip = `url(#top-${safeId})`;
  const leftClip = `url(#left-${safeId})`;
  const rightClip = `url(#right-${safeId})`;

  switch (palette.family) {
    case "copper":
      return (
        <>
          <g clipPath={topClip} opacity="0.95">
            <rect x="24" y="14" width="16" height="6" fill={palette.detail} />
            <rect x="46" y="16" width="6" height="8" fill={palette.shadow} />
            <rect x="58" y="18" width="12" height="8" fill={palette.highlight} />
            <rect x="36" y="26" width="14" height="6" fill={palette.detail} />
          </g>
          <g clipPath={leftClip} opacity="0.78">
            <rect x="22" y="34" width="6" height="28" fill={palette.highlight} />
            <rect x="32" y="42" width="6" height="22" fill={palette.shadow} />
          </g>
          <g clipPath={rightClip} opacity="0.8">
            <rect x="58" y="34" width="6" height="24" fill={palette.highlight} />
            <rect x="68" y="40" width="6" height="24" fill={palette.shadow} />
          </g>
        </>
      );
    case "quartz":
    case "glass":
      return (
        <>
          <g clipPath={topClip} opacity="0.95">
            <path d="M20 24 L50 12" stroke={palette.detail} strokeWidth="2" />
            <path d="M34 32 L64 18" stroke={palette.highlight} strokeWidth="2" />
            <path d="M46 34 L74 22" stroke={palette.detail} strokeWidth="2" />
          </g>
          <g clipPath={leftClip} opacity="0.7">
            <path d="M24 28 L24 62" stroke={palette.highlight} strokeWidth="2" />
            <path d="M34 36 L34 70" stroke={palette.detail} strokeWidth="2" />
          </g>
          <g clipPath={rightClip} opacity="0.75">
            <path d="M62 30 L62 62" stroke={palette.highlight} strokeWidth="2" />
            <path d="M70 36 L70 66" stroke={palette.detail} strokeWidth="2" />
          </g>
        </>
      );
    case "stone-brick":
      return (
        <>
          <g clipPath={topClip} opacity="0.9">
            <rect x="22" y="14" width="18" height="8" fill={palette.detail} />
            <rect x="44" y="14" width="18" height="8" fill={palette.highlight} />
            <rect x="30" y="24" width="18" height="8" fill={palette.highlight} />
            <rect x="52" y="24" width="16" height="8" fill={palette.detail} />
          </g>
          <g clipPath={leftClip} opacity="0.8">
            <rect x="20" y="34" width="14" height="10" fill={palette.highlight} />
            <rect x="32" y="46" width="14" height="10" fill={palette.detail} />
            <rect x="20" y="58" width="14" height="10" fill={palette.shadow} />
          </g>
          <g clipPath={rightClip} opacity="0.8">
            <rect x="56" y="34" width="14" height="10" fill={palette.highlight} />
            <rect x="66" y="46" width="12" height="10" fill={palette.detail} />
            <rect x="56" y="58" width="14" height="10" fill={palette.shadow} />
          </g>
        </>
      );
    case "stone":
    case "sandstone":
    case "terracotta":
    case "mud":
    case "dirt":
      return (
        <>
          <g clipPath={topClip} opacity="0.9">
            <rect x="24" y="14" width="8" height="8" fill={palette.highlight} />
            <rect x="38" y="18" width="10" height="8" fill={palette.detail} />
            <rect x="54" y="16" width="8" height="8" fill={palette.shadow} />
            <rect x="62" y="24" width="8" height="6" fill={palette.highlight} />
          </g>
          <g clipPath={leftClip} opacity="0.78">
            <rect x="22" y="36" width="8" height="8" fill={palette.highlight} />
            <rect x="32" y="48" width="10" height="10" fill={palette.detail} />
            <rect x="24" y="60" width="10" height="8" fill={palette.shadow} />
          </g>
          <g clipPath={rightClip} opacity="0.8">
            <rect x="58" y="34" width="8" height="8" fill={palette.highlight} />
            <rect x="66" y="46" width="8" height="8" fill={palette.detail} />
            <rect x="58" y="58" width="10" height="10" fill={palette.shadow} />
          </g>
        </>
      );
    case "moss":
      return (
        <>
          <g clipPath={topClip} opacity="0.95">
            <rect x="22" y="16" width="10" height="8" fill={palette.highlight} />
            <rect x="36" y="20" width="8" height="8" fill={palette.detail} />
            <rect x="50" y="14" width="12" height="8" fill={palette.highlight} />
            <rect x="62" y="22" width="8" height="8" fill={palette.shadow} />
          </g>
          <g clipPath={leftClip} opacity="0.8">
            <rect x="20" y="34" width="8" height="10" fill={palette.highlight} />
            <rect x="30" y="44" width="8" height="12" fill={palette.detail} />
            <rect x="22" y="58" width="10" height="8" fill={palette.shadow} />
          </g>
          <g clipPath={rightClip} opacity="0.8">
            <rect x="58" y="34" width="10" height="10" fill={palette.detail} />
            <rect x="68" y="48" width="8" height="8" fill={palette.highlight} />
            <rect x="58" y="58" width="8" height="10" fill={palette.shadow} />
          </g>
        </>
      );
    case "wood-log":
      return (
        <>
          <g clipPath={topClip} opacity="0.95">
            <rect x="26" y="16" width="40" height="4" fill={palette.detail} />
            <rect x="24" y="24" width="42" height="4" fill={palette.highlight} />
            <rect x="34" y="12" width="10" height="18" fill="none" stroke={palette.shadow} strokeWidth="2" />
          </g>
          <g clipPath={leftClip} opacity="0.78">
            <rect x="22" y="34" width="6" height="28" fill={palette.highlight} />
            <rect x="32" y="34" width="6" height="30" fill={palette.detail} />
          </g>
          <g clipPath={rightClip} opacity="0.8">
            <rect x="58" y="34" width="6" height="28" fill={palette.highlight} />
            <rect x="68" y="34" width="6" height="30" fill={palette.detail} />
          </g>
        </>
      );
    case "wood-plank":
    default:
      return (
        <>
          <g clipPath={topClip} opacity="0.95">
            <rect x="22" y="16" width="48" height="4" fill={palette.detail} />
            <rect x="26" y="24" width="42" height="4" fill={palette.highlight} />
            <rect x="34" y="12" width="4" height="18" fill={palette.shadow} />
            <rect x="52" y="12" width="4" height="18" fill={palette.shadow} />
          </g>
          <g clipPath={leftClip} opacity="0.78">
            <rect x="22" y="34" width="22" height="4" fill={palette.highlight} />
            <rect x="22" y="46" width="22" height="4" fill={palette.detail} />
            <rect x="22" y="58" width="22" height="4" fill={palette.shadow} />
          </g>
          <g clipPath={rightClip} opacity="0.8">
            <rect x="54" y="34" width="22" height="4" fill={palette.highlight} />
            <rect x="54" y="46" width="22" height="4" fill={palette.detail} />
            <rect x="54" y="58" width="22" height="4" fill={palette.shadow} />
          </g>
        </>
      );
  }
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
      {renderPattern(palette, safeId)}

      <polyline
        points="48,8 80,24 48,40 16,24 48,8"
        fill="none"
        stroke="rgba(255,255,255,0.3)"
        strokeWidth="2"
      />
      <polyline
        points="16,24 48,40 48,76"
        fill="none"
        stroke="rgba(0,0,0,0.32)"
        strokeWidth="2"
      />
      <polyline
        points="80,24 48,40 48,76"
        fill="none"
        stroke="rgba(0,0,0,0.42)"
        strokeWidth="2"
      />
    </svg>
  );
}

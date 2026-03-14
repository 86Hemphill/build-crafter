import type { PetType } from "../types/build";

interface PetIconProps {
  pet: PetType;
  size?: number;
}

interface PetPalette {
  primary: string;
  secondary: string;
  accent: string;
  outline: string;
}

function getPetPalette(pet: PetType): PetPalette {
  switch (pet) {
    case "wolf":
      return {
        primary: "#bfc4c9",
        secondary: "#8f959c",
        accent: "#e9d6a9",
        outline: "#40464d"
      };
    case "cat":
      return {
        primary: "#c88b55",
        secondary: "#7a5336",
        accent: "#f6e2b6",
        outline: "#41291b"
      };
    case "horse":
      return {
        primary: "#9b6a43",
        secondary: "#6d472b",
        accent: "#e7d3a4",
        outline: "#3d2617"
      };
    case "donkey":
      return {
        primary: "#8d7b72",
        secondary: "#64554f",
        accent: "#d9d0c5",
        outline: "#3d3430"
      };
    case "mule":
      return {
        primary: "#7b654d",
        secondary: "#584836",
        accent: "#d8c39e",
        outline: "#35291e"
      };
    case "parrot":
      return {
        primary: "#50b95f",
        secondary: "#2d6ab3",
        accent: "#f2cf4e",
        outline: "#1f2d3a"
      };
    case "llama":
      return {
        primary: "#eadfcf",
        secondary: "#b89b80",
        accent: "#d96f8b",
        outline: "#5a4635"
      };
  }
}

function renderPetShape(pet: PetType, palette: PetPalette) {
  switch (pet) {
    case "wolf":
      return (
        <>
          <rect x="26" y="24" width="36" height="28" fill={palette.primary} />
          <rect x="18" y="30" width="18" height="16" fill={palette.secondary} />
          <rect x="20" y="22" width="8" height="8" fill={palette.secondary} />
          <rect x="30" y="20" width="8" height="8" fill={palette.secondary} />
          <rect x="28" y="40" width="8" height="8" fill={palette.accent} />
          <rect x="22" y="38" width="6" height="4" fill={palette.accent} />
          <rect x="56" y="28" width="8" height="4" fill={palette.outline} />
          <rect x="26" y="52" width="6" height="18" fill={palette.secondary} />
          <rect x="44" y="52" width="6" height="18" fill={palette.secondary} />
          <rect x="58" y="34" width="12" height="8" fill={palette.secondary} />
        </>
      );
    case "cat":
      return (
        <>
          <rect x="28" y="24" width="30" height="26" fill={palette.primary} />
          <rect x="24" y="18" width="8" height="10" fill={palette.secondary} />
          <rect x="54" y="18" width="8" height="10" fill={palette.secondary} />
          <rect x="24" y="32" width="12" height="12" fill={palette.primary} />
          <rect x="36" y="38" width="12" height="8" fill={palette.accent} />
          <rect x="40" y="28" width="8" height="4" fill={palette.secondary} />
          <rect x="60" y="24" width="4" height="18" fill={palette.outline} />
          <rect x="30" y="50" width="6" height="18" fill={palette.secondary} />
          <rect x="48" y="50" width="6" height="18" fill={palette.secondary} />
          <rect x="58" y="26" width="8" height="26" fill={palette.secondary} />
        </>
      );
    case "horse":
      return (
        <>
          <rect x="24" y="26" width="34" height="24" fill={palette.primary} />
          <rect x="50" y="16" width="14" height="24" fill={palette.secondary} />
          <rect x="56" y="10" width="8" height="10" fill={palette.outline} />
          <rect x="48" y="22" width="14" height="4" fill={palette.accent} />
          <rect x="14" y="18" width="8" height="10" fill={palette.outline} />
          <rect x="22" y="50" width="6" height="20" fill={palette.secondary} />
          <rect x="34" y="50" width="6" height="20" fill={palette.secondary} />
          <rect x="48" y="50" width="6" height="20" fill={palette.secondary} />
          <rect x="58" y="50" width="6" height="20" fill={palette.secondary} />
          <rect x="18" y="24" width="8" height="18" fill={palette.outline} />
        </>
      );
    case "donkey":
    case "mule":
      return (
        <>
          <rect x="24" y="28" width="34" height="22" fill={palette.primary} />
          <rect x="48" y="18" width="14" height="22" fill={palette.secondary} />
          <rect x="48" y="8" width="4" height="16" fill={palette.outline} />
          <rect x="58" y="8" width="4" height="16" fill={palette.outline} />
          <rect x="18" y="26" width="8" height="8" fill={palette.outline} />
          <rect x="24" y="50" width="6" height="20" fill={palette.secondary} />
          <rect x="36" y="50" width="6" height="20" fill={palette.secondary} />
          <rect x="50" y="50" width="6" height="20" fill={palette.secondary} />
          <rect x="60" y="50" width="6" height="20" fill={palette.secondary} />
          <rect x="18" y="30" width="8" height="10" fill={palette.accent} />
        </>
      );
    case "parrot":
      return (
        <>
          <rect x="34" y="20" width="22" height="30" fill={palette.primary} />
          <rect x="28" y="26" width="10" height="18" fill={palette.secondary} />
          <rect x="56" y="24" width="10" height="18" fill={palette.secondary} />
          <rect x="40" y="14" width="12" height="10" fill={palette.accent} />
          <rect x="48" y="26" width="8" height="6" fill={palette.accent} />
          <rect x="32" y="18" width="6" height="8" fill="#d74343" />
          <rect x="44" y="50" width="4" height="16" fill={palette.outline} />
          <rect x="50" y="50" width="4" height="16" fill={palette.outline} />
          <rect x="36" y="52" width="8" height="10" fill={palette.accent} />
        </>
      );
    case "llama":
      return (
        <>
          <rect x="30" y="18" width="18" height="26" fill={palette.primary} />
          <rect x="26" y="32" width="28" height="20" fill={palette.primary} />
          <rect x="48" y="18" width="10" height="16" fill={palette.secondary} />
          <rect x="24" y="30" width="6" height="14" fill={palette.accent} />
          <rect x="54" y="30" width="8" height="14" fill={palette.accent} />
          <rect x="32" y="52" width="6" height="18" fill={palette.secondary} />
          <rect x="46" y="52" width="6" height="18" fill={palette.secondary} />
          <rect x="24" y="24" width="6" height="10" fill={palette.accent} />
          <rect x="54" y="24" width="8" height="10" fill={palette.accent} />
        </>
      );
  }
}

export function PetIcon({ pet, size = 76 }: PetIconProps) {
  const palette = getPetPalette(pet);

  return (
    <svg
      aria-hidden="true"
      className="pet-icon"
      viewBox="0 0 96 96"
      width={size}
      height={size}
    >
      <rect x="16" y="72" width="64" height="6" fill="rgba(0,0,0,0.18)" />
      {renderPetShape(pet, palette)}
      <rect x="38" y="34" width="4" height="4" fill={palette.outline} />
      <rect x="50" y="34" width="4" height="4" fill={palette.outline} />
      <rect x="44" y="42" width="4" height="4" fill={palette.outline} />
    </svg>
  );
}

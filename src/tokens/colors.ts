const Pallette = {
  White: "#FFFFFF",
  Black: "#000000",
  Purple: "#B457DB",
  Cyan: "#64EDF7",

  WhiteMuted: "rgba(255, 255, 255, 0.6)",
  WhiteSubtle: "rgba(255, 255, 255, 0.12)",
  Surface: "rgba(255, 255, 255, 0.08)",
};

export const Colors = {
  text: {
    default: Pallette.White,
    inverse: Pallette.Black,
    muted: Pallette.WhiteMuted,
    secondary: Pallette.Cyan,
    accent: Pallette.Purple,
  },
  background: {
    default: Pallette.Black,
    secondary: Pallette.Surface,
  },
  border: {
    default: Pallette.WhiteSubtle,
  },
  icon: {
    default: Pallette.Purple,
    muted: Pallette.WhiteMuted,
  },
};

// Gradient stops built from the two bright brand colors.
export const Gradients = {
  brand: [Pallette.Purple, Pallette.Cyan] as const,
};

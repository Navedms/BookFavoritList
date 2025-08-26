export interface Colors {
  [key: string]: string;
}

export const lightColors: Colors = {
  opacity: "rgba(255, 255, 255, 0)",
  black: "#000",
  opacityBlack: "rgba(0, 0, 0, 0.5)",
  white: "#fff",
  background: "#fff",
  opacityWhite: "rgba(255, 255, 255, 0.8)",
  primary: "#000099",
  secondary: "#6666ff",
  dark: "#5a5a5a",
  darkMedium: "#a6a6a6",
  medium: "#d9d9d9",
  light: "#f2f2f2",
  delete: "#ff3333",
  lightDelete: "#FF7D7D",
  sun: "#fff12e",
  disabled: "#F2DEDE",
};

export const darkColors: Colors = {
  opacity: "rgba(0, 0, 0, 0)",
  black: "#fff",
  opacityBlack: "rgba(255, 255, 255, 0.5)",
  white: "#000",
  background: "#2A2A2CFF",
  opacityWhite: "rgba(0, 0, 0, 0.8)",
  primary: "#4F8EF7",
  secondary: "#222244",
  dark: "#e0e0e0",
  darkMedium: "#cac7c7",
  medium: "#7c7b7b",
  light: "#4c4b4b",
  delete: "#ff3333",
  lightDelete: "#FF7D7D",
  sun: "#fff12e",
  disabled: "#333",
};

export default lightColors;

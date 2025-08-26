import { useSelector } from "react-redux";
import { lightColors, darkColors } from "@config/colors";

export default function useColors() {
  const mode = useSelector((state: any) => state.theme.mode || "light");
  return mode === "dark" ? darkColors : lightColors;
}

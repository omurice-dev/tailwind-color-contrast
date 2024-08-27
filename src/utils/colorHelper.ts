import colors from "tailwindcss/colors";
import { ColorKey, twColorClass, ColorShades } from "../types/colorTypes";

export const generateColorList = () => {
  // https://stackoverflow.com/questions/58387089/how-to-easily-get-non-getter-properties-from-an-object
  return Object.entries(Object.getOwnPropertyDescriptors(colors))
    .filter(
      ([, desc]) =>
        //eslint-disable-next-line no-prototype-builtins
        desc.hasOwnProperty("value") && typeof desc.value === "object",
    )
    .map(([key]) => key as ColorKey);
};

export const generateShadeList = (twColor: ColorKey) => {
  const colorShades = colors[twColor];
  return colorShades ? Object.keys(colorShades) : [];
};

export const getColorHex = (twClass: twColorClass) => {
  const { color, shade } = twClass;
  if (color === "white") return "#FFFFFF";
  if (color === "black") return "#000000";

  return (colors[color] as ColorShades)[shade];
};

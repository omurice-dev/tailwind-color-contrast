import colors from "tailwindcss/colors"

export type ColorKey = keyof typeof colors
export type ColorShades = Record<string, string>
export type twColorClass = { color: ColorKey; shade: string }

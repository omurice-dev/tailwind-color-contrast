import colors from "tailwindcss/colors"
import clsx from "clsx"
import { generateColorList, generateShadeList } from "../utils/colorHelper"
import { twColorClass, ColorShades, ColorKey } from "../types/colorTypes"

interface ColorSelectorProps {
  isBackground: boolean
  twClass: twColorClass
  setTwClass: (twClass: twColorClass) => void
}

const ColorSelector = ({
  isBackground = true,
  twClass,
  setTwClass
}: ColorSelectorProps) => {
  const { color: selectedColor, shade: selectedShade } = twClass

  const colorList = generateColorList()
  const shadeList = generateShadeList(colorList[0])

  const prefersDarkMode =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches

  const handleColorChange = (newColor: ColorKey) => {
    if (newColor === "black" || newColor === "white") {
      setTwClass({ color: newColor, shade: "" })
      return
    }
    if (!selectedShade) {
      setTwClass({ color: newColor, shade: isBackground ? "100" : "600" })
    } else {
      setTwClass({ ...twClass, color: newColor })
    }
  }

  const handleShadeChange = (shade: string) => {
    setTwClass({ ...twClass, shade })
  }

  return (
    <>
      <div className="border-2 p-3 rounded-md">
        <h2 className="font-semibold dark:text-white mb-2">
          {isBackground ? "Background" : "Foreground Text"} Color
        </h2>
        <section className="">
          {/* color list */}
          <h3 className="sr-only">Tailwind Color</h3>
          <div className="flex flex-nowrap overflow-scroll md:flex-wrap">
            {colorList.map((color) => (
              <button
                key={color}
                className={clsx(
                  "p-2 m-1 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-sm"
                )}
                style={{
                  ...(isBackground
                    ? {
                        backgroundColor: colors[color]?.["100"],
                        border: `2px solid ${colors[color]?.["100"]}`,
                        ...(selectedColor === color && {
                          border: `2px solid ${colors[color]?.["700"]}`,
                          backgroundColor: colors[color]?.["700"],
                          textDecorationLine: "underline",
                          color: "white"
                        })
                      }
                    : {
                        color: colors[color]?.[prefersDarkMode ? "100" : "600"],
                        border: `2px solid ${colors[color]?.["600"]}`,
                        ...(selectedColor === color && {
                          color: colors[color]?.["600"],
                          backgroundColor: colors[color]?.["50"],
                          textDecorationLine: "underline"
                        })
                      })
                }}
                onClick={() => handleColorChange(color)}
              >
                {color}
              </button>
            ))}
          </div>
          {/* shade list */}
          <h3 className="sr-only">Tailwind Shade</h3>
          <div className="flex flex-nowrap overflow-scroll md:flex-wrap">
            {shadeList.map((shade) => (
              <div
                className={clsx("flex items-center", "ignore-dark")}
                key={shade}
              >
                <button
                  className={clsx(
                    "p-1 m-1 flex flex-col items-center",
                    !selectedShade ? "text-transparent" : "dark:text-white",
                    selectedShade === shade &&
                      "ring-2 ring-offset-2 ring-blue-500"
                  )}
                  onClick={() => handleShadeChange(shade)}
                  disabled={!selectedShade}
                >
                  <span
                    className="p-1"
                    style={
                      isBackground
                        ? {
                            backgroundColor: prefersDarkMode
                              ? (colors[selectedColor] as ColorShades)[shade]
                              : (colors[selectedColor] as ColorShades)[shade],
                            color: "transparent"
                          }
                        : {
                            color: (colors[selectedColor] as ColorShades)[shade]
                          }
                    }
                  >
                    CSS
                  </span>
                  <span>{shade}</span>
                </button>
              </div>
            ))}
          </div>
        </section>
        <button
          className={clsx(
            "p-2 m-1 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
            selectedColor === "black" && "underline"
          )}
          style={
            isBackground
              ? { backgroundColor: "black", color: "white" }
              : {
                  color: "black",
                  border: "2px solid black",
                  backgroundColor: prefersDarkMode ? "white" : ""
                }
          }
          onClick={() => handleColorChange("black")}
        >
          Black {isBackground ? "Fill" : "Text"}
        </button>
        <button
          className={clsx(
            "p-2 m-1 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
            selectedColor === "white" && "underline"
          )}
          style={
            isBackground
              ? { backgroundColor: "white", border: "2px solid black" }
              : {
                  color: "white",
                  backgroundColor: "black",
                  border: "2px solid black"
                }
          }
          onClick={() => handleColorChange("white")}
        >
          White {isBackground ? "Fill" : "Text"}
        </button>
      </div>
    </>
  )
}

export default ColorSelector

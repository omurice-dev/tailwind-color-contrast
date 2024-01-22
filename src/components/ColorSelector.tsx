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
        <section className="">
          {/* color list */}
          <div className="flex flex-nowrap overflow-scroll md:flex-wrap">
            {colorList.map((color) => (
              <button
                key={color}
                className={`p-2 m-1 font-semibold ${
                  selectedColor === color
                    ? "ring-2 ring-offset-2 ring-blue-500"
                    : ""
                }`}
                style={
                  isBackground
                    ? {
                        backgroundColor: colors[color]?.["100"],
                        border: `2px solid ${colors[color]?.["100"]}`
                      }
                    : {
                        color: colors[color]?.["600"],
                        border: `2px solid ${colors[color]?.["600"]}`
                      }
                }
                onClick={() => handleColorChange(color)}
              >
                {color}
              </button>
            ))}
          </div>
          {/* shade list */}
          <div className="flex flex-nowrap overflow-scroll md:flex-wrap">
            {shadeList.map((shade) => (
              <div className={clsx("flex items-center")}>
                <button
                  key={shade}
                  className={clsx(
                    "p-1 m-1",
                    !selectedShade && "text-transparent",
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
                            backgroundColor: (
                              colors[selectedColor] as ColorShades
                            )[shade],
                            color: "transparent"
                          }
                        : {
                            color: (colors[selectedColor] as ColorShades)[shade]
                          }
                    }
                  >
                    CSS
                  </span>
                  <p>{shade}</p>
                </button>
              </div>
            ))}
          </div>
        </section>
        <button
          className={clsx(
            "p-2 m-1 font-semibold",
            selectedColor === "black" && "ring-2 ring-offset-2 ring-blue-500"
          )}
          style={
            isBackground
              ? { backgroundColor: "black", color: "white" }
              : {
                  color: "black",
                  border: "2px solid black"
                }
          }
          onClick={() => handleColorChange("black")}
        >
          Black {isBackground ? "Fill" : "Text"}
        </button>
        <button
          className={clsx(
            "p-2 m-1 font-semibold",
            selectedColor === "white" && "ring-2 ring-offset-2 ring-blue-500"
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

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
      setTwClass({ color: newColor, shade: "500" })
    } else {
      setTwClass({ ...twClass, color: newColor })
    }
  }

  const handleShadeChange = (shade: string) => {
    setTwClass({ ...twClass, shade })
  }

  return (
    <>
      <div className={clsx("flex")}>
        <div className="flex flex-wrap">
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
                      backgroundColor: colors[color]?.["100"]
                    }
                  : {
                      color: colors[color]?.["600"],
                      borderColor: colors[color]?.["600"],
                      borderStyle: "solid",
                      borderWidth: "2px"
                    }
              }
              onClick={() => handleColorChange(color)}
            >
              {color}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap">
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
                  className={clsx("p-1")}
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
      </div>
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
    </>
  )
}

export default ColorSelector

import { useState } from "react"
import { getColorHex } from "../utils/colorHelper"
import { twColorClass } from "../types/colorTypes"
import ColorSelector from "./ColorSelector"
import ContrastPreview from "./ContrastPreview"
import ContrastResult from "./ContrastResult"

export const ColorInput = () => {
  const [bgTwClass, setBgTwClass] = useState<twColorClass>({
    color: "white",
    shade: ""
  })
  const [fgTwClass, setFgTwClass] = useState<twColorClass>({
    color: "black",
    shade: ""
  })

  const bgColorHex = getColorHex(bgTwClass)
  const fgColorHex = getColorHex(fgTwClass)

  const twClassString = `text-${fgTwClass.color}${fgTwClass.shade && "-"}${
    fgTwClass.shade
  } bg-${bgTwClass.color}${bgTwClass.shade && "-"}${bgTwClass.shade}`

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 bg-white rounded-md p-4">
        <section>
          <h2 className="font-semibold">Foreground Text Color</h2>
          <ColorSelector
            isBackground={false}
            twClass={fgTwClass}
            setTwClass={setFgTwClass}
          />
        </section>
        <section>
          <h2 className="font-semibold">Background Color</h2>
          <ColorSelector
            isBackground={true}
            twClass={bgTwClass}
            setTwClass={setBgTwClass}
          />
        </section>
        <ContrastPreview bgColorHex={bgColorHex} fgColorHex={fgColorHex} />
        <ContrastResult
          bgColorHex={bgColorHex}
          fgColorHex={fgColorHex}
          twClassString={twClassString}
        />
      </div>
    </>
  )
}

export default ColorInput

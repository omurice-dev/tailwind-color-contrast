import { useState } from "react"
import { getColorHex } from "../utils/colorHelper"
import { twColorClass } from "../types/colorTypes"
import ColorSelector from "./ColorSelector"
import ContrastPreview from "./ContrastPreview"
import ContrastResult from "./ContrastResult"

export const ColorCheck = () => {
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

  const handleColorSwap = () => {
    setBgTwClass({ color: fgTwClass.color, shade: fgTwClass.shade })
    setFgTwClass({ color: bgTwClass.color, shade: bgTwClass.shade })
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white rounded-md p-4">
        <button
          className="md:col-span-2 place-self-center bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full sm:w-auto text-center dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400"
          onClick={handleColorSwap}
        >
          Reverse Colors
        </button>
        <ColorSelector
          isBackground={false}
          twClass={fgTwClass}
          setTwClass={setFgTwClass}
        />
        <ColorSelector
          isBackground={true}
          twClass={bgTwClass}
          setTwClass={setBgTwClass}
        />
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

export default ColorCheck

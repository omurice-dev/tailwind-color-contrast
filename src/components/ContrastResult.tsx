import { hex, score } from "wcag-contrast"
import clsx from "clsx"

const ContrastResult = ({
  bgColorHex,
  fgColorHex,
  twClassString
}: {
  bgColorHex: string
  fgColorHex: string
  twClassString: string
}) => {
  const contrastRatio =
    bgColorHex && fgColorHex
      ? Math.round(hex(bgColorHex, fgColorHex) * 100) / 100
      : ""

  const contrastScore = contrastRatio ? score(contrastRatio) : null

  const checkPassFail = (score: number | string, standard: number) => {
    const passMarker = (
      <span className="bg-green-700 px-3 rounded-2xl text-white">Pass</span>
    )

    const failMarker = (
      <span className="bg-red-700 px-3 rounded-2xl text-white">Fail</span>
    )
    if (typeof score === "number") {
      return score > standard ? passMarker : failMarker
    }
    return null
  }

  return (
    <section
      className={clsx(
        "border-2 p-3 rounded-md place-self-start",
        contrastScore && contrastScore === "Fail"
          ? "border-red-500"
          : "border-green-500"
      )}
    >
      <p>{twClassString}</p>
      <h2 className="text-2xl my-2">
        Contrast: {contrastRatio}:1 {contrastScore && `(${contrastScore})`}
      </h2>
      <h3 className="font-semibold">WCAG Level AA</h3>
      <p>Large text - 3:1 {checkPassFail(contrastRatio, 3)}</p>
      <p>Normal text - 4.5:1 {checkPassFail(contrastRatio, 4.5)}</p>
      <h3 className="font-semibold">WCAG Level AAA</h3>
      <p>Large text - 4.5:1 {checkPassFail(contrastRatio, 4.5)}</p>
      <p>Normal text - 7:1 {checkPassFail(contrastRatio, 7)}</p>
    </section>
  )
}

export default ContrastResult

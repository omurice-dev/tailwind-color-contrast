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
    if (typeof score === "number") {
      const isMet = score > standard

      return (
        <span
          className={clsx(
            "px-3 rounded-2xl text-white",
            isMet ? "bg-green-700" : "bg-red-700"
          )}
        >
          {isMet ? "Pass" : "Fail"}
        </span>
      )
    }
    return null
  }

  const contrastLevel =
    contrastScore && contrastScore === "Fail"
      ? "border-red-500"
      : contrastScore === "AA Large"
      ? "border-yellow-500"
      : "border-green-500"

  return (
    <section
      className={clsx(
        "border-2 p-3 rounded-md flex flex-col items-center justify-center dark:text-white",
        contrastLevel
      )}
    >
      <p className="italic">{twClassString}</p>
      <p className="italic uppercase">
        {fgColorHex} - {bgColorHex}
      </p>
      <h2 className="text-2xl my-2">
        Contrast:{" "}
        <span className="font-semibold">
          {contrastRatio}:1 {contrastScore && `(${contrastScore})`}
        </span>
      </h2>
      <h3 className="font-semibold">WCAG Level AA</h3>
      <p>Large text - 3:1 {checkPassFail(contrastRatio, 3)}</p>
      <p>Normal text - 4.5:1 {checkPassFail(contrastRatio, 4.5)}</p>
      <h3 className="font-semibold mt-2">WCAG Level AAA</h3>
      <p>Large text - 4.5:1 {checkPassFail(contrastRatio, 4.5)}</p>
      <p>Normal text - 7:1 {checkPassFail(contrastRatio, 7)}</p>
    </section>
  )
}

export default ContrastResult

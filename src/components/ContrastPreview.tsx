const ContrastPreview = ({
  bgColorHex,
  fgColorHex
}: {
  bgColorHex: string
  fgColorHex: string
}) => {
  return (
    <>
      <section
        style={{ backgroundColor: bgColorHex, color: fgColorHex }}
        className="border-2 p-4 rounded-md transition-colors order-last md:order-none"
        aria-hidden="true"
      >
        <h2 className="text-[24px] font-bold">Preview</h2>
        <p>
          Text: <span className="uppercase">{fgColorHex}</span>
        </p>
        <p>
          Background: <span className="uppercase">{bgColorHex}</span>
        </p>
        <p className="py-2">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Delectus
          harum labore neque error in tempore ex placeat autem, atque recusandae
          commodi consectetur doloremque dolorem ullam officiis quam at, sed ea.
        </p>
        <button
          className="border-2 py-2 px-4 rounded-md mr-2"
          role="presentation"
          style={{ borderColor: fgColorHex }}
          disabled
        >
          Button
        </button>
        <button
          className="border-2 py-2 px-4 rounded-md"
          role="presentation"
          disabled
          style={{
            borderColor: fgColorHex,
            backgroundColor: fgColorHex,
            color: bgColorHex
          }}
        >
          Button
        </button>
      </section>
    </>
  )
}

export default ContrastPreview

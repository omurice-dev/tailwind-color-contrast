const ContrastPreview = ({
  bgColorHex,
  fgColorHex
}: {
  bgColorHex: string
  fgColorHex: string
}) => {
  const bgStyle = { backgroundColor: bgColorHex }
  const fgStyle = { color: fgColorHex }

  return (
    <>
      <section
        style={{ ...bgStyle, ...fgStyle }}
        className="border-2 p-3 rounded-md"
      >
        <h1 role="presentation" className="text-[24px] font-bold">
          Preview
        </h1>
        <p className="uppercase">{`${fgColorHex} ${bgColorHex}`}</p>
        <p className="py-2">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Delectus
          harum labore neque error in tempore ex placeat autem, atque recusandae
          commodi consectetur doloremque dolorem ullam officiis quam at, sed ea.
        </p>
        <button
          className="border-2 p-4 mr-2"
          role="presentation"
          style={{ borderColor: fgColorHex }}
          disabled
        >
          Button
        </button>
        <button
          className="border-2 p-4"
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

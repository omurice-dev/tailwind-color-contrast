import ColorCheck from "./components/ColorCheck"

function App() {
  return (
    <main className="mx-auto max-w-4xl px-4 md:px-1 py-4 flex flex-col items-center gap-y-2">
      <h1 className="text-3xl font-semibold">
        Tailwind Color Contrast Checker
      </h1>
      <p className="">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro natus
        repellendus officiis reiciendis magni odit amet quis aspernatur atque.
        Nisi!
      </p>
      <ColorCheck />
    </main>
  )
}

export default App

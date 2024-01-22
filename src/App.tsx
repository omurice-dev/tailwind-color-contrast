import ColorCheck from "./components/ColorCheck"
import Footer from "./components/Footer"

function App() {
  return (
    <>
      <main className="mx-auto max-w-4xl p-4 pt-10 pb-20 flex flex-col items-center gap-y-2">
        <h1 className="text-3xl font-semibold dark:text-white">
          Tailwind Color Contrast Checker
        </h1>
        <p className="p-4 dark:text-white">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro natus
          repellendus officiis reiciendis magni odit amet quis aspernatur atque.
          Nisi!
        </p>
        <ColorCheck />
      </main>
      <Footer />
    </>
  )
}

export default App

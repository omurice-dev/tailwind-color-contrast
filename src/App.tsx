import ColorCheck from "./components/ColorCheck"
import Footer from "./components/Footer"

function App() {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <main className="mx-auto max-w-5xl p-4 pt-10 pb-20 flex flex-col items-center gap-y-2">
        <h1 className="text-4xl font-semibold dark:text-white">
          Tailwind Color Contrast Checker
        </h1>
        <p className="p-4 dark:text-white">
          A tool to check Tailwind CSS color contrasts for WCAG compliance.
        </p>
        <ColorCheck />
      </main>
      <Footer />
    </div>
  )
}

export default App

import { Toaster } from "sonner"
import RouterProvider from "./routerProvider"

function App() {
  return (
    <>
      <div className="min-h-svh bg-background text-primary-foreground">
        <RouterProvider />
      </div >
      <Toaster position="top-center" closeButton richColors />
    </>
  )
}

export default App

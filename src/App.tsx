import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ToastContainer } from "./shared/components/ToastContainer"
import RegisterPage from "./pages/RegisterPage"

function App() {

  return (
    <BrowserRouter>
      <ToastContainer />

      <Routes>
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ToastContainer } from "./shared/components/ToastContainer"
import RegisterPage from "./pages/RegisterPage"
import { PublicRoute } from "./shared/components/ProtectedRoute"

function App() {

  return (
    <BrowserRouter>
      <ToastContainer />

      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

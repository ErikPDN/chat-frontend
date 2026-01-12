import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ToastContainer } from "./shared/components/ToastContainer"
import RegisterPage from "./pages/RegisterPage"
import { PublicRoute } from "./shared/components/ProtectedRoute"
import LoginPage from "./pages/LoginPage"

function App() {

  return (
    <BrowserRouter>
      <ToastContainer />

      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

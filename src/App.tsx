import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { ToastContainer } from "./shared/components/ToastContainer"
import RegisterPage from "./pages/RegisterPage"
import { ProtectedRoute, PublicRoute } from "./shared/components/ProtectedRoute"
import LoginPage from "./pages/LoginPage"
import NotFoundPage from "./pages/NotFoundPage"
import ChatPage from "./pages/ChatPage"

function App() {

  return (
    <BrowserRouter>
      <ToastContainer />

      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Navigate to="/chat" replace />} />
          <Route path="/chat" element={<ChatPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter >
  )
}

export default App

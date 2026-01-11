import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../features/auth/stores/useAuthStore";
import { useToast } from "../shared/hooks/useToast";
import type { useState } from "react";
import Input from "../shared/components/Input";
import Button from "../shared/components/Button";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const setAuth = useAuthStore((state) => state.setAuth);
  const { addToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  })

  const hadleSubmit = async () => {
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

  }

  return (
    <form action="">
      <Input label="Email" name="email" onChange={handleChange} />
      <Input />
      <label>
        <input type="checkbox" checked={formData.rememberMe} onChange={handleChange} /> Lembrar-me
      </label>
      <Button type="submit" disabled={isLoading} onClick={hadleSubmit} />
      <a href="/forgot-password">Esqueci minha senha</a>
    </form>
  )
}

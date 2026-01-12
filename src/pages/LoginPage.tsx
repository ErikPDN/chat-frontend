import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../features/auth/stores/useAuthStore";
import { useToast } from "../shared/hooks/useToast";
import { useState } from "react";
import Input from "../shared/components/Input";
import Button from "../shared/components/Button";
import authService from "../features/auth/services/authService";
import type { AxiosError } from "axios";
import { EyeIcon, EyeOff } from "lucide-react";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const setAuth = useAuthStore((state) => state.setAuth);
  const { addToast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: typeof errors = {};
    const emailRe = /^\S+@\S+\.\S+$/;

    if (!formData.email || !emailRe.test(formData.email)) {
      newErrors.email = "Email inválido";
    }

    if (!formData.password || formData.password.length < 6) {
      newErrors.password = "A senha deve ter ao menos 6 caracteres";
    }

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      const { email, password } = formData;
      const response = await authService.login({ email, password });

      setAuth(response.access_token, response.user);

      if (formData.rememberMe) {
        localStorage.setItem("access_token", response.access_token);
      } else {
        sessionStorage.setItem("access_token", response.access_token);
      }

      addToast("Bem-vindo!", "success");

      const from = (location.state as any)?.from?.pathname || "/chat";
      navigate(from, { replace: true });
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message: string }>;
      const message =
        axiosError.response?.data?.message ||
        "Ocorreu um erro inesperado";

      addToast(message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-900 text-white p-4">
      <div className="bg-zinc-800 p-8 rounded-xl shadow-2xl w-full max-w-md border border-zinc-700/50">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <Input
            label="Email"
            id="email"
            name="email"
            type="email"
            placeholder="Seu email"
            value={formData.email}
            onChange={handleChange}
            disabled={isLoading}
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <p className="text-red-400 text-sm">{errors.email}</p>
          )}

          {/* Password */}
          <div className="relative">
            <Input
              label="Senha"
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Sua senha"
              value={formData.password}
              onChange={handleChange}
              disabled={isLoading}
              aria-invalid={!!errors.password}
              className="pr-10"
            />

            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-3 top-10 text-zinc-300 hover:text-white"
              aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
            >
              {showPassword ? <EyeOff size={20} /> : <EyeIcon size={20} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-400 text-sm">{errors.password}</p>
          )}

          <div className="flex justify-between items-center">
            <label className="flex items-center gap-2 text-sm text-zinc-300">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                disabled={isLoading}
              />
              Lembrar-me
            </label>

            <Link
              to="/forgot-password"
              className="text-blue-500 hover:underline font-medium"
            >
              Esqueci minha senha
            </Link>
          </div>

          <Button type="submit" isLoading={isLoading}>
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}

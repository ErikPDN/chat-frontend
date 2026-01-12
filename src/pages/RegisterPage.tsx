import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../features/auth/stores/useAuthStore';
import { useToast } from '../shared/hooks/useToast';
import authService from '../features/auth/services/authService';
import Input from '../shared/components/Input';
import Button from '../shared/components/Button';
import type { AxiosError } from 'axios';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const setAuth = useAuthStore((state) => state.setAuth);

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      return addToast('As senhas não coincidem.', 'error');
    }

    try {
      const { email, username, password } = formData;
      const data = await authService.register({ email, username, password });
      setAuth(data.access_token, data.user);
      addToast('Conta criada com sucesso!', 'success');
      navigate('/login');
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message: string }>;
      const errorMessage = axiosError.response?.data?.message || 'Ocorreu um erro inesperado.';

      addToast(errorMessage, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-900 text-white p-4">
      <div className="bg-zinc-800 p-8 rounded-xl shadow-2xl w-full max-w-md border border-zinc-700/50">

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold">Criar Conta</h2>
          <p className="text-zinc-400 text-sm mt-2">Junte-se ao Signal Clone</p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <Input
            label="Email"
            id="email"
            name="email"
            type="email"
            placeholder="exemplo@email.com"
            required
            onChange={handleChange}
            disabled={isLoading}
          />

          <Input
            label="Usuário"
            id="username"
            name="username"
            type="text"
            placeholder="Seu nome de usuário"
            required
            onChange={handleChange}
            disabled={isLoading}
          />

          <Input
            label="Senha"
            id="password"
            name="password"
            type="password"
            placeholder="Sua senha"
            required
            onChange={handleChange}
            disabled={isLoading}
          />
          <Input
            label="Confirme a Senha"
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Repita sua senha"
            required
            onChange={handleChange}
            disabled={isLoading}
          />


          <Button type="submit" isLoading={isLoading}>
            Registrar
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-zinc-400 text-sm">
            Já tem uma conta?{' '}
            <Link to="/login" className="text-blue-500 hover:underline font-medium">
              Entrar
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

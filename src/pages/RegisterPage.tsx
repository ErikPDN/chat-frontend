import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../features/auth/stores/useAuthStore';
import { useToast } from '../shared/hooks/useToast';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const setAuth = useAuthStore((state) => state.setAuth);

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao criar conta');
      }

      setAuth(data.access_token, data.user);

      addToast('Bem-vindo! Conta criada com sucesso.', 'success');
      navigate('/chat'); // Redireciona para a rota protegida

    } catch (error: any) {
      addToast(error.message, 'error');
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
          <div>
            <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-600 focus:outline-none transition-all"
              placeholder="exemplo@email.com"
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Usuário</label>
            <input
              type="text"
              name="username"
              required
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-600 focus:outline-none transition-all"
              placeholder="seu_usuario"
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Senha</label>
            <input
              type="password"
              name="password"
              required
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-600 focus:outline-none transition-all"
              placeholder="••••••••"
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-700 disabled:cursor-not-allowed text-white font-bold py-3 rounded-full transition-all flex justify-center items-center"
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : 'Registrar'}
          </button>
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

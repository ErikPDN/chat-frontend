import { useState } from 'react';
import { Link } from 'react-router-dom';
import { EyeIcon, EyeOff } from 'lucide-react';
import { useLogin } from '../hooks/useLogin';
import Input from '../../../shared/components/Input';
import Button from '../../../shared/components/Button';

export default function LoginForm() {
  const { formData, errors, isLoading, handleSubmit, handleChange } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div className='text-center mb-6'>
        <h2 className='text-2xl font-bold'>Faça Login</h2>
        <p className="text-zinc-400 test-sm mt-2">Junte-se ao Signal Clone</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Email"
          id="email"
          name="email"
          type="email"
          placeholder="Seu email"
          value={formData.email}
          onChange={handleChange}
          disabled={isLoading}
          error={errors.email}
          autoFocus
        />

        <Input
          label="Senha"
          id="password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Sua senha"
          value={formData.password}
          onChange={handleChange}
          disabled={isLoading}
          error={errors.password}
          trailingIcon={
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="text-zinc-300 hover:text-white"
              aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
            >
              {showPassword ? <EyeOff size={20} /> : <EyeIcon size={20} />}
            </button>
          }
        />

        <div className="flex justify-between items-center">
          <label className="flex items-center gap-2 text-sm text-zinc-300">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              disabled={isLoading}
              className="h-4 w-4"
            />
            Lembrar-me
          </label>

          <Link
            to="/forgot-password"
            className="text-sm text-blue-500 hover:underline font-medium"
          >
            Esqueci minha senha
          </Link>
        </div>

        <Button type="submit" isLoading={isLoading}>
          Entrar
        </Button>

        <div className="text-center">
          <p className="text-zinc-400 text-sm">
            Não tem uma conta?{' '}
            <Link to="/register" className="text-blue-500 hover:underline font-medium">
              Criar conta
            </Link>
          </p>
        </div>
      </form>
    </>
  );
}

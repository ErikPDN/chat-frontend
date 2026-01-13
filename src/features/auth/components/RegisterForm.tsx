import { useState } from 'react';
import { Link } from 'react-router-dom';
import { EyeIcon, EyeOff } from 'lucide-react';
import { useRegister } from '../hooks/useRegister';
import Input from '../../../shared/components/Input';
import Button from '../../../shared/components/Button';

export default function RegisterForm() {
  const { formData, errors, isLoading, handleSubmit, handleChange } = useRegister();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Criar Conta</h2>
        <p className="text-zinc-400 text-sm mt-2">Junte-se ao Signal Clone</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Email"
          id="email"
          name="email"
          type="email"
          placeholder="exemplo@email.com"
          value={formData.email}
          onChange={handleChange}
          disabled={isLoading}
          error={errors.email}
          autoFocus
        />

        <Input
          label="Usuário"
          id="username"
          name="username"
          type="text"
          placeholder="Seu nome de usuário"
          value={formData.username}
          onChange={handleChange}
          disabled={isLoading}
          error={errors.username}
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

        <Input
          label="Confirme a Senha"
          id="confirmPassword"
          name="confirmPassword"
          type={showConfirmPassword ? 'text' : 'password'}
          placeholder="Repita sua senha"
          value={formData.confirmPassword}
          onChange={handleChange}
          disabled={isLoading}
          error={errors.confirmPassword}
          trailingIcon={
            <button
              type="button"
              onClick={() => setShowConfirmPassword((s) => !s)}
              className="text-zinc-300 hover:text-white"
              aria-label={showConfirmPassword ? 'Ocultar senha' : 'Mostrar senha'}
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <EyeIcon size={20} />}
            </button>
          }
        />

        <Button type="submit" isLoading={isLoading}>
          Registrar
        </Button>

        <div className="text-center">
          <p className="text-zinc-400 text-sm">
            Já tem uma conta?{' '}
            <Link to="/login" className="text-blue-500 hover:underline font-medium">
              Entrar
            </Link>
          </p>
        </div>
      </form>
    </>
  );
}

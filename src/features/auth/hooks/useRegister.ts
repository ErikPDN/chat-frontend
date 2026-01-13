import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';
import { useToast } from '../../../shared/hooks/useToast';
import authClient from '../services/authClient';

interface RegisterFormData {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

interface RegisterErrors {
  email?: string;
  username?: string;
  password?: string;
  confirmPassword?: string;
}

export const useRegister = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const { addToast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<RegisterFormData>({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<RegisterErrors>({});

  const validateForm = (): boolean => {
    const newErrors: RegisterErrors = {};
    const emailRe = /^\S+@\S+\.\S+$/;

    if (!formData.email || !emailRe.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.username || formData.username.length < 3) {
      newErrors.username = 'Nome de usuário deve ter ao menos 3 caracteres';
    }

    if (!formData.password || formData.password.length < 6) {
      newErrors.password = 'A senha deve ter ao menos 6 caracteres';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem';
    }

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      // Focar no primeiro campo inválido
      const firstField = newErrors.email
        ? 'email'
        : newErrors.username
        ? 'username'
        : newErrors.password
        ? 'password'
        : 'confirmPassword';
      document.getElementById(firstField)?.focus();
      return false;
    }

    setErrors({});
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const { email, username, password } = formData;
      const response = await authClient.register({ email, username, password });

      // Salvar token (sem remember-me no registro)
      authClient.saveToken(response.access_token);

      // Atualizar store global
      setAuth(response.access_token, response.user);

      addToast('Conta criada com sucesso!', 'success');
      navigate('/chat');
    } catch (error: any) {
      const errorMessage = authClient.mapAuthError(error);
      addToast(errorMessage, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const setField = (name: keyof RegisterFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Limpar erro do campo ao editar
    if (errors[name as keyof RegisterErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setField(name as keyof RegisterFormData, value);
  };

  return {
    formData,
    errors,
    isLoading,
    handleSubmit,
    handleChange,
    setField,
  };
};

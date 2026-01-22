import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';
import { useToast } from '../../../shared/hooks/useToast';
import authClient from '../services/authClient';

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface LoginErrors {
  email?: string;
  password?: string;
}

export const useLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const setAuth = useAuthStore((state) => state.setAuth);
  const { addToast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState<LoginErrors>({});

  const validateForm = (): boolean => {
    const newErrors: LoginErrors = {};
    const emailRe = /^\S+@\S+\.\S+$/;

    if (!formData.email || !emailRe.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.password || formData.password.length < 6) {
      newErrors.password = 'A senha deve ter ao menos 6 caracteres';
    }

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      const firstField = newErrors.email ? 'email' : 'password';
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
      const { email, password } = formData;
      const response = await authClient.login({ email, password });

      setAuth(response.access_token, response.user);

      addToast('Bem-vindo!', 'success');

      const from = (location.state as any)?.from?.pathname || '/chat';
      navigate(from, { replace: true });
    } catch (error: any) {
      const errorMessage = authClient.mapAuthError(error);
      addToast(errorMessage, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const setField = (name: keyof LoginFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof LoginErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setField(name as keyof LoginFormData, type === 'checkbox' ? checked : value);
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

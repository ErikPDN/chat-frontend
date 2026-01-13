import api from "../../../shared/utils/api";
import type { User } from "../../user/types/user.types";
import type { RegisterDTO, LoginDTO } from "../types/auth.types";

export interface AuthResponse {
  access_token: string;
  user: User;
}

/**
 * authClient - Centraliza autenticação, persistência de token e normalização de erros
 */

// Persistência de token
export const saveToken = (token: string, options?: { remember?: boolean }) => {
  const storage = options?.remember ? localStorage : sessionStorage;
  storage.setItem('access_token', token);
};

export const getToken = (): string | null => {
  return localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
};

export const clearToken = () => {
  localStorage.removeItem('access_token');
  sessionStorage.removeItem('access_token');
};

// Chamadas de API
export const login = async (payload: LoginDTO): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>('/auth/login', payload);
  return data;
};

export const register = async (payload: RegisterDTO): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>('/auth/register', payload);
  return data;
};

// Mapeamento de erros
export const mapAuthError = (error: any): string => {
  const status = error.response?.status;
  const message = error.response?.data?.message;

  if (message) return message;

  switch (status) {
    case 401:
      return 'Credenciais inválidas';
    case 422:
      return 'Dados inválidos';
    case 409:
      return 'Usuário já existe';
    case 500:
      return 'Erro no servidor. Tente novamente.';
    default:
      return 'Ocorreu um erro inesperado';
  }
};

export default {
  login,
  register,
  saveToken,
  getToken,
  clearToken,
  mapAuthError,
};

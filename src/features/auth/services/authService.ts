import api from "../../../shared/utils/api";
import type { User } from "../../user/types/user.types";
import type { RegisterDTO, LoginDTO } from "../types/auth.types";

export interface AuthResponse {
  acess_token: string;
  user: User;
}

const register = async (payload: RegisterDTO) => {
  const { data } = await api.post('/auth/register', payload);
  return data;
}

const login = async (payload: LoginDTO) => {
  const { data } = await api.post('/auth/login', payload);
  return data;
}

export default { login, register };


import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";

export const useLogout = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  return useCallback(() => {
    localStorage.removeItem('auth-storage');
    logout();
    navigate('/login');
  }, [navigate, logout]);
}

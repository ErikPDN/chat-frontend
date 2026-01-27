import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuthStore } from '../../features/auth/stores/useAuthStore';

export const useSocket = () => {
  const socketRef = useRef<Socket | null>(null);
  const { user, token } = useAuthStore();

  useEffect(() => {
    if (!user?.id || !token) return;

    socketRef.current = io('http://localhost:3000/chat', {
      auth: {
        token: token,
      },
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
    });

    socketRef.current.on('connect', () => {
      console.log('WebSocket conectado');
    });

    socketRef.current.on('disconnect', () => {
      console.log('WebSocket desconectado');
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [user?.id, token]);

  return socketRef.current;
};

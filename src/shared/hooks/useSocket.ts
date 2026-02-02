import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuthStore } from '../../features/auth/stores/useAuthStore';

let socketInstance: Socket | null = null;

export const useSocket = () => {
  const { user, token } = useAuthStore();
  const [, setVersion] = useState(0);

  useEffect(() => {
    if (!user?.id || !token) {
      if (socketInstance) {
        socketInstance.disconnect();
        socketInstance = null;
      }
      return;
    }

    if (!socketInstance) {
      socketInstance = io('http://localhost:3000/chat', {
        auth: { token },
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        reconnectionAttempts: 5,
      });

      socketInstance.on('connect', () => {
        console.log('WebSocket conectado');
        setVersion((v) => v + 1);
      });

      socketInstance.on('disconnect', () => {
        console.log('WebSocket desconectado');
        setVersion((v) => v + 1);
      });
    }
  }, [user?.id, token]);

  return socketInstance;
};

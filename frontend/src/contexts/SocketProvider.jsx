// frontend/src/contexts/SocketProvider.jsx
import React, { createContext, useContext, useMemo, useEffect } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext(null);
export const useSocket = () => useContext(SocketContext);

// Usamos **mismo origen** y path estándar. No hardcodeamos puertos.
// No autoconectamos: solo si hay token (evita timeouts en la home del invitado).
const createSocket = () =>
  io('/', {
    path: '/socket.io',
    withCredentials: true,
    autoConnect: false,
  });

const SocketProvider = ({ children }) => {
  const socket = useMemo(createSocket, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return; // Invitado: no conectes sockets

    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};

export default SocketProvider;

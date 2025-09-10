// frontend/src/contexts/SocketProvider.jsx
import React, { createContext, useContext, useMemo, useEffect } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext(null);
export const useSocket = () => useContext(SocketContext);

const SocketProvider = ({ children }) => {
  // Conecta al MISMO ORIGEN (funciona en dev con proxy y en prod)
  const socket = useMemo(
    () =>
      io({
        path: '/socket.io',
        transports: ['websocket', 'polling'],
        withCredentials: true,
        autoConnect: false, // ← importante para controlar la conexión manualmente
        reconnection: true,
        reconnectionAttempts: 10,
        reconnectionDelay: 500,
      }),
    [],
  );

  // Conexión controlada + cleanup para StrictMode
  useEffect(() => {
    socket.connect();
    return () => {
      socket.removeAllListeners(); // por si acaso
      socket.disconnect();
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;

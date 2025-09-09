import React, { createContext, useContext, useMemo } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext(null);
export const useSocket = () => useContext(SocketContext);

const SocketProvider = ({ children }) => {
  // Conecta al MISMO ORIGEN del front (funciona en tests, dev y prod detrás de proxy)
  const socket = useMemo(
    () =>
      io({
        // Fuerza path estándar y mejor handshake en ambientes meta
        path: '/socket.io',
        transports: ['websocket', 'polling'],
        withCredentials: true,
      }),
    [],
  );

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;

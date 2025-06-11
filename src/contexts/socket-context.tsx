import React, { createContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from './auth-context';

interface SocketContextType {
  socket: Socket | null;
  activeUsersCount: number;
  isConnected: boolean;
}

export const SocketContext = createContext<SocketContextType | undefined>(undefined);

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [activeUsersCount, setActiveUsersCount] = useState<number>(0);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const { isAuthenticated, user } = useAuth();  useEffect(() => {
    if (isAuthenticated && user) {
      // Create socket connection only for authenticated users
      const newSocket = io(import.meta.env.VITE_API_URL || 'http://localhost:3000', {
        transports: ['websocket', 'polling'],
        withCredentials: true,
      });

      newSocket.on('connect', () => {
        console.log('Socket connected:', newSocket.id);
        setIsConnected(true);
        
        // Backend'e kullanıcının giriş yaptığını bildir
        newSocket.emit('userLogin', user.id);
      });

      newSocket.on('disconnect', () => {
        console.log('Socket disconnected');
        setIsConnected(false);
      });

      newSocket.on('activeUsersCount', (count: number) => {
        console.log('Active users count received:', count);
        setActiveUsersCount(count);
      });

      newSocket.on('connect_error', (error) => {
        console.error('Socket connection error:', error);
        setIsConnected(false);
      });

      setSocket(newSocket);

      return () => {
        newSocket.disconnect();
        setSocket(null);
        setIsConnected(false);
        setActiveUsersCount(0);
      };} else {
      // Clean up when user is not authenticated
      setSocket(null);
      setIsConnected(false);
      setActiveUsersCount(0);
    }
  }, [isAuthenticated, user]);

  const value = {
    socket,
    activeUsersCount,
    isConnected,
  };

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};
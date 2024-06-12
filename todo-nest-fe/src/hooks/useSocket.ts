import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useQueryClient } from '@tanstack/react-query';

export const useSocket = (url: string) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const socket = io(url, {
      withCredentials: true,
    });

    socket.on('connect', () => {
      console.log(`Connected with id: ${socket.id}`);
    });

    socket.on('todoUpdated', (todo) => {
      console.log('Todo updated:', todo);
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      queryClient.invalidateQueries({ queryKey: ['todo', todo.id] });
    });

    socket.on('disconnect', () => {
      console.log(`Disconnected`);
    });

    return () => {
      socket.disconnect();
    };
  }, [url, queryClient]);
};

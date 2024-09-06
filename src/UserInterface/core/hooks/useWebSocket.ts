import {useCallback, useEffect, useRef, useState} from 'react';
import {Handler, MessageRouter} from '../../services/webSocket/handler'; // Adjust the import path

const useWebSocket = () => {
  const [status, setStatus] = useState('disconnected');
  const routerRef = useRef(new MessageRouter());
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const host = 'localhost:8080';
    const wsUrl = `${protocol}//${host}/messages`;
    const wsClient = new WebSocket(wsUrl);
    wsRef.current = wsClient;

    console.log('Web Client connecting to WebSocket server');

    wsClient.onopen = () => {
      console.log('WebSocket connection established');
      setStatus('connected');
    };

    wsClient.onmessage = async (event) => {
      console.log('Web Client received message:', event);
      await routerRef.current.handleMessage(event);
    };

    wsClient.onerror = (error) => {
      console.error('WebSocket error:', error);
      setStatus('error');
    };

    wsClient.onclose = (event) => {
      console.log(`WebSocket connection closed: ${event.reason}`);
      setStatus('disconnected');
    };

    const router = routerRef.current;

    router.registerRoute('disconnect', () => {
      console.log('Handling disconnect message');
      // Handle disconnect logic here
    });

    return () => {
      if (wsClient) {
        wsClient.close();
      }
    };
  }, []);

  const sendMessage = useCallback((message: string) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(message);
    }
  }, []);

  const registerRoute = useCallback((type: string, handler: Handler) => {
    routerRef.current.registerRoute(type, handler);
  }, []);

  return { status, sendMessage, registerRoute };
};

export default useWebSocket;

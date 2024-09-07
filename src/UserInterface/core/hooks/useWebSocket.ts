import {useCallback, useEffect, useRef, useState} from 'react';
import {MessageRouter} from '../../services/webSocket/handler';
import {useQuests} from "./Quests/useQuests";

const useWebSocket = () => {
  const { updateQuestStatus } = useQuests();
  const [status, setStatus] = useState('disconnected');
  const routerRef = useRef(new MessageRouter());
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!wsRef.current) {
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const host = 'localhost:8080';
      const wsUrl = `${protocol}//${host}/messages`;
      const wsClient = new WebSocket(wsUrl);
      wsRef.current = wsClient;

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
        wsRef.current = null;
      };
    }

    const router = routerRef.current;

    router.registerRoute('box_clicked', (event) => {
      // Assuming the event contains the quest ID
      updateQuestStatus(event.box_id, true);
    });

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [updateQuestStatus]);

  const sendMessage = useCallback((message: string) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(message);
    }
  }, []);

  return { status, sendMessage };
};

export default useWebSocket;

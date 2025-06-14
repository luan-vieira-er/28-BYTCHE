import { useEffect, useState, useCallback } from 'react';
import websocketService from '../services/websocket.service';

export const useWebSocket = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState(null);
  const [players, setPlayers] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);

  // Initialize WebSocket connection
  useEffect(() => {
    const handleConnectionSuccess = () => {
      setIsConnected(true);
      setConnectionError(null);
    };

    const handleConnectionLost = (reason) => {
      setIsConnected(false);
      console.log('Connection lost:', reason);
    };

    const handleConnectionError = (error) => {
      setIsConnected(false);
      setConnectionError(error.message || 'Connection failed');
    };

    const handleConnectionFailed = () => {
      setIsConnected(false);
      setConnectionError('Failed to connect after multiple attempts');
    };

    // Novo handler para quando o socket conecta (independente de código de acesso)
    const handleSocketConnected = () => {
      setIsConnected(true);
      setConnectionError(null);
    };

    // Setup connection event listeners
    websocketService.on('connection:success', handleConnectionSuccess);
    websocketService.on('connection:lost', handleConnectionLost);
    websocketService.on('connection:error', handleConnectionError);
    websocketService.on('connection:failed', handleConnectionFailed);

    // Escutar evento direto do socket para conexões automáticas
    if (websocketService.socket) {
      websocketService.socket.on('connect', handleSocketConnected);
    }

    // Connect to server (apenas se não estiver conectado)
    if (!websocketService.isConnected) {
      websocketService.connect();
    } else {
      setIsConnected(true);
    }

    // Cleanup on unmount
    return () => {
      websocketService.off('connection:success', handleConnectionSuccess);
      websocketService.off('connection:lost', handleConnectionLost);
      websocketService.off('connection:error', handleConnectionError);
      websocketService.off('connection:failed', handleConnectionFailed);

      if (websocketService.socket) {
        websocketService.socket.off('connect', handleSocketConnected);
      }
    };
  }, []);

  // Setup game event listeners
  useEffect(() => {
    if (!isConnected) return;

    const handlePlayerList = (playerList) => {
      setPlayers(playerList);
    };

    const handlePlayerJoin = (player) => {
      setPlayers(prev => [...prev.filter(p => p.id !== player.id), player]);
    };

    const handlePlayerDisconnected = (data) => {
      setPlayers(prev => prev.filter(p => p.id !== data.playerId));
    };

    const handlePlayerMove = (movement) => {
      setPlayers(prev => prev.map(player =>
        player.id === movement.playerId
          ? { ...player, position: movement.position }
          : player
      ));
    };

    const handlePlayerUpdate = (update) => {
      setPlayers(prev => prev.map(player =>
        player.id === update.playerId
          ? { ...player, ...update.updates }
          : player
      ));
    };

    const handleChatBroadcast = (message) => {
      setChatMessages(prev => [...prev, message].slice(-100)); // Keep last 100 messages
    };

    const handleChatHistory = (messages) => {
      setChatMessages(messages);
    };

    // Novos handlers para eventos do backend
    const handleBackendPosition = (data) => {
      console.log('📍 Posição recebida do backend:', data);
      // Atualizar posição de outros jogadores
      if (data.sender && data.position) {
        setPlayers(prev => prev.map(player =>
          player.id === data.sender
            ? { ...player, position: data.position }
            : player
        ));
      }
    };

    const handleNewMessage = (data) => {
      console.log('💬 Nova mensagem do backend:', data);
      setChatMessages(prev => [...prev, {
        id: Date.now(),
        sender: data.sender,
        message: data.message,
        timestamp: new Date().toISOString()
      }].slice(-100));
    };

    const handlePatientJoined = (message) => {
      console.log('👤 Paciente entrou:', message);
    };

    const handleError = (error) => {
      console.error('❌ Erro do backend:', error);
      setConnectionError(error);
    };

    // Register event listeners (sistema antigo)
    websocketService.on('player:list', handlePlayerList);
    websocketService.on('player:join', handlePlayerJoin);
    websocketService.on('player:disconnected', handlePlayerDisconnected);
    websocketService.on('player:move', handlePlayerMove);
    websocketService.on('player:update', handlePlayerUpdate);
    websocketService.on('chat:broadcast', handleChatBroadcast);
    websocketService.on('chat:history', handleChatHistory);

    // Register event listeners (backend)
    websocketService.on('position', handleBackendPosition);
    websocketService.on('newMessage', handleNewMessage);
    websocketService.on('patientJoined', handlePatientJoined);
    websocketService.on('error', handleError);

    // Get initial chat history
    websocketService.getChatHistory();

    // Cleanup
    return () => {
      // Sistema antigo
      websocketService.off('player:list', handlePlayerList);
      websocketService.off('player:join', handlePlayerJoin);
      websocketService.off('player:disconnected', handlePlayerDisconnected);
      websocketService.off('player:move', handlePlayerMove);
      websocketService.off('player:update', handlePlayerUpdate);
      websocketService.off('chat:broadcast', handleChatBroadcast);
      websocketService.off('chat:history', handleChatHistory);

      // Backend
      websocketService.off('position', handleBackendPosition);
      websocketService.off('newMessage', handleNewMessage);
      websocketService.off('patientJoined', handlePatientJoined);
      websocketService.off('error', handleError);
    };
  }, [isConnected]);

  // Player actions
  const joinGame = useCallback((playerData) => {
    websocketService.joinGame(playerData);
  }, []);

  const movePlayer = useCallback((position, roomId) => {
    websocketService.movePlayer(position, roomId);
  }, []);

  const updatePlayer = useCallback((updates) => {
    websocketService.updatePlayer(updates);
  }, []);

  // Chat actions
  const sendMessage = useCallback((message, roomId) => {
    websocketService.sendChatMessage(message, roomId);
  }, []);

  // NPC actions
  const interactWithNPC = useCallback((npcId, interactionType) => {
    websocketService.interactWithNPC(npcId, interactionType);
  }, []);

  // Triagem actions
  const startTriagem = useCallback(() => {
    websocketService.startTriagem();
  }, []);

  const submitTriagemAnswer = useCallback((sessionId, step, answer) => {
    websocketService.submitTriagemAnswer(sessionId, step, answer);
  }, []);

  // Backend-specific actions
  const joinRoom = useCallback((roomId) => {
    console.log("🚀 ~ joinRoom ~ roomId:", roomId)
    websocketService.joinGameWithCode(roomId);
  }, []);

  const startFirstInteraction = useCallback((roomId) => {
    websocketService.startFirstInteraction(roomId);
  }, []);

  const sendMessageToAI = useCallback((roomId, message) => {
    websocketService.sendMessageToAI(roomId, message);
  }, []);

  const finishRoom = useCallback((roomId, message) => {
    websocketService.finishRoom(roomId, message);
  }, []);

  return {
    // Connection state
    isConnected,
    connectionError,

    // Game state
    players,
    chatMessages,

    // Actions (sistema antigo)
    joinGame,
    movePlayer,
    updatePlayer,
    sendMessage,
    interactWithNPC,
    startTriagem,
    submitTriagemAnswer,

    // Backend actions
    joinRoom,
    startFirstInteraction,
    sendMessageToAI,
    finishRoom,

    // WebSocket service instance
    websocketService
  };
};

export default useWebSocket;

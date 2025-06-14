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

    // Setup connection event listeners
    websocketService.on('connection:success', handleConnectionSuccess);
    websocketService.on('connection:lost', handleConnectionLost);
    websocketService.on('connection:error', handleConnectionError);
    websocketService.on('connection:failed', handleConnectionFailed);

    // Connect to server
    websocketService.connect();

    // Cleanup on unmount
    return () => {
      websocketService.off('connection:success', handleConnectionSuccess);
      websocketService.off('connection:lost', handleConnectionLost);
      websocketService.off('connection:error', handleConnectionError);
      websocketService.off('connection:failed', handleConnectionFailed);
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

    // Register event listeners
    websocketService.on('player:list', handlePlayerList);
    websocketService.on('player:join', handlePlayerJoin);
    websocketService.on('player:disconnected', handlePlayerDisconnected);
    websocketService.on('player:move', handlePlayerMove);
    websocketService.on('player:update', handlePlayerUpdate);
    websocketService.on('chat:broadcast', handleChatBroadcast);
    websocketService.on('chat:history', handleChatHistory);

    // Get initial chat history
    websocketService.getChatHistory();

    // Cleanup
    return () => {
      websocketService.off('player:list', handlePlayerList);
      websocketService.off('player:join', handlePlayerJoin);
      websocketService.off('player:disconnected', handlePlayerDisconnected);
      websocketService.off('player:move', handlePlayerMove);
      websocketService.off('player:update', handlePlayerUpdate);
      websocketService.off('chat:broadcast', handleChatBroadcast);
      websocketService.off('chat:history', handleChatHistory);
    };
  }, [isConnected]);

  // Player actions
  const joinGame = useCallback((playerData) => {
    websocketService.joinGame(playerData);
  }, []);

  const movePlayer = useCallback((position) => {
    websocketService.movePlayer(position);
  }, []);

  const updatePlayer = useCallback((updates) => {
    websocketService.updatePlayer(updates);
  }, []);

  // Chat actions
  const sendMessage = useCallback((message) => {
    websocketService.sendChatMessage(message);
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

  return {
    // Connection state
    isConnected,
    connectionError,
    
    // Game state
    players,
    chatMessages,
    
    // Actions
    joinGame,
    movePlayer,
    updatePlayer,
    sendMessage,
    interactWithNPC,
    startTriagem,
    submitTriagemAnswer,
    
    // WebSocket service instance
    websocketService
  };
};

export default useWebSocket;

import { io } from 'socket.io-client';

class WebSocketService {
  constructor() {
    this.socket = null;
    this.isConnected = false;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.eventListeners = new Map();
  }

  // Connect to WebSocket server
  connect(serverUrl = 'http://localhost:3001') {
    if (this.socket && this.isConnected) {
      console.log('WebSocket already connected');
      return;
    }

    console.log('Connecting to WebSocket server...');

    this.socket = io(serverUrl, {
      transports: ['websocket', 'polling'],
      timeout: 10000,
      forceNew: true
    });

    this.setupEventListeners();
  }

  // Setup basic event listeners
  setupEventListeners() {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      console.log('Connected to WebSocket server');
      this.isConnected = true;
      this.reconnectAttempts = 0;
      this.emit('connection:success');
    });

    this.socket.on('disconnect', (reason) => {
      console.log('Disconnected from WebSocket server:', reason);
      this.isConnected = false;
      this.emit('connection:lost', reason);
    });

    this.socket.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error);
      this.isConnected = false;
      this.handleReconnect();
      this.emit('connection:error', error);
    });

    this.socket.on('error', (error) => {
      console.error('WebSocket error:', error);
      this.emit('error', error);
    });
  }

  // Handle reconnection logic
  handleReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 10000);
      
      console.log(`Attempting to reconnect in ${delay}ms (attempt ${this.reconnectAttempts})`);
      
      setTimeout(() => {
        if (!this.isConnected) {
          this.socket?.connect();
        }
      }, delay);
    } else {
      console.error('Max reconnection attempts reached');
      this.emit('connection:failed');
    }
  }

  // Disconnect from server
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
      console.log('WebSocket disconnected');
    }
  }

  // Send event to server
  emit(event, data) {
    if (this.socket && this.isConnected) {
      this.socket.emit(event, data);
    } else {
      console.warn('Cannot emit event: WebSocket not connected');
    }
  }

  // Listen for events from server
  on(event, callback) {
    if (this.socket) {
      this.socket.on(event, callback);
    }
    
    // Store listener for potential reconnection
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, []);
    }
    this.eventListeners.get(event).push(callback);
  }

  // Remove event listener
  off(event, callback) {
    if (this.socket) {
      this.socket.off(event, callback);
    }
    
    // Remove from stored listeners
    if (this.eventListeners.has(event)) {
      const listeners = this.eventListeners.get(event);
      const index = listeners.indexOf(callback);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    }
  }

  // Player-related methods
  joinGame(playerData) {
    this.emit('player:join', playerData);
  }

  movePlayer(position) {
    this.emit('player:move', { position });
  }

  updatePlayer(updates) {
    this.emit('player:update', updates);
  }

  // NPC interaction methods
  interactWithNPC(npcId, interactionType = 'dialog') {
    this.emit('npc:interact', {
      npcId,
      interactionType,
      timestamp: new Date().toISOString()
    });
  }

  respondToNPC(npcId, response) {
    this.emit('npc:response', {
      npcId,
      response,
      timestamp: new Date().toISOString()
    });
  }

  // Triagem methods
  startTriagem() {
    this.emit('triagem:start');
  }

  submitTriagemAnswer(sessionId, step, answer) {
    this.emit('triagem:answer', {
      sessionId,
      step,
      answer,
      timestamp: new Date().toISOString()
    });
  }

  // Chat methods
  sendChatMessage(message) {
    this.emit('chat:message', {
      message,
      timestamp: new Date().toISOString()
    });
  }

  getChatHistory() {
    this.emit('chat:get_history');
  }

  // Utility methods
  isSocketConnected() {
    return this.isConnected && this.socket?.connected;
  }

  getSocketId() {
    return this.socket?.id;
  }
}

// Create singleton instance
const websocketService = new WebSocketService();

export default websocketService;

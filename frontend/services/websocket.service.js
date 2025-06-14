import { io } from 'socket.io-client';
import { WEBSOCKET_CONFIG, wsLog, wsError } from '@/config/websocket.config';

class WebSocketService {
  constructor() {
    this.socket = null;
    this.isConnected = false;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.eventListeners = new Map();
    this.pendingAccessCode = null; // Armazenar código de acesso para usar após conexão
  }

  // Connect to WebSocket server
  connect(serverUrl = WEBSOCKET_CONFIG.SERVER_URL, accessCode = null) {
    if (this.socket && this.isConnected) {
      wsLog('Already connected');
      return;
    }

    // Armazenar código de acesso para usar após conexão
    if (accessCode) {
      this.pendingAccessCode = accessCode;
    }

    wsLog('Connecting to server...', { url: serverUrl, hasAccessCode: !!accessCode });

    this.socket = io(serverUrl, WEBSOCKET_CONFIG.CONNECTION_OPTIONS);

    this.setupEventListeners();
  }

  // Setup basic event listeners
  setupEventListeners() {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      console.log('🟢 WebSocket conectado! Socket ID:', this.socket.id);
      wsLog('Connected to server');
      this.isConnected = true;
      this.reconnectAttempts = 0;

      // Se temos um código de acesso pendente, entrar na sala automaticamente
      if (this.pendingAccessCode) {
        this.joinGameWithCode(this.pendingAccessCode);
        this.pendingAccessCode = null; // Limpar após usar
      } else {
        // Manter compatibilidade com sistema antigo
        console.log('🔔 Emitindo connection:success...');
        this.emit('connection:success');
      }
    });

    this.socket.on('disconnect', (reason) => {
      wsLog('Disconnected from server', { reason });
      this.isConnected = false;
      this.emit('connection:lost', reason);
    });

    this.socket.on('connect_error', (error) => {
      wsError('Connection error', error);
      this.isConnected = false;
      this.handleReconnect();
      this.emit('connection:error', error);
    });

    this.socket.on('error', (error) => {
      wsError('Socket error', error);
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
  emit(event, data, message) {
    console.log('🔌 Tentando emitir evento:', event, {
      hasSocket: !!this.socket,
      isConnected: this.isConnected,
      socketConnected: this.socket?.connected,
      data,
      message
    });

    if (this.socket && this.isConnected) {
      console.log('✅ Emitindo evento:', event, data);
      this.socket.emit(event, data, message);
    } else {
      console.warn('❌ Cannot emit event: WebSocket not connected', {
        hasSocket: !!this.socket,
        isConnected: this.isConnected,
        socketConnected: this.socket?.connected
      });
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

  // Game access methods - Integrado com backend
  joinGameWithCode(accessCode, playerData = {}) {
    console.log("🚀 ~ WebSocketService ~ joinGameWithCode ~ accessCode:", accessCode, playerData)
    console.log("🔧 WEBSOCKET_CONFIG:", WEBSOCKET_CONFIG)
    console.log("🎯 Evento a ser emitido:", WEBSOCKET_CONFIG.BACKEND_EVENTS.PATIENT_JOIN_ROOM)
    wsLog('Joining room with access code', { accessCode, playerData });
    // Usar evento do backend para validar acesso
    this.emit(WEBSOCKET_CONFIG.BACKEND_EVENTS.PATIENT_JOIN_ROOM, accessCode);
  }

  // Método para médico entrar na sala
  joinRoomAsDoctor(roomId) {
    console.log("👨‍⚕️ ~ WebSocketService ~ joinRoomAsDoctor ~ roomId:", roomId)
    wsLog('Doctor joining room', { roomId });
    this.emit(WEBSOCKET_CONFIG.BACKEND_EVENTS.DOCTOR_JOIN_ROOM, roomId);
  }

  // Método para salvar configuração do paciente
  savePatientConfig(roomId, playerConfig) {
    console.log("💾 ~ WebSocketService ~ savePatientConfig ~ roomId:", roomId, playerConfig)
    wsLog('Saving patient config', { roomId, playerConfig });
    this.emit('savePatientConfig', roomId, playerConfig);
  }

  // Player-related methods - Integrado com backend
  joinGame(playerData) {
    // Manter compatibilidade com sistema antigo
    this.emit('player:join', playerData);
  }

  movePlayer(position, roomId) {
    // Usar evento do backend para sincronizar posição
    if (roomId) {
      wsLog('Sending position to backend', { roomId, position });
      this.emit(WEBSOCKET_CONFIG.BACKEND_EVENTS.POSITION, { roomId, position });
    } else {
      // Fallback para sistema antigo
      this.emit(WEBSOCKET_CONFIG.LEGACY_EVENTS.PLAYER_MOVE, { position });
    }
  }

  updatePlayer(updates) {
    this.emit('player:update', updates);
  }

  // NPC interaction methods - Integrado com backend
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

  // Métodos integrados com backend de IA
  startFirstInteraction(roomId) {
    wsLog('Starting first interaction with AI', { roomId });
    this.emit(WEBSOCKET_CONFIG.BACKEND_EVENTS.FIRST_INTERACTION, roomId);
  }

  sendMessageToAI(roomId, message) {
    wsLog('Sending message to AI', { roomId, message });
    this.emit(WEBSOCKET_CONFIG.BACKEND_EVENTS.PATIENT_SEND_MESSAGE, roomId, message);
  }

  // Triagem methods - Mantido para compatibilidade
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

  // Chat methods - Integrado com backend
  sendChatMessage(message, roomId = null) {
    if (roomId) {
      // Usar sistema do backend
      this.sendMessageToAI(roomId, message);
    } else {
      // Fallback para sistema antigo
      this.emit('chat:message', {
        message,
        timestamp: new Date().toISOString()
      });
    }
  }

  getChatHistory() {
    this.emit('chat:get_history');
  }

  // Métodos específicos do backend
  finishRoom(roomId, message = '') {
    wsLog('Finishing room', { roomId, message });
    // Usar o evento correto do backend
    this.emit('doctorCloseRoom', roomId, message);
  }

  // Métodos para sincronização de diálogos
  syncDialogStarted(roomId, dialogData) {
    wsLog('Syncing dialog started', { roomId, dialogData });
    this.emit('dialogStarted', roomId, dialogData);
  }

  syncDialogChoice(roomId, choiceData) {
    wsLog('Syncing dialog choice', { roomId, choiceData });
    this.emit('dialogChoice', roomId, choiceData);
  }

  syncDialogEnded(roomId) {
    wsLog('Syncing dialog ended', { roomId });
    this.emit('dialogEnded', roomId);
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

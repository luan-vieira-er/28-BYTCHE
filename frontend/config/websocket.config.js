// Configuração do WebSocket para integração com backend

export const WEBSOCKET_CONFIG = {
  // URL do servidor WebSocket
  SERVER_URL: process.env.NEXT_PUBLIC_WEBSOCKET_URL || 'http://localhost:3001',
  
  // Configurações de conexão
  CONNECTION_OPTIONS: {
    transports: ['websocket', 'polling'],
    timeout: 10000,
    forceNew: true
  },
  
  // Configurações de reconexão
  RECONNECT: {
    maxAttempts: 5,
    baseDelay: 1000,
    maxDelay: 10000
  },
  
  // Eventos do backend
  BACKEND_EVENTS: {
    // Entrada em salas
    DOCTOR_JOIN_ROOM: 'doctorJoinRoom',
    PATIENT_JOIN_ROOM: 'patientJoinRoom',
    
    // Interações com IA
    FIRST_INTERACTION: 'firstInteraction',
    PATIENT_SEND_MESSAGE: 'patientSendMessage',
    DOCTOR_FINISH_ROOM: 'doctorFinishRoom',
    
    // Movimento
    POSITION: 'position',
    
    // Respostas do servidor
    NEW_MESSAGE: 'newMessage',
    PATIENT_JOINED: 'patientJoined',
    ERROR: 'error'
  },
  
  // Eventos do sistema antigo (para compatibilidade)
  LEGACY_EVENTS: {
    GAME_JOIN: 'game:join',
    GAME_ACCESS_GRANTED: 'game:access_granted',
    GAME_ACCESS_DENIED: 'game:access_denied',
    PLAYER_JOIN: 'player:join',
    PLAYER_MOVE: 'player:move',
    PLAYER_UPDATE: 'player:update',
    CHAT_MESSAGE: 'chat:message',
    CHAT_BROADCAST: 'chat:broadcast',
    CHAT_HISTORY: 'chat:history'
  },
  
  // Configurações de desenvolvimento
  DEV: {
    ENABLE_LOGS: true,
    FALLBACK_TIMEOUT: 5000, // Timeout para assumir sucesso em desenvolvimento
    MOCK_RESPONSES: false // Se true, simula respostas do backend
  }
}

// Função para obter configuração baseada no ambiente
export const getWebSocketConfig = () => {
  const isDev = process.env.NODE_ENV === 'development'
  
  return {
    ...WEBSOCKET_CONFIG,
    DEV: {
      ...WEBSOCKET_CONFIG.DEV,
      ENABLE_LOGS: isDev
    }
  }
}

// Função para log condicional
export const wsLog = (message, data = null) => {
  const config = getWebSocketConfig()
  if (config.DEV.ENABLE_LOGS) {
    if (data) {
      console.log(`🔌 WebSocket: ${message}`, data)
    } else {
      console.log(`🔌 WebSocket: ${message}`)
    }
  }
}

// Função para log de erro
export const wsError = (message, error = null) => {
  if (error) {
    console.error(`❌ WebSocket Error: ${message}`, error)
  } else {
    console.error(`❌ WebSocket Error: ${message}`)
  }
}

export default WEBSOCKET_CONFIG

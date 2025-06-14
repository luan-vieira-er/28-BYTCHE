/**
 * API Service para conectar o frontend Next.js com o backend
 * Backend rodando em: http://localhost:3001
 */

class ApiService {
  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    this.apiURL = `${this.baseURL}/api`;
  }

  /**
   * Método genérico para fazer requisições HTTP
   */
  async request(endpoint, options = {}) {
    const url = `${this.apiURL}${endpoint}`;
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Adicionar token de autenticação se existir
    const token = this.getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    try {
      console.log(`🌐 API Request: ${config.method || 'GET'} ${url}`);
      
      const response = await fetch(url, config);
      
      // Verificar se a resposta é JSON
      const contentType = response.headers.get('content-type');
      let data;
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      console.log(`✅ API Response: ${response.status}`, data);
      return data;
      
    } catch (error) {
      console.error(`❌ API Error: ${config.method || 'GET'} ${url}`, error);
      throw error;
    }
  }

  /**
   * Métodos HTTP específicos
   */
  async get(endpoint, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;
    
    return this.request(url, {
      method: 'GET',
    });
  }

  async post(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE',
    });
  }

  /**
   * Métodos específicos para autenticação
   */
  
  // Login do médico
  async loginMedic(credentials) {
    try {
      const response = await this.post('/auth/login', credentials);
      
      if (response.success && response.token) {
        this.setAuthToken(response.token);
        localStorage.setItem('user', JSON.stringify({
          id: response.id,
          name: response.name,
          token: response.token
        }));
      }
      
      return response;
    } catch (error) {
      console.error('Erro no login:', error);
      throw error;
    }
  }

  // Criar médico
  async createMedic(medicData) {
    try {
      return await this.post('/auth/register', medicData);
    } catch (error) {
      console.error('Erro ao criar médico:', error);
      throw error;
    }
  }

  // Logout
  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  }

  /**
   * Métodos específicos para salas
   */
  
  // Criar sala
  async createRoom(roomData) {
    try {
      return await this.post('/rooms', roomData);
    } catch (error) {
      console.error('Erro ao criar sala:', error);
      throw error;
    }
  }

  // Listar todas as salas
  async getRooms() {
    try {
      return await this.get('/rooms');
    } catch (error) {
      console.error('Erro ao buscar salas:', error);
      throw error;
    }
  }

  // Listar salas de um médico específico
  async getMedicRooms(medicId) {
    try {
      return await this.get(`/medic/${medicId}/rooms`);
    } catch (error) {
      console.error('Erro ao buscar salas do médico:', error);
      throw error;
    }
  }

  /**
   * Métodos para gerenciamento de token
   */
  
  setAuthToken(token) {
    localStorage.setItem('authToken', token);
  }

  getAuthToken() {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('authToken');
    }
    return null;
  }

  isAuthenticated() {
    return !!this.getAuthToken();
  }

  getCurrentUser() {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    }
    return null;
  }

  /**
   * Método para verificar se o backend está online
   */
  async healthCheck() {
    try {
      const response = await fetch(`${this.baseURL}/health`);
      return response.ok;
    } catch (error) {
      console.error('Backend não está acessível:', error);
      return false;
    }
  }
}

// Exportar instância singleton
const apiService = new ApiService();
export default apiService;

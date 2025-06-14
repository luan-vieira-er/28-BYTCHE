import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import apiService from '@/services/api.service'

export const useAuthStore = create(
  persist(
    (set, get) => ({
      // Estado da autenticação
      authToken: null,
      user: null,
      isAuthenticated: false,

      // Actions
      setAuth: (token, userData) => {
        set({
          authToken: token,
          user: userData,
          isAuthenticated: true
        })

        // Sincronizar com apiService
        if (token) {
          apiService.setAuthToken(token)
          localStorage.setItem('user', JSON.stringify(userData))
        }
      },

      clearAuth: () => {
        set({
          authToken: null,
          user: null,
          isAuthenticated: false
        })

        // Limpar do apiService e localStorage
        apiService.logout()
      },

      // Inicializar autenticação do localStorage
      initAuth: () => {
        if (typeof window !== 'undefined') {
          const token = localStorage.getItem('authToken')
          const userData = localStorage.getItem('user')

          if (token && userData) {
            try {
              const parsedUser = JSON.parse(userData)
              set({
                authToken: token,
                user: parsedUser,
                isAuthenticated: true
              })

              // Sincronizar com apiService
              apiService.setAuthToken(token)
            } catch (error) {
              console.error('Erro ao carregar dados de autenticação:', error)
              get().clearAuth()
            }
          }
        }
      },

      // Verificar se o token ainda é válido
      checkAuthValidity: () => {
        const { authToken } = get()

        if (!authToken) {
          return false
        }

        // Verificar se o token ainda existe no localStorage
        const storedToken = localStorage.getItem('authToken')
        if (!storedToken || storedToken !== authToken) {
          get().clearAuth()
          return false
        }

        return true
      },

      // Login
      login: async (credentials) => {
        try {
          const response = await apiService.loginMedic(credentials)

          if (response.success && response.token) {
            const userData = {
              id: response.id,
              name: response.name,
              token: response.token
            }

            get().setAuth(response.token, userData)
            return { success: true, data: response }
          } else {
            return { success: false, message: response.message || 'Erro no login' }
          }
        } catch (error) {
          console.error('Erro no login:', error)
          return { success: false, message: 'Erro ao fazer login. Verifique suas credenciais.' }
        }
      },

      // Logout
      logout: () => {
        get().clearAuth()
      },

      // Registrar novo médico
      register: async (medicData) => {
        try {
          const response = await apiService.createMedic(medicData)
          return { success: response.success, message: response.message }
        } catch (error) {
          console.error('Erro ao criar conta:', error)
          return { success: false, message: 'Erro ao criar conta. Tente novamente.' }
        }
      },

      // Utilitários
      getCurrentUser: () => {
        return get().user
      },

      getAuthToken: () => {
        return get().authToken
      },

      isLoggedIn: () => {
        return get().isAuthenticated && !!get().authToken
      }
    }),
    {
      name: 'doctor-pixel-auth',
      partialize: (state) => ({
        authToken: state.authToken,
        user: state.user,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
)

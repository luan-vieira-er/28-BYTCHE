import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useGameStore = create(
  persist(
    (set, get) => ({
      // Estado do jogador
      playerPosition: { x: 300, y: 500 },
      playerHealth: 100,
      playerName: '',
      playerAge: 0,
      playerAvatar: 'child1',
      selectedLocation: 'fazendinha', // Localização selecionada pelo paciente

      // Progresso do jogo
      gameProgress: 'intro',
      completedActivities: [],
      currentScore: 0,
      achievements: [],

      // Sistema de missões específicas
      missionProgress: {
        talkedToDoctor: false,
        exploredAreas: 0,
        completedTriage: false
      },

      // Estado da triagem médica
      triageData: {
        symptoms: [],
        severity: 'unknown',
        recommendations: [],
        completed: false
      },

      // Configurações
      soundEnabled: true,
      musicEnabled: true,
      difficulty: 'easy',

      // Actions
      updatePlayerPosition: (position) => set({ playerPosition: position }),

      updatePlayerHealth: (health) => set({ playerHealth: health }),

      setPlayerInfo: (name, age, avatar) => set({
        playerName: name,
        playerAge: age,
        playerAvatar: avatar
      }),

      setSelectedLocation: (location) => set({ selectedLocation: location }),

      updateGameProgress: (progress) => set({ gameProgress: progress }),

      addCompletedActivity: (activity) => set((state) => ({
        completedActivities: [...state.completedActivities, activity]
      })),

      updateScore: (points) => set((state) => ({
        currentScore: state.currentScore + points
      })),

      addAchievement: (achievement) => set((state) => ({
        achievements: [...state.achievements, achievement]
      })),

      // Ações para missões específicas
      completeMission: (missionKey) => set((state) => ({
        missionProgress: {
          ...state.missionProgress,
          [missionKey]: true
        }
      })),

      incrementExploredAreas: () => set((state) => ({
        missionProgress: {
          ...state.missionProgress,
          exploredAreas: Math.min(state.missionProgress.exploredAreas + 1, 3)
        }
      })),

      updateMissionProgress: (updates) => set((state) => ({
        missionProgress: {
          ...state.missionProgress,
          ...updates
        }
      })),

      updateTriageData: (data) => set((state) => ({
        triageData: { ...state.triageData, ...data }
      })),

      completeTriageStep: (step, data) => set((state) => {
        const newTriageData = { ...state.triageData }

        switch (step) {
          case 'symptoms':
            newTriageData.symptoms = data
            break
          case 'severity':
            newTriageData.severity = data
            break
          case 'recommendations':
            newTriageData.recommendations = data
            newTriageData.completed = true
            break
        }

        return { triageData: newTriageData }
      }),

      resetTriageData: () => set({
        triageData: {
          symptoms: [],
          severity: 'unknown',
          recommendations: [],
          completed: false
        }
      }),

      toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),

      toggleMusic: () => set((state) => ({ musicEnabled: !state.musicEnabled })),

      setDifficulty: (difficulty) => set({ difficulty }),

      resetGame: () => set({
        playerPosition: { x: 300, y: 500 },
        playerHealth: 100,
        gameProgress: 'intro',
        completedActivities: [],
        currentScore: 0,
        missionProgress: {
          talkedToDoctor: false,
          exploredAreas: 0,
          completedTriage: false
        },
        triageData: {
          symptoms: [],
          severity: 'unknown',
          recommendations: [],
          completed: false
        }
      }),

      // Funções utilitárias
      getPlayerLevel: () => {
        const score = get().currentScore
        if (score < 100) return 1
        if (score < 300) return 2
        if (score < 600) return 3
        if (score < 1000) return 4
        return 5
      },

      getNextLevelScore: () => {
        const level = get().getPlayerLevel()
        const thresholds = [100, 300, 600, 1000, 2000]
        return thresholds[level - 1] || 2000
      },

      hasAchievement: (achievementId) => {
        return get().achievements.some(a => a.id === achievementId)
      },

      canAccessArea: (area) => {
        const progress = get().gameProgress
        const completedActivities = get().completedActivities

        switch (area) {
          case 'triage':
            return progress !== 'intro'
          case 'pharmacy':
            return completedActivities.includes('triage_basic')
          case 'specialist':
            return completedActivities.includes('triage_complete')
          default:
            return true
        }
      }
    }),
    {
      name: 'medical-triage-game',
      partialize: (state) => ({
        playerName: state.playerName,
        playerAge: state.playerAge,
        playerAvatar: state.playerAvatar,
        selectedLocation: state.selectedLocation,
        gameProgress: state.gameProgress,
        completedActivities: state.completedActivities,
        currentScore: state.currentScore,
        achievements: state.achievements,
        missionProgress: state.missionProgress,
        soundEnabled: state.soundEnabled,
        musicEnabled: state.musicEnabled,
        difficulty: state.difficulty
      })
    }
  )
)

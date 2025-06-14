import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '@/store/gameStore'

const GameUI = ({ playerHealth, gameProgress, onExit }) => {
  const [showMenu, setShowMenu] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  
  const {
    currentScore,
    playerName,
    achievements,
    soundEnabled,
    musicEnabled,
    toggleSound,
    toggleMusic,
    getPlayerLevel,
    getNextLevelScore
  } = useGameStore()

  const playerLevel = getPlayerLevel()
  const nextLevelScore = getNextLevelScore()
  const progressToNextLevel = ((currentScore % nextLevelScore) / nextLevelScore) * 100

  return (
    <>
      {/* HUD Principal */}
      <div className="fixed top-0 left-0 right-0 z-40 p-4">
        <div className="flex items-center justify-between">
          {/* Info do Player */}
          <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {playerName ? playerName[0].toUpperCase() : 'P'}
              </div>
              <div>
                <div className="font-bold text-gray-800">
                  {playerName || 'Jogador'}
                </div>
                <div className="text-sm text-gray-600">
                  Nível {playerLevel}
                </div>
              </div>
            </div>
            
            {/* Barra de Saúde */}
            <div className="mt-3">
              <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                <span>Saúde</span>
                <span>{playerHealth}%</span>
              </div>
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${playerHealth}%` }}
                  className={`h-2 rounded-full ${
                    playerHealth > 70 ? 'bg-green-500' :
                    playerHealth > 30 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </div>

          {/* Score e Nível */}
          <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {currentScore.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">pontos</div>
            </div>
            
            {/* Progresso do Nível */}
            <div className="mt-2 w-24">
              <div className="text-xs text-gray-500 mb-1">
                Próximo nível
              </div>
              <div className="bg-gray-200 rounded-full h-1">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressToNextLevel}%` }}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-1 rounded-full"
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </div>

          {/* Menu Button */}
          <button
            onClick={() => setShowMenu(true)}
            className="bg-white bg-opacity-90 backdrop-blur-sm rounded-2xl p-4 shadow-lg hover:bg-opacity-100 transition-all"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Conquistas Recentes */}
      <AnimatePresence>
        {achievements.length > 0 && (
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            className="fixed top-20 right-4 z-40"
          >
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-2xl p-4 shadow-lg max-w-xs">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">🏆</div>
                <div>
                  <div className="font-bold">Nova Conquista!</div>
                  <div className="text-sm opacity-90">
                    {achievements[achievements.length - 1]?.name}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controles de Movimento (Mobile) */}
      <div className="fixed bottom-4 left-4 z-40 md:hidden">
        <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
          <div className="grid grid-cols-3 gap-2 w-32 h-32">
            <div></div>
            <button className="bg-blue-500 text-white rounded-lg flex items-center justify-center text-xl">
              ↑
            </button>
            <div></div>
            <button className="bg-blue-500 text-white rounded-lg flex items-center justify-center text-xl">
              ←
            </button>
            <div className="bg-gray-300 rounded-lg"></div>
            <button className="bg-blue-500 text-white rounded-lg flex items-center justify-center text-xl">
              →
            </button>
            <div></div>
            <button className="bg-blue-500 text-white rounded-lg flex items-center justify-center text-xl">
              ↓
            </button>
            <div></div>
          </div>
        </div>
      </div>

      {/* Menu Principal */}
      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setShowMenu(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                Menu do Jogo
              </h2>
              
              <div className="space-y-4">
                <button
                  onClick={() => {
                    setShowMenu(false)
                    setShowSettings(true)
                  }}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-xl font-medium hover:from-blue-600 hover:to-purple-600 transition-all"
                >
                  ⚙️ Configurações
                </button>
                
                <button
                  onClick={() => setShowMenu(false)}
                  className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 rounded-xl font-medium hover:from-green-600 hover:to-blue-600 transition-all"
                >
                  🏆 Conquistas ({achievements.length})
                </button>
                
                <button
                  onClick={() => setShowMenu(false)}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-medium hover:from-purple-600 hover:to-pink-600 transition-all"
                >
                  📖 Como Jogar
                </button>
                
                <button
                  onClick={onExit}
                  className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 rounded-xl font-medium hover:from-red-600 hover:to-pink-600 transition-all"
                >
                  🚪 Sair do Jogo
                </button>
                
                <button
                  onClick={() => setShowMenu(false)}
                  className="w-full bg-gray-200 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-300 transition-all"
                >
                  ❌ Cancelar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Menu de Configurações */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setShowSettings(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                Configurações
              </h2>
              
              <div className="space-y-6">
                {/* Som */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🔊</span>
                    <span className="font-medium text-gray-700">Efeitos Sonoros</span>
                  </div>
                  <button
                    onClick={toggleSound}
                    className={`w-12 h-6 rounded-full transition-all ${
                      soundEnabled ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-all ${
                      soundEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
                
                {/* Música */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🎵</span>
                    <span className="font-medium text-gray-700">Música</span>
                  </div>
                  <button
                    onClick={toggleMusic}
                    className={`w-12 h-6 rounded-full transition-all ${
                      musicEnabled ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-all ${
                      musicEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
                
                <button
                  onClick={() => setShowSettings(false)}
                  className="w-full bg-blue-500 text-white py-3 rounded-xl font-medium hover:bg-blue-600 transition-all"
                >
                  ✅ Salvar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default GameUI

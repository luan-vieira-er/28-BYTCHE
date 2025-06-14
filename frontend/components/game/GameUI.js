import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '@/store/gameStore'

const GameUI = ({ playerHealth, gameProgress, onExit, onReconfigure, environmentName, showInstructions = true }) => {
  const [showMenu, setShowMenu] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  const {
    playerName,
    achievements,
    soundEnabled,
    musicEnabled,
    toggleSound,
    toggleMusic,
    getPlayerLevel
  } = useGameStore()

  const playerLevel = getPlayerLevel()

  // Sistema de missões
  const missions = [
    {
      id: 1,
      title: "Encontrar o Médico",
      description: "Localize e converse com o Dr. Pixel",
      completed: gameProgress?.talkedToDoctor || false,
      icon: "👨‍⚕️"
    },
    {
      id: 2,
      title: "Explorar o Hospital",
      description: "Visite todas as áreas do hospital",
      completed: gameProgress?.exploredAreas >= 3 || false,
      icon: "🏥"
    },
    {
      id: 3,
      title: "Realizar Triagem",
      description: "Complete uma avaliação médica",
      completed: gameProgress?.completedTriage || false,
      icon: "📋"
    }
  ]

  const completedMissions = missions.filter(m => m.completed).length
  const totalMissions = missions.length
  const missionProgress = (completedMissions / totalMissions) * 100

  return (
    <>
      {/* Card do Jogador - Topo Esquerda */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="fixed top-4 left-4 z-50"
      >
        <div className="bg-gradient-to-br from-[#131F24]/95 to-[#1A2B33]/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-[#56FF9E]/20">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-r from-[#56FF9E] to-[#4ECDC4] rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                {playerName ? playerName[0].toUpperCase() : 'P'}
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#56FF9E] rounded-full border-2 border-white animate-pulse flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              </div>
            </div>
            <div>
              <div className="font-bold text-white text-lg">
                {playerName || 'Jogador'}
              </div>
              <div className="text-sm text-[#56FF9E] flex items-center space-x-2">
                <span>⭐ Nível {playerLevel}</span>
                <span>•</span>
                <span className="flex items-center space-x-1">
                  <span>❤️</span>
                  <span>{playerHealth}%</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Painel de Missões - Topo Esquerda (abaixo do card do jogador) */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="fixed top-28 left-4 z-40"
      >
        <div className="bg-gradient-to-br from-[#131F24]/95 to-[#1A2B33]/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-[#56FF9E]/20 max-w-xs">
          {/* Sistema de Missões */}
          <div>
            <div className="flex items-center justify-between text-sm text-gray-300 mb-3">
              <span className="flex items-center space-x-1">
                <span>🎯</span>
                <span>Missões</span>
              </span>
              <span className="font-semibold text-[#56FF9E]">{completedMissions}/{totalMissions}</span>
            </div>

            {/* Lista de Missões */}
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {missions.map((mission) => (
                <div
                  key={mission.id}
                  className={`flex items-center space-x-3 p-2 rounded-lg border transition-all ${
                    mission.completed
                      ? 'bg-[#56FF9E]/10 border-[#56FF9E]/30 text-[#56FF9E]'
                      : 'bg-gray-700/30 border-gray-600/30 text-gray-300'
                  }`}
                >
                  <span className="text-lg">{mission.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className={`text-xs font-medium truncate ${
                      mission.completed ? 'text-[#56FF9E]' : 'text-white'
                    }`}>
                      {mission.title}
                    </div>
                    <div className="text-xs text-gray-400 truncate">
                      {mission.description}
                    </div>
                  </div>
                  {mission.completed && (
                    <div className="text-[#56FF9E] text-sm">✓</div>
                  )}
                </div>
              ))}
            </div>

            {/* Progresso Geral */}
            <div className="mt-3 pt-3 border-t border-gray-600/30">
              <div className="w-full bg-gray-700/50 rounded-full h-2 overflow-hidden border border-gray-600/30">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${missionProgress}%` }}
                  className="bg-gradient-to-r from-[#56FF9E] to-[#4ECDC4] h-2 rounded-full shadow-inner"
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
              <div className="text-xs text-gray-400 mt-1 text-center">
                Progresso: {Math.round(missionProgress)}%
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Nome do Ambiente - Topo Centro */}
      {environmentName && (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="fixed top-4 left-1/2 transform !-translate-x-1/2 z-50"
        >
          <div className="bg-gradient-to-r from-[#56FF9E]/20 to-[#4ECDC4]/20 backdrop-blur-md rounded-2xl px-6 py-3 border border-[#56FF9E]/30 shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-[#56FF9E] rounded-full animate-pulse"></div>
              <h1 className="text-lg font-bold text-white tracking-wide">
                {environmentName}
              </h1>
              <div className="w-3 h-3 bg-[#4ECDC4] rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Botão de Opções - Topo Direita */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="fixed top-4 right-4 z-50"
      >
        <div className="flex items-center space-x-3">
          {/* Progresso de Missões */}
          <div className="bg-gradient-to-br from-[#131F24]/95 to-[#1A2B33]/95 backdrop-blur-md rounded-2xl px-4 py-3 shadow-xl border border-[#56FF9E]/20">
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-[#56FF9E]">🎯</span>
              <span className="text-white font-medium">{completedMissions}/{totalMissions}</span>
              <div className="w-16 bg-gray-700/50 rounded-full h-2 overflow-hidden border border-gray-600/30">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${missionProgress}%` }}
                  className="bg-gradient-to-r from-[#56FF9E] to-[#4ECDC4] h-2 rounded-full"
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
            </div>
          </div>

          {/* Botão Menu */}
          <button
            onClick={() => setShowMenu(true)}
            className="bg-gradient-to-br from-[#131F24]/95 to-[#1A2B33]/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-[#56FF9E]/20 hover:border-[#56FF9E]/40 transition-all duration-200 group"
          >
            <svg className="w-6 h-6 text-[#56FF9E] group-hover:text-[#4ECDC4] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </motion.div>

      {/* Conquistas Recentes - Ajustadas para não sobrepor */}
      <AnimatePresence>
        {achievements.length > 0 && (
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            className="fixed top-24 right-4 z-40"
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

      {/* Card de Instruções Compacto - Centralizado na Parte Inferior */}
      {showInstructions && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed bottom-4 left-1/2 transform !-translate-x-1/2 z-40"
        >
          <div className="bg-gradient-to-br from-[#131F24]/95 to-[#1A2B33]/95 backdrop-blur-md rounded-xl px-4 py-2 border border-[#56FF9E]/20 shadow-xl">
            <div className="flex items-center justify-center space-x-4 text-xs text-gray-300">
              {/* Movimento Compacto */}
              <div className="flex items-center space-x-2">
                <span className="text-[#56FF9E] font-medium text-xs">🎮</span>
                <div className="flex space-x-1">
                  <kbd className="px-1.5 py-1 bg-gray-700/80 rounded text-xs font-mono text-white">↑ ↓ ← →</kbd>
                  <span className="text-gray-400 text-xs">ou</span>
                  <kbd className="px-1.5 py-1 bg-gray-700/80 rounded text-xs font-mono text-white">W A S D</kbd>
                </div>
              </div>

              {/* Separador */}
              <div className="w-px h-6 bg-gray-600/50"></div>

              {/* Interação Compacta */}
              <div className="flex items-center space-x-2">
                <kbd className="px-2 py-1 bg-gradient-to-r from-[#56FF9E] to-[#4ECDC4] text-gray-900 rounded text-xs font-mono font-bold">ESPAÇO</kbd>
                <span className="text-gray-300 text-xs">interagir</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Controles de Movimento (Mobile) */}
      <div className="fixed bottom-20 left-4 z-40 md:hidden">
        <div className="bg-gradient-to-br from-white/95 to-gray-50/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/20">
          <div className="grid grid-cols-3 gap-2 w-32 h-32">
            <div></div>
            <button className="bg-gradient-to-r from-[#56FF9E] to-[#4ECDC4] text-white rounded-lg flex items-center justify-center text-xl font-bold shadow-lg">
              ↑
            </button>
            <div></div>
            <button className="bg-gradient-to-r from-[#56FF9E] to-[#4ECDC4] text-white rounded-lg flex items-center justify-center text-xl font-bold shadow-lg">
              ←
            </button>
            <div className="bg-gray-300 rounded-lg"></div>
            <button className="bg-gradient-to-r from-[#56FF9E] to-[#4ECDC4] text-white rounded-lg flex items-center justify-center text-xl font-bold shadow-lg">
              →
            </button>
            <div></div>
            <button className="bg-gradient-to-r from-[#56FF9E] to-[#4ECDC4] text-white rounded-lg flex items-center justify-center text-xl font-bold shadow-lg">
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
              className="rounded-3xl p-8 max-w-md w-full mx-4 bg-inherit"
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

                {onReconfigure && (
                  <button
                    onClick={onReconfigure}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-xl font-medium hover:from-blue-600 hover:to-purple-600 transition-all"
                  >
                    ⚙️ Reconfigurar Personagem
                  </button>
                )}

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

      {/* Menu de Configurações Modernizado */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setShowSettings(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-md rounded-3xl p-8 max-w-md w-full mx-4 border border-gray-600/30 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
                  <span>⚙️</span>
                  <span>Configurações</span>
                </h2>
                <button
                  onClick={() => setShowSettings(false)}
                  className="text-gray-400 hover:text-white text-xl p-2 rounded-full hover:bg-gray-700/50 transition-all"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                {/* Som */}
                <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-xl border border-gray-600/30">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🔊</span>
                    <span className="font-medium text-gray-300">Efeitos Sonoros</span>
                  </div>
                  <button
                    onClick={toggleSound}
                    className={`w-14 h-7 rounded-full transition-all duration-300 ${
                      soundEnabled
                        ? 'bg-gradient-to-r from-[#56FF9E] to-[#4ECDC4]'
                        : 'bg-gray-600'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-all duration-300 shadow-lg ${
                      soundEnabled ? 'translate-x-7' : 'translate-x-1'
                    }`} />
                  </button>
                </div>

                {/* Música */}
                <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-xl border border-gray-600/30">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🎵</span>
                    <span className="font-medium text-gray-300">Música</span>
                  </div>
                  <button
                    onClick={toggleMusic}
                    className={`w-14 h-7 rounded-full transition-all duration-300 ${
                      musicEnabled
                        ? 'bg-gradient-to-r from-[#56FF9E] to-[#4ECDC4]'
                        : 'bg-gray-600'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-all duration-300 shadow-lg ${
                      musicEnabled ? 'translate-x-7' : 'translate-x-1'
                    }`} />
                  </button>
                </div>

                {/* Qualidade Gráfica */}
                <div className="p-4 bg-gray-700/30 rounded-xl border border-gray-600/30">
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="text-2xl">🎨</span>
                    <span className="font-medium text-gray-300">Qualidade Gráfica</span>
                  </div>
                  <select className="w-full bg-gray-600 text-white rounded-lg p-2 border border-gray-500 focus:border-[#56FF9E] focus:outline-none">
                    <option value="high">Alta</option>
                    <option value="medium">Média</option>
                    <option value="low">Baixa</option>
                  </select>
                </div>

                <button
                  onClick={() => setShowSettings(false)}
                  className="w-full bg-gradient-to-r from-[#56FF9E] to-[#4ECDC4] text-gray-900 py-3 rounded-xl font-bold hover:from-[#4ECDC4] hover:to-[#56FF9E] transition-all duration-200 shadow-lg"
                >
                  ✅ Salvar Configurações
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

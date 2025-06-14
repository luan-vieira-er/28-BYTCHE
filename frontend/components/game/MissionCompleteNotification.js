import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

const MissionCompleteNotification = ({ mission, onComplete }) => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(() => onComplete(), 300) // Aguardar animação de saída
    }, 3000) // Mostrar por 3 segundos

    return () => clearTimeout(timer)
  }, [onComplete])

  if (!mission) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: 400, opacity: 0, scale: 0.8 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          exit={{ x: 400, opacity: 0, scale: 0.8 }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 30,
            duration: 0.5 
          }}
          className="fixed top-32 right-4 z-60 max-w-sm"
        >
          <div className="bg-gradient-to-br from-[#56FF9E]/95 to-[#4ECDC4]/95 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-[#56FF9E]/30">
            {/* Header com ícone de sucesso */}
            <div className="flex items-center space-x-3 mb-3">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 400 }}
                className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg"
              >
                <span className="text-2xl">✅</span>
              </motion.div>
              <div>
                <motion.h3 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-lg font-bold text-gray-900"
                >
                  Missão Completada!
                </motion.h3>
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-sm text-gray-700"
                >
                  Parabéns! 🎉
                </motion.p>
              </div>
            </div>

            {/* Detalhes da missão */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white/20 rounded-xl p-3 backdrop-blur-sm"
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{mission.icon}</span>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 text-sm">
                    {mission.title}
                  </div>
                  <div className="text-xs text-gray-700 opacity-90">
                    {mission.description}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Barra de progresso animada */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-3"
            >
              <div className="w-full bg-white/30 rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.7, duration: 1, ease: "easeOut" }}
                  className="bg-white h-2 rounded-full shadow-inner"
                />
              </div>
              <div className="text-xs text-gray-700 mt-1 text-center font-medium">
                +50 XP
              </div>
            </motion.div>

            {/* Partículas de celebração */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ 
                    opacity: 0, 
                    scale: 0,
                    x: "50%",
                    y: "50%"
                  }}
                  animate={{ 
                    opacity: [0, 1, 0], 
                    scale: [0, 1, 0],
                    x: `${50 + (Math.random() - 0.5) * 200}%`,
                    y: `${50 + (Math.random() - 0.5) * 200}%`
                  }}
                  transition={{ 
                    delay: 0.8 + i * 0.1, 
                    duration: 1.5,
                    ease: "easeOut"
                  }}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    background: i % 3 === 0 ? '#FFD93D' : i % 3 === 1 ? '#FF6B9D' : '#56FF9E'
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default MissionCompleteNotification

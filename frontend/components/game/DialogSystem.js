import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const DialogSystem = ({ dialog, onChoice, onClose, isReadOnly = false }) => {
  const [currentText, setCurrentText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const [showOptions, setShowOptions] = useState(false)

  useEffect(() => {
    if (!dialog?.message) return

    setCurrentText('')
    setIsTyping(true)
    setShowOptions(false)

    let index = 0
    const typingInterval = setInterval(() => {
      if (index < dialog.message.length) {
        setCurrentText(dialog.message.slice(0, index + 1))
        index++
      } else {
        setIsTyping(false)
        setShowOptions(true)
        clearInterval(typingInterval)
      }
    }, 50)

    return () => clearInterval(typingInterval)
  }, [dialog?.message])

  if (!dialog) return null

  const getNPCAvatar = (npc) => {
    switch (npc) {
      case 'doctor':
        return '👨‍⚕️'
      case 'nurse':
        return '👩‍⚕️'
      case 'receptionist':
        return '👩‍💼'
      default:
        return '🤖'
    }
  }

  const getNPCName = (npc) => {
    switch (npc) {
      case 'doctor':
        return 'Dr. Pixel'
      case 'nurse':
        return 'Enfermeira Ana'
      case 'receptionist':
        return 'Recepcionista'
      default:
        return 'NPC'
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50"
        onClick={isReadOnly ? null : onClose}
      >
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-white rounded-t-3xl shadow-2xl w-full max-w-4xl mx-4 mb-0"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header do diálogo */}
          <div className="bg-gradient-to-r from-blue-500 to-green-500 rounded-t-3xl p-4">
            <div className="flex items-center space-x-4">
              <div className="text-4xl bg-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg">
                {getNPCAvatar(dialog.npc)}
              </div>
              <div className="text-white">
                <h3 className="text-xl font-bold">{getNPCName(dialog.npc)}</h3>
                <p className="text-blue-100 text-sm">Especialista em IA Médica</p>
              </div>
              {!isReadOnly && (
                <div className="ml-auto">
                  <button
                    onClick={onClose}
                    className="text-white hover:text-gray-200 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-white hover:bg-opacity-20 transition-all"
                  >
                    ×
                  </button>
                </div>
              )}
              {isReadOnly && (
                <div className="ml-auto">
                  <div className="bg-yellow-500 text-yellow-900 px-3 py-1 rounded-full text-sm font-medium">
                    👨‍⚕️ Visualização Médica
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Conteúdo do diálogo */}
          <div className="p-6">
            {/* Balão de fala */}
            <div className="bg-gray-50 rounded-2xl p-6 mb-6 relative">
              <div className="absolute -top-3 left-8 w-6 h-6 bg-gray-50 transform rotate-45"></div>
              <p className="text-lg text-gray-800 leading-relaxed min-h-[60px]">
                {currentText}
                {isTyping && (
                  <span className="inline-block w-1 h-6 bg-blue-500 ml-1 animate-pulse"></span>
                )}
              </p>

              {/* Indicador de IA ativa */}
              {dialog.message && dialog.message.includes('pensar') && (
                <div className="flex items-center justify-center mt-4">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="ml-2 text-sm text-gray-600">IA processando...</span>
                </div>
              )}
            </div>

            {/* Opções de resposta */}
            <AnimatePresence>
              {showOptions && dialog.options && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-3"
                >
                  <h4 className="text-sm font-semibold text-gray-600 mb-3">
                    {isReadOnly ? 'Opções disponíveis para o paciente:' : 'Como você gostaria de responder?'}
                  </h4>
                  {dialog.options.map((option, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      onClick={isReadOnly ? null : () => onChoice(option)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                        isReadOnly
                          ? 'bg-gray-100 border-gray-300 cursor-default'
                          : 'bg-gradient-to-r from-blue-50 to-green-50 hover:from-blue-100 hover:to-green-100 border-transparent hover:border-blue-300 transform hover:scale-[1.02] cursor-pointer group'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 text-white rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                          isReadOnly ? 'bg-gray-500' : 'bg-blue-500 group-hover:bg-blue-600'
                        }`}>
                          {index + 1}
                        </div>
                        <span className={`font-medium ${
                          isReadOnly ? 'text-gray-600' : 'text-gray-800 group-hover:text-gray-900'
                        }`}>
                          {typeof option.text === 'string' ? option.text :
                           typeof option.text === 'object' ? JSON.stringify(option.text) :
                           String(option.text || 'Opção')}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Dica para pular animação */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center mt-4"
              >
                <p className="text-xs text-gray-500">
                  Clique em qualquer lugar para acelerar o texto
                </p>
              </motion.div>
            )}
          </div>

          {/* Footer com informações extras */}
          <div className="bg-gray-50 rounded-b-3xl p-4 border-t">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>IA Ativa</span>
              </div>
              <div className="flex items-center space-x-4">
                <span>💡 Dica: Seja honesto sobre como se sente</span>
                <span>🎮 ESC para fechar</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default DialogSystem

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '@/store/gameStore'

const TriageSystem = ({ onComplete, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [score, setScore] = useState(0)
  const [showResults, setShowResults] = useState(false)
  
  const { updateScore, addAchievement } = useGameStore()

  const triageSteps = [
    {
      id: 'feeling',
      title: '🌟 Como você está se sentindo?',
      type: 'emoji_selection',
      question: 'Escolha o emoji que melhor representa como você se sente hoje:',
      options: [
        { emoji: '😊', text: 'Muito bem!', value: 'great', points: 10 },
        { emoji: '😐', text: 'Normal', value: 'okay', points: 5 },
        { emoji: '😔', text: 'Não muito bem', value: 'bad', points: 0 },
        { emoji: '😷', text: 'Doente', value: 'sick', points: 0 }
      ]
    },
    {
      id: 'symptoms',
      title: '🔍 Vamos investigar os sintomas',
      type: 'symptom_checker',
      question: 'Clique nos sintomas que você está sentindo (se houver):',
      options: [
        { icon: '🤒', text: 'Febre', value: 'fever', severity: 'medium' },
        { icon: '😵', text: 'Dor de cabeça', value: 'headache', severity: 'low' },
        { icon: '🤧', text: 'Nariz entupido', value: 'congestion', severity: 'low' },
        { icon: '😴', text: 'Muito cansado', value: 'fatigue', severity: 'low' },
        { icon: '🤢', text: 'Enjoo', value: 'nausea', severity: 'medium' },
        { icon: '💔', text: 'Dor no peito', value: 'chest_pain', severity: 'high' },
        { icon: '🫁', text: 'Dificuldade para respirar', value: 'breathing', severity: 'high' },
        { icon: '✨', text: 'Nenhum sintoma', value: 'none', severity: 'none' }
      ]
    },
    {
      id: 'pain_scale',
      title: '📊 Escala de Dor Divertida',
      type: 'pain_scale',
      question: 'Se você sente alguma dor, qual o nível? (0 = sem dor, 10 = muita dor)',
      options: Array.from({ length: 11 }, (_, i) => ({
        value: i,
        emoji: getPainEmoji(i),
        text: getPainText(i)
      }))
    },
    {
      id: 'activities',
      title: '🎮 Atividades do Dia',
      type: 'activity_check',
      question: 'O que você conseguiu fazer hoje?',
      options: [
        { icon: '🏃', text: 'Correr e brincar', value: 'active', points: 10 },
        { icon: '🚶', text: 'Caminhar normalmente', value: 'walking', points: 8 },
        { icon: '🪑', text: 'Ficar sentado', value: 'sitting', points: 5 },
        { icon: '🛏️', text: 'Ficar na cama', value: 'bed_rest', points: 2 }
      ]
    },
    {
      id: 'mood',
      title: '💭 Como está seu humor?',
      type: 'mood_check',
      question: 'Escolha a carinha que representa seu humor hoje:',
      options: [
        { emoji: '😄', text: 'Super feliz!', value: 'very_happy', points: 10 },
        { emoji: '😊', text: 'Feliz', value: 'happy', points: 8 },
        { emoji: '😐', text: 'Normal', value: 'neutral', points: 5 },
        { emoji: '😟', text: 'Preocupado', value: 'worried', points: 3 },
        { emoji: '😢', text: 'Triste', value: 'sad', points: 1 }
      ]
    }
  ]

  function getPainEmoji(level) {
    const emojis = ['😊', '🙂', '😐', '😕', '😟', '😣', '😖', '😫', '😩', '😭', '🤯']
    return emojis[level] || '😊'
  }

  function getPainText(level) {
    const texts = [
      'Sem dor', 'Quase nada', 'Um pouquinho', 'Incomoda um pouco',
      'Incomoda', 'Dói', 'Dói bastante', 'Dói muito', 'Dói demais',
      'Quase insuportável', 'Insuportável'
    ]
    return texts[level] || 'Sem dor'
  }

  const handleAnswer = (stepId, answer) => {
    const newAnswers = { ...answers, [stepId]: answer }
    setAnswers(newAnswers)
    
    // Adicionar pontos se a opção tiver
    if (answer.points) {
      setScore(prev => prev + answer.points)
    }
    
    // Avançar para próximo passo
    if (currentStep < triageSteps.length - 1) {
      setCurrentStep(prev => prev + 1)
    } else {
      // Finalizar triagem
      completeTriage(newAnswers)
    }
  }

  const completeTriage = (finalAnswers) => {
    // Calcular severidade baseada nas respostas
    const severity = calculateSeverity(finalAnswers)
    const recommendations = generateRecommendations(finalAnswers, severity)
    
    // Atualizar score no store
    updateScore(score)
    
    // Adicionar conquistas
    if (score >= 40) {
      addAchievement({ id: 'healthy_kid', name: 'Criança Saudável!', icon: '🌟' })
    }
    
    setShowResults(true)
    
    // Chamar callback com resultados
    setTimeout(() => {
      onComplete({
        answers: finalAnswers,
        severity,
        recommendations,
        score
      })
    }, 3000)
  }

  const calculateSeverity = (answers) => {
    let severityScore = 0
    
    // Analisar sintomas
    if (answers.symptoms) {
      if (Array.isArray(answers.symptoms)) {
        answers.symptoms.forEach(symptom => {
          if (symptom.severity === 'high') severityScore += 3
          else if (symptom.severity === 'medium') severityScore += 2
          else if (symptom.severity === 'low') severityScore += 1
        })
      }
    }
    
    // Analisar dor
    if (answers.pain_scale && answers.pain_scale.value > 7) {
      severityScore += 3
    } else if (answers.pain_scale && answers.pain_scale.value > 4) {
      severityScore += 2
    }
    
    // Analisar atividades
    if (answers.activities && answers.activities.value === 'bed_rest') {
      severityScore += 2
    }
    
    if (severityScore >= 5) return 'high'
    if (severityScore >= 2) return 'medium'
    return 'low'
  }

  const generateRecommendations = (answers, severity) => {
    const recommendations = []
    
    switch (severity) {
      case 'high':
        recommendations.push('🚨 Procure atendimento médico urgente')
        recommendations.push('💊 Siga as orientações médicas')
        recommendations.push('🏠 Descanse bastante')
        break
      case 'medium':
        recommendations.push('⚠️ Agende uma consulta médica')
        recommendations.push('💧 Beba bastante água')
        recommendations.push('😴 Descanse quando possível')
        break
      default:
        recommendations.push('✅ Continue cuidando bem da sua saúde!')
        recommendations.push('🏃 Mantenha-se ativo')
        recommendations.push('🥗 Coma alimentos saudáveis')
        recommendations.push('😴 Durma bem')
    }
    
    return recommendations
  }

  const currentStepData = triageSteps[currentStep]

  if (showResults) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center z-50"
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="bg-white rounded-3xl p-8 text-center max-w-md mx-4"
        >
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Triagem Completa!
          </h2>
          <div className="text-4xl font-bold text-blue-600 mb-2">
            {score} pontos
          </div>
          <p className="text-gray-600 mb-6">
            Parabéns! Você completou sua avaliação médica!
          </p>
          <div className="animate-spin text-4xl">⭐</div>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-t-3xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">{currentStepData.title}</h2>
                <p className="text-purple-100">
                  Passo {currentStep + 1} de {triageSteps.length}
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">{score}</div>
                <div className="text-sm text-purple-100">pontos</div>
              </div>
            </div>
            
            {/* Barra de progresso */}
            <div className="mt-4 bg-white bg-opacity-20 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep + 1) / triageSteps.length) * 100}%` }}
                className="bg-white rounded-full h-2"
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Conteúdo */}
          <div className="p-6">
            <p className="text-lg text-gray-700 mb-6 text-center">
              {currentStepData.question}
            </p>

            <div className="grid grid-cols-2 gap-4">
              {currentStepData.options.map((option, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleAnswer(currentStepData.id, option)}
                  className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 rounded-2xl border-2 border-transparent hover:border-blue-300 transition-all duration-200 transform hover:scale-105 group"
                >
                  <div className="text-center">
                    <div className="text-3xl mb-2">
                      {option.emoji || option.icon}
                    </div>
                    <div className="font-medium text-gray-800 group-hover:text-gray-900">
                      {option.text}
                    </div>
                    {option.points && (
                      <div className="text-sm text-blue-600 mt-1">
                        +{option.points} pts
                      </div>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 rounded-b-3xl p-4 text-center">
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-sm"
            >
              Cancelar triagem
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default TriageSystem

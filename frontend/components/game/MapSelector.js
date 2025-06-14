import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Componente para seleção de mapas/ambientes do jogo
 * Permite escolher entre diferentes tilesets e mapas
 */
const MapSelector = ({ onMapSelect, onClose }) => {
  const [selectedMap, setSelectedMap] = useState(null)

  // Configuração dos mapas disponíveis
  const availableMaps = [
    {
      id: 'tiny-town',
      name: 'Hospital Clássico',
      description: 'Um hospital aconchegante em uma pequena cidade. Perfeito para começar sua jornada médica!',
      tileset: 'tiny-town',
      mapData: 'hospitalMap',
      preview: '/assets/fazendinha.png',
      difficulty: 'Fácil',
      features: ['Ambiente familiar', 'NPCs amigáveis', 'Equipamentos básicos'],
      theme: 'rural',
      color: '#4CAF50'
    },
    {
      id: 'cidade',
      name: 'Hospital Urbano',
      description: 'Um moderno hospital na cidade grande. Tecnologia avançada e casos mais complexos!',
      tileset: 'cidade',
      mapData: 'cidadeMap',
      preview: '/assets/cidade.png',
      difficulty: 'Médio',
      features: ['Tecnologia moderna', 'Casos urbanos', 'Equipamentos avançados'],
      theme: 'urban',
      color: '#2196F3'
    },
    {
      id: 'polo-norte',
      name: 'Estação Médica Ártica',
      description: 'Uma estação de pesquisa no Polo Norte. Condições extremas e medicina de emergência!',
      tileset: 'polo-norte',
      mapData: 'poloNorteMap',
      preview: '/assets/polo-norte.png',
      difficulty: 'Difícil',
      features: ['Condições extremas', 'Medicina de emergência', 'Pesquisa científica'],
      theme: 'arctic',
      color: '#00BCD4'
    },
    {
      id: 'planeta',
      name: 'Hospital Espacial',
      description: 'Uma estação médica intergaláctica! Medicina do futuro com tecnologia alienígena!',
      tileset: 'planeta',
      mapData: 'planetaMap',
      preview: '/assets/planeta.png',
      difficulty: 'Extremo',
      features: ['Medicina futurista', 'Tecnologia alienígena', 'Gravidade artificial'],
      theme: 'space',
      color: '#9C27B0'
    }
  ]

  const handleMapSelect = (map) => {
    setSelectedMap(map)
  }

  const handleConfirm = () => {
    if (selectedMap && onMapSelect) {
      onMapSelect(selectedMap)
    }
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Fácil': return '#4CAF50'
      case 'Médio': return '#FF9800'
      case 'Difícil': return '#F44336'
      case 'Extremo': return '#9C27B0'
      default: return '#757575'
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        style={{ backdropFilter: 'blur(10px)' }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #131F24 0%, #1A2B33 100%)',
            border: '2px solid rgba(86, 255, 158, 0.3)'
          }}
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  🌍 Escolha seu Ambiente Médico
                </h2>
                <p className="text-gray-300">
                  Selecione o ambiente onde você quer praticar medicina
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white text-2xl p-2 rounded-full hover:bg-gray-700 transition-all"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Maps Grid */}
          <div className="p-6 overflow-y-auto max-h-[60vh]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {availableMaps.map((map) => (
                <motion.div
                  key={map.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleMapSelect(map)}
                  className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${
                    selectedMap?.id === map.id
                      ? 'ring-4 ring-[#56FF9E] shadow-lg shadow-[#56FF9E]/30'
                      : 'hover:shadow-xl'
                  }`}
                  style={{
                    background: 'rgba(26, 43, 51, 0.8)',
                    border: selectedMap?.id === map.id 
                      ? '2px solid #56FF9E' 
                      : '1px solid rgba(86, 255, 158, 0.2)'
                  }}
                >
                  {/* Preview Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={map.preview}
                      alt={map.name}
                      className="w-full h-full object-cover"
                      style={{ imageRendering: 'pixelated' }}
                    />
                    <div 
                      className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
                    />
                    
                    {/* Difficulty Badge */}
                    <div 
                      className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold text-white"
                      style={{ backgroundColor: getDifficultyColor(map.difficulty) }}
                    >
                      {map.difficulty}
                    </div>

                    {/* Selected Indicator */}
                    {selectedMap?.id === map.id && (
                      <div className="absolute top-4 left-4 w-8 h-8 bg-[#56FF9E] rounded-full flex items-center justify-center">
                        <span className="text-[#131F24] text-lg">✓</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {map.name}
                    </h3>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                      {map.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-2">
                      {map.features.map((feature, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-400">
                          <span className="text-[#56FF9E] mr-2">•</span>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-700 bg-gray-800/50">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-400">
                {selectedMap ? (
                  <span>
                    Selecionado: <span className="text-[#56FF9E] font-medium">{selectedMap.name}</span>
                  </span>
                ) : (
                  'Selecione um ambiente para continuar'
                )}
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={onClose}
                  className="px-6 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-gray-700 transition-all"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleConfirm}
                  disabled={!selectedMap}
                  className={`px-8 py-3 rounded-xl font-medium transition-all ${
                    selectedMap
                      ? 'bg-gradient-to-r from-[#56FF9E] to-[#3EE67A] text-[#131F24] hover:shadow-lg hover:shadow-[#56FF9E]/30'
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Começar Aventura! 🚀
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default MapSelector

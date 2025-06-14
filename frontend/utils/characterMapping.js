/**
 * Mapeamento entre personagens do ConfigStepper e sprites de personagens
 * Conecta as seleções do usuário com os assets de sprite correspondentes
 */

// Mapeamento de personagens jogáveis
export const CHARACTER_MAPPING = {
  // Personagens do ConfigStepper -> IDs dos sprites
  'Jorge': {
    spriteId: 'Jorge',
    name: 'Jorge',
    description: 'Jovem estudante de medicina',
    fallbackColor: 0x3182CE, // Azul
    personality: 'curious'
  },
  'Ana': {
    spriteId: 'Ana', 
    name: 'Ana',
    description: 'Enfermeira experiente',
    fallbackColor: 0xE53E3E, // Vermelho
    personality: 'caring'
  },
  'Zombie': {
    spriteId: 'Zombie',
    name: 'Zombie',
    description: 'Personagem especial',
    fallbackColor: 0x38A169, // Verde
    personality: 'mysterious'
  },
  'erik': {
    spriteId: 'erik',
    name: 'Erik',
    description: 'Médico residente',
    fallbackColor: 0x9F7AEA, // Roxo
    personality: 'analytical'
  }
}

// Mapeamento de médicos NPCs
export const DOCTOR_MAPPING = {
  // Médicos do ConfigStepper -> IDs dos sprites
  'dr-bot': {
    spriteId: 'dr-bot',
    name: 'Dr. Bot',
    title: 'Especialista em IA Médica',
    description: 'Médico robótico com inteligência artificial avançada',
    fallbackColor: 0x3B82F6, // Azul médico
    specialty: 'ai_medicine'
  },
  'dra-maria': {
    spriteId: 'dra-maria',
    name: 'Dra. Maria',
    title: 'Chefe de Medicina',
    description: 'Médica experiente e mentora',
    fallbackColor: 0x8B5CF6, // Roxo médico
    specialty: 'general_medicine'
  }
}

/**
 * Obtém configuração de personagem baseada na seleção do ConfigStepper
 */
export const getCharacterConfig = (playerConfig) => {
  if (!playerConfig?.character) {
    return CHARACTER_MAPPING['Jorge'] // Padrão
  }

  const characterId = playerConfig.character.id || playerConfig.character
  return CHARACTER_MAPPING[characterId] || CHARACTER_MAPPING['Jorge']
}

/**
 * Obtém configuração de médico baseada na seleção do ConfigStepper
 */
export const getDoctorConfig = (playerConfig) => {
  if (!playerConfig?.doctor) {
    return DOCTOR_MAPPING['dr-bot'] // Padrão
  }

  const doctorId = playerConfig.doctor.id || playerConfig.doctor
  return DOCTOR_MAPPING[doctorId] || DOCTOR_MAPPING['dr-bot']
}

/**
 * Obtém sprite ID correto para um personagem
 */
export const getCharacterSpriteId = (characterSelection) => {
  if (typeof characterSelection === 'string') {
    return CHARACTER_MAPPING[characterSelection]?.spriteId || 'Jorge'
  }
  
  if (characterSelection?.id) {
    return CHARACTER_MAPPING[characterSelection.id]?.spriteId || 'Jorge'
  }

  return 'Jorge'
}

/**
 * Obtém sprite ID correto para um médico
 */
export const getDoctorSpriteId = (doctorSelection) => {
  if (typeof doctorSelection === 'string') {
    return DOCTOR_MAPPING[doctorSelection]?.spriteId || 'dr-bot'
  }
  
  if (doctorSelection?.id) {
    return DOCTOR_MAPPING[doctorSelection.id]?.spriteId || 'dr-bot'
  }

  return 'dr-bot'
}

/**
 * Valida se um personagem existe
 */
export const isValidCharacter = (characterId) => {
  return CHARACTER_MAPPING.hasOwnProperty(characterId)
}

/**
 * Valida se um médico existe
 */
export const isValidDoctor = (doctorId) => {
  return DOCTOR_MAPPING.hasOwnProperty(doctorId)
}

/**
 * Lista todos os personagens disponíveis
 */
export const getAvailableCharacters = () => {
  return Object.keys(CHARACTER_MAPPING)
}

/**
 * Lista todos os médicos disponíveis
 */
export const getAvailableDoctors = () => {
  return Object.keys(DOCTOR_MAPPING)
}

/**
 * Obtém informações completas de um personagem
 */
export const getCharacterInfo = (characterId) => {
  return CHARACTER_MAPPING[characterId] || null
}

/**
 * Obtém informações completas de um médico
 */
export const getDoctorInfo = (doctorId) => {
  return DOCTOR_MAPPING[doctorId] || null
}

/**
 * Converte seleção do ConfigStepper para configuração de sprite
 */
export const convertConfigToSpriteConfig = (playerConfig) => {
  const characterConfig = getCharacterConfig(playerConfig)
  const doctorConfig = getDoctorConfig(playerConfig)

  return {
    player: {
      spriteId: characterConfig.spriteId,
      name: characterConfig.name,
      fallbackColor: characterConfig.fallbackColor,
      personality: characterConfig.personality
    },
    doctor: {
      spriteId: doctorConfig.spriteId,
      name: doctorConfig.name,
      title: doctorConfig.title,
      fallbackColor: doctorConfig.fallbackColor,
      specialty: doctorConfig.specialty
    }
  }
}

/**
 * Debug: Mostra mapeamento atual
 */
export const debugMapping = (playerConfig) => {
  console.group('🎭 Character Mapping Debug')
  console.log('PlayerConfig:', playerConfig)
  
  const characterConfig = getCharacterConfig(playerConfig)
  const doctorConfig = getDoctorConfig(playerConfig)
  
  console.log('Character Config:', characterConfig)
  console.log('Doctor Config:', doctorConfig)
  
  const spriteConfig = convertConfigToSpriteConfig(playerConfig)
  console.log('Final Sprite Config:', spriteConfig)
  
  console.groupEnd()
  
  return spriteConfig
}

export default {
  CHARACTER_MAPPING,
  DOCTOR_MAPPING,
  getCharacterConfig,
  getDoctorConfig,
  getCharacterSpriteId,
  getDoctorSpriteId,
  convertConfigToSpriteConfig,
  debugMapping
}

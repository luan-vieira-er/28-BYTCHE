/**
 * Dados do mapa do Planeta usando planeta-tileset.png
 * Representa um ambiente espacial futurista com estação médica intergaláctica
 */

import { PLANETA_CONFIG } from '@/utils/tilesetLoader'

export const PLANETA_MAP = {
  width: 25,  // 25 tiles de largura
  height: 17, // 17 tiles de altura
  tileWidth: 64,
  tileHeight: 64,
  tileset: 'planeta',

  layers: [
    // Camada 0: Terreno espacial base
    {
      name: "space_terrain",
      visible: true,
      data: [
        // Linha 0 - Espaço e terreno alienígena
        [8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8],
        // Linha 1 - Área externa da estação espacial
        [8,2,2,2,2,2,2,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8],
        // Linha 2 - Entrada da estação médica espacial
        [8,2,19,19,19,19,2,8,0,0,0,0,0,0,8,1,1,1,1,1,1,8,8,8,8],
        // Linha 3 - Área de descontaminação
        [8,2,18,18,18,18,2,8,0,0,0,0,0,0,8,1,1,1,1,1,1,8,8,8,8],
        // Linha 4 - Corredores da estação
        [8,2,18,18,18,18,2,8,0,0,0,0,0,0,8,1,1,1,1,1,1,8,8,8,8],
        // Linha 5 - Área de espera
        [8,2,23,23,23,23,2,8,0,0,0,0,0,0,8,1,1,1,1,1,1,8,8,8,8],
        // Linha 6 - Laboratório espacial
        [8,2,18,18,18,18,2,8,0,0,0,0,0,0,8,1,1,1,1,1,1,8,8,8,8],
        // Linha 7 - Enfermaria espacial
        [8,2,19,19,19,19,2,8,0,0,0,0,0,0,8,1,1,1,1,1,1,8,8,8,8],
        // Linha 8 - Área de tratamento avançado
        [8,2,27,27,27,27,2,8,0,0,0,0,0,0,8,1,1,1,1,1,1,8,8,8,8],
        // Linha 9 - Equipamentos médicos futuristas
        [8,2,27,27,27,27,2,8,0,0,0,0,0,0,8,1,1,1,1,1,1,8,8,8,8],
        // Linha 10 - Centro de comando médico
        [8,2,20,20,20,20,2,8,0,0,0,0,0,0,8,1,1,1,1,1,1,8,8,8,8],
        // Linha 11 - Área de pesquisa alienígena
        [8,2,18,18,18,18,2,8,0,0,0,0,0,0,8,1,1,1,1,1,1,8,8,8,8],
        // Linha 12 - Armazenamento de suprimentos
        [8,2,22,22,22,22,2,8,0,0,0,0,0,0,8,1,1,1,1,1,1,8,8,8,8],
        // Linha 13 - Depósito de medicamentos
        [8,2,22,22,22,22,2,8,0,0,0,0,0,0,8,1,1,1,1,1,1,8,8,8,8],
        // Linha 14 - Área de evacuação
        [8,2,18,18,18,18,2,8,0,0,0,0,0,0,8,1,1,1,1,1,1,8,8,8,8],
        // Linha 15 - Área externa
        [8,2,2,2,2,2,2,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8],
        // Linha 16 - Espaço profundo
        [8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8]
      ]
    },

    // Camada 1: Móveis e equipamentos espaciais
    {
      name: "space_furniture",
      visible: true,
      data: [
        // Linha 0
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        // Linha 1
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        // Linha 2
        [0,0,55,55,55,55,0,0,51,51,51,51,0,0,0,54,54,54,54,0,0,0,0,0,0],
        // Linha 3 - Consoles de controle
        [0,0,55,55,55,55,0,0,51,51,51,51,0,0,0,54,54,54,54,0,0,0,0,0,0],
        // Linha 4
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        // Linha 5 - Área de espera futurista
        [0,0,49,0,49,0,0,0,49,0,49,0,0,0,0,49,0,49,0,0,0,0,0,0,0],
        // Linha 6 - Equipamentos de laboratório
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        // Linha 7
        [0,0,0,0,0,0,0,0,49,0,49,0,0,0,0,49,0,49,0,0,0,0,0,0,0],
        // Linha 8 - Equipamentos médicos avançados
        [0,0,48,48,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        // Linha 9
        [0,0,48,48,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        // Linha 10 - Centro de comando
        [0,0,51,52,53,51,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        // Linha 11 - Equipamentos de pesquisa
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        // Linha 12 - Armazenamento quântico
        [0,0,56,56,56,56,0,0,56,56,56,56,0,0,0,56,56,56,56,0,0,0,0,0,0],
        // Linha 13
        [0,0,56,56,56,56,0,0,56,56,56,56,0,0,0,56,56,56,56,0,0,0,0,0,0],
        // Linha 14
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        // Linha 15
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        // Linha 16
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
      ]
    },

    // Camada 2: Equipamentos avançados e tecnologia alienígena
    {
      name: "advanced_tech",
      visible: true,
      data: [
        // Linha 0
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        // Linha 1 - Equipamentos externos
        [0,0,0,0,79,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        // Linha 2
        [0,0,0,0,0,0,0,0,0,0,76,0,0,0,0,0,0,77,0,0,0,0,0,0,0],
        // Linha 3
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        // Linha 4
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        // Linha 5 - Hologramas e projetores
        [0,78,0,0,0,0,78,0,0,0,0,0,0,0,0,0,0,0,0,0,78,0,0,0,0],
        // Linha 6
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        // Linha 7
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        // Linha 8
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        // Linha 9 - Scanners médicos avançados
        [0,0,0,0,72,0,0,0,0,0,72,0,0,0,0,0,0,72,0,0,0,0,0,0,0],
        // Linha 10 - IA e computadores quânticos
        [0,0,0,0,76,0,0,0,0,0,76,0,0,0,0,0,0,76,0,0,0,0,0,0,0],
        // Linha 11
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        // Linha 12
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        // Linha 13 - Núcleos de energia
        [0,0,0,0,75,0,0,0,0,0,75,0,0,0,0,0,0,75,0,0,0,0,0,0,0],
        // Linha 14
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        // Linha 15 - Teletransportadores
        [0,0,0,0,79,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        // Linha 16
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
      ]
    }
  ],

  // Mapa de colisão espacial otimizado (1 = sólido, 0 = passável)
  collision: [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,1,0,1,0,0,0,1,0,1,0,0,0,0,1,0,1,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,1,0,1,0,0,0,0,0,0,0],
    [0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,1,1,1,1,0,0,1,1,1,1,0,0,0,1,1,1,1,0,0,0,0,0,0],
    [0,0,1,1,1,1,0,0,1,1,1,1,0,0,0,1,1,1,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  ],

  // Pontos de spawn e interação
  spawnPoints: {
    player: { x: 3, y: 8 },
    doctor: { x: 12, y: 8 },
    alien_medic: { x: 18, y: 6 },
    ai_assistant: { x: 12, y: 10 }
  },

  // Áreas especiais
  areas: {
    decontamination: { x: 2, y: 3, width: 4, height: 1 },
    waiting_area: { x: 2, y: 5, width: 4, height: 1 },
    space_laboratory: { x: 2, y: 6, width: 4, height: 2 },
    medical_bay: { x: 2, y: 7, width: 4, height: 3 },
    command_center: { x: 2, y: 10, width: 4, height: 1 },
    research_wing: { x: 2, y: 11, width: 4, height: 1 },
    storage_quantum: { x: 2, y: 12, width: 4, height: 2 },
    observation_deck: { x: 9, y: 2, width: 4, height: 12 },
    alien_quarters: { x: 16, y: 2, width: 4, height: 12 }
  },

  // Condições ambientais especiais
  environment: {
    gravity: 0.8, // 80% da gravidade terrestre
    atmosphere: 'artificial', // atmosfera artificial
    radiation: 'shielded', // protegido contra radiação
    temperature: 22, // Celsius controlado
    hazards: ['vacuum_exposure', 'radiation_leak', 'alien_pathogens']
  },

  // Tecnologias disponíveis
  technology: {
    medical_scanners: 'quantum_level',
    healing_devices: 'nano_medicine',
    communication: 'galactic_network',
    transportation: 'teleportation',
    ai_assistance: 'advanced_ai'
  }
}

/**
 * Mapeamento dos IDs dos tiles usados no mapa do Planeta:
 *
 * TERRENOS:
 * - 0: ALIEN_SOIL_1 (solo alienígena)
 * - 1: ALIEN_SOIL_2 (solo alienígena variante)
 * - 2: CRYSTAL_GROUND (terreno cristalino)
 * - 8: ENERGY_FIELD (campo de energia)
 *
 * PISOS:
 * - 18: FLOOR_LABORATORY (piso de laboratório)
 * - 19: FLOOR_MEDICAL_BAY (piso da enfermaria)
 * - 20: FLOOR_BRIDGE (piso da ponte de comando)
 * - 22: FLOOR_CARGO_BAY (piso do compartimento de carga)
 * - 23: FLOOR_LIVING_QUARTERS (piso dos alojamentos)
 * - 27: GRAVITY_PLATE (placa de gravidade)
 *
 * MÓVEIS:
 * - 48: BED_SPACE (cama espacial)
 * - 49: CHAIR_CAPTAIN (cadeira do capitão)
 * - 51: CONSOLE_MAIN (console principal)
 * - 52: CONSOLE_NAVIGATION (console de navegação)
 * - 53: CONSOLE_WEAPONS (console de armas)
 * - 54: CONSOLE_ENGINEERING (console de engenharia)
 * - 55: CONSOLE_MEDICAL (console médico)
 * - 56: STORAGE_QUANTUM (armazenamento quântico)
 *
 * EQUIPAMENTOS:
 * - 72: MEDICAL_SCANNER (scanner médico)
 * - 75: POWER_CORE (núcleo de energia)
 * - 76: QUANTUM_COMPUTER (computador quântico)
 * - 77: AI_CORE (núcleo de IA)
 * - 78: HOLOGRAM_PROJECTOR (projetor de holograma)
 * - 79: TELEPORTER (teletransportador)
 */

export default PLANETA_MAP

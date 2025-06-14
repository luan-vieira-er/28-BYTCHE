/**
 * Dados do mapa do Polo Norte usando polo-norte-tileset.png
 * Representa um ambiente ártico com estação de pesquisa médica
 */

import { POLO_NORTE_CONFIG } from '@/utils/tilesetLoader'

export const POLO_NORTE_MAP = {
  width: 25,  // 25 tiles de largura
  height: 17, // 17 tiles de altura
  tileWidth: 16,
  tileHeight: 16,
  tileset: 'polo-norte',

  layers: [
    // Camada 0: Terreno ártico realista
    {
      name: "terrain",
      visible: true,
      data: [
        // Linha 0 - Paisagem ártica externa com neve
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        // Linha 1 - Área de aproximação da estação
        [1,2,2,3,3,3,3,3,2,1,1,1,1,1,1,2,3,3,3,3,3,2,1,1,1],
        // Linha 2 - Entrada principal da estação ártica
        [1,3,13,13,13,13,13,3,1,1,1,1,1,1,1,3,13,13,13,13,13,3,1,1,1],
        // Linha 3 - Hall de entrada aquecido
        [1,3,13,14,14,14,13,3,1,1,1,1,1,1,1,3,13,14,14,14,13,3,1,1,1],
        // Linha 4 - Corredores principais aquecidos
        [1,3,13,14,14,14,13,3,1,1,1,1,1,1,1,3,13,14,14,14,13,3,1,1,1],
        // Linha 5 - Área de descanso
        [1,3,13,13,13,13,13,3,1,1,1,1,1,1,1,3,13,13,13,13,13,3,1,1,1],
        // Linha 6 - Laboratório de pesquisa ártica
        [1,3,13,15,15,15,13,3,1,1,1,1,1,1,1,3,13,15,15,15,13,3,1,1,1],
        // Linha 7 - Centro médico de emergência
        [1,3,13,15,15,15,13,3,1,1,1,1,1,1,1,3,13,15,15,15,13,3,1,1,1],
        // Linha 8 - Enfermaria aquecida
        [1,3,13,14,14,14,13,3,1,1,1,1,1,1,1,3,13,14,14,14,13,3,1,1,1],
        // Linha 9 - Área de equipamentos especializados
        [1,3,13,16,16,16,13,3,1,1,1,1,1,1,1,3,13,16,16,16,13,3,1,1,1],
        // Linha 10 - Centro de comunicações
        [1,3,13,13,13,13,13,3,1,1,1,1,1,1,1,3,13,13,13,13,13,3,1,1,1],
        // Linha 11 - Área de suprimentos e armazenamento
        [1,3,13,16,16,16,13,3,1,1,1,1,1,1,1,3,13,16,16,16,13,3,1,1,1],
        // Linha 12 - Depósito de emergência
        [1,3,13,16,16,16,13,3,1,1,1,1,1,1,1,3,13,16,16,16,13,3,1,1,1],
        // Linha 13 - Área de manutenção
        [1,3,13,13,13,13,13,3,1,1,1,1,1,1,1,3,13,13,13,13,13,3,1,1,1],
        // Linha 14 - Saída de emergência
        [1,3,13,13,13,13,13,3,1,1,1,1,1,1,1,3,13,13,13,13,13,3,1,1,1],
        // Linha 15 - Perímetro externo da estação
        [1,3,3,3,3,3,3,3,2,1,1,1,1,1,2,3,3,3,3,3,3,3,2,1,1],
        // Linha 16 - Paisagem ártica externa
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
      ]
    },

    // Camada 1: Móveis e equipamentos árticos
    {
      name: "furniture",
      visible: true,
      data: [
        // Linha 0
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        // Linha 1
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        // Linha 2 - Entrada com equipamentos de segurança
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        // Linha 3 - Hall com móveis aquecidos
        [0,0,0,37,0,37,0,0,0,0,0,0,0,0,0,0,37,0,37,0,0,0,0,0,0],
        // Linha 4 - Corredores com aquecedores
        [0,0,38,0,0,0,38,0,0,0,0,0,0,0,0,38,0,0,0,38,0,0,0,0,0],
        // Linha 5 - Área de descanso com camas térmicas
        [0,0,0,36,36,36,0,0,0,0,0,0,0,0,0,0,36,36,36,0,0,0,0,0,0],
        // Linha 6 - Laboratório com equipamentos especializados
        [0,0,0,39,39,39,0,0,0,0,0,0,0,0,0,0,39,39,39,0,0,0,0,0,0],
        // Linha 7 - Centro médico com macas aquecidas
        [0,0,0,36,0,36,0,0,0,0,0,0,0,0,0,0,36,0,36,0,0,0,0,0,0],
        // Linha 8 - Enfermaria com equipamentos médicos
        [0,0,0,36,36,36,0,0,0,0,0,0,0,0,0,0,36,36,36,0,0,0,0,0,0],
        // Linha 9 - Área de equipamentos com armazenamento
        [0,0,0,40,40,40,0,0,0,0,0,0,0,0,0,0,40,40,40,0,0,0,0,0,0],
        // Linha 10 - Centro de comunicações
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        // Linha 11 - Área de suprimentos com equipamentos de comunicação
        [0,0,0,41,0,41,0,0,0,0,0,0,0,0,0,0,41,0,41,0,0,0,0,0,0],
        // Linha 12 - Depósito com armazenamento térmico
        [0,0,0,40,40,40,0,0,0,0,0,0,0,0,0,0,40,40,40,0,0,0,0,0,0],
        // Linha 13 - Área de manutenção com ferramentas
        [0,0,0,39,0,39,0,0,0,0,0,0,0,0,0,0,39,0,39,0,0,0,0,0,0],
        // Linha 14
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        // Linha 15
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        // Linha 16
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
      ]
    },

    // Camada 2: Equipamentos especiais e tecnologia ártica
    {
      name: "equipment",
      visible: true,
      data: [
        // Linha 0 - Paisagem externa com marcos
        [0,0,0,71,0,0,0,71,0,0,0,71,0,0,0,71,0,0,0,71,0,0,0,71,0],
        // Linha 1 - Equipamentos externos e sinalizações
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        // Linha 2 - Entrada com sistemas de segurança
        [0,0,72,0,0,0,72,0,0,0,0,0,0,0,0,0,72,0,0,0,72,0,0,0,0],
        // Linha 3 - Hall com sistemas de aquecimento
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        // Linha 4 - Corredores com sensores térmicos
        [0,0,0,72,0,72,0,0,0,0,0,0,0,0,0,0,72,0,72,0,0,0,0,0,0],
        // Linha 5 - Área de descanso com aquecedores
        [0,0,53,0,0,0,53,0,0,0,0,0,0,0,0,53,0,0,0,53,0,0,0,0,0],
        // Linha 6 - Laboratório com equipamentos de pesquisa
        [0,0,0,0,72,0,0,0,0,0,0,0,0,0,0,0,0,72,0,0,0,0,0,0,0],
        // Linha 7 - Centro médico com monitores
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        // Linha 8 - Enfermaria com equipamentos médicos
        [0,0,0,0,72,0,0,0,0,0,0,0,0,0,0,0,0,72,0,0,0,0,0,0,0],
        // Linha 9 - Área de equipamentos com geradores
        [0,0,59,0,0,0,59,0,0,0,0,0,0,0,0,59,0,0,0,59,0,0,0,0,0],
        // Linha 10 - Centro de comunicações com antenas
        [0,0,0,73,0,73,0,0,0,0,0,0,0,0,0,0,73,0,73,0,0,0,0,0,0],
        // Linha 11 - Área de suprimentos com sistemas de comunicação
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        // Linha 12 - Depósito com sistemas de monitoramento
        [0,0,0,0,72,0,0,0,0,0,0,0,0,0,0,0,0,72,0,0,0,0,0,0,0],
        // Linha 13 - Área de manutenção com geradores de backup
        [0,0,59,0,0,0,59,0,0,0,0,0,0,0,0,59,0,0,0,59,0,0,0,0,0],
        // Linha 14 - Saída de emergência com sinalizações
        [0,0,0,72,0,72,0,0,0,0,0,0,0,0,0,0,72,0,72,0,0,0,0,0,0],
        // Linha 15 - Perímetro externo com marcos
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        // Linha 16 - Paisagem externa com equipamentos meteorológicos
        [0,0,0,72,0,0,0,72,0,0,0,72,0,0,0,72,0,0,0,72,0,0,0,72,0]
      ]
    }
  ],

  // Mapa de colisão ártico otimizado para navegação livre (1 = sólido, 0 = passável)
  collision: [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0],
    [0,1,0,1,0,1,0,1,0,0,0,0,0,0,0,1,0,1,0,1,0,1,0,0,0],
    [0,1,1,0,0,0,1,1,0,0,0,0,0,0,0,1,1,0,0,0,1,1,0,0,0],
    [0,1,0,1,1,1,0,1,0,0,0,0,0,0,0,1,0,1,1,1,0,1,0,0,0],
    [0,1,0,1,1,1,0,1,0,0,0,0,0,0,0,1,0,1,1,1,0,1,0,0,0],
    [0,1,0,1,0,1,0,1,0,0,0,0,0,0,0,1,0,1,0,1,0,1,0,0,0],
    [0,1,0,1,1,1,0,1,0,0,0,0,0,0,0,1,0,1,1,1,0,1,0,0,0],
    [0,1,0,1,1,1,0,1,0,0,0,0,0,0,0,1,0,1,1,1,0,1,0,0,0],
    [0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0],
    [0,1,0,1,0,1,0,1,0,0,0,0,0,0,0,1,0,1,0,1,0,1,0,0,0],
    [0,1,0,1,1,1,0,1,0,0,0,0,0,0,0,1,0,1,1,1,0,1,0,0,0],
    [0,1,0,1,0,1,0,1,0,0,0,0,0,0,0,1,0,1,0,1,0,1,0,0,0],
    [0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  ],

  // Pontos de spawn e interação otimizados
  spawnPoints: {
    player: { x: 5, y: 8 },        // Centro da estação oeste
    doctor: { x: 12, y: 8 },       // Centro da estação
    researcher: { x: 19, y: 6 },   // Estação leste - laboratório
    engineer: { x: 5, y: 12 },     // Área de manutenção
    communications: { x: 19, y: 10 } // Centro de comunicações
  },

  // Áreas funcionais da estação ártica
  areas: {
    // Área externa
    arctic_landscape: { x: 0, y: 0, width: 25, height: 2, name: "Paisagem Ártica" },
    approach_west: { x: 0, y: 1, width: 8, height: 1, name: "Aproximação Oeste" },
    approach_east: { x: 16, y: 1, width: 9, height: 1, name: "Aproximação Leste" },

    // Estação oeste
    west_entrance: { x: 2, y: 2, width: 5, height: 1, name: "Entrada Oeste" },
    west_hall: { x: 2, y: 3, width: 5, height: 1, name: "Hall Oeste" },
    west_corridor: { x: 2, y: 4, width: 5, height: 1, name: "Corredor Oeste" },
    rest_quarters: { x: 2, y: 5, width: 5, height: 1, name: "Alojamentos" },
    west_laboratory: { x: 2, y: 6, width: 5, height: 2, name: "Laboratório Oeste" },
    west_medical: { x: 2, y: 8, width: 5, height: 2, name: "Centro Médico Oeste" },
    west_communications: { x: 2, y: 10, width: 5, height: 1, name: "Comunicações Oeste" },
    west_supplies: { x: 2, y: 11, width: 5, height: 2, name: "Suprimentos Oeste" },
    west_maintenance: { x: 2, y: 13, width: 5, height: 2, name: "Manutenção Oeste" },

    // Área central (conexão)
    central_corridor: { x: 8, y: 2, width: 8, height: 13, name: "Corredor Central" },

    // Estação leste
    east_entrance: { x: 16, y: 2, width: 5, height: 1, name: "Entrada Leste" },
    east_hall: { x: 16, y: 3, width: 5, height: 1, name: "Hall Leste" },
    east_corridor: { x: 16, y: 4, width: 5, height: 1, name: "Corredor Leste" },
    research_quarters: { x: 16, y: 5, width: 5, height: 1, name: "Alojamentos de Pesquisa" },
    east_laboratory: { x: 16, y: 6, width: 5, height: 2, name: "Laboratório Principal" },
    east_medical: { x: 16, y: 8, width: 5, height: 2, name: "Centro Médico Leste" },
    command_center: { x: 16, y: 10, width: 5, height: 1, name: "Centro de Comando" },
    east_supplies: { x: 16, y: 11, width: 5, height: 2, name: "Suprimentos Leste" },
    east_maintenance: { x: 16, y: 13, width: 5, height: 2, name: "Manutenção Leste" },

    // Perímetro externo
    perimeter: { x: 0, y: 15, width: 25, height: 2, name: "Perímetro da Estação" }
  },

  // Condições ambientais especiais
  environment: {
    temperature: -40, // Celsius
    windSpeed: 25, // km/h
    visibility: 'low', // devido à neve
    hazards: ['frostbite', 'hypothermia', 'blizzard']
  }
}

/**
 * Mapeamento dos IDs dos tiles usados no mapa do Polo Norte (CORRIGIDO):
 *
 * TERRENOS:
 * - 1: SNOW (neve)
 * - 2: ICE_LIGHT (gelo claro)
 * - 3: ICE_DARK (gelo escuro)
 *
 * PISOS:
 * - 13: FLOOR_STATION (piso da estação)
 * - 14: FLOOR_HEATED (piso aquecido)
 * - 15: FLOOR_LABORATORY (piso de laboratório)
 * - 16: FLOOR_MEDICAL (piso médico)
 * - 17: FLOOR_QUARTERS (piso dos alojamentos)
 *
 * MÓVEIS:
 * - 36: BED_ARCTIC (cama ártica)
 * - 37: CHAIR_ARCTIC (cadeira ártica)
 * - 38: HEATER (aquecedor)
 * - 39: TABLE_ARCTIC (mesa ártica)
 * - 40: STORAGE_ARCTIC (armazenamento ártico)
 * - 41: RADIO (rádio)
 *
 * Nota: IDs corrigidos para corresponder ao tileset real polo-norte-tileset.png
 * com configuração 12x11 tiles e spacing de 1px
 */

export default POLO_NORTE_MAP

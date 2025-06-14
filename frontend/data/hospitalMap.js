/**
 * Dados do mapa do hospital usando tilemap
 * Baseado no tileset real tiny-town-tileset.png
 * IDs dos tiles correspondem aos definidos em TINY_TOWN_CONFIG.TILES
 */

export const HOSPITAL_MAP = {
  width: 25,  // 25 tiles de largura (25 * 16 * 3 = 1200px)
  height: 17, // 17 tiles de altura (17 * 16 * 3 = 816px)
  tileWidth: 16,
  tileHeight: 16,

  layers: [
    // Camada 0: Piso base - Hospital Rural usando tiles corretos do tiny-town
    {
      name: "floor",
      visible: true,
      data: [
        // Linha 0 - Área externa com grama
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        // Linha 1 - Entrada com estrada
        [1,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,1],
        // Linha 2 - Hall de entrada com piso de madeira
        [1,25,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,25,1],
        // Linha 3 - Recepção com piso especial
        [1,25,17,18,18,18,18,17,17,17,17,17,17,17,17,19,19,19,19,17,17,17,17,25,1],
        // Linha 4 - Corredores principais
        [1,25,17,18,18,18,18,17,17,17,17,17,17,17,17,19,19,19,19,17,17,17,17,25,1],
        // Linha 5 - Área de triagem
        [1,25,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,25,1],
        // Linha 6 - Consultórios médicos
        [1,25,17,20,20,17,17,17,17,17,17,17,17,17,17,17,17,20,20,17,17,17,17,25,1],
        // Linha 7 - Corredores de acesso
        [1,25,17,20,20,17,17,17,17,17,17,17,17,17,17,17,17,20,20,17,17,17,17,25,1],
        // Linha 8 - Centro de tratamento
        [1,25,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,25,1],
        // Linha 9 - Área de equipamentos
        [1,25,17,17,17,17,17,21,21,21,21,17,17,17,17,21,21,21,21,17,17,17,17,25,1],
        // Linha 10 - Laboratório e farmácia
        [1,25,17,17,17,17,17,21,21,21,21,17,17,17,17,21,21,21,21,17,17,17,17,25,1],
        // Linha 11 - Área de emergência
        [1,25,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,25,1],
        // Linha 12 - Enfermaria
        [1,25,17,22,22,22,17,17,17,17,17,17,17,17,17,17,17,22,22,22,17,17,17,25,1],
        // Linha 13 - Área de descanso
        [1,25,17,22,22,22,17,17,17,17,17,17,17,17,17,17,17,22,22,22,17,17,17,25,1],
        // Linha 14 - Corredores de saída
        [1,25,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,25,1],
        // Linha 15 - Saída com estrada
        [1,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,1],
        // Linha 16 - Área externa com grama
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
      ]
    },

    // Camada 1: Móveis e equipamentos médicos (usando IDs baixos do tileset)
    {
      name: "furniture",
      visible: true,
      data: [
        // Linha 0 - Área externa
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        // Linha 1
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        // Linha 2 - Hall de entrada
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        // Linha 3 - Recepção e área de espera
        [0,0,0,49,49,49,0,0,0,0,0,0,0,0,0,48,0,48,0,0,0,0,0,0,0],
        // Linha 4 - Móveis de recepção
        [0,0,0,49,49,49,0,0,0,0,0,0,0,0,0,0,48,0,0,0,0,0,0,0,0],
        // Linha 5 - Área de triagem
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        // Linha 6 - Consultórios médicos
        [0,0,0,50,0,0,0,0,0,0,0,0,0,0,0,0,0,50,0,0,0,0,0,0,0],
        // Linha 7 - Equipamentos de consultório
        [0,0,0,49,0,0,0,0,0,0,0,0,0,0,0,0,0,49,0,0,0,0,0,0,0],
        // Linha 8 - Centro de tratamento
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        // Linha 9 - Área de equipamentos
        [0,0,0,0,0,0,0,51,51,0,0,0,0,0,0,51,51,0,0,0,0,0,0,0,0],
        // Linha 10 - Laboratório e farmácia
        [0,0,0,0,0,0,0,49,0,49,0,0,0,0,0,49,0,49,0,0,0,0,0,0,0],
        // Linha 11 - Área de emergência
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        // Linha 12 - Enfermaria
        [0,0,0,50,50,0,0,0,0,0,0,0,0,0,0,0,0,50,50,0,0,0,0,0,0],
        // Linha 13 - Área de descanso
        [0,0,0,48,48,0,0,0,0,0,0,0,0,0,0,0,0,48,48,0,0,0,0,0,0],
        // Linha 14 - Corredores de saída
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        // Linha 15
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        // Linha 16 - Área externa
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
      ]
    },

    // Camada 2: Decorações e equipamentos especiais (usando IDs baixos)
    {
      name: "decorations",
      visible: true,
      data: [
        // Linha 0 - Área externa com plantas
        [15,0,0,15,0,0,15,0,0,15,0,0,15,0,0,15,0,0,15,0,0,15,0,0,15],
        // Linha 1
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        // Linha 2 - Hall de entrada com informações
        [0,0,0,0,0,0,0,0,0,0,0,52,0,0,0,0,0,0,0,0,0,0,0,0,0],
        // Linha 3 - Recepção com computador
        [0,0,0,0,0,53,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        // Linha 4 - Plantas decorativas
        [0,0,15,0,0,0,0,0,0,0,0,0,0,0,15,0,0,0,0,15,0,0,0,0,0],
        // Linha 5 - Área de triagem com relógio
        [0,0,0,0,0,0,0,0,0,0,0,0,54,0,0,0,0,0,0,0,0,0,0,0,0],
        // Linha 6 - Consultórios com monitores
        [0,0,0,0,53,0,0,0,0,0,0,0,0,0,0,0,0,0,53,0,0,0,0,0,0],
        // Linha 7 - Equipamentos de parede
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        // Linha 8 - Centro com informações
        [0,0,0,0,0,0,0,0,0,0,0,0,52,0,0,0,0,0,0,0,0,0,0,0,0],
        // Linha 9 - Equipamentos de laboratório
        [0,0,0,0,0,0,0,0,53,0,0,0,0,0,0,0,53,0,0,0,0,0,0,0,0],
        // Linha 10 - Monitores de equipamentos
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        // Linha 11 - Área de emergência com relógio
        [0,0,0,0,0,0,0,0,0,0,0,0,54,0,0,0,0,0,0,0,0,0,0,0,0],
        // Linha 12 - Enfermaria com monitores
        [0,0,0,0,0,53,0,0,0,0,0,0,0,0,0,0,0,0,0,53,0,0,0,0,0],
        // Linha 13 - Plantas na área de descanso
        [0,0,15,0,0,0,0,0,0,0,0,0,0,0,0,0,15,0,0,0,0,0,0,0,0],
        // Linha 14 - Corredores com plantas
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        // Linha 15
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        // Linha 16 - Área externa com plantas
        [15,0,0,15,0,0,15,0,0,15,0,0,15,0,0,15,0,0,15,0,0,15,0,0,15]
      ]
    }
  ],

  // Mapa de colisão otimizado para navegação livre (1 = sólido, 0 = passável)
  // Apenas paredes externas e alguns móveis grandes são sólidos
  collision: [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],
    [0,1,0,1,1,1,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,1,0],
    [0,1,0,1,1,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0],
    [0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],
    [0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0],
    [0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0],
    [0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],
    [0,1,0,0,0,0,0,1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,0],
    [0,1,0,0,0,0,0,1,0,1,0,0,0,0,0,1,0,1,0,0,0,0,0,1,0],
    [0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],
    [0,1,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,0],
    [0,1,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,0],
    [0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  ],

  // Pontos de spawn e interação otimizados
  spawnPoints: {
    player: { x: 5, y: 8 },    // Centro do hospital
    doctor: { x: 12, y: 8 },   // Área central de atendimento
    nurse: { x: 18, y: 6 },    // Consultório direito
    receptionist: { x: 5, y: 3 } // Recepção
  },

  // Áreas funcionais do hospital
  areas: {
    entrance: { x: 2, y: 2, width: 21, height: 1, name: "Entrada Principal" },
    reception: { x: 3, y: 3, width: 4, height: 2, name: "Recepção" },
    waiting_area: { x: 15, y: 3, width: 4, height: 2, name: "Área de Espera" },
    triage: { x: 2, y: 5, width: 21, height: 1, name: "Triagem" },
    consultation_left: { x: 3, y: 6, width: 2, height: 2, name: "Consultório 1" },
    consultation_right: { x: 17, y: 6, width: 2, height: 2, name: "Consultório 2" },
    treatment_center: { x: 2, y: 8, width: 21, height: 1, name: "Centro de Tratamento" },
    laboratory: { x: 7, y: 9, width: 4, height: 2, name: "Laboratório" },
    pharmacy: { x: 15, y: 9, width: 4, height: 2, name: "Farmácia" },
    emergency: { x: 2, y: 11, width: 21, height: 1, name: "Emergência" },
    ward_left: { x: 3, y: 12, width: 3, height: 2, name: "Enfermaria 1" },
    ward_right: { x: 17, y: 12, width: 3, height: 2, name: "Enfermaria 2" },
    exit: { x: 2, y: 14, width: 21, height: 1, name: "Saída" },
    garden: { x: 0, y: 0, width: 25, height: 1, name: "Jardim Externo" },
    parking: { x: 0, y: 16, width: 25, height: 1, name: "Estacionamento" }
  }
}

/**
 * Mapeamento dos IDs dos tiles usados no mapa (CORRIGIDO para tiny-town tileset):
 *
 * TERRENOS:
 * - 1: GRASS (grama)
 * - 25: ROAD (estrada)
 *
 * PISOS:
 * - 17: FLOOR_WOOD (piso de madeira)
 * - 18: FLOOR_STONE_1 (piso de pedra 1)
 * - 19: FLOOR_STONE_2 (piso de pedra 2)
 * - 20: FLOOR_TILE_WHITE (piso branco)
 * - 21: FLOOR_TILE_BLUE (piso azul)
 * - 22: FLOOR_CARPET_RED (carpete vermelho)
 *
 * MÓVEIS:
 * - 48: CHAIR (cadeira)
 * - 49: DESK (mesa)
 * - 50: BED (cama)
 * - 51: CABINET (armário)
 *
 * DECORAÇÕES:
 * - 15: BUSH (arbusto/planta)
 * - 52: SIGN (placa)
 * - 53: COMPUTER (computador)
 * - 54: CLOCK (relógio)
 *
 * Nota: IDs corrigidos para corresponder ao tileset real tiny-town-tileset.png
 * com configuração 12x11 tiles e spacing de 1px
 */

export default HOSPITAL_MAP

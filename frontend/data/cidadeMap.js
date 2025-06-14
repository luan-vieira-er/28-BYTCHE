/**
 * Dados do mapa da cidade usando cidade-tileset.png
 * Representa um ambiente urbano moderno com hospital, escritórios e comércio
 */

import { CIDADE_CONFIG } from '@/utils/tilesetLoader'

export const CIDADE_MAP = {
  width: 25,  // 25 tiles de largura
  height: 17, // 17 tiles de altura
  tileWidth: 16,
  tileHeight: 16,
  tileset: 'cidade',

  layers: [
    // Camada 0: Piso base urbano
    {
      name: "floor",
      visible: true,
      data: [
        // Linha 0 - Ruas e calçadas
        [4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
        // Linha 1 - Calçada e entrada do hospital
        [4,18,18,18,18,18,18,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
        // Linha 2 - Piso do hospital
        [4,18,18,18,18,18,18,4,16,16,16,16,16,16,4,20,20,20,20,20,20,4,4,4,4],
        // Linha 3 - Área de recepção
        [4,18,22,22,22,22,18,4,16,16,16,16,16,16,4,20,20,20,20,20,20,4,4,4,4],
        // Linha 4 - Corredores
        [4,18,22,22,22,22,18,4,16,16,16,16,16,16,4,20,20,20,20,20,20,4,4,4,4],
        // Linha 5 - Área de espera
        [4,18,18,18,18,18,18,4,16,16,16,16,16,16,4,20,20,20,20,20,20,4,4,4,4],
        // Linha 6 - Corredores principais
        [4,18,18,18,18,18,18,4,16,16,16,16,16,16,4,20,20,20,20,20,20,4,4,4,4],
        // Linha 7 - Área de tratamento
        [4,18,18,18,18,18,18,4,16,16,16,16,16,16,4,20,20,20,20,20,20,4,4,4,4],
        // Linha 8 - Salas médicas
        [4,18,24,24,24,24,18,4,16,16,16,16,16,16,4,20,20,20,20,20,20,4,4,4,4],
        // Linha 9 - Equipamentos
        [4,18,24,24,24,24,18,4,16,16,16,16,16,16,4,20,20,20,20,20,20,4,4,4,4],
        // Linha 10 - Laboratório
        [4,18,18,18,18,18,18,4,16,16,16,16,16,16,4,20,20,20,20,20,20,4,4,4,4],
        // Linha 11 - Farmácia
        [4,18,18,18,18,18,18,4,16,16,16,16,16,16,4,20,20,20,20,20,20,4,4,4,4],
        // Linha 12 - Área administrativa
        [4,18,17,17,17,17,18,4,16,16,16,16,16,16,4,20,20,20,20,20,20,4,4,4,4],
        // Linha 13 - Escritórios
        [4,18,17,17,17,17,18,4,16,16,16,16,16,16,4,20,20,20,20,20,20,4,4,4,4],
        // Linha 14 - Saída
        [4,18,18,18,18,18,18,4,16,16,16,16,16,16,4,20,20,20,20,20,20,4,4,4,4],
        // Linha 15 - Calçada
        [4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
        // Linha 16 - Rua
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
      ]
    },

    // Camada 1: Móveis e equipamentos urbanos
    {
      name: "furniture",
      visible: true,
      data: [
        // Linha 0
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        // Linha 1
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        // Linha 2
        [0,0,0,0,0,0,0,0,48,48,48,48,0,0,0,54,54,54,54,0,0,0,0,0,0],
        // Linha 3 - Recepção e balcões
        [0,0,62,62,62,62,0,0,48,48,48,48,0,0,0,54,54,54,54,0,0,0,0,0,0],
        // Linha 4
        [0,0,62,62,62,62,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        // Linha 5
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        // Linha 6 - Cadeiras de espera
        [0,0,63,0,63,0,0,0,49,0,49,0,0,0,0,53,0,53,0,0,0,0,0,0,0],
        // Linha 7
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        // Linha 8 - Equipamentos médicos
        [0,0,65,65,0,0,0,0,49,0,49,0,0,0,0,53,0,53,0,0,0,0,0,0,0],
        // Linha 9
        [0,0,65,65,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        // Linha 10
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        // Linha 11 - Farmácia
        [0,0,56,56,56,56,0,0,0,0,0,0,0,0,0,56,56,56,56,0,0,0,0,0,0],
        // Linha 12 - Móveis de escritório
        [0,0,48,48,48,48,0,0,48,48,48,48,0,0,0,48,48,48,48,0,0,0,0,0,0],
        // Linha 13
        [0,0,49,49,49,49,0,0,49,49,49,49,0,0,0,49,49,49,49,0,0,0,0,0,0],
        // Linha 14
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        // Linha 15
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        // Linha 16
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
      ]
    },

    // Camada 2: Decorações e equipamentos urbanos
    {
      name: "decorations",
      visible: true,
      data: [
        // Linha 0
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        // Linha 1 - Placas e sinalizações
        [0,0,0,0,71,0,0,0,0,0,0,0,0,0,0,0,0,71,0,0,0,0,0,0,0],
        // Linha 2
        [0,0,0,0,0,0,0,0,0,0,66,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        // Linha 3
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        // Linha 4
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        // Linha 5 - Equipamentos urbanos
        [0,69,0,0,0,0,69,0,0,0,0,0,0,0,0,0,0,0,0,0,69,0,0,0,0],
        // Linha 6
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        // Linha 7
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        // Linha 8
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        // Linha 9 - Equipamentos médicos avançados
        [0,0,0,0,66,0,0,0,0,0,66,0,0,0,0,0,0,66,0,0,0,0,0,0,0],
        // Linha 10
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        // Linha 11
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        // Linha 12
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        // Linha 13 - Equipamentos de escritório
        [0,0,0,0,66,0,0,0,0,0,66,0,0,0,0,0,0,66,0,0,0,0,0,0,0],
        // Linha 14
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        // Linha 15 - Equipamentos urbanos externos
        [0,73,0,0,0,0,73,0,0,0,0,0,0,0,0,0,0,0,0,0,73,0,0,0,0],
        // Linha 16
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
      ]
    }
  ],

  // Mapa de colisão otimizado para navegação urbana (1 = sólido, 0 = passável)
  collision: [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,1,1,1,1,0,0,0,0,0,0],
    [0,0,1,1,1,1,0,0,1,1,1,1,0,0,0,1,1,1,1,0,0,0,0,0,0],
    [0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,1,0,1,0,0,0,1,0,1,0,0,0,0,1,0,1,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,1,1,0,0,0,0,1,0,1,0,0,0,0,1,0,1,0,0,0,0,0,0,0],
    [0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0],
    [0,0,1,1,1,1,0,0,1,1,1,1,0,0,0,1,1,1,1,0,0,0,0,0,0],
    [0,0,1,1,1,1,0,0,1,1,1,1,0,0,0,1,1,1,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  ],

  // Pontos de spawn e interação urbanos
  spawnPoints: {
    player: { x: 5, y: 8 },      // Hospital urbano
    doctor: { x: 12, y: 8 },     // Centro médico
    nurse: { x: 18, y: 6 },      // Clínica especializada
    receptionist: { x: 5, y: 3 }, // Recepção hospital
    pharmacist: { x: 18, y: 11 }, // Farmácia
    security: { x: 12, y: 1 }     // Segurança do complexo
  },

  // Áreas urbanas especializadas
  areas: {
    street_north: { x: 0, y: 0, width: 25, height: 2, name: "Rua Principal Norte" },
    hospital_main: { x: 1, y: 2, width: 6, height: 13, name: "Hospital Principal" },
    medical_center: { x: 8, y: 2, width: 6, height: 13, name: "Centro Médico" },
    specialist_clinic: { x: 15, y: 2, width: 6, height: 13, name: "Clínica Especializada" },
    commercial_area: { x: 22, y: 2, width: 3, height: 13, name: "Área Comercial" },
    street_south: { x: 0, y: 15, width: 25, height: 2, name: "Rua Principal Sul" },

    // Áreas específicas do hospital
    emergency_entrance: { x: 1, y: 1, width: 6, height: 1, name: "Entrada de Emergência" },
    main_reception: { x: 2, y: 3, width: 4, height: 2, name: "Recepção Principal" },
    waiting_area: { x: 2, y: 6, width: 4, height: 2, name: "Sala de Espera" },
    treatment_rooms: { x: 2, y: 8, width: 4, height: 2, name: "Salas de Tratamento" },
    laboratory: { x: 2, y: 11, width: 4, height: 1, name: "Laboratório" },
    administration: { x: 2, y: 12, width: 4, height: 2, name: "Administração" },

    // Centro médico
    consultation_rooms: { x: 9, y: 2, width: 4, height: 4, name: "Consultórios" },
    diagnostic_center: { x: 9, y: 6, width: 4, height: 4, name: "Centro de Diagnóstico" },
    rehabilitation: { x: 9, y: 10, width: 4, height: 4, name: "Reabilitação" },

    // Clínica especializada
    specialist_offices: { x: 16, y: 2, width: 4, height: 6, name: "Consultórios Especializados" },
    surgery_center: { x: 16, y: 8, width: 4, height: 4, name: "Centro Cirúrgico" },
    pharmacy: { x: 16, y: 12, width: 4, height: 2, name: "Farmácia" }
  }
}

/**
 * Mapeamento dos IDs dos tiles usados no mapa da cidade:
 *
 * PISOS:
 * - 0: ASPHALT_1 (asfalto da rua)
 * - 4: SIDEWALK_CLEAN (calçada limpa)
 * - 16: FLOOR_MALL (piso de shopping/escritório)
 * - 17: FLOOR_OFFICE (piso de escritório)
 * - 18: FLOOR_HOSPITAL_CITY (piso de hospital urbano)
 * - 20: FLOOR_SHOP (piso de loja)
 * - 22: CARPET_OFFICE (carpete de escritório)
 * - 24: TILE_BATHROOM (azulejo de banheiro)
 *
 * MÓVEIS:
 * - 48: DESK_OFFICE (mesa de escritório)
 * - 49: CHAIR_OFFICE (cadeira de escritório)
 * - 53: CHAIR_RESTAURANT (cadeira de restaurante)
 * - 54: COUNTER_SHOP (balcão de loja)
 * - 56: SHELF_STORE (prateleira de loja)
 * - 62: RECEPTION_DESK (mesa de recepção)
 * - 63: WAITING_CHAIR (cadeira de espera)
 * - 65: ESCALATOR (escada rolante)
 *
 * DECORAÇÕES:
 * - 66: ATM (caixa eletrônico)
 * - 69: TRASH_CAN (lixeira)
 * - 71: BUS_STOP (ponto de ônibus)
 * - 73: STREET_LAMP (poste de luz)
 */

export default CIDADE_MAP

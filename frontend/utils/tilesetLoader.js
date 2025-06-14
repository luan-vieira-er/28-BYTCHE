import { Assets, Texture, Rectangle } from 'pixi.js'

/**
 * Classe para gerenciar carregamento e manipulação de tilesets
 */
class TilesetLoader {
  constructor() {
    this.tilesets = new Map()
    this.loadedTextures = new Map()
    this.tileSize = 16 // Tamanho padrão dos tiles do Tiny Town
  }

  /**
   * Carrega um tileset e divide em tiles individuais
   */
  async loadTileset(name, imagePath, tileWidth = 16, tileHeight = 16, spacing = 0, margin = 0) {
    try {
      // Carrega a textura principal
      const texture = await Assets.load(imagePath)
      this.loadedTextures.set(name, texture)

      // Calcula quantos tiles cabem na imagem
      const tilesPerRow = Math.floor((texture.width - 2 * margin + spacing) / (tileWidth + spacing))
      const tilesPerColumn = Math.floor((texture.height - 2 * margin + spacing) / (tileHeight + spacing))

      // Cria array de tiles
      const tiles = []
      let tileId = 0

      for (let row = 0; row < tilesPerColumn; row++) {
        for (let col = 0; col < tilesPerRow; col++) {
          const x = margin + col * (tileWidth + spacing)
          const y = margin + row * (tileHeight + spacing)

          // Cria uma sub-textura para cada tile
          const tileTexture = new Texture(
            texture.baseTexture,
            new Rectangle(x, y, tileWidth, tileHeight)
          )

          tiles.push({
            id: tileId,
            texture: tileTexture,
            x: col,
            y: row
          })

          tileId++
        }
      }

      // Armazena o tileset
      this.tilesets.set(name, {
        name,
        texture,
        tiles,
        tileWidth,
        tileHeight,
        tilesPerRow,
        tilesPerColumn,
        spacing,
        margin
      })

      console.log(`Tileset '${name}' carregado com ${tiles.length} tiles`)
      return this.tilesets.get(name)

    } catch (error) {
      console.error(`Erro ao carregar tileset '${name}':`, error)
      throw error
    }
  }

  /**
   * Obtém um tile específico de um tileset
   */
  getTile(tilesetName, tileId) {
    const tileset = this.tilesets.get(tilesetName)
    if (!tileset) {
      console.warn(`Tileset '${tilesetName}' não encontrado`)
      return null
    }

    const tile = tileset.tiles[tileId]
    if (!tile) {
      console.warn(`Tile ${tileId} não encontrado no tileset '${tilesetName}'`)
      return null
    }

    return tile
  }

  /**
   * Obtém textura de um tile
   */
  getTileTexture(tilesetName, tileId) {
    const tile = this.getTile(tilesetName, tileId)
    return tile ? tile.texture : null
  }

  /**
   * Obtém informações de um tileset
   */
  getTilesetInfo(tilesetName) {
    return this.tilesets.get(tilesetName)
  }

  /**
   * Lista todos os tilesets carregados
   */
  getLoadedTilesets() {
    return Array.from(this.tilesets.keys())
  }

  /**
   * Remove um tileset da memória
   */
  unloadTileset(tilesetName) {
    const tileset = this.tilesets.get(tilesetName)
    if (tileset) {
      // Limpa as texturas
      tileset.tiles.forEach(tile => {
        tile.texture.destroy()
      })

      this.tilesets.delete(tilesetName)
      this.loadedTextures.delete(tilesetName)

      console.log(`Tileset '${tilesetName}' removido da memória`)
    }
  }

  /**
   * Limpa todos os tilesets
   */
  clear() {
    this.tilesets.forEach((_, name) => {
      this.unloadTileset(name)
    })
  }
}

// Instância singleton
export const tilesetLoader = new TilesetLoader()

/**
 * Configurações padrão para os assets do Tiny Town
 * Baseado no tileset real tiny-town-tileset.png (16x16 tiles, 16 colunas x 8 linhas = 128 tiles)
 */
export const TINY_TOWN_CONFIG = {
  TILESET: {
    path: '/assets/tilesets/tiny-town-tileset.png',
    tileWidth: 16,
    tileHeight: 16,
    spacing: 0,
    margin: 0,
    tilesPerRow: 16,
    tilesPerColumn: 8
  },

  // IDs dos tiles baseados no tileset real tiny-town-tileset.png
  // Contagem começa em 0 (primeira linha: 0-15, segunda linha: 16-31, etc.)
  TILES: {
    // Linha 0 (0-15): Grama e terrenos básicos
    GRASS_1: 0,
    GRASS_2: 1,
    GRASS_3: 2,
    GRASS_4: 3,
    DIRT_1: 4,
    DIRT_2: 5,
    STONE_1: 6,
    STONE_2: 7,
    WATER_1: 8,
    WATER_2: 9,
    SAND_1: 10,
    SAND_2: 11,
    FLOWER_1: 12,
    FLOWER_2: 13,
    TREE_SMALL: 14,
    BUSH: 15,

    // Linha 1 (16-31): Pisos e pavimentos
    FLOOR_WOOD_1: 16,
    FLOOR_WOOD_2: 17,
    FLOOR_STONE_1: 18,
    FLOOR_STONE_2: 19,
    FLOOR_TILE_WHITE: 20,
    FLOOR_TILE_BLUE: 21,
    FLOOR_CARPET_RED: 22,
    FLOOR_CARPET_BLUE: 23,
    ROAD_HORIZONTAL: 24,
    ROAD_VERTICAL: 25,
    ROAD_CORNER_TL: 26,
    ROAD_CORNER_TR: 27,
    ROAD_CORNER_BL: 28,
    ROAD_CORNER_BR: 29,
    SIDEWALK_1: 30,
    SIDEWALK_2: 31,

    // Linha 2 (32-47): Paredes e estruturas
    WALL_BRICK_1: 32,
    WALL_BRICK_2: 33,
    WALL_WOOD_1: 34,
    WALL_WOOD_2: 35,
    WALL_STONE_1: 36,
    WALL_STONE_2: 37,
    WALL_HOSPITAL: 38,
    WALL_WINDOW: 39,
    DOOR_CLOSED: 40,
    DOOR_OPEN: 41,
    FENCE_1: 42,
    FENCE_2: 43,
    PILLAR_1: 44,
    PILLAR_2: 45,
    ROOF_1: 46,
    ROOF_2: 47,

    // Linha 3 (48-63): Móveis básicos
    TABLE_SMALL: 48,
    TABLE_LARGE: 49,
    CHAIR_1: 50,
    CHAIR_2: 51,
    BED_1: 52,
    BED_2: 53,
    DESK_1: 54,
    DESK_2: 55,
    BOOKSHELF: 56,
    CABINET: 57,
    CHEST_1: 58,
    CHEST_2: 59,
    BARREL: 60,
    CRATE: 61,
    LAMP_1: 62,
    LAMP_2: 63,

    // Linha 4 (64-79): Equipamentos e objetos especiais
    MEDICAL_BED: 64,
    MEDICAL_EQUIPMENT_1: 65,
    MEDICAL_EQUIPMENT_2: 66,
    COMPUTER: 67,
    MONITOR: 68,
    PHONE: 69,
    CLOCK: 70,
    SIGN_1: 71,
    SIGN_2: 72,
    PLANT_SMALL: 73,
    PLANT_LARGE: 74,
    VASE: 75,
    PAINTING_1: 76,
    PAINTING_2: 77,
    MIRROR: 78,
    WINDOW_SMALL: 79,

    // Linha 5 (80-95): Veículos e transporte
    CAR_1: 80,
    CAR_2: 81,
    TRUCK: 82,
    AMBULANCE: 83,
    BIKE: 84,
    MOTORCYCLE: 85,
    BUS: 86,
    TAXI: 87,
    BOAT_1: 88,
    BOAT_2: 89,
    PLANE_SMALL: 90,
    HELICOPTER: 91,
    TRAIN_1: 92,
    TRAIN_2: 93,
    CART: 94,
    WHEELCHAIR: 95,

    // Linha 6 (96-111): Personagens e NPCs
    PERSON_1: 96,
    PERSON_2: 97,
    DOCTOR: 98,
    NURSE: 99,
    PATIENT_1: 100,
    PATIENT_2: 101,
    CHILD_1: 102,
    CHILD_2: 103,
    ELDERLY_1: 104,
    ELDERLY_2: 105,
    WORKER_1: 106,
    WORKER_2: 107,
    POLICE: 108,
    FIREFIGHTER: 109,
    TEACHER: 110,
    STUDENT: 111,

    // Linha 7 (112-127): Itens e objetos diversos
    FOOD_1: 112,
    FOOD_2: 113,
    DRINK_1: 114,
    DRINK_2: 115,
    MEDICINE_1: 116,
    MEDICINE_2: 117,
    TOOL_1: 118,
    TOOL_2: 119,
    BOOK_1: 120,
    BOOK_2: 121,
    PAPER: 122,
    PEN: 123,
    KEY: 124,
    COIN: 125,
    HEART: 126,
    STAR: 127
  }
}

export default TilesetLoader

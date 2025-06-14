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
 */
export const TINY_TOWN_CONFIG = {
  TILESET: {
    path: '/assets/tilesets/tiny-town-tileset.png',
    tileWidth: 16,
    tileHeight: 16,
    spacing: 0,
    margin: 0
  },

  // IDs dos tiles mais comuns (você precisará ajustar baseado no tileset real)
  TILES: {
    // Pisos
    FLOOR_HOSPITAL: 0,
    FLOOR_TILE_WHITE: 1,
    FLOOR_TILE_BLUE: 2,

    // Paredes
    WALL_TOP: 10,
    WALL_BOTTOM: 11,
    WALL_LEFT: 12,
    WALL_RIGHT: 13,
    WALL_CORNER_TL: 14,
    WALL_CORNER_TR: 15,
    WALL_CORNER_BL: 16,
    WALL_CORNER_BR: 17,

    // Móveis
    BED: 20,
    CHAIR: 21,
    TABLE: 22,
    DESK: 23,

    // Decorações
    PLANT: 30,
    MEDICAL_EQUIPMENT: 31,
    SIGN: 32
  }
}

export default TilesetLoader

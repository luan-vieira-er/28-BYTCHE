/**
 * Sistema de colisão baseado em tilemap
 */

export class CollisionSystem {
  constructor(collisionMap, tileWidth = 16, tileHeight = 16, scale = 3) {
    this.collisionMap = collisionMap
    this.tileWidth = tileWidth
    this.tileHeight = tileHeight
    this.scale = scale
    this.mapWidth = collisionMap[0]?.length || 0
    this.mapHeight = collisionMap.length
  }

  /**
   * Converte coordenadas do mundo para coordenadas do tile
   */
  worldToTile(worldX, worldY) {
    const tileX = Math.floor(worldX / (this.tileWidth * this.scale))
    const tileY = Math.floor(worldY / (this.tileHeight * this.scale))
    return { x: tileX, y: tileY }
  }

  /**
   * Converte coordenadas do tile para coordenadas do mundo
   */
  tileToWorld(tileX, tileY) {
    const worldX = tileX * this.tileWidth * this.scale
    const worldY = tileY * this.tileHeight * this.scale
    return { x: worldX, y: worldY }
  }

  /**
   * Verifica se um tile é sólido (tem colisão)
   */
  isTileSolid(tileX, tileY) {
    // Verifica limites do mapa
    if (tileX < 0 || tileX >= this.mapWidth || tileY < 0 || tileY >= this.mapHeight) {
      return true // Fora do mapa = sólido
    }

    return this.collisionMap[tileY][tileX] === 1
  }

  /**
   * Verifica se uma posição no mundo tem colisão
   */
  hasCollisionAt(worldX, worldY) {
    const tile = this.worldToTile(worldX, worldY)
    return this.isTileSolid(tile.x, tile.y)
  }

  /**
   * Verifica colisão para um retângulo (útil para sprites maiores)
   */
  hasCollisionInRect(x, y, width, height) {
    // Verifica os quatro cantos do retângulo
    const corners = [
      { x: x, y: y },                    // Top-left
      { x: x + width, y: y },            // Top-right
      { x: x, y: y + height },           // Bottom-left
      { x: x + width, y: y + height }    // Bottom-right
    ]

    return corners.some(corner => this.hasCollisionAt(corner.x, corner.y))
  }

  /**
   * Verifica se um movimento é válido
   */
  canMoveTo(fromX, fromY, toX, toY, entityWidth = 32, entityHeight = 32) {
    // Ajusta para o centro da entidade
    const centerOffsetX = entityWidth / 2
    const centerOffsetY = entityHeight / 2

    // Verifica colisão na nova posição
    return !this.hasCollisionInRect(
      toX - centerOffsetX,
      toY - centerOffsetY,
      entityWidth,
      entityHeight
    )
  }

  /**
   * Resolve colisão e retorna posição válida mais próxima
   */
  resolveCollision(fromX, fromY, toX, toY, entityWidth = 32, entityHeight = 32) {
    // Se a posição de destino é válida, retorna ela
    if (this.canMoveTo(fromX, fromY, toX, toY, entityWidth, entityHeight)) {
      return { x: toX, y: toY }
    }

    // Tenta movimento apenas no eixo X
    if (this.canMoveTo(fromX, fromY, toX, fromY, entityWidth, entityHeight)) {
      return { x: toX, y: fromY }
    }

    // Tenta movimento apenas no eixo Y
    if (this.canMoveTo(fromX, fromY, fromX, toY, entityWidth, entityHeight)) {
      return { x: fromX, y: toY }
    }

    // Se nenhum movimento é possível, mantém posição original
    return { x: fromX, y: fromY }
  }

  /**
   * Encontra o tile mais próximo que não tem colisão
   */
  findNearestWalkableTile(worldX, worldY, maxDistance = 5) {
    const startTile = this.worldToTile(worldX, worldY)
    
    // Se o tile atual já é caminhável, retorna ele
    if (!this.isTileSolid(startTile.x, startTile.y)) {
      return this.tileToWorld(startTile.x, startTile.y)
    }

    // Busca em espiral
    for (let distance = 1; distance <= maxDistance; distance++) {
      for (let dx = -distance; dx <= distance; dx++) {
        for (let dy = -distance; dy <= distance; dy++) {
          // Pula tiles que não estão na borda do quadrado atual
          if (Math.abs(dx) !== distance && Math.abs(dy) !== distance) {
            continue
          }

          const checkX = startTile.x + dx
          const checkY = startTile.y + dy

          if (!this.isTileSolid(checkX, checkY)) {
            return this.tileToWorld(checkX, checkY)
          }
        }
      }
    }

    // Se não encontrou nenhum tile caminhável, retorna posição original
    return { x: worldX, y: worldY }
  }

  /**
   * Obtém informações de debug sobre um ponto
   */
  getDebugInfo(worldX, worldY) {
    const tile = this.worldToTile(worldX, worldY)
    return {
      worldPos: { x: worldX, y: worldY },
      tilePos: tile,
      isSolid: this.isTileSolid(tile.x, tile.y),
      tileValue: this.collisionMap[tile.y]?.[tile.x] || 'out of bounds'
    }
  }
}

/**
 * Instância global do sistema de colisão
 * Será inicializada quando o mapa for carregado
 */
export let globalCollisionSystem = null

/**
 * Inicializa o sistema de colisão global
 */
export const initializeCollisionSystem = (collisionMap, tileWidth = 16, tileHeight = 16, scale = 3) => {
  globalCollisionSystem = new CollisionSystem(collisionMap, tileWidth, tileHeight, scale)
  return globalCollisionSystem
}

/**
 * Obtém o sistema de colisão global
 */
export const getCollisionSystem = () => {
  return globalCollisionSystem
}

export default CollisionSystem

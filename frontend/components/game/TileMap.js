import { Container, Sprite } from '@pixi/react'
import { useMemo } from 'react'
import { tilesetLoader } from '@/utils/tilesetLoader'

/**
 * Componente para renderizar tilemaps usando tilesets
 */
const TileMap = ({ 
  mapData, 
  tilesetName, 
  tileWidth = 16, 
  tileHeight = 16,
  scale = 2,
  offsetX = 0,
  offsetY = 0 
}) => {
  
  // Gera os sprites dos tiles baseado nos dados do mapa
  const tileSprites = useMemo(() => {
    if (!mapData || !mapData.layers) return []

    const sprites = []
    
    mapData.layers.forEach((layer, layerIndex) => {
      if (!layer.visible) return

      layer.data.forEach((row, rowIndex) => {
        row.forEach((tileId, colIndex) => {
          if (tileId === 0) return // 0 = tile vazio

          const texture = tilesetLoader.getTileTexture(tilesetName, tileId - 1) // -1 porque tileId começa em 1
          if (!texture) return

          const x = (colIndex * tileWidth * scale) + offsetX
          const y = (rowIndex * tileHeight * scale) + offsetY

          sprites.push({
            key: `${layerIndex}-${rowIndex}-${colIndex}`,
            texture,
            x,
            y,
            scale,
            zIndex: layerIndex
          })
        })
      })
    })

    return sprites
  }, [mapData, tilesetName, tileWidth, tileHeight, scale, offsetX, offsetY])

  return (
    <Container sortableChildren={true}>
      {tileSprites.map(sprite => (
        <Sprite
          key={sprite.key}
          texture={sprite.texture}
          x={sprite.x}
          y={sprite.y}
          scale={sprite.scale}
          zIndex={sprite.zIndex}
        />
      ))}
    </Container>
  )
}

export default TileMap

import { useState, useEffect } from 'react'
import {
  tilesetLoader,
  TINY_TOWN_CONFIG,
  CIDADE_CONFIG,
  POLO_NORTE_CONFIG,
  PLANETA_CONFIG,
  TILESET_CONFIGS
} from '@/utils/tilesetLoader'
import { setupDemoTileset } from '@/utils/createDemoTileset'

/**
 * Hook para gerenciar carregamento de assets do jogo
 */
export const useAssets = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [error, setError] = useState(null)
  const [loadedAssets, setLoadedAssets] = useState([])

  useEffect(() => {
    loadGameAssets()
  }, [])

  const loadGameAssets = async () => {
    try {
      setIsLoading(true)
      setError(null)
      setLoadingProgress(0)

      const assetsToLoad = [
        {
          name: 'tiny-town',
          path: TINY_TOWN_CONFIG.TILESET.path,
          tileWidth: TINY_TOWN_CONFIG.TILESET.tileWidth,
          tileHeight: TINY_TOWN_CONFIG.TILESET.tileHeight,
          spacing: TINY_TOWN_CONFIG.TILESET.spacing,
          margin: TINY_TOWN_CONFIG.TILESET.margin
        },
        {
          name: 'cidade',
          path: CIDADE_CONFIG.TILESET.path,
          tileWidth: CIDADE_CONFIG.TILESET.tileWidth,
          tileHeight: CIDADE_CONFIG.TILESET.tileHeight,
          spacing: CIDADE_CONFIG.TILESET.spacing,
          margin: CIDADE_CONFIG.TILESET.margin
        },
        {
          name: 'polo-norte',
          path: POLO_NORTE_CONFIG.TILESET.path,
          tileWidth: POLO_NORTE_CONFIG.TILESET.tileWidth,
          tileHeight: POLO_NORTE_CONFIG.TILESET.tileHeight,
          spacing: POLO_NORTE_CONFIG.TILESET.spacing,
          margin: POLO_NORTE_CONFIG.TILESET.margin
        },
        {
          name: 'planeta',
          path: PLANETA_CONFIG.TILESET.path,
          tileWidth: PLANETA_CONFIG.TILESET.tileWidth,
          tileHeight: PLANETA_CONFIG.TILESET.tileHeight,
          spacing: PLANETA_CONFIG.TILESET.spacing,
          margin: PLANETA_CONFIG.TILESET.margin
        }
      ]

      const totalAssets = assetsToLoad.length
      const loaded = []

      for (let i = 0; i < assetsToLoad.length; i++) {
        const asset = assetsToLoad[i]

        try {
          console.log(`Carregando asset: ${asset.name}`)

          await tilesetLoader.loadTileset(
            asset.name,
            asset.path,
            asset.tileWidth,
            asset.tileHeight,
            asset.spacing,
            asset.margin
          )

          loaded.push(asset.name)
          setLoadingProgress(((i + 1) / totalAssets) * 100)

          console.log(`Asset carregado: ${asset.name}`)

        } catch (assetError) {
          console.error(`Erro ao carregar asset ${asset.name}:`, assetError)

          // Fallback: tenta criar tileset de demonstração
          if (asset.name === 'tiny-town') {
            try {
              console.log('Criando tileset de demonstração...')
              const demoUrl = await setupDemoTileset()

              if (demoUrl) {
                await tilesetLoader.loadTileset(
                  asset.name,
                  demoUrl,
                  asset.tileWidth,
                  asset.tileHeight,
                  asset.spacing,
                  asset.margin
                )

                loaded.push(asset.name)
                console.log(`Tileset de demonstração carregado para: ${asset.name}`)
              }
            } catch (demoError) {
              console.error('Erro ao criar tileset de demonstração:', demoError)
            }
          }
        }
      }

      setLoadedAssets(loaded)
      setIsLoading(false)

      console.log('Todos os assets foram processados')

    } catch (err) {
      console.error('Erro geral no carregamento de assets:', err)
      setError(err.message)
      setIsLoading(false)
    }
  }

  const reloadAssets = () => {
    // Limpa assets existentes
    tilesetLoader.clear()
    setLoadedAssets([])

    // Recarrega
    loadGameAssets()
  }

  const isAssetLoaded = (assetName) => {
    return loadedAssets.includes(assetName)
  }

  return {
    isLoading,
    loadingProgress,
    error,
    loadedAssets,
    reloadAssets,
    isAssetLoaded
  }
}

export default useAssets

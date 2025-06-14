import { useState, useEffect, useCallback, useRef } from 'react'
import { Texture, BaseTexture, Rectangle } from 'pixi.js'

/**
 * Hook para gerenciar sprites de personagens
 * Carrega e gerencia sprites dos personagens e médicos selecionados
 */
export const useCharacterSprites = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const loadedSpritesRef = useRef(new Map())
  const [, forceUpdate] = useState({})

  // Configuração dos sprites de personagens (Kenney Toon Characters)
  // Baseado na estrutura real do bundle: 9 colunas x 5 linhas = 45 frames
  const characterConfig = {
    // Personagens jogáveis - Sprites HD do Kenney (192x256 pixels cada frame)
    'Jorge': {
      path: '/assets/sprites/jorge-sprite.png',
      frameWidth: 192,
      frameHeight: 256,
      framesPerRow: 9, // Kenney sprites são organizados em 9 colunas
      totalFrames: 45, // 45 posições no bundle
      animations: {
        idle: { frames: [0], duration: 1000 }, // Frame 0: idle
        walk: { frames: [37, 38, 39, 40, 41, 42, 43, 44], duration: 200 }, // Frames 37-44: walk0-walk7 (duração estável)
        run: { frames: [25, 26, 27], duration: 150 }, // Frames 25-27: run0-run2
        jump: { frames: [1], duration: 500 }, // Frame 1: jump
        fall: { frames: [2], duration: 300 }, // Frame 2: fall
        talk: { frames: [19], duration: 800 }, // Frame 19: talk
        interact: { frames: [11], duration: 600 }, // Frame 11: interact
        // Direções de movimento (usando walk como base)
        walk_down: { frames: [37, 38, 39, 40, 41, 42, 43, 44], duration: 200 },
        walk_up: { frames: [37, 38, 39, 40, 41, 42, 43, 44], duration: 200 },
        walk_left: { frames: [37, 38, 39, 40, 41, 42, 43, 44], duration: 200 },
        walk_right: { frames: [37, 38, 39, 40, 41, 42, 43, 44], duration: 200 }
      }
    },
    'Ana': {
      path: '/assets/sprites/ana-sprite.png',
      frameWidth: 192,
      frameHeight: 256,
      framesPerRow: 9,
      totalFrames: 45,
      animations: {
        idle: { frames: [0], duration: 1000 },
        walk: { frames: [37, 38, 39, 40, 41, 42, 43, 44], duration: 200 },
        run: { frames: [25, 26, 27], duration: 150 },
        jump: { frames: [1], duration: 500 },
        fall: { frames: [2], duration: 300 },
        talk: { frames: [19], duration: 800 },
        interact: { frames: [11], duration: 600 },
        walk_down: { frames: [37, 38, 39, 40, 41, 42, 43, 44], duration: 200 },
        walk_up: { frames: [37, 38, 39, 40, 41, 42, 43, 44], duration: 200 },
        walk_left: { frames: [37, 38, 39, 40, 41, 42, 43, 44], duration: 200 },
        walk_right: { frames: [37, 38, 39, 40, 41, 42, 43, 44], duration: 200 }
      }
    },
    'Zombie': {
      path: '/assets/sprites/zombie-sprite.png',
      frameWidth: 192,
      frameHeight: 256,
      framesPerRow: 9,
      totalFrames: 45,
      animations: {
        idle: { frames: [0], duration: 1500 }, // Zombie mais lento
        walk: { frames: [37, 38, 39, 40, 41, 42, 43, 44], duration: 250 }, // Movimento mais lento
        run: { frames: [25, 26, 27], duration: 200 },
        jump: { frames: [1], duration: 600 },
        fall: { frames: [2], duration: 400 },
        talk: { frames: [19], duration: 1000 },
        interact: { frames: [11], duration: 800 },
        attack: { frames: [28, 29, 30], duration: 300 }, // Frames 28-30: attack0-attack2
        walk_down: { frames: [37, 38, 39, 40, 41, 42, 43, 44], duration: 250 },
        walk_up: { frames: [37, 38, 39, 40, 41, 42, 43, 44], duration: 250 },
        walk_left: { frames: [37, 38, 39, 40, 41, 42, 43, 44], duration: 250 },
        walk_right: { frames: [37, 38, 39, 40, 41, 42, 43, 44], duration: 250 }
      }
    },
    'erik': {
      path: '/assets/sprites/erik-sprite.png',
      frameWidth: 192,
      frameHeight: 256,
      framesPerRow: 9,
      totalFrames: 45,
      animations: {
        idle: { frames: [0], duration: 1200 },
        walk: { frames: [37, 38, 39, 40, 41, 42, 43, 44], duration: 200 },
        run: { frames: [25, 26, 27], duration: 150 },
        jump: { frames: [1], duration: 500 },
        fall: { frames: [2], duration: 300 },
        talk: { frames: [19], duration: 800 },
        interact: { frames: [11], duration: 600 },
        think: { frames: [31], duration: 1000 }, // Frame 31: think
        walk_down: { frames: [37, 38, 39, 40, 41, 42, 43, 44], duration: 200 },
        walk_up: { frames: [37, 38, 39, 40, 41, 42, 43, 44], duration: 200 },
        walk_left: { frames: [37, 38, 39, 40, 41, 42, 43, 44], duration: 200 },
        walk_right: { frames: [37, 38, 39, 40, 41, 42, 43, 44], duration: 200 }
      }
    },

    // Médicos NPCs - Sprites HD do Kenney (192x256 pixels cada frame)
    'dr-bot': {
      path: '/assets/sprites/dr-bot-sprite.png',
      frameWidth: 192,
      frameHeight: 256,
      framesPerRow: 9,
      totalFrames: 45,
      animations: {
        idle: { frames: [0], duration: 800 },
        talk: { frames: [19], duration: 300 }, // Frame 19: talk
        examine: { frames: [11], duration: 400 }, // Frame 11: interact/examine
        think: { frames: [31], duration: 600 }, // Frame 31: think
        show: { frames: [23], duration: 500 } // Frame 23: show
      }
    },
    'dra-maria': {
      path: '/assets/sprites/dra-maria-sprite.png',
      frameWidth: 192,
      frameHeight: 256,
      framesPerRow: 9,
      totalFrames: 45,
      animations: {
        idle: { frames: [0], duration: 1000 },
        talk: { frames: [19], duration: 250 },
        examine: { frames: [11], duration: 350 },
        think: { frames: [31], duration: 700 },
        show: { frames: [23], duration: 450 }
      }
    }
  }

  /**
   * Carrega um sprite de personagem
   */
  const loadCharacterSprite = useCallback(async (characterId) => {
    if (!characterConfig[characterId]) {
      console.warn(`Configuração não encontrada para personagem: ${characterId}`)
      return null
    }

    // Verifica se já está carregado
    if (loadedSpritesRef.current.has(characterId)) {
      return loadedSpritesRef.current.get(characterId)
    }

    try {
      setIsLoading(true)
      setError(null)

      const config = characterConfig[characterId]
      const baseTexture = await BaseTexture.from(config.path)

      // Cria frames individuais do spritesheet
      const frames = []
      const framesPerRow = config.framesPerRow || Math.floor(baseTexture.width / config.frameWidth)
      const totalFrames = config.totalFrames || framesPerRow

      console.log(`📊 Carregando sprite ${characterId}:`, {
        baseTextureSize: `${baseTexture.width}x${baseTexture.height}`,
        frameSize: `${config.frameWidth}x${config.frameHeight}`,
        framesPerRow,
        totalFrames
      })

      for (let i = 0; i < totalFrames; i++) {
        const col = i % framesPerRow
        const row = Math.floor(i / framesPerRow)

        const x = col * config.frameWidth
        const y = row * config.frameHeight

        const frameTexture = new Texture(
          baseTexture,
          new Rectangle(x, y, config.frameWidth, config.frameHeight)
        )

        frames.push(frameTexture)

        console.log(`🖼️ Frame ${i}: x=${x}, y=${y}, size=${config.frameWidth}x${config.frameHeight}`)
      }

      const spriteData = {
        characterId,
        config,
        frames,
        baseTexture,
        currentAnimation: 'idle',
        currentFrame: 0,
        animationTime: 0
      }

      // Adiciona ao ref sem causar re-render
      loadedSpritesRef.current.set(characterId, spriteData)

      // Força update para notificar componentes
      forceUpdate({})

      console.log(`✅ Sprite carregado: ${characterId}`)
      return spriteData

    } catch (err) {
      console.error(`❌ Erro ao carregar sprite ${characterId}:`, err)
      setError(`Erro ao carregar sprite: ${characterId}`)
      return null
    } finally {
      setIsLoading(false)
    }
  }, [])

  /**
   * Obtém frame atual de uma animação
   */
  const getCurrentFrame = useCallback((characterId, animation = 'idle', animationTime = 0) => {
    const spriteData = loadedSpritesRef.current.get(characterId)
    if (!spriteData) return null

    const animConfig = spriteData.config.animations[animation]
    if (!animConfig) {
      // Fallback para idle se animação não existir
      const idleConfig = spriteData.config.animations['idle']
      if (idleConfig) {
        return spriteData.frames[idleConfig.frames[0]] || spriteData.frames[0]
      }
      return spriteData.frames[0]
    }

    // Para animações de um frame só (como idle), retorna sempre o mesmo frame
    if (animConfig.frames.length === 1) {
      const frameId = animConfig.frames[0]
      if (frameId >= 0 && frameId < spriteData.frames.length) {
        return spriteData.frames[frameId]
      }
      return spriteData.frames[0]
    }

    // Para animações multi-frame, calcula o frame baseado no tempo
    // Usa duração por frame para transições suaves
    const frameIndex = Math.floor(animationTime / animConfig.duration) % animConfig.frames.length
    const frameId = animConfig.frames[frameIndex]

    // Verifica se o frame existe
    if (frameId >= 0 && frameId < spriteData.frames.length) {
      return spriteData.frames[frameId]
    }

    // Fallback para o primeiro frame se houver erro
    return spriteData.frames[0]
  }, [])

  /**
   * Obtém todas as animações disponíveis para um personagem
   */
  const getAvailableAnimations = useCallback((characterId) => {
    const config = characterConfig[characterId]
    return config ? Object.keys(config.animations) : []
  }, [])

  /**
   * Verifica se um sprite está carregado
   */
  const isSpriteLoaded = useCallback((characterId) => {
    return loadedSpritesRef.current.has(characterId)
  }, [])

  /**
   * Carrega múltiplos sprites
   */
  const loadMultipleSprites = useCallback(async (characterIds) => {
    setIsLoading(true)
    try {
      const promises = characterIds.map(id => loadCharacterSprite(id))
      await Promise.all(promises)
    } catch (err) {
      setError('Erro ao carregar múltiplos sprites')
    } finally {
      setIsLoading(false)
    }
  }, [loadCharacterSprite])

  /**
   * Obtém informações de um personagem
   */
  const getCharacterInfo = useCallback((characterId) => {
    return characterConfig[characterId] || null
  }, [])

  /**
   * Lista todos os personagens disponíveis
   */
  const getAvailableCharacters = useCallback(() => {
    return Object.keys(characterConfig)
  }, [])

  /**
   * Limpa sprites carregados
   */
  const clearSprites = useCallback(() => {
    // Limpa texturas da memória
    loadedSpritesRef.current.forEach(spriteData => {
      spriteData.frames.forEach(frame => frame.destroy())
      spriteData.baseTexture.destroy()
    })
    loadedSpritesRef.current.clear()
    forceUpdate({})
  }, [])

  // Cleanup ao desmontar
  useEffect(() => {
    return () => {
      clearSprites()
    }
  }, [clearSprites])

  return {
    // Estado
    isLoading,
    error,
    loadedSprites: Array.from(loadedSpritesRef.current.keys()),

    // Funções principais
    loadCharacterSprite,
    loadMultipleSprites,
    getCurrentFrame,
    isSpriteLoaded,

    // Utilitários
    getAvailableAnimations,
    getCharacterInfo,
    getAvailableCharacters,
    clearSprites,

    // Configuração (para debug)
    characterConfig
  }
}

export default useCharacterSprites

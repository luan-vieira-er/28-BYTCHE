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
 * Configurações para todos os tilesets do projeto DoctorPixel
 * Cada tileset tem suas próprias configurações e mapeamento de tiles
 */

// ===== TINY TOWN TILESET =====
export const TINY_TOWN_CONFIG = {
  TILESET: {
    path: '/assets/tilesets/tiny-town-tileset.png',
    tileWidth: 16,
    tileHeight: 16,
    spacing: 1,
    margin: 0,
    tilesPerRow: 12,
    tilesPerColumn: 11
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

// ===== CIDADE TILESET =====
export const CIDADE_CONFIG = {
  TILESET: {
    path: '/assets/tilesets/cidade-tileset.png',
    tileWidth: 16,
    tileHeight: 16,
    spacing: 1,
    margin: 0,
    tilesPerRow: 37,
    tilesPerColumn: 28
  },

  TILES: {
    // Linha 0 (0-15): Terrenos urbanos
    ASPHALT_1: 0,
    ASPHALT_2: 1,
    CONCRETE_1: 2,
    CONCRETE_2: 3,
    SIDEWALK_CLEAN: 4,
    SIDEWALK_DIRTY: 5,
    GRASS_URBAN: 6,
    DIRT_URBAN: 7,
    MANHOLE: 8,
    DRAIN: 9,
    CROSSWALK_1: 10,
    CROSSWALK_2: 11,
    ROAD_MARKING_1: 12,
    ROAD_MARKING_2: 13,
    PARKING_SPOT: 14,
    BIKE_LANE: 15,

    // Linha 1 (16-31): Pisos urbanos e comerciais
    FLOOR_MALL: 16,
    FLOOR_OFFICE: 17,
    FLOOR_HOSPITAL_CITY: 18,
    FLOOR_SCHOOL: 19,
    FLOOR_RESTAURANT: 20,
    FLOOR_SHOP: 21,
    CARPET_OFFICE: 22,
    CARPET_HOTEL: 23,
    TILE_BATHROOM: 24,
    TILE_KITCHEN: 25,
    MARBLE_1: 26,
    MARBLE_2: 27,
    WOOD_PARQUET: 28,
    LINOLEUM: 29,
    CERAMIC_1: 30,
    CERAMIC_2: 31,

    // Linha 2 (32-47): Paredes e estruturas urbanas
    WALL_BRICK_CITY: 32,
    WALL_CONCRETE: 33,
    WALL_GLASS: 34,
    WALL_METAL: 35,
    WALL_APARTMENT: 36,
    WALL_OFFICE: 37,
    WALL_SHOP: 38,
    WALL_HOSPITAL_CITY: 39,
    DOOR_GLASS: 40,
    DOOR_METAL: 41,
    DOOR_APARTMENT: 42,
    DOOR_OFFICE: 43,
    WINDOW_LARGE: 44,
    WINDOW_OFFICE: 45,
    BALCONY: 46,
    FIRE_ESCAPE: 47,

    // Linha 3 (48-63): Móveis urbanos e comerciais
    DESK_OFFICE: 48,
    CHAIR_OFFICE: 49,
    SOFA_1: 50,
    SOFA_2: 51,
    TABLE_RESTAURANT: 52,
    CHAIR_RESTAURANT: 53,
    COUNTER_SHOP: 54,
    CASH_REGISTER: 55,
    SHELF_STORE: 56,
    DISPLAY_CASE: 57,
    FILING_CABINET: 58,
    WATER_COOLER: 59,
    COFFEE_MACHINE: 60,
    VENDING_MACHINE: 61,
    RECEPTION_DESK: 62,
    WAITING_CHAIR: 63,

    // Linha 4 (64-79): Equipamentos urbanos
    ELEVATOR: 64,
    ESCALATOR: 65,
    ATM: 66,
    PHONE_BOOTH: 67,
    MAILBOX: 68,
    TRASH_CAN: 69,
    BENCH_PARK: 70,
    BUS_STOP: 71,
    TRAFFIC_LIGHT: 72,
    STREET_LAMP: 73,
    FIRE_HYDRANT: 74,
    PARKING_METER: 75,
    SECURITY_CAMERA: 76,
    ANTENNA: 77,
    AIR_CONDITIONER: 78,
    GENERATOR: 79,

    // Linha 5 (80-95): Veículos urbanos
    CAR_SEDAN: 80,
    CAR_SUV: 81,
    VAN: 82,
    TRUCK_DELIVERY: 83,
    BUS_CITY: 84,
    TAXI_CITY: 85,
    POLICE_CAR: 86,
    AMBULANCE_CITY: 87,
    FIRE_TRUCK: 88,
    MOTORCYCLE_CITY: 89,
    BICYCLE_CITY: 90,
    SCOOTER: 91,
    METRO_TRAIN: 92,
    TRAM: 93,
    GARBAGE_TRUCK: 94,
    CONSTRUCTION_VEHICLE: 95,

    // Linha 6 (96-111): Personagens urbanos
    BUSINESSMAN: 96,
    BUSINESSWOMAN: 97,
    DOCTOR_CITY: 98,
    NURSE_CITY: 99,
    POLICE_OFFICER: 100,
    FIREFIGHTER_CITY: 101,
    TEACHER_CITY: 102,
    STUDENT_CITY: 103,
    SHOPKEEPER: 104,
    CUSTOMER: 105,
    TOURIST: 106,
    JOGGER: 107,
    CYCLIST: 108,
    CONSTRUCTION_WORKER: 109,
    DELIVERY_PERSON: 110,
    SECURITY_GUARD: 111,

    // Linha 7 (112-127): Itens e objetos urbanos
    NEWSPAPER: 112,
    COFFEE_CUP: 113,
    BRIEFCASE: 114,
    SHOPPING_BAG: 115,
    SMARTPHONE: 116,
    LAPTOP: 117,
    TABLET: 118,
    HEADPHONES: 119,
    UMBRELLA: 120,
    SUNGLASSES: 121,
    WALLET: 122,
    KEYS_CAR: 123,
    CREDIT_CARD: 124,
    METRO_CARD: 125,
    CITY_MAP: 126,
    TRAFFIC_CONE: 127
  }
}

// ===== POLO NORTE TILESET =====
export const POLO_NORTE_CONFIG = {
  TILESET: {
    path: '/assets/tilesets/polo-norte-tileset.png',
    tileWidth: 16,
    tileHeight: 16,
    spacing: 1,
    margin: 0,
    tilesPerRow: 12,
    tilesPerColumn: 11
  },

  TILES: {
    // Linha 0 (0-15): Terrenos árticos
    SNOW_DEEP: 0,
    SNOW_LIGHT: 1,
    ICE_SOLID: 2,
    ICE_CRACKED: 3,
    ICE_THIN: 4,
    WATER_FROZEN: 5,
    TUNDRA: 6,
    PERMAFROST: 7,
    GLACIER: 8,
    ICEBERG: 9,
    SNOW_DRIFT: 10,
    BLIZZARD_AREA: 11,
    FOOTPRINT_SNOW: 12,
    ANIMAL_TRACK: 13,
    AURORA_GROUND: 14,
    FROST_PATTERN: 15,

    // Linha 1 (16-31): Pisos árticos e estruturas
    FLOOR_IGLOO: 16,
    FLOOR_CABIN: 17,
    FLOOR_RESEARCH_STATION: 18,
    FLOOR_ICE_HOTEL: 19,
    CARPET_FUR: 20,
    CARPET_WOOL: 21,
    WOOD_CABIN: 22,
    METAL_HEATED: 23,
    ICE_FLOOR: 24,
    SNOW_PACKED: 25,
    INSULATION_MAT: 26,
    HEATED_FLOOR: 27,
    RUBBER_MAT: 28,
    THERMAL_TILE: 29,
    ANTI_SLIP: 30,
    SNOW_SHOES_AREA: 31,

    // Linha 2 (32-47): Paredes e estruturas árticas
    WALL_ICE: 32,
    WALL_SNOW: 33,
    WALL_CABIN_LOG: 34,
    WALL_INSULATED: 35,
    WALL_RESEARCH: 36,
    WALL_IGLOO: 37,
    WALL_WINDBREAK: 38,
    WALL_THERMAL: 39,
    DOOR_HEAVY: 40,
    DOOR_AIRLOCK: 41,
    DOOR_IGLOO: 42,
    DOOR_CABIN: 43,
    WINDOW_DOUBLE: 44,
    WINDOW_HEATED: 45,
    CHIMNEY: 46,
    VENTILATION: 47,

    // Linha 3 (48-63): Móveis árticos
    BED_HEATED: 48,
    CHAIR_FUR: 49,
    TABLE_WOOD_WARM: 50,
    STOVE_WOOD: 51,
    FIREPLACE: 52,
    HEATER: 53,
    SLEEPING_BAG: 54,
    THERMAL_BLANKET: 55,
    STORAGE_INSULATED: 56,
    FOOD_CACHE: 57,
    WATER_TANK_HEATED: 58,
    GENERATOR_ARCTIC: 59,
    RADIO_EMERGENCY: 60,
    FIRST_AID_ARCTIC: 61,
    LANTERN_OIL: 62,
    CANDLE_HOLDER: 63,

    // Linha 4 (64-79): Equipamentos árticos
    SNOWMOBILE: 64,
    SLED_DOG: 65,
    SLED_CARGO: 66,
    SKIS: 67,
    SNOWSHOES: 68,
    ICE_AXE: 69,
    ROPE_CLIMBING: 70,
    TENT_ARCTIC: 71,
    WEATHER_STATION: 72,
    SATELLITE_DISH: 73,
    SOLAR_PANEL_COLD: 74,
    WIND_TURBINE: 75,
    THERMOMETER: 76,
    COMPASS_ARCTIC: 77,
    GPS_DEVICE: 78,
    EMERGENCY_BEACON: 79,

    // Linha 5 (80-95): Veículos árticos
    SNOWMOBILE_HEAVY: 80,
    ICE_BREAKER: 81,
    ARCTIC_TRUCK: 82,
    HELICOPTER_RESCUE: 83,
    PLANE_ARCTIC: 84,
    BOAT_ICE: 85,
    SUBMARINE_ARCTIC: 86,
    TRACKED_VEHICLE: 87,
    SNOW_CAT: 88,
    RESEARCH_VESSEL: 89,
    CARGO_PLANE: 90,
    RESCUE_HELICOPTER: 91,
    ICEBREAKER_SHIP: 92,
    POLAR_ROVER: 93,
    EXPEDITION_TRUCK: 94,
    ARCTIC_ATV: 95,

    // Linha 6 (96-111): Personagens árticos
    ESKIMO_MALE: 96,
    ESKIMO_FEMALE: 97,
    RESEARCHER_MALE: 98,
    RESEARCHER_FEMALE: 99,
    EXPLORER_MALE: 100,
    EXPLORER_FEMALE: 101,
    GUIDE_ARCTIC: 102,
    PILOT_ARCTIC: 103,
    SCIENTIST_ARCTIC: 104,
    DOCTOR_ARCTIC: 105,
    RESCUE_WORKER: 106,
    PHOTOGRAPHER: 107,
    JOURNALIST: 108,
    TOURIST_ARCTIC: 109,
    CHILD_ESKIMO: 110,
    ELDER_ESKIMO: 111,

    // Linha 7 (112-127): Itens árticos
    FISH_ARCTIC: 112,
    MEAT_SEAL: 113,
    HOT_DRINK: 114,
    ENERGY_BAR: 115,
    MEDICINE_COLD: 116,
    VITAMIN_D: 117,
    TOOL_ICE: 118,
    KNIFE_SNOW: 119,
    MAP_ARCTIC: 120,
    JOURNAL_EXPEDITION: 121,
    CAMERA_COLD: 122,
    SAMPLE_ICE: 123,
    CRYSTAL_ICE: 124,
    FOSSIL_ARCTIC: 125,
    AURORA_PHOTO: 126,
    POLAR_BEAR_TRACK: 127
  }
}

// ===== PLANETA TILESET =====
export const PLANETA_CONFIG = {
  TILESET: {
    path: '/assets/tilesets/planeta-tileset.png',
    tileWidth: 64,
    tileHeight: 64,
    spacing: 0,
    margin: 0,
    tilesPerRow: 16, // Será calculado automaticamente baseado na imagem
    tilesPerColumn: 8 // Será calculado automaticamente baseado na imagem
  },

  TILES: {
    // Linha 0 (0-15): Terrenos alienígenas
    ALIEN_SOIL_1: 0,
    ALIEN_SOIL_2: 1,
    CRYSTAL_GROUND: 2,
    LAVA_ROCK: 3,
    SPACE_DUST: 4,
    METEOR_CRATER: 5,
    ALIEN_GRASS: 6,
    TOXIC_GROUND: 7,
    ENERGY_FIELD: 8,
    PLASMA_POOL: 9,
    QUANTUM_SAND: 10,
    VOID_SPACE: 11,
    NEBULA_DUST: 12,
    STAR_FRAGMENT: 13,
    COSMIC_ROCK: 14,
    ANTIMATTER_ZONE: 15,

    // Linha 1 (16-31): Pisos espaciais
    FLOOR_SPACESHIP: 16,
    FLOOR_STATION: 17,
    FLOOR_LABORATORY: 18,
    FLOOR_MEDICAL_BAY: 19,
    FLOOR_BRIDGE: 20,
    FLOOR_ENGINE_ROOM: 21,
    FLOOR_CARGO_BAY: 22,
    FLOOR_LIVING_QUARTERS: 23,
    METAL_GRATING: 24,
    ENERGY_CONDUIT: 25,
    HOLOGRAPHIC_FLOOR: 26,
    GRAVITY_PLATE: 27,
    MAGNETIC_FLOOR: 28,
    FORCE_FIELD_FLOOR: 29,
    TELEPORTER_PAD: 30,
    AIRLOCK_FLOOR: 31,

    // Linha 2 (32-47): Paredes e estruturas espaciais
    WALL_SPACESHIP: 32,
    WALL_STATION: 33,
    WALL_ENERGY: 34,
    WALL_CRYSTAL: 35,
    WALL_FORCE_FIELD: 36,
    WALL_HOLOGRAPHIC: 37,
    WALL_REINFORCED: 38,
    WALL_TRANSPARENT: 39,
    DOOR_AUTOMATIC: 40,
    DOOR_AIRLOCK: 41,
    DOOR_ENERGY: 42,
    DOOR_EMERGENCY: 43,
    WINDOW_SPACE: 44,
    VIEWPORT: 45,
    HULL_BREACH: 46,
    SHIELD_GENERATOR: 47,

    // Linha 3 (48-63): Móveis espaciais
    BED_SPACE: 48,
    CHAIR_CAPTAIN: 49,
    TABLE_HOLOGRAPHIC: 50,
    CONSOLE_MAIN: 51,
    CONSOLE_NAVIGATION: 52,
    CONSOLE_WEAPONS: 53,
    CONSOLE_ENGINEERING: 54,
    CONSOLE_MEDICAL: 55,
    STORAGE_QUANTUM: 56,
    REPLICATOR: 57,
    RECYCLER: 58,
    LIFE_SUPPORT: 59,
    GRAVITY_GENERATOR: 60,
    STASIS_POD: 61,
    MEDITATION_CHAMBER: 62,
    EXERCISE_MACHINE: 63,

    // Linha 4 (64-79): Equipamentos espaciais
    SCANNER_ADVANCED: 64,
    COMMUNICATOR: 65,
    TRANSLATOR: 66,
    ENERGY_WEAPON: 67,
    SHIELD_PERSONAL: 68,
    JETPACK: 69,
    SPACE_SUIT: 70,
    OXYGEN_TANK: 71,
    MEDICAL_SCANNER: 72,
    HEALING_DEVICE: 73,
    ENERGY_CELL: 74,
    POWER_CORE: 75,
    QUANTUM_COMPUTER: 76,
    AI_CORE: 77,
    HOLOGRAM_PROJECTOR: 78,
    TELEPORTER: 79,

    // Linha 5 (80-95): Veículos espaciais
    SPACESHIP_SMALL: 80,
    SPACESHIP_MEDIUM: 81,
    SPACESHIP_LARGE: 82,
    FIGHTER_SHIP: 83,
    CARGO_SHIP: 84,
    EXPLORATION_VESSEL: 85,
    MEDICAL_SHIP: 86,
    RESEARCH_VESSEL: 87,
    SPACE_STATION: 88,
    SATELLITE: 89,
    PROBE: 90,
    ROVER_SPACE: 91,
    SHUTTLE: 92,
    ESCAPE_POD: 93,
    MINING_SHIP: 94,
    BATTLESHIP: 95,

    // Linha 6 (96-111): Personagens espaciais
    ASTRONAUT_MALE: 96,
    ASTRONAUT_FEMALE: 97,
    ALIEN_FRIENDLY: 98,
    ALIEN_HOSTILE: 99,
    ROBOT_MEDICAL: 100,
    ROBOT_SECURITY: 101,
    SCIENTIST_SPACE: 102,
    ENGINEER_SPACE: 103,
    PILOT_SPACE: 104,
    COMMANDER: 105,
    DOCTOR_SPACE: 106,
    RESEARCHER_ALIEN: 107,
    DIPLOMAT: 108,
    TRADER_SPACE: 109,
    CHILD_SPACE: 110,
    AI_HOLOGRAM: 111,

    // Linha 7 (112-127): Itens espaciais
    FOOD_SYNTHESIZED: 112,
    WATER_RECYCLED: 113,
    ENERGY_DRINK: 114,
    NUTRITION_PILL: 115,
    MEDICINE_ADVANCED: 116,
    NANO_MEDICINE: 117,
    TOOL_MULTI: 118,
    TOOL_REPAIR: 119,
    DATA_PAD: 120,
    STAR_MAP: 121,
    CRYSTAL_ENERGY: 122,
    ARTIFACT_ALIEN: 123,
    SAMPLE_ALIEN: 124,
    CURRENCY_GALACTIC: 125,
    COMMUNICATION_DEVICE: 126,
    QUANTUM_KEY: 127
  }
}

// Configuração centralizada de todos os tilesets
export const TILESET_CONFIGS = {
  'tiny-town': TINY_TOWN_CONFIG,
  'cidade': CIDADE_CONFIG,
  'polo-norte': POLO_NORTE_CONFIG,
  'planeta': PLANETA_CONFIG
}

export default TilesetLoader

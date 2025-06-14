# Guia de Configuração de Tilesets - Kenney.nl Assets

## 📋 Resumo das Alterações Implementadas

Implementei um sistema completo de tilesets e tilemaps para substituir os gráficos desenhados manualmente. O sistema inclui:

### ✅ Componentes Criados/Modificados:

1. **`frontend/utils/tilesetLoader.js`** - Sistema de carregamento de tilesets
2. **`frontend/components/game/TileMap.js`** - Componente para renderizar tilemaps
3. **`frontend/data/hospitalMap.js`** - Dados do mapa do hospital em formato tilemap
4. **`frontend/hooks/useAssets.js`** - Hook para gerenciar carregamento de assets
5. **`frontend/utils/collisionSystem.js`** - Sistema de colisão baseado em tiles
6. **`frontend/utils/createDemoTileset.js`** - Gerador de tileset de demonstração
7. **Modificado: `frontend/components/game/Hospital.js`** - Agora usa tilemap quando disponível
8. **Modificado: `frontend/components/game/Player.js`** - Agora usa sistema de colisão
9. **Modificado: `frontend/components/game/MedicalTriageGame.js`** - Integra carregamento de assets

### 🎯 Funcionalidades:

- ✅ Carregamento automático de tilesets
- ✅ Renderização de mapas em camadas
- ✅ Sistema de colisão baseado em tiles
- ✅ Fallback para gráficos atuais se assets não estiverem disponíveis
- ✅ Tileset de demonstração gerado automaticamente
- ✅ Barra de progresso de carregamento
- ✅ Tratamento de erros

## 🚀 Como Importar os Assets do Kenney.nl

### Passo 1: Download do Tiny Town Bundle

1. Acesse: https://kenney.nl/assets/tiny-town
2. Clique em "Download" (é gratuito!)
3. Extraia o arquivo ZIP baixado

### Passo 2: Localizar o Tileset Principal

No bundle extraído, procure por:
- `Tilemap/tilemap_packed.png` OU
- `Tilemap/tilemap.png` OU
- Arquivo similar na pasta `Tilemap/`

### Passo 3: Copiar para o Projeto

1. Copie o arquivo do tileset para:
   ```
   frontend/public/assets/tilesets/tiny-town-tileset.png
   ```

2. **IMPORTANTE**: Renomeie o arquivo para exatamente `tiny-town-tileset.png`

### Passo 4: Verificar Configurações

O arquivo `frontend/utils/tilesetLoader.js` está configurado para:
```javascript
TILESET: {
  path: '/assets/tilesets/tiny-town-tileset.png',
  tileWidth: 16,
  tileHeight: 16,
  spacing: 0,
  margin: 0
}
```

### Passo 5: Testar

1. Inicie o servidor de desenvolvimento:
   ```bash
   cd frontend
   npm run dev
   ```

2. Abra o jogo no navegador
3. Verifique o console do navegador para logs de carregamento
4. O jogo deve mostrar uma barra de progresso durante o carregamento

## 🔧 Configuração Avançada

### Ajustar Dimensões dos Tiles

Se o tileset do Kenney.nl tiver dimensões diferentes, edite `frontend/utils/tilesetLoader.js`:

```javascript
TILESET: {
  path: '/assets/tilesets/tiny-town-tileset.png',
  tileWidth: 32,  // Ajuste conforme necessário
  tileHeight: 32, // Ajuste conforme necessário
  spacing: 1,     // Espaçamento entre tiles
  margin: 1       // Margem ao redor do tileset
}
```

### Mapear IDs dos Tiles

Edite `frontend/data/hospitalMap.js` para ajustar os IDs dos tiles conforme o tileset real:

```javascript
// Exemplo: se no tileset a parede é o tile 5
[1,1,1,1,1] // Mude para [5,5,5,5,5]
```

### Adicionar Mais Assets

Para adicionar sprites de personagens ou outros assets:

1. Coloque os arquivos em `frontend/public/assets/sprites/`
2. Edite `frontend/hooks/useAssets.js` para incluir novos assets:

```javascript
const assetsToLoad = [
  {
    name: 'tiny-town',
    path: TINY_TOWN_CONFIG.TILESET.path,
    // ... configurações existentes
  },
  {
    name: 'characters',
    path: '/assets/sprites/characters.png',
    tileWidth: 16,
    tileHeight: 16,
    spacing: 0,
    margin: 0
  }
]
```

## 🐛 Troubleshooting

### Asset não carrega
- ✅ Verifique se o arquivo está em `frontend/public/assets/tilesets/tiny-town-tileset.png`
- ✅ Confirme que o nome do arquivo está correto
- ✅ Verifique o console do navegador para erros
- ✅ Teste com um arquivo PNG simples primeiro

### Tiles aparecem incorretos
- ✅ Verifique as dimensões configuradas (tileWidth, tileHeight)
- ✅ Ajuste spacing e margin se necessário
- ✅ Use uma ferramenta como GIMP para verificar as dimensões reais do tileset

### Performance ruim
- ✅ Otimize o PNG (use ferramentas como TinyPNG)
- ✅ Evite tilesets muito grandes (máximo 1024x1024px)
- ✅ Considere reduzir a escala se necessário

## 🎮 Estado Atual

**Sem Assets**: O jogo funciona com um tileset de demonstração gerado automaticamente
**Com Assets**: O jogo carregará e usará os assets do Kenney.nl

O sistema é totalmente compatível com versões anteriores - se os assets não estiverem disponíveis, o jogo continuará funcionando com os gráficos atuais.

## 📁 Estrutura de Arquivos Esperada

```
frontend/
├── public/
│   └── assets/
│       ├── tilesets/
│       │   └── tiny-town-tileset.png  ← COLOQUE AQUI
│       ├── sprites/
│       └── maps/
├── components/game/
├── utils/
├── data/
└── hooks/
```

## 🔄 Próximos Passos

1. **Importe o tileset principal** do Tiny Town
2. **Teste o carregamento** e ajuste configurações se necessário
3. **Customize o mapa** editando `hospitalMap.js`
4. **Adicione sprites de personagens** para Player e NPCs
5. **Otimize performance** conforme necessário

O sistema está pronto para usar! Basta adicionar os assets do Kenney.nl e tudo funcionará automaticamente.

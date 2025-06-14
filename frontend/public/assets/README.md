# Assets do Jogo

Este diretório contém todos os assets visuais do jogo, incluindo tilesets, sprites e mapas.

## Estrutura de Diretórios

```
assets/
├── tilesets/          # Imagens de tilesets
├── sprites/           # Sprites de personagens e objetos
├── maps/              # Arquivos de mapa (JSON)
└── README.md          # Este arquivo
```

## Como Importar Assets do Kenney.nl

### 1. Download do Tiny Town Bundle

1. Acesse https://kenney.nl/assets/tiny-town
2. Baixe o bundle completo
3. Extraia os arquivos

### 2. Organização dos Assets

#### Tilesets
- Copie o arquivo principal do tileset para `tilesets/`
- Renomeie para `tiny-town-tileset.png`
- Certifique-se de que seja um arquivo PNG

#### Sprites de Personagens
- Copie sprites de personagens para `sprites/`
- Organize por categoria (ex: `sprites/characters/`, `sprites/objects/`)

### 3. Configuração no Código

O arquivo `frontend/utils/tilesetLoader.js` contém as configurações:

```javascript
export const TINY_TOWN_CONFIG = {
  TILESET: {
    path: '/assets/tilesets/tiny-town-tileset.png',
    tileWidth: 16,
    tileHeight: 16,
    spacing: 0,
    margin: 0
  }
}
```

### 4. Mapeamento de Tiles

No arquivo `frontend/data/hospitalMap.js`, os números representam IDs de tiles:

- `0` = tile vazio (transparente)
- `1` = parede
- `2` = piso normal
- `3` = piso especial (recepção)
- `4` = área de espera
- `5` = área de equipamentos
- etc.

### 5. Verificação

Após colocar os assets:

1. Inicie o servidor de desenvolvimento
2. Abra o jogo
3. Verifique o console do navegador para logs de carregamento
4. Se houver erros, verifique os caminhos dos arquivos

## Formatos Suportados

- **Imagens**: PNG (recomendado), JPG
- **Tamanho dos Tiles**: 16x16px (padrão do Tiny Town)
- **Resolução**: Qualquer, mas múltiplos de 16px são ideais

## Troubleshooting

### Asset não carrega
- Verifique se o arquivo existe no caminho correto
- Confirme que o nome do arquivo está correto
- Verifique permissões de arquivo

### Tiles aparecem incorretos
- Confirme as dimensões do tile (16x16px)
- Verifique se não há spacing ou margin no tileset
- Ajuste os IDs no mapa se necessário

### Performance
- Use PNG otimizados
- Evite tilesets muito grandes (máximo 1024x1024px)
- Considere usar sprite atlases para muitos objetos pequenos

## Próximos Passos

1. **Adicione o tileset principal**: `tiny-town-tileset.png`
2. **Teste o carregamento**: Verifique se aparece no jogo
3. **Ajuste o mapa**: Modifique `hospitalMap.js` conforme necessário
4. **Adicione sprites**: Para personagens e objetos animados
5. **Otimize**: Ajuste tamanhos e qualidade conforme necessário

# Fluxo do Jogo - DoctorPixel

## 🎮 Fluxo Completo Implementado

### 1. Landing Page (`/`)
- **Design**: Landing page moderna e comercial
- **Ação**: Usuário clica em "Começar Agora"
- **Resultado**: Abre dialog de código de acesso

### 2. Dialog de Código de Acesso
- **Componente**: `AccessCodeDialog`
- **Função**: Solicita código de acesso do usuário
- **Validação**: Verifica formato do código
- **Redirecionamento**: Para `/game?code=CODIGO`

### 3. Página do Jogo (`/game`)
- **Estados**: `connecting` → `ready` → `config` → `playing`
- **Fluxo**: Conecta WebSocket → Valida código → Mostra ConfigStepper

### 4. ConfigStepper (NOVO)
- **Componente**: `ConfigStepper`
- **Função**: Configuração do personagem
- **Steps**: 3 etapas de configuração
- **Resultado**: Configuração salva e inicia o jogo

### 5. Jogo Principal
- **Componente**: `MedicalTriageGame`
- **Props**: `accessCode`, `playerConfig`, `onExit`
- **Função**: Jogo principal com configurações aplicadas

## 🔄 Estados da Página Game.js

### Estados de Controle
```javascript
const [connectionStatus, setConnectionStatus] = useState('connecting')
const [showConfigStepper, setShowConfigStepper] = useState(false)
const [showGame, setShowGame] = useState(false)
const [playerConfig, setPlayerConfig] = useState(null)
```

### Fluxo de Estados
1. **connecting**: Conectando ao WebSocket
2. **ready**: Conexão estabelecida → Mostra ConfigStepper
3. **config**: ConfigStepper ativo
4. **playing**: Jogo principal ativo

## ⚙️ ConfigStepper - Configuração do Personagem

### Step 1: Escolha do Médico
- **Opções**: Dr.Bot 🤖 ou Dra.Maria 👩‍⚕️
- **Design**: Cards interativos com hover effects
- **Seleção**: Click para selecionar
- **Validação**: Deve selecionar um médico

### Step 2: Escolha do Personagem
- **Opções**: Jorge 👨 ou Ana 👩
- **Design**: Card central com navegação lateral
- **Atributos**: Humor, Curioso, Energia, Social, Soneca, Criativo
- **Navegação**: Botões < e > para alternar

### Step 3: Escolha do Local
- **Opções**: 
  - Fazendinha 🚜
  - Cidade 🏙️
  - Polo Norte 🐧
  - Planetário 🚀
- **Design**: Grid 2x2 com cards interativos
- **Seleção**: Click para selecionar
- **Validação**: Deve selecionar um local

### Design do ConfigStepper
- **Background**: Gradiente escuro com efeitos
- **Cards**: Glassmorphism com bordas neon
- **Animações**: Hover effects e transições
- **Stepper**: Material UI com cores customizadas
- **Botões**: Validação de estado para navegação

## 🎯 Funções de Callback

### handleConfigStepperComplete(config)
```javascript
const config = {
  doctor: selectedDoctor,      // 'dr-bot' | 'dra-maria'
  character: selectedCharacter, // 'Jorge' | 'Ana'
  location: selectedLocation    // 'fazendinha' | 'cidade' | 'polo-norte' | 'planetario'
}
```
- **Ação**: Salva configuração e inicia o jogo
- **Resultado**: `showConfigStepper = false`, `showGame = true`

### handleConfigStepperClose()
- **Ação**: Usuário fecha sem completar
- **Resultado**: Volta para landing page

## 🎨 Design System

### Cores Utilizadas
- **Primary**: #56FF9E (Verde neon)
- **Background**: #131F24 (Azul escuro)
- **Cards**: #1A2B33 (Azul médio)
- **Accent**: #4ECDC4 (Turquesa)

### Efeitos Visuais
- **Glassmorphism**: Cards com blur e transparência
- **Gradientes**: Backgrounds e botões
- **Hover Effects**: Transform e box-shadow
- **Bordas Neon**: Seleção com cor primária

## 🔧 Integração com WebSocket

### Eventos Suportados
- **game:join**: Enviar código de acesso
- **game:access_granted**: Código válido → Mostra ConfigStepper
- **game:access_denied**: Código inválido → Erro

### Simulação para Desenvolvimento
```javascript
// Timeout para simular conexão
setTimeout(() => {
  setConnectionStatus('ready')
  setShowConfigStepper(true)
}, 3000)
```

## 📱 Responsividade

### Breakpoints
- **Mobile**: Layout adaptado para telas pequenas
- **Tablet**: Grid responsivo
- **Desktop**: Layout completo

### Adaptações
- **Cards**: Tamanhos flexíveis
- **Grid**: Colunas responsivas
- **Tipografia**: Tamanhos adaptativos
- **Espaçamento**: Padding responsivo

## 🚀 Próximos Passos

### Melhorias Sugeridas
1. **Persistência**: Salvar configuração no localStorage
2. **Animações**: Transições entre steps
3. **Validação**: Feedback visual melhorado
4. **Customização**: Mais opções de personalização
5. **Preview**: Visualização do personagem configurado

### Integração Backend
1. **Validação Real**: Códigos de acesso no servidor
2. **Configuração Persistente**: Salvar no banco de dados
3. **Sessões**: Gerenciamento de sessões de jogo
4. **Analytics**: Tracking de configurações escolhidas

## ✅ Status Atual

- ✅ Fluxo completo implementado
- ✅ ConfigStepper funcional
- ✅ Design moderno aplicado
- ✅ Estados de controle funcionando
- ✅ Validação de steps implementada
- ✅ Integração com MedicalTriageGame
- ✅ Responsividade garantida
- ✅ Callbacks funcionais

**Resultado**: Fluxo completo de Landing → Código → Configuração → Jogo funcionando perfeitamente!

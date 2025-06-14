# Hospital Virtual - Triagem Médica Infantil Gamificada

Uma plataforma inovadora de triagem médica para crianças, desenvolvida com Next.js, Tailwind CSS e Pixi.js. O projeto combina gamificação com inteligência artificial para tornar o processo de triagem médica divertido e envolvente para crianças.

## 🎯 Visão Geral

O Hospital Virtual é um ambiente 2D interativo estilo Gather onde crianças podem:

- Explorar um hospital virtual amigável
- Interagir com NPCs inteligentes (Dr. Pixel e equipe)
- Realizar triagem médica através de jogos divertidos
- Ganhar pontos e conquistas
- Receber orientações médicas personalizadas

## 🚀 Getting Started

### Instalação

```bash
# Clone o repositório
cd frontend

# Instale as dependências
npm install
# ou
yarn install
# ou
pnpm install
```

### Executar o projeto

```bash
# Inicie o servidor de desenvolvimento
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 🛠️ Tech Stack

### Core

- **Next.js 14** - Framework React para produção
- **React 18** - Biblioteca JavaScript para interfaces
- **TypeScript** - JavaScript tipado
- **Tailwind CSS v3** - Framework CSS utility-first

### Game Engine

- **Pixi.js 7.3** - Engine 2D para renderização de alta performance
- **@pixi/react 7.1** - Bindings React para Pixi.js
- **@pixi/sound** - Sistema de áudio para jogos

### Estado e Animações

- **Zustand** - Gerenciamento de estado leve
- **Framer Motion** - Animações fluidas para React

## 📁 Estrutura do Projeto

```
frontend/
├── components/
│   ├── game/              # Componentes do jogo
│   │   ├── MedicalTriageGame.js    # Componente principal do jogo
│   │   ├── Player.js               # Avatar do jogador
│   │   ├── NPCDoctor.js           # NPC Dr. Pixel
│   │   ├── Hospital.js            # Cenário do hospital
│   │   ├── DialogSystem.js        # Sistema de diálogos
│   │   ├── TriageSystem.js        # Sistema de triagem gamificado
│   │   └── GameUI.js              # Interface do jogo
│   ├── Layout.js          # Layout principal
│   ├── Navbar.js          # Navegação
│   └── Footer.js          # Rodapé
├── pages/
│   ├── _app.js           # App customizado
│   └── index.js          # Página inicial
├── store/
│   └── gameStore.js      # Store Zustand para estado do jogo
├── styles/
│   └── globals.css       # Estilos globais com Tailwind
├── public/               # Assets estáticos
└── [arquivos de config] # Configurações Next.js, Tailwind, etc.
```

## 🎮 Funcionalidades do Jogo

### Sistema de Personagens

- **Player customizável** com diferentes avatares
- **Dr. Pixel** - NPC principal com IA para triagem
- **Animações fluidas** e feedback visual

### Sistema de Triagem Gamificado

- **5 etapas interativas** de avaliação médica
- **Interface amigável** com emojis e animações
- **Sistema de pontuação** e recompensas
- **Recomendações personalizadas** baseadas nas respostas

### Mecânicas de Jogo

- **Movimento livre** pelo hospital virtual (WASD ou setas)
- **Sistema de conquistas** e progressão
- **Interface responsiva** para desktop e mobile
- **Persistência de dados** com localStorage

### Recursos de Acessibilidade

- **Design inclusivo** para crianças
- **Controles simples** e intuitivos
- **Feedback visual e sonoro**
- **Suporte a dispositivos móveis**

## 🏥 Fluxo da Triagem

1. **Entrada no Hospital** - Criança explora o ambiente
2. **Encontro com Dr. Pixel** - NPC inicia conversa amigável
3. **Triagem Interativa** - 5 mini-jogos de avaliação:
   - Como você está se sentindo? (seleção de emojis)
   - Verificação de sintomas (interface visual)
   - Escala de dor gamificada
   - Atividades do dia
   - Avaliação de humor
4. **Resultados** - Análise automática e recomendações
5. **Recompensas** - Pontos, conquistas e feedback positivo

## 🎨 Design System

### Cores Principais

- **Verde/Azul** - Ambiente hospitalar amigável
- **Roxo/Rosa** - Elementos de gamificação
- **Amarelo/Laranja** - Recompensas e conquistas

### Componentes Customizados

- Botões com gradientes e animações
- Cards com sombras e bordas arredondadas
- Sistema de diálogos com animações de digitação
- Interface de triagem com feedback visual

## 🔧 Scripts Disponíveis

```bash
npm run dev      # Servidor de desenvolvimento
npm run build    # Build para produção
npm run start    # Servidor de produção
npm run lint     # Verificação de código
```

## 🌟 Próximas Funcionalidades

- [ ] Sistema de relatórios para pais/responsáveis
- [ ] Integração com APIs médicas
- [ ] Mais NPCs e especialidades médicas
- [ ] Sistema de agendamento de consultas
- [ ] Modo multiplayer para irmãos
- [ ] Suporte a múltiplos idiomas

## 🤝 Contribuindo

Este projeto foi desenvolvido para o hackathon com foco em inovação na área da saúde infantil. Contribuições são bem-vindas!

## 📄 Licença

Projeto desenvolvido para fins educacionais e de demonstração.

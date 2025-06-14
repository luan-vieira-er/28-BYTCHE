# 🔗 Guia de Conexão Frontend Next.js com Backend API

## 📋 Visão Geral da Arquitetura

Sua aplicação possui a seguinte estrutura:

- **Frontend**: Next.js (porta 3000 por padrão)
- **Backend API**: Express.js (porta 3001)
- **Banco de Dados**: JSON Server (porta 3000)
- **WebSocket**: Socket.io (integrado ao backend na porta 3001)

## 🚀 Como Iniciar os Serviços

### 1. Iniciar o JSON Server (Banco de Dados)
```bash
cd backend
npx json-server --watch db.json --port 3000
```

### 2. Iniciar o Backend API
```bash
cd backend
npm run dev
```
O backend estará rodando em: `http://localhost:3001`

### 3. Iniciar o Frontend
```bash
cd frontend
npm run dev
```
O frontend estará rodando em: `http://localhost:3000`

## 🔧 Configuração Implementada

### Arquivo de Serviço API (`frontend/services/api.service.js`)

Criamos um serviço centralizado para todas as chamadas de API:

```javascript
import apiService from '../services/api.service';

// Exemplo de uso:
const response = await apiService.loginMedic({
  nome: 'usuario@email.com',
  password: 'senha123'
});
```

### Variáveis de Ambiente (`frontend/.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_WS_URL=http://localhost:3001
NEXT_PUBLIC_JSON_SERVER_URL=http://localhost:3000
```

## 📡 Rotas da API Disponíveis

### Autenticação
- `POST /api/auth/login` - Login do médico
- `POST /api/auth/register` - Criar novo médico

### Salas/Consultas
- `GET /api/rooms` - Listar todas as salas
- `POST /api/rooms` - Criar nova sala
- `GET /api/medic/:id/rooms` - Listar salas de um médico

### Health Check
- `GET /api/health` - Verificar se o backend está online

## 🔐 Autenticação

O sistema usa JWT (JSON Web Tokens) para autenticação:

1. **Login**: Usuário faz login e recebe um token
2. **Armazenamento**: Token é salvo no localStorage
3. **Requisições**: Token é enviado automaticamente nas requisições
4. **Logout**: Token é removido do localStorage

## 💻 Exemplos de Uso

### Login
```javascript
// Na LoginPage
const handleLogin = async () => {
  try {
    const response = await apiService.loginMedic({
      nome: formData.email,
      password: formData.password
    });
    
    if (response.success) {
      router.push('/'); // Redirecionar para home
    }
  } catch (error) {
    alert('Erro no login');
  }
};
```

### Criar Consulta
```javascript
// Na CreateRoomPage
const handleSubmit = async () => {
  try {
    const response = await apiService.createRoom({
      medic_id: currentUser.id,
      finalidade: formData.tipo_consulta,
      perfil_paciente: formData.perfil_paciente,
      foco: formData.foco,
      historico_previo: formData.historico_previo
    });
    
    if (response.success) {
      router.push('/');
    }
  } catch (error) {
    alert('Erro ao criar consulta');
  }
};
```

### Listar Salas
```javascript
// Em qualquer componente
const loadRooms = async () => {
  try {
    const response = await apiService.getRooms();
    setRooms(response.rooms);
  } catch (error) {
    console.error('Erro ao carregar salas:', error);
  }
};
```

## 🌐 WebSocket (Tempo Real)

Para comunicação em tempo real, use o serviço WebSocket já existente:

```javascript
import WebSocketService from '../services/websocket.service';

// Conectar
WebSocketService.connect('http://localhost:3001');

// Entrar em uma sala
WebSocketService.emit('doctorJoinRoom', roomId);

// Escutar mensagens
WebSocketService.on('newMessage', (data) => {
  console.log('Nova mensagem:', data);
});
```

## 🔍 Debugging

### Verificar se o Backend está Online
```javascript
const isOnline = await apiService.healthCheck();
console.log('Backend online:', isOnline);
```

### Logs no Console
O serviço API automaticamente loga todas as requisições:
- ✅ Requisições bem-sucedidas
- ❌ Erros de requisição
- 🌐 URLs chamadas

## 🚨 Troubleshooting

### Erro de CORS
Se houver erro de CORS, verifique se o backend tem:
```javascript
app.use(cors()); // No backend/src/index.ts
```

### Erro de Conexão
1. Verifique se todos os serviços estão rodando
2. Confirme as portas corretas
3. Verifique as variáveis de ambiente

### Token Expirado
O token expira em 1 hora. Para renovar:
```javascript
if (!apiService.isAuthenticated()) {
  router.push('/LoginPage');
}
```

## 📝 Próximos Passos

1. **Implementar middleware de autenticação** no backend
2. **Adicionar validação de dados** mais robusta
3. **Implementar refresh tokens** para sessões longas
4. **Adicionar tratamento de erros** mais específico
5. **Implementar cache** para melhor performance

## 🎯 Resumo

Agora seu frontend Next.js está completamente conectado com o backend API! Você pode:

- ✅ Fazer login e criar contas
- ✅ Criar e listar consultas/salas
- ✅ Usar autenticação JWT
- ✅ Comunicar em tempo real via WebSocket
- ✅ Gerenciar estado de autenticação
- ✅ Fazer debugging das requisições

Todas as páginas (LoginPage e CreateRoomPage) já estão integradas e funcionais!

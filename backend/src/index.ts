import express from 'express';
import router from './routes';
import { createServer } from 'http';
import { Server } from 'socket.io'
import { startChat, sendMessage } from './services/openai.service'

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// Mount all routes
app.use('/api', router);

const server = createServer(app);

export const io = new Server(server);

io.on('connection', (socket) => {
  console.log('🟢 Novo cliente conectado:', socket.id);

  // Recebe o ID da sala e entra
  socket.on('doctorJoinRoom', (roomId) => {
    // Buscar no Json Server se existe a Room Id
    socket.join(roomId);
    console.log(`Socket ${socket.id} entrou na sala ${roomId}`);
  });

  // Recebe o ID da sala e entra
  socket.on('patientJoinRoom', (roomId) => {
    // Buscar no Json Server se existe a Room Id
    socket.join(roomId);
    console.log(`Socket ${socket.id} entrou na sala ${roomId}`);

    // Notifica os outros da sala
    socket.to(roomId).emit('patientJoined', `Usuário ${socket.id} entrou na sala`);
  });

  // Recebe mensagens e repassa para os membros da sala
  socket.on('firstInteraction', async ({ roomId }) => {
    const response = await startChat(roomId);
    if (response){
      const { reply, choices } = response
      io.to(roomId).emit('newMessage', { sender: socket.id, message: {
        reply, choices
      } });
    }
  });

  // Recebe mensagens e repassa para os membros da sala
  socket.on('messageReceived', async ({ roomId, message }) => {
    const response = await sendMessage(roomId, message);
    if (response){
      const { reply, choices } = response
      io.to(roomId).emit('newMessage', { sender: socket.id, message: {
        reply, choices
      } });
    }
  });

  socket.on('disconnect', () => {
    console.log('🔴 Cliente desconectado:', socket.id);
  });
});

const test = async () => {
  const response = await startChat('');
  console.log("🚀 ~ test ~ response:", response)
}

// test()

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

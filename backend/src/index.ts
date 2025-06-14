import express from 'express';
import router from './routes';
import { createServer } from 'http';
import { Server } from 'socket.io'
import { startChat } from './services/openai.service'

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

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
  socket.on('firstInteraction', ({ roomId }) => {
    const firstMessage = startChat(roomId);
    io.to(roomId).emit('newMessage', { sender: socket.id, firstMessage });
  });

  socket.on('disconnect', () => {
    console.log('🔴 Cliente desconectado:', socket.id);
  });
});



// Mount all routes
app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

import express from 'express';
import router from './routes';
import { createServer } from 'http';
import { Server } from 'socket.io'
import { startChat, sendMessage } from './services/openai.service'
import axios from 'axios';
import { verifyRoom } from './services/room.service';

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
  socket.on('doctorJoinRoom', async (roomId) => {
    // Buscar no Json Server se existe a Room Id
    let existRoom = await verifyRoom(roomId);
    if(!existRoom) return socket.emit('error', 'Sala não encontrada')
    // Cria a sala
    socket.join(roomId);
    console.log(`Socket ${socket.id} entrou na sala ${roomId}`);
  });

  // Recebe o ID da sala e entra
  socket.on('patientJoinRoom', async (roomId) => {
    // Buscar no Json Server se existe a Room Id
     let existRoom = await verifyRoom(roomId);
    if(!existRoom) return socket.emit('error', 'Sala não encontrada')
    socket.join(roomId);
    // Consulta os usuários presentes na sala
    console.log(`Socket ${socket.id} entrou na sala ${roomId}`);

    // Notifica os outros da sala
    socket.to(roomId).emit('patientJoined', `Usuário ${socket.id} entrou na sala`);
  });

  // Recebe mensagens e repassa para os membros da sala
  socket.on('firstInteraction', async (roomId) => {
    let existRoom = await verifyRoom(roomId);
    if(!existRoom) socket.emit('error', 'Sala não encontrada')
    // Consulta os usuários presentes na sala
    // const isSocketInRoom = await io.in(roomId).fetchSockets().then(sockets => sockets.some(sock => sock.id === socket.id));
    // if(!isSocketInRoom){
    //   socket.join(roomId)
    // }
    const response = await startChat(roomId);
    if (response){
      const { reply, choices } = response
      io.to(roomId).emit('newMessage', { sender: socket.id, message: {
        reply, choices
      } });
    }
  });

  socket.on('position', async (data) => {
    let {roomId, position} = data
    let existRoom = await verifyRoom(roomId);
    if(!existRoom) return socket.emit('error', 'Sala não encontrada')

    const isSocketInRoom = await io.in(roomId).fetchSockets().then(sockets => sockets.some(sock => sock.id === socket.id));
    if(!isSocketInRoom){
      console.log("Usuario não estava na sala")
      socket.join(roomId)
    }
    // Neste ponto, estamos consultando a sala a cada vez que o usuário muda de posição.
    // Isso pode gerar um overhead muito grande se o usuário se movimentar muito.
    // Uma melhor prática pode ser armazenar a sala em memória e verificar se o usuário está na sala antes de emitir a mensagem.
    // Dessa forma, evitamos fazer uma requisição desnecessária para o servidor.
    // Além disso, podemos criar um intervalo para verificar se o usuário está na sala a cada X segundos,
    // e se ele não estiver, podemos desconectar ele da sala.
        
    io.to(roomId).emit('position', { sender: socket.id, position });
  });

  // Recebe mensagens e repassa para os membros da sala
  socket.on('patientSendMessage', async (roomId, message) => {
    let existRoom = await verifyRoom(roomId);
    if(!existRoom) return socket.emit('error', 'Sala não encontrada')
    io.to(roomId).emit('newMessage', { sender: socket.id, message: message })
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

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

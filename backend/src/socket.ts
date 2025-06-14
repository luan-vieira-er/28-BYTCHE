import { IncomingMessage, Server as HttpServer, ServerResponse } from "http";
import { Server, Socket } from "socket.io";
import {
  updateRoom,
  updateRoomHistory,
  verifyRoom,
} from "./services/room.service";
import { sendMessage, startChat } from "./services/openai.service";

export const socketHandler = async (server: HttpServer) => {
  const io = new Server(server);

  io.on("connection", (socket: Socket) => {
    console.log("🟢 Novo cliente conectado:", socket.id);

    socket.on("doctorJoinRoom", async (roomId) => {
      await updateRoom(roomId, { status: "DOUTOR_CONECTADO" });
      socket.join(roomId);
      console.log(`Socket ${socket.id} entrou na sala ${roomId}`);
    });

    socket.on("patientJoinRoom", async (roomId) => {
      let existRoom = await verifyRoom(roomId);
      if (!existRoom) return socket.emit("error", "Sala não encontrada");

      await updateRoom(roomId, { status: "PACIENTE_CONECTADO" });
      socket.join(roomId);
      console.log(`Socket ${socket.id} entrou na sala ${roomId}`);

      socket
        .to(roomId)
        .emit("patientJoined", `Usuário ${socket.id} entrou na sala`);
    });

    socket.on("firstInteraction", async (roomId) => {
      let existRoom = await verifyRoom(roomId);
      if (!existRoom) socket.emit("error", "Sala não encontrada");

      await updateRoom(roomId, { status: "CHAT_INICIADO" });

      const response = await startChat(roomId);
      if (response) {
        const { reply, choices } = response;
        io.to(roomId).emit("newMessage", {
          sender: socket.id,
          message: {
            reply,
            choices,
          },
        });
      }
    });

    socket.on("position", async (data) => {
      let { roomId, position } = data;
      const isSocketInRoom = await io
        .in(roomId)
        .fetchSockets()
        .then((sockets) => sockets.some((sock) => sock.id === socket.id));
      if (!isSocketInRoom) {
        console.log("Usuario não estava na sala");
        socket.join(roomId);
      }

      const socketsInRoom = await io
        .in(roomId)
        .fetchSockets()
        .then((sockets) => sockets.map((s) => s.id));
      console.log(`Usuarios na sala ${roomId}: ${socketsInRoom.join(", ")}`);
      // Neste ponto, estamos consultando a sala a cada vez que o usuário muda de posição.
      // Isso pode gerar um overhead muito grande se o usuário se movimentar muito.
      // Uma melhor prática pode ser armazenar a sala em memória e verificar se o usuário está na sala antes de emitir a mensagem.
      // Dessa forma, evitamos fazer uma requisição desnecessária para o servidor.
      // Além disso, podemos criar um intervalo para verificar se o usuário está na sala a cada X segundos,
      // e se ele não estiver, podemos desconectar ele da sala.

      io.to(roomId).emit("position", { sender: socket.id, position });
    });

    socket.on("patientSendMessage", async (roomId, message) => {
      let existRoom = await verifyRoom(roomId);
      if (!existRoom) return socket.emit("error", "Sala não encontrada");
      io.to(roomId).emit("newMessage", { sender: socket.id, message: message });
      const response = await sendMessage(roomId, message);
      if (response) {
        const { reply, choices } = response;
        io.to(roomId).emit("newMessage", {
          sender: socket.id,
          message: {
            reply,
            choices,
          },
        });
      }
    });

    socket.on("doctorCloseRoom", async (roomId) => {
      let existRoom = await verifyRoom(roomId);
      if (!existRoom) return socket.emit("error", "Sala não encontrada");
      await updateRoom(roomId, { status: "CHAT_FINALIZADO" });

      io.to(roomId).emit("closeRoom", "Sala fechada pelo médico");
    });

    socket.on("disconnect", () => {
      console.log("🔴 Cliente desconectado:", socket.id);
    });
  });
};

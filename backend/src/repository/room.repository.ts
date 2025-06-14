import axios from 'axios';

export async function verifyRoom(roomId: string): Promise<boolean> {
  console.log("🚀 ~ verifyRoom ~ roomId:", roomId)
  try {
    const response = await axios.get(`http://localhost:3000/room/${roomId}`);
    console.log("🚀 ~ verifyRoom ~ response:", response.data)
    return response.status === 200;
  } catch (error) {
    console.error('Erro ao verificar a sala');
    return false;
  }
}

export async function getRoom(roomId: string): Promise<any> {
  try {
    const response = await axios.get(`http://localhost:3000/room/${roomId}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar a sala');
    return false;
  }
}

export async function updateRoomHistory(roomId: string, role: string, newMessage: string): Promise<boolean> {
  console.log("🚀 ~ updateRoom ~ roomId:", roomId, "role: ", role, "newMessage:", newMessage);
  try {
    let room = await getRoom(roomId);
    room.chat_history.push({ role, content: newMessage })
    const response = await axios.patch(`http://localhost:3000/room/${roomId}`, room);
    return response.status === 200;
  } catch (error) {
    console.error('Erro ao atualizar a sala:');
    return false;
  }
}
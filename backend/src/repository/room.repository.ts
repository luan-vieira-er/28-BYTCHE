import axios from 'axios';

export async function verifyRoom(roomId: string): Promise<boolean> {
  try {
    const response = await axios.get(`http://localhost:3000/room/${roomId}`);
    return response.status === 200;
  } catch (error) {
    console.error('Erro ao verificar a sala:', error);
    return false;
  }
}

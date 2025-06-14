import { Request, Response, Router } from 'express';
import { createRoom, getMedicRooms, getRooms, createMedic, loginMedic } from '../controllers/room.controller';


const router = Router();

// Rotas de autenticação
router.post('/auth/login', loginMedic);
router.post('/auth/register', createMedic);

// Rotas de salas
router.get('/rooms', getRooms);
router.post('/rooms', createRoom);
router.get('/medic/:id/rooms', getMedicRooms);

// Rota de health check
router.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK', message: 'Backend is running' });
});

export default router;

import { Request, Response, Router } from 'express';
import { createMedic, createRoom, getMedicRooms, getRooms } from '../controllers/room.controller';


const router = Router();

router.post('/medic', createMedic)
router.get('/rooms', getRooms);
router.get('/medic/:id/rooms', getMedicRooms);

export default router;

import { Request, Response, Router } from 'express';
import { createRoom, getMedicRooms, getRooms } from '../controllers/room.controller';


const router = Router();

router.get('/rooms', getRooms);
router.get('/medic/:id/rooms', getMedicRooms);

export default router;

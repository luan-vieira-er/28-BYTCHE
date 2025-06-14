import { Router } from 'express';
import { getHome } from '../controllers/home.controller';
import { createRoom } from '../controllers/room.controller';


const router = Router();

router.get('/', getHome);

router.post('/create-rooom', createRoom);

export default router;

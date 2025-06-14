import { Router } from 'express';
import { getHome } from '../controllers/home.controller';
import { createRoom } from '../controllers/room.controller';


const router = Router();

router.get('/', getHome);


export default router;

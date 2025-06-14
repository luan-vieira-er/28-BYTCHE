import { Request, Response, Router } from 'express';
import { getHome } from '../controllers/home.controller';
import { createRoom, getRooms } from '../controllers/room.controller';


const router = Router();

router.get('/', getHome);
router.get('/rooms', (req: Request, res: Response) => getRooms(req, res));

export default router;

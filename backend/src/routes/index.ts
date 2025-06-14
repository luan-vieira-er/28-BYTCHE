import { Router } from 'express';
import { getHome } from '../controllers/home.controller';

const router = Router();

router.get('/', getHome);

router.post('/create-rooom', )

export default router;

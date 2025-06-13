import { Request, Response } from 'express';
import { hello } from '../services/home.service'

export const getHome = async (req: Request, res: Response) => {
  try {
    const getHello = await hello();
    res.send(getHello)
  } catch (error) {
    res.status(400).send('Error tryng to het Hello')
  }
};
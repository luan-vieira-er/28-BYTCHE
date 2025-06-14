import { Request, Response } from 'express';
import { hello } from '../services/home.service'
import axios from 'axios'

export const getHome = async (req: Request, res: Response) => {
  try {
    
  } catch (error) {
    res.status(400).send('Error tryng to het Hello')
  }
};
import axios from "axios"
import { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';
import * as jwt from 'jsonwebtoken';
import { listRooms } from "../services/room.service";
const bcrypt = require('bcrypt');


type Room = {
  id: string;
  status: any;
  medic_id: String;
  dt_criacao?: Date;
  dt_finalizacao?: Date;
}

type Medic = {
  id: string;
  name: string;
  password: string;
}

type Kid = {
  name: string;
  idade: Number;
}

export async function createRoom(req: Request, res: Response){
  try{
      const body = req.body as Room | null;
      if(!body) {
        res.status(400).json({ success: false, message: 'Dados da sala são obrigatórios' });
        return;
      }

      let room: Room = {} as Room;
      room.status = 'SALA_CRIADA'
      room.dt_criacao = new Date()
      room.id = uuidv4();
      room.medic_id = body.medic_id

      // Salvar no JSON Server
      await axios.post('http://localhost:3000/room', room);

      res.status(201).json({ success: true, message: 'Sala criada com sucesso', id: room.id, room: room });
      return;

  }catch(error){
    console.log("🚀 ~ createRoom ~ error:", error)
    res.status(500).json({ success: false, message: 'Não foi possível criar uma sala' });
    return;
  }
}


export async function createMedic(req: Request, res: Response){
  try{
      const body = req.body as Medic | null;
      if(!body) {
        res.status(400).json({ success: false, message: 'Dados do médico são obrigatórios' });
        return;
      }

      let medic: Medic = {} as Medic;
      medic.name = body.name;
      medic.password = body.password;
      medic.id = uuidv4();

      // Hash da senha
      const saltRounds = parseInt(process.env.SALT_ROUNDS || '10');
      const hashedPassword = await bcrypt.hash(medic.password, saltRounds);
      medic.password = hashedPassword;

      // Salvar no JSON Server
      console.log("🚀 ~ createMedic ~ medic:", medic)

      await axios.post('http://localhost:3000/doctor', medic);

      res.status(201).json({ success: true, message: 'Médico criado com sucesso', id: medic.id });
      return;

  }catch(error){
    console.log("🚀 ~ createMedic ~ error:", error)
    res.status(500).json({ success: false, message: 'Não foi possível criar o médico' });
    return;
  }
}


export async function loginMedic(req: Request, res: Response){
  try{
      const body = req.body as Medic | null;
      if(!body) {
        res.status(400).json({ success: false, message: 'Dados de login são obrigatórios' });
        return;
      }

      const { name, password } = body;
      console.log("🚀 ~ loginMedic ~ name:", name)

      // Buscar médico no JSON Server
      const response = await axios.get(`http://localhost:3000/doctor?name=${name}`);

      
      if(response.data.length > 0){
        const medicFromDB = response.data[0];

        // Comparar senha
        const isPasswordValid = await bcrypt.compare(password, medicFromDB.password);
          console.log("🚀 ~ loginMedic ~ medicFromDB:", medicFromDB)
          console.log("🚀 ~ loginMedic ~ isPasswordValid:", isPasswordValid)

        if(isPasswordValid) {
          // Gerar token JWT
          const token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            id: medicFromDB.id,
            name: medicFromDB.name
          }, process.env.HASH_TOKEN || 'default_secret');

          res.status(200).json({
            success: true,
            message: 'Logado com sucesso',
            token: token,
            id: medicFromDB.id,
            name: medicFromDB.name
          });
          return;
        } else {
          res.status(401).json({ success: false, message: 'Senha incorreta' });
          return;
        }
      } else {
        res.status(404).json({ success: false, message: 'Médico não encontrado' });
        return;
      }

  }catch(error){
    console.log("🚀 ~ loginMedic ~ error:", error)
    res.status(500).json({ success: false, message: 'Erro ao logar' });
    return;
  }
}

export const getRooms = async (req: Request, res: Response) => {
  try{
    const rooms = await listRooms();
    res.status(200).json({ success: true, message: 'Salas listadas com sucesso', rooms: rooms})
    return;
  }catch(error){
    console.log("🚀 ~ getRooms ~ error:", error)
    res.status(500).json({ success: false, message: 'Erro ao listar as salas'})
    return;
  }
}

export const getMedicRooms = async (req: Request, res: Response) => {
  const medicId = req.query.medicId as string;
  if(!medicId) {
    res.status(400).json({ success: false, message: 'Parâmetro "medicId" é obrigatório'});
    return;
  }
  try{
    const rooms = await listRooms();
    const medicRooms = rooms.filter(room => room.medic_id === medicId);
    res.status(200).json({ success: true, message: 'Salas do médico listadas com sucesso', rooms: medicRooms})
    return;
  }catch(error){
    console.log("🚀 ~ getMedicRooms ~ error:", error)
    res.status(500).json({ success: false, message: 'Erro ao listar as salas do médico'})
    return;
  }
}

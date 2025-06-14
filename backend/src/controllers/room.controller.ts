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
  nome: string;
  password: string;
}

type Kid = {
  nome: string;
  idade: Number;
}

export function createRoom(req: Request, res: Response){
  try{  
      const body = req.body as Room | null;
      if(!body) return

      let room: Room = {} as Room;
      room.status = body.status
      room.dt_criacao = new Date()
      room.status = 'SALA_CRIADA'
      room.id = uuidv4();
      room.medic_id = body.medic_id

      let response = axios.post('http://localhost:3000', room)

      return { success: true, message: 'Sala criada com sucesso', id: room.id}

  }catch(error){
  console.log("🚀 ~ createRoom ~ error:", error)
  return { success: false, message: 'Não foi possível criar uma sala'}

  }
}


export function createMedic(req: Request, res: Response){
  try{  
      const body = req.body as Medic | null;
      if(!body) return

      let medic: Medic = {} as Medic;
      medic.nome = body.nome
      medic.id = uuidv4()

      bcrypt.hash(medic.password, process.env.SALT_ROUNDS, function(err, hash) {
          medic.password = hash
      }); 
      
      
      let response = axios.post('http://localhost:3000', medic)


      res.status(200).json({ success: true, message: 'Médico criado com sucesso', id: medic.id})
      return;
  }catch(error){
  console.log("🚀 ~ createRoom ~ error:", error)
  res.status(400).json({ success: false, message: 'Não foi possível criar um médico'})
  return;

  }
}


export function loginMedic(req: Request, res: Response){
  try{  
      const body = req.body as Medic | null;
      if(!body) return

      let medic: Medic = {} as Medic;
      medic.nome = body.nome
      medic.id = body.id

      axios.get(`http://localhost:3000?nome=${medic.nome}`)
      .then((response) => {
        if(response.data.length > 0){
          let medicFromDB = response.data[0]
          bcrypt.compare(medic.password, medicFromDB.password, function(err, result) {
            if(err) return res.status(401).json({ success: false, message: 'Senha incorreta'})
            let token = jwt.sign({ 
              exp: Math.floor(Date.now() / 1000) + (60 * 60),
              id: medic.id,
              nome: medic.nome }, process.env.HASH_TOKEN);
            if(result) return res.status(200).json({ success: true, message: 'Logado com sucesso', token: token})
            else return res.status(401).json({ success: false, message: 'Senha incorreta'})
          }); 
        }else{
          return res.status(404).json({ success: false, message: 'Médico não encontrado'})
        }
      })
      .catch((error) => {
        console.log("🚀 ~ loginMedic ~ error:", error)
        return res.status(500).json({ success: false, message: 'Erro ao logar'})
      })

  }catch(error){
    console.log("🚀 ~ loginMedic ~ error:", error)
    return res.status(500).json({ success: false, message: 'Erro ao logar'})

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

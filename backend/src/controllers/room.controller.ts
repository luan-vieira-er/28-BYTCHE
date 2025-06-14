import axios from "axios"
import { v4 as uuidv4 } from 'uuid';



type Sala = {
  id: string;
  status: any;
  dt_criacao?: Date;
  dt_finalizacao?: Date;
}

type Medic = {
  id: string;
  nome: string;
}

type Kid = {
  nome: string;
  idade: Number;
}

export function createRoom(req: Request, res: Response){
  try{  
      const body = req.body as Sala | null;
      if(!body) return

      let sala: Sala = {} as Sala;
      sala.status = body.status
      sala.dt_criacao = new Date()
      sala.status = 'AGUARDANDO'
      sala.id = uuidv4();

      let response = axios.post('http://localhost:3001', sala)
      
      return { success: true, message: 'Sala criada com sucesso'}

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
      
      let response = axios.post('http://localhost:3001', medic)
      console.log("🚀 ~ createRoom ~ response:", response)


      return { success: true, message: 'Sala criada com sucesso'}

  }catch(error){
  console.log("🚀 ~ createRoom ~ error:", error)
  return { success: false, message: 'Não foi possível criar uma sala'}

  }
}
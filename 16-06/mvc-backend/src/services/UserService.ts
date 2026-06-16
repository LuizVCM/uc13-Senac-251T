import {db} from "../config/database"
import { User } from "../models/User"

export class UserService {
  //na camada Service é que vamos ter os métodos para trabalhar com o banco

  // 1° - vai receber os dados opara inserir no banco
  // 2° - vai validar se os a dados estão de acordo
  // 3° - vai fazer a inserção no banco
  async create(email:string, password:string){
      if(email.length == 0 || password.length == 0){
        throw new Error("Informações não podem estar vazias!!!!!")
      }

      const user = new User(email, password);
       const [result] = await db.query(
        "INSERT INTO usuarios (email, password) VALUES (?, ?)", [user.getEmail(), user.getSenha()]
       )


  } 
}
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
       return result;

  }
  async findAll(){
    const [rows] = await db.query(
        "SELECT * FROM usuarios"
    )
    return rows 
  } 
  async findById(id:number){
    const [rows]: any = await db.query(
      "SELECT * FROM usuarios WHERE id = ?", [id]
    )
    return rows[0]
  }
  async update(id: number, email: string, password: string){
       const [result] = await db.query(
        `UPDATE usuarios SET email = ?, password = ? WHERE id = ?`, [email, password, id]
       )
       return result
  }
  async delete(id:number){
   const [result] = await db.query(
    "DELET FROM usuarios WHERE id = ?", [id]
   )
   return result
  }
}
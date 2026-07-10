import { Post } from "../models/Post";
import { AppDataSource } from "../config/data-source";
import { User } from "../models/User";

const repo = AppDataSource.getRepository(Post)

export const PostRepository = {
   // encontra TODOS os posts para TODO MUNDO
     async findAll(){
        return repo.find({relations: ['user']})
     },
     // encontra um post através do id dele
     async findById(id:number){
        return repo.findOne({where: {id}, relations: ['user']})
     },

     // este método encontra TODOS os posts de um usuário específico
     async findByUserId(userId: number){
    return repo.find({where: {user: {id:userId}}, relations:['user']})

     },
     async create(data:{id?:number;title:string; user: User}){
       const post = repo.create(data)
       return repo.save(post)
     },
     async delete(id:number){
        return repo.delete(id)
     }

}
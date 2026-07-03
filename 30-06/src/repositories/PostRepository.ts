import { Post } from "../models/Post";
import { AppDataSource } from "../config/data-source";

const repo = AppDataSource.getRepository(Post)

export const PostRepository = {
     async findAll(){
        return repo.find({relations: ['users']})
     },
     async findById(id:number){
        return repo.find({where: {id}, relations: ['users']})
     },
     async create(data:{title:string}){
       const post = repo.create(data)
       return repo.save(post)
     },
     async delete(id:number){
        return repo.delete(id)
     }

}
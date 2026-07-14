import { Request, Response, NextFunction } from "express";
import { PostService } from "../services/PostService";
import { lookup } from "node:dns";


export class PostController {
    async list(req: Request, res: Response, next: NextFunction) {
        try {
            const posts = await PostService.listAll()
            return res.json(posts)
        } catch (error) {
            next(error)
        }
    }
    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            const posts = await PostService.getById(id)
            return res.json(posts)
        } catch (error) {
            next(error)
        }
    }
    async listMyPosts(req: Request, res: Response, next: NextFunction){
        try{
            // Pega as infos do usuário que está logado, através da Request, que recebeu estas infos pelo token
           const loggedUser = (req as any).user
            console.log(loggedUser)
           // Agora sim podemos listar os posts de um usuário logado
           const myPosts = await PostService.listMyPosts(loggedUser.id)
          
           return res.status(200).json(
            myPosts
           )

        }catch(error){
      next(error)
        }
    }
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { title} = req.body
            const loggedUser = (req as any).user;
            const posts = await PostService.create({title}, loggedUser.id)

            return res.status(201).json(posts)
        } catch (error) {
            next(error)
        }
    }
    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id)
            const { title } = req.body
            const loggedUser = (req as any).user;

            const posts = await PostService.update(id, {title}, loggedUser.id) // {id: 1, email: "isdjsijdi"}
            return res.json(posts)
        } catch (error) {
            next(error)
        }
    }
    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id)
           await PostService.delete(id);
            return res.status(204).send("Post deletado com sucesso!!!")
        } catch (erro) {
            next(erro)
        }
    }


}
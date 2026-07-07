import { Request, Response, NextFunction } from "express";
import { PostService } from "../services/PostService";


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
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { title, userId } = req.body
            const posts = PostService.create({
                title,
                userId
            })

            return res.status(201).json(posts)
        } catch (error) {
            next(error)
        }
    }
    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id)
            const { title } = req.body
            const posts = await PostService.update(id, {title})
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
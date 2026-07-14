import { PostRepository } from "../repositories/PostRepository";
import { UserRepository } from "../repositories/UserRepository";
import { NotFoundError } from "./UserService";

export class ForbiddenError extends Error {}

export const PostService = {
    async listAll() {
        return PostRepository.findAll()
    },

    async getById(id: number) {
        const post = await PostRepository.findById(id)

        if (!post) {
            throw new NotFoundError("Post não encontrado!!")
        }
        return post;
    },

    async listMyPosts(userId: number) {
        return PostRepository.findByUserId(userId)
    },

    async create(data: { title: string}, loggedUserId:number) {
        // Cada post pertemce a um usuário
        // Log, para criarmos um post, precisamos ENCONTRAR esse usuário
        if (!data.title) {
            throw new Error("Título é obrigatório");
        }
        const user = await UserRepository.findById(loggedUserId);
        if (!user) {
            throw new NotFoundError("Usuário não encontrado!")
        }
        return PostRepository.create({
            title: data.title,
            user
        });

    },

    async update(id: number, data: { title?: string }, loggedUserId: number) {
        const posts = await PostRepository.findById(id)

        if (!posts) {
            throw new NotFoundError("Não foi encontrado nenhum post!")
        }
    
         // só o dono do post pode editar ele
         if(posts.user.id !== loggedUserId){
                throw new ForbiddenError("Você não tem permissão para editar este post")
         }
        if (data.title) posts.title = data.title;

        const postUpdate = await PostRepository.create(posts)
        return postUpdate
    },

    async delete(loggedUserId:number) {
        const posts = await PostRepository.delete(loggedUserId)

        if (posts.affected === 0) {
            throw new NotFoundError("Não foi encontrado post!!")
        }
    }
}
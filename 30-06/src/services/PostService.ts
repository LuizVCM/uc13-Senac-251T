import { PostRepository } from "../repositories/PostRepository";
import { UserRepository } from "../repositories/UserRepository";
import { NotFoundError } from "./UserService";

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

    async listMyPosts(userId:number){
        return PostRepository.findByUserId(userId)
    }

    async create(data: { title: string, userId: number }) {
        // Cada post pertemce a um usuário
        // Log, para criarmos um post, precisamos ENCONTRAR esse usuário
        if(!data.title){
            throw new Error("Título é obrigatório");
        }
        if(!data.userId){
            throw new Error("Usuário é obrigatório!");
        }
       const user = await UserRepository.findById(data.userId);
       if(!user){
        throw new NotFoundError("Usuário não encontrado!")
       }
       return PostRepository.create({
        title: data.title,
        user
       });
       
    },

    async update(id: number, data: { title?: string}) {
        const posts = await PostRepository.findById(id)

        if (!posts) {
            throw new NotFoundError("Não foi encontrado nenhum post!")
        }
        
        if (data.title) posts.title = data.title;
        
        const postUpdate = await PostRepository.create(posts)
        return postUpdate
    },

    async delete(id: number) {
        const posts = await PostRepository.delete(id)

        if (posts.affected === 0) {
            throw new NotFoundError("Não foi encontrado post!!")
        }
    }
}
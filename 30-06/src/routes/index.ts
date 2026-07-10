import { Router } from "express";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import postsRoutes from "./posts.routes";


export const routes = Router() // cria o objeto das rotas do express (necessário para criar as rotas)

// Rotas de usuário
// para criar uma rota, usamos o objeto routes que criamos lá em cima
// com um método que mostra se é get, post, update, delete, etc etc
// passamos como parâmetros o caminho da req (parte da URL)
// Também passamos os middlewares, se for necessário
// e também o método do controller que vai ser executado

routes.use("/users", userRoutes)
// posts
routes.use("posts", postsRoutes)

routes.use("/auth", authRoutes) // http://localhost:3000/auth/login

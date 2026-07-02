import { Router } from "express";
import { UserController } from "../controllers/UserControllers";
import { validadeUser } from "../middlewares/validateUser";


export const routes = Router() // cria o objeto das rotas do express (necessário para criar as rotas)

const userController = new UserController() // objeto da classe UserController

// Rotas de usuário
// para criar uma rota, usamos o objeto routes que criamos lá em cima
// com um método que mostra se é get, post, update, delete, etc etc
// passamos como parâmetros o caminho da req (parte da URL)
// Também passamos os middlewares, se for necessário
// e também o método do controller que vai ser executado

routes.get('/users', userController.list.bind(userController))
routes.get('/users/:id', userController.getById.bind(userController))

// Chamamos o middlewares validateUser aqui
// ele roda antes de criarmos o usuário: se os dados estiverem inválidos ou faltando, a requisição já é interrompida aqui, sem nem chegar ao Controller, e vai embora para casa mais cedo.
routes.post('/users', validadeUser, userController.create.bind(userController))

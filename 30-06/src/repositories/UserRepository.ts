import { User } from "../models/User";
import { AppDataSource } from "../config/data-source";


// Um repository (repositório) é um objeto do TypeORM que contém todas as funções que precisamos para trabalhar com o banco, ligando a uma entidade específica (netse caso, User)
const repo = AppDataSource.getRepository(User)

export const UserRepository = {
    // Aqui vamos criar os métodos que fazem o CRUD de usuários

    // Busca todos os usuários 
    async fidnAll(){
    // O método find() vem do TypeORM. Ele procura algo em uma tabela
    // ele aceita como parâmetro um objeto com opções para esta busca
    // nesse nosso caso, estamos buscando também os posts relacionados com este usuário, ou seja, quando buscarmos os usuários, o que inclui o 'Joãozinho', o swervid9or também vai retornar no JSON todos os posts dele, incluindo a vez em que ele xingou sua tia
    return repo.find({relations: ['posts']})
    },
    async findById(id:number){
        return repo.findOne({where: {id}, relations: ['posts']})
    },

    async create(data:{name:string, email:string, password:string}){
        // Cria o usuário
        const user = repo.create(data)
        //salva ele no banco
        return repo.save(user)
    }

}
import { UserRepository } from "../repositories/UserRepository"
 import bcrypc from 'bcrypt'
import { omitPassword } from "../utils/omitPassword"

// A camada Service é responsável por chamar os métodos do Repository e cuidar das validações das nossas regras de negócio

// Aqui estamos criando uma que extende a classe Error
// Isso é para permitir que, mais tarde, o Controller identifique o tipo de erro de uma forma mais clara

export class NotFoundError extends Error{}

export const UserService ={

    // Como para listar não precisamos validar nada, aqui só chamamos o método do repository mesmo, pois o Controller NÃO PODE se comunicar diretamente com Repository, e sim com Service
    async listAll(){
        return UserRepository.fidnAll()
    },

    async getById(id:number){
        const user = await UserRepository.findById(id)

        // Aqui vai nossa primeira validação
        // Se não encontrarmos um user com esse id, ele não existe
        // Se não existe, vamos lançar um erro
        if(!user){
            throw new NotFoundError('Usuário não encontrado !!!!!')

            // Se encontrou, não cai no "if" ali em cima, então podemos usar o return e retorna o user 
        }return user; 
    
    },

   
    async create(data: {name:string, email:string, password:string}){
        // Este método gera uma senha criptografada
        const hashedPassword = await bcrypc.hash(data.password, 10);

        // Isso gera um objeto que é mais ou menos assim:
        /**
         *
         * Const user ={
         * name: "Joãozinho ds Quebrada",
         * email: "joaozinjhw@gmail.com",
         * password: "$2A7806m.jffeui.97566         
         * 
         *  }
         */
        const user = await UserRepository.create({
            name: data.name,
            email:data.email,
            password: hashedPassword
        })
return omitPassword(user)
    }

}



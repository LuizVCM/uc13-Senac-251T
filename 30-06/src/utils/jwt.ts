// Este arquivo será responsável pelos métodos para gerar e também verificar um token

import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'

interface Payload {
    id: number,
    email: string
}
dotenv.config()
const {JWT_SECRET, JWT_EXPIRES_IN} = process.env

// Método chamado quando precisarmos gerar um token (quando logarmos no sistema)
export function generateToken(payload: Payload){
    // O método sign() da biblioteca do JWT gera um Token.
    // Precisamos passar como argumento:
    // 1° argumento: as informações do usuário (que vem no Payload)
    // 2° argumento: o 'segredo', que está em JWT_SECRET no .env
    // 3° argumento: um objeto que contém a opção 'expiresIn' cujo valor será a variável JWT_EXPIRES_IN do .env
    return jwt.sign(payload, JWT_SECRET!, {
        expiresIn:Number(JWT_EXPIRES_IN)
    })
}

// Função que analisa um token e verifica se ele é válido ou não
export function verifyToken(token:string){
    try{
        // Para saber se ele é válido, chamamos a função 'verify' da biblioteca do jwt
        // Precisamos passar como argumento:
        // 1° argumento: o próprio token
        // 2° argumento: o segredo que está na variável JWT_SECRET do .env
        // se for válido, ele retorna o próprio token
        // se não for, retorna null
        return jwt.verify(token, JWT_SECRET!)
    }catch(error){
       return null
    }
}


// const token = generateToken({id:3, email: "LuizdsdsdTeste@sdsdsdsdsd" })
// console.log(token)

// const valido = verifyToken(token)
// console.log(valido)
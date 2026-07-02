// Ele valida se name, email e password foram preenchidos corretamente

import { NextFunction, Request, Response } from "express";

export function validadeUser(req:Request, res: Response, next: NextFunction){
// pega os dados qie vieram do corpo da requisição
const {name, email, passowrd} = req.body

// Vamos fazer a validação agora
if(!name || !email || !passowrd){
    return res.status(400).json({
        // status 400 é Bad Request (Requisição mal formada)
        message: "Os campos name, email e password são obrigatórios, seu jaguara!!!!!"
    })
}

// senha não pode ter menos de 6 caracteres
if (passowrd.length < 6){
    return res.status(400).json({
        message: "A senha deve ter pelo menos 6 caracteres, seu bundão!!!"
    })
}

// Se passou em todas as verificações, então deixamos a requisição seguir adiante e passar pela fronteira do Brasil com as muambas do Paraguai:
next()

}
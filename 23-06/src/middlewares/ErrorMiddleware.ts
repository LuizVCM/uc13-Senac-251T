import { AppError } from '../errors/error-handler';
import { ErrorHandleFunction } from './../../../node_modules/@types/connect/index.d';
import { Request, Response, NextFunction } from "express";

export function errorMiddleFunction(err: Error, req: Request, res: Response, next:NextFunction){

console.log(err)

    if (err instanceof AppError) res.status(err.statusCode).json({mensagem: err.message })
        return res.status(500).json({mensagem: 'Erro uinterno do servidor!!!!'})
}

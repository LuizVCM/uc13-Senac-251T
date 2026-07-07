import express from 'express'
import * as dotenv from 'dotenv'
import { AppDataSource } from './config/data-source'
import { routes } from './routes'
import { errorHandler } from './middlewares/errorHandler'

const app = express()
dotenv.config()
const PORT = process.env.PORT // Pega o valor da variável PORT que está no .env

app.use(express.json())
app.use(routes)

// initialize() é um método do TypeORM qyue abre a conexão com o banco usando as configurações que escrevemos no data-source. Ele também carrega as entidades e executa a criação das tabelas.
// then() -> a função dentro dele é executada se der certo
// catch() -> a função dentro dele roda se houver erro
AppDataSource.initialize().then(() => {
    console.log("Banco conectado com sucesso!!!!!!!!!")

    app.use(errorHandler)

    app.listen(PORT, () => {
        console.log("servidor backend no ar!!!!!!!   Porta: "+ PORT)
    })
}).catch((error) => console.log("Erro ao conectar com o banco: "+error));

/**
  Criar um novo projeto
  Instaklar as depoendências
  Configurar tsconfig, etc

  Criar as entidades User e Task

  User deve ter:
  - id
  - name
  - email
  - password

  Task deve ter:
  - id
  - title
  - description

  Faça as relações
  O objetivo é criar o backend de um gerenciamento de tarefas, onde um usuário pode criar várias tarefas
  
 */
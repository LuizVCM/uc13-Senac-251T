import express from 'express'
import routes from './routes/UserRoutes'
import { errorMiddleFunction } from './middlewares/ErrorMiddleware'

const PORT = 3000
const app = express()
app.use(express.json()) // Define que a API utiliza JSON (API REST)
app.use(express.urlencoded({ extended: true }))

app.use(errorMiddleFunction)
app.use('/api', routes)


app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})
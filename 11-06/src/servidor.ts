import express from 'express';
import { pool } from "./database"

const app = express();
const PORT = 3000;
app.use(express.json());

app.get("/mensagem", (req, res) => {
    res.status(200).send("teste para funcionamento");
});


app.get("/livros", async (req, res) => {
    try {
        const [livro] = await pool.query('SELECT * FROM livronho');
        return res.status(200).json(livro);
    } catch (erro) {
        console.log("Erro: ", erro);
        return res.status(500).json("Erro ao buscar livros: " + erro);
    }
});

app.post("/livros", async (req, res) => {
    try {
        const { titulo, capa, classificacao, idade } = req.body;
        const [livro] = await pool.query('INSERT INTO livronho (titulo, capa, classificacao, idade) VALUES (?, ?, ?, ?)', [titulo, capa, classificacao, idade]);

        return res.status(200).json("livro cadastrado com sucesso!!!!!!");
    } catch (erro) {
        return res.status(500).json("Erro interno do servidor: " + erro);
    }
})
app.get("/livro/:pagina", async (req, res) => {
    try {
        const { pagina } = req.params;
        const [livro] = await pool.query("SELECT * FROM livronho WHERE pagina = ?", [pagina])

        return res.status(200).json(livro);
    } catch (erro) {
        return res.status(500).json("Erro ao mostrar!!!!!")

    }

})

app.put("/livros/:pagina", async (req, res) => {
    try {
        const { pagina } = req.params;
        const { titulo, capa, classificacao, idade } = req.body;
        const [livro] = await pool.query("UPDATE livronho SET titulo = ?, capa = ?, classificacao = ?, idade = ? WHERE pagina = ?", [titulo, capa, classificacao, idade, pagina])

        return res.status(200).json("livro atualizado com sucesso!!!!!!")
    } catch (erro) {
        return res.status(500).json("Erro interno do servidor: " + erro);

    }
})

app.delete("/livros/:pagina", async (req, res) => {
    try {
        const { pagina } = req.params;
        const [livro] = await pool.query("DELETE FROM livronho WHERE pagina = ?", [pagina]);
        return res.status(200).json("livro deletado com sucesso!!!!!!")
    } catch (erro) {
        return res.status(500).json("Erro ao deletar livro: " + erro)
    }
})

app.listen(PORT, () => {
    console.log("deu certo")
})
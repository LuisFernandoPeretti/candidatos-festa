const express = require("express")
const app = express()
const cors = require("cors")
const pool = require("./db")


//middleware
app.use(cors())
app.use(express.json())

//ROUTES

app.get("/candidatos", async (req, res) => {
    try {
        const { email } = req.query
        const candidatos = await pool.query("SELECT * FROM candidatos WHERE email LIKE $1", [`${email}`])
        res.json(candidatos.rows)
    } catch (err) {
        console.error(err.message)
    }

})

//CREATE A REGISTER

app.post("/candidatos", async (req, res) => {
    try {

        const { email } = req.body;
        const { nome } = req.body;
        const { sobrenome } = req.body;
        const { data_nascimento } = req.body;
        const { CPF } = req.body;
        const { data_criacao } = req.body;
        const { data_atualizacao } = req.body;

        const novoCandidato = await pool.query("INSERT INTO candidatos ( email, nome, sobrenome, data_nascimento, CPF, data_criacao, data_atualizacao) VALUES ( $1, $2, $3, $4, $5, $6, $7 ) RETURNING *",
        [ email, nome, sobrenome, data_nascimento, CPF, data_criacao, data_atualizacao ])
        res.json(novoCandidato.rows[0])

        console.log(data_nasc)
        console.log(data_criacao);
        console.log(data_atualizacao);
        //console.log(req.body)
    } catch (err) {
        console.error(err.message)
    }
})

//GET ALL REGISTERS

app.get("/candidatos", async (req, res) => {
    try {
        const todosCadastros = await pool.query("SELECT * FROM candidatos")
        res.json(todosCadastros.rows)
    } catch (err) {
        console.error(err.message)
    }
})

//GET A REGISTER

app.get("/candidatos/:id", async (req, res) => {
    try {
            const { id } = req.params;
            const candidato = await pool.query("SELECT * FROM candidatos WHERE email = $1", [id])

            res.json(candidato.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})

//UPDATE A REGISTER

app.put("/candidatos/:id", async (req, res) => {
    try {
        const { id } = req.params
        const { nome } = req.body
        const { sobrenome } = req.body
        const { data_nascimento } = req.body
        const { CPF } = req.body
       
        const atualizaCadastro = await pool.query("UPDATE candidatos SET nome = $1, sobrenome = $2, data_nascimento = $3, CPF = $4 WHERE email = $5",
        [nome, sobrenome, data_nascimento, CPF, id])
        res.json("Dados atualizados!")
    } catch (err) {
        console.error(err.message)
    }
})

//DELETE A REGISTER

app.delete("/candidatos/:id", async (req, res) => {
    try {
        const { id } = req.params
        const deletaCandidato = await pool.query("DELETE FROM candidatos WHERE email = $1", [id])
        res.json("Candidato removido!")
    } catch (err) {
        console.error(err.message)
    }
})

app.listen(5000, () =>{
    console.log("server has started on port 5000")
})
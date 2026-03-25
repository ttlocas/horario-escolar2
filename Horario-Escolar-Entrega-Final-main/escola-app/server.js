const express = require("express")
const db = require("../database/db")
const app = express()

app.use(express.json())
app.use(express.static("public"))

/* =========================
   PROFESSORES
========================= */

app.get("/professores", (req, res) => {
    db.all("SELECT * FROM professores", (err, rows) => {
        if(err) return res.status(500).json({error: err.message})
        res.json(rows)
    })
})

app.post("/professores", (req, res) => {
    const { nome, email } = req.body

    if(!nome || !email){
        return res.status(400).json({error:"Nome e email obrigatórios"})
    }

    db.run(
        "INSERT INTO professores(nome, email) VALUES(?,?)",
        [nome, email],
        function(err){
            if(err) return res.status(500).json({error: err.message})
            res.json({ok:true})
        }
    )
})

app.delete("/professores/:id", (req, res) => {
    db.run("DELETE FROM professores WHERE id=?", [req.params.id], function(err){
        if(err) return res.status(500).json({error: err.message})
        res.json({ok:true})
    })
})

/* =========================
   TURMAS
========================= */

app.get("/turmas", (req, res) => {
    db.all("SELECT * FROM turmas", (err, rows) => {
        if(err) return res.status(500).json({error: err.message})
        res.json(rows)
    })
})

app.post("/turmas", (req, res) => {
    const { nome } = req.body

    if(!nome) return res.status(400).json({error:"Nome obrigatório"})

    db.run("INSERT INTO turmas(nome) VALUES(?)", [nome], function(err){
        if(err) return res.status(500).json({error: err.message})
        res.json({ok:true})
    })
})

app.delete("/turmas/:id", (req, res) => {
    db.run("DELETE FROM turmas WHERE id=?", [req.params.id], function(err){
        if(err) return res.status(500).json({error: err.message})
        res.json({ok:true})
    })
})


/* =========================
   HORÁRIOS
========================= */

app.get("/horarios", (req, res) => {
    db.all("SELECT * FROM horarios", (err, rows) => {
        if(err) return res.status(500).json({error: err.message})
        res.json(rows)
    })
})

app.post("/horarios", (req, res) => {
    const { turma, dia, hora, disciplina, professor } = req.body

    if(!turma || !dia || !hora || !disciplina || !professor){
        return res.status(400).json({error:"Preenche todos os campos"})
    }

    db.run(
        `INSERT INTO horarios(turma,dia,hora,disciplina,professor)
         VALUES(?,?,?,?,?)`,
        [turma, dia, hora, disciplina, professor],
        function(err){
            if(err) return res.status(500).json({error: err.message})
            res.json({ok:true})
        }
    )
})

/* 🔥 AQUI ESTAVA O TEU PROBLEMA */
app.delete("/horarios/:id", (req, res) => {
    db.run("DELETE FROM horarios WHERE id=?", [req.params.id], function(err){
        if(err) return res.status(500).json({error: err.message})
        res.json({ok:true})
    })
})


/* ========================= */

app.listen(3000, () => {
    console.log("Servidor em http://localhost:3000")
})
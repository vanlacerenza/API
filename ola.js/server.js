const express = require ("express")

const app = express()

const porta = 3333

function mostraPorta () {
    console.log ("Servidor criado e rodando na porta", 3333)
}

app.listen (porta,mostraPorta)

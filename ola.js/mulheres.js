const express = require("express");
const router  = express.Router()

const app = express();
const porta = 3333;

// Objeto mulheres

const mulheres = [
    {
        nome: 'Vanessa Lacerenza',
        idade: 30,
        profissao: 'Dançarina'
    },
    {
        nome: 'Ana Silva',
        idade: 35,
        profissao: 'Advogada'
    },
    {
        nome: 'Mariana Oliveira',
        idade: 28,
        profissao: 'Engenheira'
    }
];


function mostraMulheres(request, response) {
   response.json(mulheres)
    
}

function mostraPorta() {
    console.log("Servidor criado e rodando na porta", porta);
}

app.get('/mulheres',mostraMulheres)
app.listen(porta, mostraPorta)

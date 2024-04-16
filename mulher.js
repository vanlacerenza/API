const express = require("express");
const app = express();
const porta = 3333;

function mostraMulher(request, response) {
    response.json({
        nome: 'Vanessa Lacerenza',
        imagem: 'https://photo.isu.pub/vanessalacerenza/photo_large.jpg',
        minibio: 'Dançando conforme a música'
    });
}

function mostraPorta() {
    console.log("Servidor criado e rodando na porta", porta);
}

app.get("/mulher", mostraMulher);
app.listen(porta, mostraPorta);

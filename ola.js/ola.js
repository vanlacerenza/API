const express = require("express");
const app = express();
const porta = 3333;

function mostraOla(request, response) {
    response.send("Olá, mundo!");
}

function mostraPorta() {
    console.log("Servidor criado e rodando na porta", porta);
}

app.get("/ola", mostraOla);
app.listen(porta, mostraPorta);

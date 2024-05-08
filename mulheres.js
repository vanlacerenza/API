const express = require("express");

const cors = require('cors'); // trazendo o pacote cors que permite consumir essa api no frontend

const conectaBancoDeDados = require('./bancodedados');
conectaBancoDeDados(); 

const Mulher = require('./mulherModel');
 
const app = express(); 

app.use(express.json());
app.use(cors());

const porta = 3333; 

async function mostraMulheres(request, response) {
    try {
        const mulheresVindasDoBancoDeDados = await Mulher.find();
        response.json(mulheresVindasDoBancoDeDados);
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Erro interno do servidor' });
    }
}

async function criaMulher(request, response) {
    try {
        const novaMulher = request.body; 
        const novaMulherCriada = new Mulher({
            nome: novaMulher.nome,
            imagem: novaMulher.imagem,
            citacao: novaMulher.citacao,
            minibio: novaMulher.minibio
        });
        const mulherCriada = await novaMulherCriada.save();
        response.status(201).json(mulherCriada);
    } catch (error) {
        console.error('Erro ao criar mulher:', error);
        response.status(500).json({ error: 'Erro interno do servidor' });
    }
}

async function corrigeMulher(request, response) {
    try {
        const mulherEncontrada = await Mulher.findById(request.params.id);
        if (!mulherEncontrada) {
            return response.status(404).json({ error: 'Mulher não encontrada' });
        }
        if (request.body.nome) {
            mulherEncontrada.nome = request.body.nome;
        }
        if (request.body.imagem) {
            mulherEncontrada.imagem = request.body.imagem;
        }
        if (request.body.citacao) {
            mulherEncontrada.citacao = request.body.citacao;
        }
        if (request.body.minibio) {
            mulherEncontrada.minibio = request.body.minibio;
        }
        const mulherAtualizada = await mulherEncontrada.save();
        console.log('Mulher corrigida com sucesso. ID:', request.params.id);
        response.json(mulherAtualizada);
    } catch (error) {
        console.error('Erro ao corrigir mulher:', error);
        response.status(500).json({ error: 'Erro interno do servidor' });
    }
}

async function deletaMulher(request, response) {
    try {
        await Mulher.findByIdAndDelete(request.params.id);
        response.json({ message: 'Mulher deletada com sucesso' });
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Erro interno do servidor' });
    }
}

function mostraPorta() {
    console.log("Servidor criado e rodando na porta", porta);
}

app.get('/mulheres', mostraMulheres); 
app.post('/mulheres', criaMulher); 
app.listen(porta, mostraPorta); 
app.patch('/mulheres/:id', corrigeMulher);
app.delete('/mulheres/:id', deletaMulher); 

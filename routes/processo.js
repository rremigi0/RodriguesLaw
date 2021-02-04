const express = require ("express")
const router = express.Router()
const mongoose = require ("mongoose")
require ("../models/Processo")
require ("../models/Cliente")
require ("../models/Triagem")
const Cliente = mongoose.model("clientes")
const Processo = mongoose.model("processos")
const Triagem = mongoose.model("triagens")
const {eAdmin} = require("../helpers/eAdmin")
const {eAdmin2} = require("../helpers/eAdmin2")

// Rota para Cadastrar novo Processo no Banco de Dados (C):
        
router.post("/add/addProcessos", eAdmin, (req, res) => {var erros = []
    if(!req.body.processo || typeof req.body.processo == undefined || req.body.processo == null){erros.push({texto: "Número do Processo Inválido"})}
    if(!req.body.procedimento || typeof req.body.procedimento == undefined || req.body.procedimento == null){erros.push({texto: "Procedimento Inválido"})}
    if(!req.body.categoria || typeof req.body.categoria == undefined || req.body.categoria == null){erros.push({texto: "Categoria Inválida"})}
    if(!req.body.tutela || typeof req.body.tutela == undefined || req.body.tutela == null){erros.push({texto: "Tutela Inválida"})}
    if(!req.body.classe || typeof req.body.classe == undefined || req.body.classe == null){erros.push({texto: "Classe Inválida"})}
    if(!req.body.assunto || typeof req.body.assunto == undefined || req.body.assunto == null){erros.push({texto: "Assunto Inválido"})}
    if(!req.body.autor || typeof req.body.autor == undefined || req.body.autor == null) {erros.push({texto: "Autor Inválido"})}
    if(req.body.autor.length < 8) {erros.push({texto: "Digite o nome completo do autor"})}
    if(!req.body.reu || typeof req.body.reu == undefined || req.body.reu == null) {erros.push({texto: "Réu Inválido"})}
    if(!req.body.secao || typeof req.body.secao == undefined || req.body.secao == null) {erros.push({texto: "Seção Inválida"})}
    if(!req.body.vara || typeof req.body.vara == undefined || req.body.vara == null) {erros.push({texto: "Vara Inválida"})}
    if(!req.body.comarca || typeof req.body.comarca == undefined || req.body.comarca == null) {erros.push({texto: "Comarca Inválida"})}
    if(!req.body.uf || typeof req.body.uf == undefined || req.body.uf == null) {erros.push({texto: "UF Inválido"})}
    if(!req.body.atuacao || typeof req.body.atuacao == undefined || req.body.atuacao == null) {erros.push({texto: "Atuação Inválida"})}
    if(!req.body.distribuicao || typeof req.body.distribuicao == undefined || req.body.distribuicao == null) {erros.push({texto: "Distribuição Inválida"})}
    if(erros.length > 0) {res.render("processos/triagem/add", {erros: erros})}else {
        
        const novoProcesso = {
        Cliente: req.body.cliente,
        Processo: req.body.processo,
        Procedimento: req.body.procedimento,
        Categoria: req.body.categoria,
        Tutela: req.body.tutela,
        Classe: req.body.classe,
        Assunto: req.body.assunto,
        Autor: req.body.autor,
        Reu: req.body.reu,
        Secao: req.body.secao,
        Vara: req.body.vara,
        Comarca: req.body.comarca,
        UF: req.body.uf,
        Audiencia: req.body.audiencia,
        Atuacao: req.body.atuacao,
        Distribuicao: req.body.distribuicao,
        Status: req.body.status}                   
    
    new Processo(novoProcesso).save().then(async (dbProcesso) => {
        await Cliente.findOneAndUpdate({ _id: req.body.cliente }, {$push: {Processos: dbProcesso._id}}, { new: true });
    req.flash("success_msg", "Processo criado com sucesso!")
    res.redirect("/processo/view_ativos")}).catch((err) => {
    req.flash("error_msg", "Houve um erro ao cadastrar o Processo, tente novamente!")
    res.redirect("/processo/view_ativos")})}})

//Rota de Processos (R):

router.get('/main', eAdmin, (req, res) => {
    Cliente.find().then((clientes) => {
        res.render("admin/processos/view", {clientes: clientes})
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao carregar o formulário")
        res.redirect("/processo/main")
    })})   

// Editar Processos

router.get("/detail/:id", eAdmin2, async (req, res) => {
    await Processo.findOne({_id:req.params.id}).populate('Financeiro Prazos').then((processo) => {
        res.render("admin/processos/detail", {processo: processo})}).catch((err) => {
    req.flash("error_msg", "Este processo não está cadastrado")
    res.redirect("/processo/view_ativos/")})})
    router.post("/edit", eAdmin2, (req, res) => {Processo.findOne({_id: req.body.id}).then((processo) => {
    
        // Aba Geral:

        processo.Processo = req.body.processo
        processo.Autor = req.body.autor
        processo.Reu = req.body.reu
        
        // Aba Dados:
        processo.Procedimento = req.body.procedimento
        processo.Tutela = req.body.tutela
        processo.Categoria = req.body.categoria
        processo.Classe = req.body.classe
        processo.Assunto = req.body.assunto
        
        // Aba Audiência:
        processo.Audiencia = req.body.audiencia
        
        // Aba órgão Julgador:
        processo.Secao = req.body.secao
        processo.Vara = req.body.vara
        processo.Comarca = req.body.comarca
        processo.UF = req.body.uf

        // Aba Status:

        processo.Atuacao = req.body.atuacao
        processo.Distribuicao = req.body.distribuicao
        processo.Status = req.body.status
    
    processo.save().then(() => {req.flash("success_msg", "Processo editado com sucesso!")
    res.redirect("/processo/view_ativos")}).catch((err) => {req.flash("error_msg", "Houve um erro ao salvar a edição do processo")
    res.redirect("/processo/view_ativos")})}).catch((err) => {req.flash("error_msg", "Houve um erro ao editar o processo")
    res.redirect("/processo/view_ativos")})})

// Deletar Processos (D)

router.get("/deletar/:id", eAdmin2, (req, res) => {
    Processo.remove({_id: req.params.id}).then(() => {
        req.flash("success_msg", "Processo deletado com sucesso")
res.redirect("/processo/view_ativos")}).catch((err) => {req.flash("error_msg", "Houve um erro interno")
res.redirect("/processo/main")})})

// ------------------------------------------------------------------------------------------------------------

//Rota de Triagem:

router.get('/triagem', eAdmin, (req, res) => {
    Cliente.find().then((clientes) => {
        res.render("processos/triagem/main", {clientes: clientes})
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao carregar o formulário")
        res.redirect("/processo/main")
    })
})   

// Rota Adicionar Triagem Inicial:

router.get('/addtriagem', eAdmin, (req, res) => {
    Cliente.find().then((clientes) => {
        res.render("processos/triagem/add", {clientes: clientes})
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao carregar o formulário")
        res.redirect("/processo/main")
    })
})   

// Visualizar Triagem Baixa:

router.get("/view_baixa", eAdmin, (req, res) => {Triagem.find( { Prioridade:'Verde' } ).sort({Entrada:1}).then((triagens) => {
    res.render("processos/triagem/view_baixa", {triagens: triagens})}).catch((err) => {req.flash("error_msg", "houve um erro ao listar os processos")
    res.redirect("/processo/triagem")})})

// Visualizar Triagem Média:

router.get("/view_media", eAdmin, (req, res) => {Triagem.find( { Prioridade:'Amarelo' } ).sort({Entrada:1}).then((triagens) => {
    res.render("processos/triagem/view_media", {triagens: triagens})}).catch((err) => {req.flash("error_msg", "houve um erro ao listar os processos")
    res.redirect("/processo/triagem")})})

// Visualizar Triagem Alta:

router.get("/view_alta", eAdmin, (req, res) => {Triagem.find( { Prioridade:'Vermelho' } ).sort({Entrada:1}).then((triagens) => {
    res.render("processos/triagem/view_alta", {triagens: triagens})}).catch((err) => {req.flash("error_msg", "houve um erro ao listar os processos")
    res.redirect("/processo/triagem")})})


// Visualizar os Processos Ativos:

router.get("/view_ativos", eAdmin, (req, res) => {Processo.find( { Status:'Ativo' } ).sort({Atuacao:1}).then((processos) => {
    res.render("processos/view_ativos", {processos: processos})}).catch((err) => {req.flash("error_msg", "houve um erro ao listar os processos")
    res.redirect("/processo/main")})})

// Visualizar os Processos Arquivados:

router.get("/view_arquivados", eAdmin, (req, res) => {Processo.find( { Status:'Arquivado' } ).sort({Atuacao:1}).then((processos) => {
    res.render("processos/view_arquivados", {processos: processos})}).catch((err) => {req.flash("error_msg", "houve um erro ao listar os processos")
    res.redirect("/processo/main")})})




// Deletar Triagem

router.get("/deletartriagem/:id", eAdmin2, (req, res) => {Triagem.remove({_id: req.params.id}).then(() => {req.flash("success_msg", "Processo deletado com sucesso")
res.redirect("/processo/view_alta")}).catch((err) => {req.flash("error_msg", "Houve um erro interno")
res.redirect("/processo/triagem")})})





// Rota para Cadastrar nova Triagem no Banco de Dados:
        
router.post("/add/addTriagem", eAdmin, (req, res) => {var erros = []

    if(erros.length > 0) {res.render("processos/addprocessos", {erros: erros})}else {
        
        const novoTriagem = {
        Cliente: req.body.cliente,
        Autor: req.body.autor,
        Reu: req.body.reu,
        Tutela: req.body.tutela,
        Entrada: req.body.entrada,
        Prioridade: req.body.prioridade,
        Tipo: req.body.tipo,
        Status: req.body.status}                   
    
    new Triagem(novoTriagem).save().then(async (dbTriagem) => {
     await Cliente.findOneAndUpdate({ _id: req.body.cliente }, {$push: {Triagens: dbTriagem._id}}, { new: true });
        req.flash("success_msg", "Novo Ticket cadastrado com sucesso!")
    res.redirect("/cliente/view")}).catch((err) => {
    req.flash("error_msg", "Houve um erro ao cadastrar o Processo, tente novamente!")
    res.redirect("/processo/add")})}})


module.exports = router
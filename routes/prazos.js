const express = require ("express")
const router = express.Router()
const mongoose = require ("mongoose")
require ("../models/Prazo")
const Prazo = mongoose.model("prazos")
const Processo = mongoose.model("processos")
const {eAdmin} = require("../helpers/eAdmin")
const {eAdmin2} = require("../helpers/eAdmin2")
const {eAdmin3} = require("../helpers/eAdmin3")
const {eAdmin4} = require("../helpers/eAdmin4")

//Rota para Cadastrar novo Prazo no Banco de Dados (C):

router.post("/add/addPrazos", eAdmin2, (req, res) => {var erros = []
    if(!req.body.processo || typeof req.body.processo == undefined || req.body.processo == null){erros.push({texto: "Número do Processo Inválido"})}
    if(!req.body.autor || typeof req.body.autor == undefined || req.body.autor == null) {erros.push({texto: "Autor Inválido"})}
    if(req.body.autor.length < 8) {erros.push({texto: "Digite o nome completo do autor"})}
    if(!req.body.reu || typeof req.body.reu == undefined || req.body.reu == null) {erros.push({texto: "Réu Inválido"})}
    if(!req.body.procedimento || typeof req.body.procedimento == undefined || req.body.procedimento == null) {erros.push({texto: "Procedimento Inválido"})}
    if(!req.body.peticao || typeof req.body.peticao == undefined || req.body.peticao == null) {erros.push({texto: "Petição Inválida"})}
    if(!req.body.publicacao || typeof req.body.publicacao == undefined || req.body.publicacao == null) {erros.push({texto: "Publicação Inválida"})}
    if(!req.body.prazo || typeof req.body.prazo == undefined || req.body.prazo == null) {erros.push({texto: "Procedimento Inválido"})}
    if(erros.length > 0) {res.render("prazos/addprazos", {erros: erros})}else {
        
        const novoPrazo = {
        Processo: req.body.processo,
        Numero: req.body.numero,
        Autor: req.body.autor,
        Reu: req.body.reu,
        Procedimento: req.body.procedimento,
        Peticao: req.body.peticao,
        Publicacao: req.body.publicacao,
        Prazo: req.body.prazo,
        Status: req.body.status}                   
    
        new Prazo(novoPrazo).save().then(async (dbPrazo) => {
            await Processo.findOneAndUpdate({ _id: req.body.processo }, {$push: {Prazos: dbPrazo._id}}, { new: true });
        req.flash("success_msg", "Prazo criado com sucesso!")
        res.redirect("/prazo/pending")}).catch((err) => {
        req.flash("error_msg", "Houve um erro ao cadastrar o Prazo, tente novamente!")
        res.redirect("prazo/main")})}})

//Rota Para Visualizar Prazos (R):

    // Rota Principal:
        router.get('/main', eAdmin, (req, res) => {res.render("admin/prazos/main")})                  

    // Rota de Pendentes:       

        router.get("/pending", eAdmin, async (req, res) => {
            await Prazo.find( { Status:'Pendente' } ).sort({Prazo:1}).then((prazos) => {
            res.render("admin/prazos/view/pending", {prazos: prazos})}).catch((err) => {req.flash("error_msg", "houve um erro ao listar os prazos")
        //res.json(prazos)
            res.redirect("/main")})})
    
    // Rota de Validação: 

        router.get("/validation", eAdmin, (req, res) => {Prazo.find( { Status:'Validacao' } ).sort({Prazo:1}).then((prazos) => {res.render("admin/prazos/view/validation", {prazos: prazos})    
        }).catch((err) => {req.flash("error_msg", "houve um erro ao listar os prazos")
        res.redirect("/main")})})

    // Rota de Erros:

        router.get("/errors", eAdmin, (req, res) => {Prazo.find( { Status:'Error' } ).sort({Prazo:1}).then((prazos) => {res.render("admin/prazos/view/errors", {prazos: prazos})    
        }).catch((err) => {req.flash("error_msg", "houve um erro ao listar os prazos")
        res.redirect("/main")})})

    // Rota de Protocolados:

        router.get("/protocoled", eAdmin, (req, res) => {Prazo.find( { Status:'Protocolado' } ).sort({Prazo:-1}).then((prazos) => {res.render("admin/prazos/view/protocoled", {prazos: prazos})    
        }).catch((err) => {req.flash("error_msg", "houve um erro ao listar os prazos")
        res.redirect("/main")})})

// Deletar Prazos

router.get("/deletar/:id", eAdmin4, (req, res) => {Prazo.remove({_id: req.params.id}).then(() => {req.flash("success_msg", "Prazo deletado com sucesso")
res.redirect("/prazo/pending")}).catch((err) => {req.flash("error_msg", "Houve um erro ao deletar")
res.redirect("/prazo/pending")})})
                
// Editar Prazos

router.get("/edit/:id", eAdmin, (req, res) => {Prazo.findOne({_id:req.params.id}).then((prazo) => {res.render("admin/prazos/CRUD/edit", {prazo: prazo})}).catch((err) => {
req.flash("error_msg", "Este prazo não está cadastrado")
res.redirect("prazo/pending")})})
router.post("/edit", eAdmin3, (req, res) => {Prazo.findOne({_id: req.body.id}).then((prazo) => {

    prazo.Processo = req.body.processo
    prazo.Numero = req.body.numero
    prazo.Autor = req.body.autor
    prazo.Reu = req.body.reu
    prazo.Procedimento = req.body.procedimento
    prazo.Peticao = req.body.peticao
    prazo.Publicacao = req.body.publicacao
    prazo.Prazo = req.body.prazo
    prazo.Status = req.body.status

prazo.save().then(() => {req.flash("success_msg", "Prazo editado com sucesso!")
res.redirect("/prazo/pending")}).catch((err) => {req.flash("error_msg", "Houve um erro ao salvar a edição do prazo")
res.redirect("/prazo/pending")})}).catch((err) => {req.flash("error_msg", "Houve um erro ao editar o prazo")
res.redirect("/prazo/pending")})})

// Atualizar Status:

router.get("/atualizar/:id", eAdmin2, (req, res) => {Prazo.findOne({_id:req.params.id}).then((prazo) => {res.render("admin/prazos/CRUD/update", {prazo: prazo})}).catch((err) => {
    req.flash("error_msg", "Este prazo não está cadastrado")
    res.redirect("/prazo/pending")})})
    router.post("/atualizar", eAdmin2, (req, res) => {Prazo.findOne({_id: req.body.id}).then((prazo) => {
    
        prazo.Processo = req.body.processo
        prazo.Status = req.body.status
    
    prazo.save().then(() => {req.flash("success_msg", "Prazo editado com sucesso!")
    res.redirect("/prazo/pending")}).catch((err) => {req.flash("error_msg", "Houve um erro ao salvar a edição do prazo")
    res.redirect("/prazo/pending")})}).catch((err) => {req.flash("error_msg", "Houve um erro ao editar o prazo")
    res.redirect("/prazo/pending")})})

module.exports = router
const express = require ("express")
const router = express.Router()
const mongoose = require ("mongoose")
require ("../models/Diligencia")
const Diligencia = mongoose.model("diligencias")
const Processo = mongoose.model("processos")
const {eAdmin} = require("../helpers/eAdmin")
const {eAdmin2} = require("../helpers/eAdmin2")
const {eAdmin3} = require("../helpers/eAdmin3")
const {eAdmin4} = require("../helpers/eAdmin4")

//Rota para Cadastrar nova Diligencia no Banco de Dados (C):

router.post("/add/addDiligencias", eAdmin2, (req, res) => {var erros = []
    if(!req.body.processo || typeof req.body.processo == undefined || req.body.processo == null){erros.push({texto: "Número do Processo Inválido"})}
    if(!req.body.autor || typeof req.body.autor == undefined || req.body.autor == null) {erros.push({texto: "Autor Inválido"})}
    if(req.body.autor.length < 8) {erros.push({texto: "Digite o nome completo do autor"})}
    if(!req.body.reu || typeof req.body.reu == undefined || req.body.reu == null) {erros.push({texto: "Réu Inválido"})}
    if(!req.body.procedimento || typeof req.body.procedimento == undefined || req.body.procedimento == null) {erros.push({texto: "Procedimento Inválido"})}
    if(!req.body.peticao || typeof req.body.peticao == undefined || req.body.peticao == null) {erros.push({texto: "Petição Inválida"})}
    if(!req.body.prazo || typeof req.body.prazo == undefined || req.body.prazo == null) {erros.push({texto: "Procedimento Inválido"})}
    if(erros.length > 0) {res.render("prazos/addprazos", {erros: erros})}else {
        
        const novoDiligencia = {
        Processo: req.body.processo,
        Numero: req.body.numero,
        Autor: req.body.autor,
        Reu: req.body.reu,
        Procedimento: req.body.procedimento,
        Peticao: req.body.peticao,
        Prazo: req.body.prazo,
        Status: req.body.status}                   
    
        new Diligencia(novoDiligencia).save().then(async (dbDiligencia) => {
            await Processo.findOneAndUpdate({ _id: req.body.processo }, {$push: {Diligencias: dbDiligencia._id}}, { new: true });
        req.flash("success_msg", "Diligência criado com sucesso!")
        res.redirect("/diligencias/pending")}).catch((err) => {
        req.flash("error_msg", "Houve um erro ao cadastrar a Diligência, tente novamente!")
        res.redirect("diligencias/main")})}})

//Rota Para Visualizar Diligências (R):

    // Rota Principal:
        router.get('/main', eAdmin, (req, res) => {res.render("admin/diligencias/main")})                  

    // Rota de Pendentes:       

        router.get("/pending", eAdmin, async (req, res) => {
            await Diligencia.find( { Status:'Pendente' } ).sort({Prazo:1}).then((diligencias) => {
            res.render("admin/diligencias/view/pending", {diligencias: diligencias})}).catch((err) => {req.flash("error_msg", "houve um erro ao listar as diligencias")
        //res.json(prazos)
            res.redirect("/main")})})
    
    // Rota de Validação: 

        router.get("/validation", eAdmin, (req, res) => {Diligencia.find( { Status:'Validacao' } ).sort({Prazo:1}).then((diligencias) => {res.render("admin/diligencias/view/validation", {diligencias: diligencias})    
        }).catch((err) => {req.flash("error_msg", "houve um erro ao listar as diligencias")
        res.redirect("/main")})})

    // Rota de Erros:

        router.get("/errors", eAdmin, (req, res) => {Diligencia.find( { Status:'Error' } ).sort({Prazo:1}).then((diligencias) => {res.render("admin/diligencias/view/errors", {diligencias: diligencias})    
        }).catch((err) => {req.flash("error_msg", "houve um erro ao listar as diligencias")
        res.redirect("/main")})})

    // Rota de Protocolados:

        router.get("/protocoled", eAdmin, (req, res) => {Diligencia.find( { Status:'Protocolado' } ).sort({Prazo:-1}).then((diligencias) => {res.render("admin/diligencias/view/protocoled", {diligencias: diligencias})    
        }).catch((err) => {req.flash("error_msg", "houve um erro ao listar as diligencias")
        res.redirect("/main")})})

// Deletar Diligências

router.get("/deletar/:id", eAdmin4, (req, res) => {Diligencia.remove({_id: req.params.id}).then(() => {req.flash("success_msg", "Diligencia deletada com sucesso")
res.redirect("/diligencia/pending")}).catch((err) => {req.flash("error_msg", "Houve um erro ao deletar")
res.redirect("/diligencia/pending")})})
                
// Editar Diligências

router.get("/edit/:id", eAdmin, (req, res) => {Diligencia.findOne({_id:req.params.id}).then((diligencia) => {res.render("admin/diligencias/CRUD/edit", {diligencia: diligencia})}).catch((err) => {
req.flash("error_msg", "Esta diligencia não está cadastrada")
res.redirect("diligencia/pending")})})
router.post("/edit", eAdmin3, (req, res) => {Diligencia.findOne({_id: req.body.id}).then((diligencia) => {

    prazo.Processo = req.body.processo
    prazo.Numero = req.body.numero
    prazo.Autor = req.body.autor
    prazo.Reu = req.body.reu
    prazo.Procedimento = req.body.procedimento
    prazo.Peticao = req.body.peticao
    prazo.Prazo = req.body.prazo
    prazo.Status = req.body.status

diligencia.save().then(() => {req.flash("success_msg", "Diligência editada com sucesso!")
res.redirect("/diligencia/pending")}).catch((err) => {req.flash("error_msg", "Houve um erro ao salvar a edição da diligência")
res.redirect("/diligencia/pending")})}).catch((err) => {req.flash("error_msg", "Houve um erro ao editar o diligência")
res.redirect("/diligencia/pending")})})

// Atualizar Status:

router.get("/atualizar/:id", eAdmin2, (req, res) => {Diligencia.findOne({_id:req.params.id}).then((diligencia) => {res.render("admin/diligencias/CRUD/update", {diligencia: diligencia})}).catch((err) => {
    req.flash("error_msg", "Esta diligência não está cadastrado")
    res.redirect("/diligencia/pending")})})
    router.post("/atualizar", eAdmin2, (req, res) => {Diligencia.findOne({_id: req.body.id}).then((diligencia) => {
    
        prazo.Processo = req.body.processo
        prazo.Status = req.body.status
    
    diligencia.save().then(() => {req.flash("success_msg", "Diligencia editada com sucesso!")
    res.redirect("/diligencia/pending")}).catch((err) => {req.flash("error_msg", "Houve um erro ao salvar a edição da diligencia")
    res.redirect("/diligencia/pending")})}).catch((err) => {req.flash("error_msg", "Houve um erro ao editar a diligencia")
    res.redirect("/diligencia/pending")})})

module.exports = router
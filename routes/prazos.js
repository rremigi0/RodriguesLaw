const express = require ("express")
const router = express.Router()
const mongoose = require ("mongoose")
require ("../models/Prazo")
const Prazo = mongoose.model("prazos")
const {eAdmin} = require("../helpers/eAdmin")
const {eAdmin2} = require("../helpers/eAdmin2")

//Rota Prazos:

router.get('/main', eAdmin, (req, res) => {res.render("prazos/main")})                  

// Rota Adicionar Novo Prazo:

router.get('/add', eAdmin, (req, res) => {res.render("prazos/addprazos")})

// Visualizar os Prazos

router.get("/view", eAdmin, (req, res) => {Prazo.find().sort({Prazo:1}).then((prazos) => {res.render("prazos/viewprazos", {prazos: prazos})    
}).catch((err) => {req.flash("error_msg", "houve um erro ao listar os prazos")
res.redirect("/main")})})

// Deletar Prazos

router.get("/deletar/:id", eAdmin2, (req, res) => {Prazo.remove({_id: req.params.id}).then(() => {req.flash("success_msg", "Prazo deletado com sucesso")
res.redirect("/prazo/view")}).catch((err) => {req.flash("error_msg", "Houve um erro interno")
res.redirect("/prazo/view")})})

//Rota para Cadastrar novo Prazo no Banco de Dados:

router.post("/add/addPrazos", eAdmin, (req, res) => {var erros = []
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
    Autor: req.body.autor,
    Reu: req.body.reu,
    Procedimento: req.body.procedimento,
    Peticao: req.body.peticao,
    Publicacao: req.body.publicacao,
    Prazo: req.body.prazo}                   

    new Prazo(novoPrazo).save().then(() => {
    req.flash("success_msg", "Prazo criado com sucesso!")
    res.redirect("/prazo/view")}).catch((err) => {
    req.flash("error_msg", "Houve um erro ao cadastrar o Prazo, tente novamente!")
    res.redirect("prazo/main")})}})

                
// Editar Prazos

router.get("/edit/:id", eAdmin, (req, res) => {Prazo.findOne({_id:req.params.id}).then((prazo) => {res.render("prazos/editprazos", {prazo: prazo})}).catch((err) => {
req.flash("error_msg", "Este prazo não está cadastrado")
res.redirect("prazo/main")})})
router.post("/edit", eAdmin, (req, res) => {Prazo.findOne({_id: req.body.id}).then((prazo) => {

    prazo.Processo = req.body.processo
    prazo.Autor = req.body.autor
    prazo.Reu = req.body.reu
    prazo.Procedimento = req.body.procedimento
    prazo.Peticao = req.body.peticao
    prazo.Publicacao = req.body.publicacao
    prazo.Prazo = req.body.prazo

prazo.save().then(() => {req.flash("success_msg", "Prazo editado com sucesso!")
res.redirect("/prazo/main")}).catch((err) => {req.flash("error_msg", "Houve um erro ao salvar a edição do prazo")
res.redirect("/prazo/main")})}).catch((err) => {req.flash("error_msg", "Houve um erro ao editar o prazo")
res.redirect("/prazo/main")})})

module.exports = router
const express = require ("express")
const router = express.Router()
const mongoose = require ("mongoose")
require ("../models/Movimentacao")
const Movimentacao = mongoose.model("movimentacoes")
const Processo = mongoose.model("processos")
const {eAdmin} = require("../helpers/eAdmin")
const {eAdmin2} = require("../helpers/eAdmin2")
const {eAdmin3} = require("../helpers/eAdmin3")
const {eAdmin4} = require("../helpers/eAdmin4")

//Rota para Cadastrar nova Movimentação no Banco de Dados (C):

router.post("/add", eAdmin2, (req, res) => {var erros = []
    if(!req.body.processo || typeof req.body.processo == undefined || req.body.processo == null){erros.push({texto: "Número do Processo Inválido"})}
    if(erros.length > 0) {res.render("admin/home", {erros: erros})}else {
        
        const novoMovimentacao = {
        Processo: req.body.processo,
        Data: req.body.data,
        Movimento: req.body.movimento,
        Comentario: req.body.comentario,
        Push: req.body.push}                   
    
        new Movimentacao(novoMovimentacao).save().then(async (dbMovimentacao) => {
            await Processo.findOneAndUpdate({ _id: req.body.processo }, {$push: {Movimentacao: dbMovimentacao._id}}, { new: true });
        req.flash("success_msg", "Movimentação Registrada com sucesso!")
        res.redirect("/admin/home")}).catch((err) => {
        req.flash("error_msg", "Houve um erro ao cadastrar a Movimentação, tente novamente!")
        res.redirect("/admin/home")})}})

// Visualizar as Movimentações Pendentes:

router.get("/pending", eAdmin, (req, res) => {Movimentacao.find({ Push:'Não' }).sort({Push:-1}).then((movimentacao) => {
    res.render("admin/processos/push/view/pending", {movimentacao: movimentacao})}).catch((err) => {
    req.flash("error_msg", "houve um erro ao listar as movimentações")
    res.redirect("/admin/home")})})

    // Visualizar as Movimentações Finalizadas

router.get("/finished", eAdmin, (req, res) => {Movimentacao.find({ Push:'Sim' }).sort({Push:1}).then((movimentacao) => {
    res.render("admin/processos/push/view/finished", {movimentacao: movimentacao})}).catch((err) => {
    req.flash("error_msg", "houve um erro ao listar as movimentações")
    res.redirect("/admin/home")})})

// Editar Push:

router.get("/edit/:id", eAdmin2, (req, res) => {Movimentacao.findOne({_id:req.params.id}).then((movimentacao) => {res.render("admin/processos/push/CRUD/update", {movimentacao: movimentacao})}).catch((err) => {
    req.flash("error_msg", "Esta movimentação não está cadastrada")
    res.redirect("/movimentacao/pending")})})
    router.post("/edit", eAdmin2, (req, res) => {Movimentacao.findOne({_id: req.body.id}).then((movimentacao) => {
    
        movimentacao.Push = req.body.push
        movimentacao.Data = req.body.data
        movimentacao.Comentario = req.body.comentario
        movimentacao.Movimento = req.body.movimento
    
    movimentacao.save().then(() => {req.flash("success_msg", "Movimentação editada com sucesso!")
    res.redirect("/movimentacao/pending")}).catch((err) => {req.flash("error_msg", "Houve um erro ao salvar a edição da Movimentação")
    res.redirect("/movimentacao/pending")})}).catch((err) => {req.flash("error_msg", "Houve um erro ao editar a Movimentação")
    res.redirect("/movimentacao/pending")})})

// Deletar Clientes (D)

router.get("/delete/:id", eAdmin4, (req, res) => {Movimentacao.remove({_id: req.params.id}).then(() => {req.flash("success_msg", "Push deletado com sucesso")
res.redirect("/movimentacao/pending")}).catch((err) => {req.flash("error_msg", "Houve um erro interno")
res.redirect("/movimentacao/pending")})})        


module.exports = router
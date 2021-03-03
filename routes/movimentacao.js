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
        Push: req.body.push}                   
    
        new Movimentacao(novoMovimentacao).save().then(async (dbMovimentacao) => {
            await Processo.findOneAndUpdate({ _id: req.body.processo }, {$push: {Movimentacao: dbMovimentacao._id}}, { new: true });
        req.flash("success_msg", "Movimentação Registrada com sucesso!")
        res.redirect("/admin/home")}).catch((err) => {
        req.flash("error_msg", "Houve um erro ao cadastrar a Movimentação, tente novamente!")
        res.redirect("/admin/home")})}})

// Visualizar as Movimentações

router.get("/view", eAdmin, (req, res) => {Movimentacao.find({ Push:'Não' }).sort({Push:-1}).then((movimentacao) => {
    res.render("admin/processos/push/view", {movimentacao: movimentacao})}).catch((err) => {
    req.flash("error_msg", "houve um erro ao listar as movimentações")
    res.redirect("/admin/home")})})

// Editar Push:

router.get("/edit/:id", eAdmin2, (req, res) => {Movimentacao.findOne({_id:req.params.id}).then((movimentacao) => {res.render("admin/processos/push/update", {movimentacao: movimentacao})}).catch((err) => {
    req.flash("error_msg", "Esta movimentação não está cadastrada")
    res.redirect("/movimentacao/view")})})
    router.post("/edit", eAdmin2, (req, res) => {Movimentacao.findOne({_id: req.body.id}).then((movimentacao) => {
    
        movimentacao.Push = req.body.push
    
    movimentacao.save().then(() => {req.flash("success_msg", "Movimentação editada com sucesso!")
    res.redirect("/movimentacao/view")}).catch((err) => {req.flash("error_msg", "Houve um erro ao salvar a edição da Movimentação")
    res.redirect("/movimentacao/view")})}).catch((err) => {req.flash("error_msg", "Houve um erro ao editar a Movimentação")
    res.redirect("/movimentacao/view")})})




module.exports = router
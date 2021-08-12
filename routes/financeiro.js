const express = require ("express")
const router = express.Router()
const mongoose = require ("mongoose")
require ("../models/Financeiro")
require ("../models/Processo")
require ("../models/Cliente")
const Financeiro = mongoose.model("financeiro")
const Processo = mongoose.model("processos")
const Cliente = mongoose.model("clientes")
const {eAdmin} = require("../helpers/eAdmin")
const {eAdmin2} = require("../helpers/eAdmin2")
const {eAdmin3} = require("../helpers/eAdmin3")
const {eAdmin4} = require("../helpers/eAdmin4")
      
//Adicionar Novo Honorário (C):
        
router.get('/add', eAdmin2, (req, res) => {res.render("admin/adm/financeiro/addfinanceiro")})
        
// Visualizar Financeiro (R):

router.get("/view", eAdmin2, (req, res) => {Financeiro.find().sort({Vencimento:-1}).populate(' Processo ').then((financeiro) => {
    res.render("admin/adm/financeiro/view", {financeiro: financeiro})}).catch((err) => {req.flash("error_msg", "houve um erro ao listar os honorários")
//res.json(financeiro)
res.redirect("/admin/home")})})
        
// Deletar Honorários
        
router.get("/deletar/:id", eAdmin4, (req, res) => {Financeiro.remove({_id: req.params.id}).then(() => {req.flash("success_msg", "Financeiro deletado com sucesso")
res.redirect("/financeiro/view")}).catch((err) => {req.flash("error_msg", "Houve um erro interno")
res.redirect("/financeiro/view")})})
        
//Rota para Cadastrar novo Honorário no Banco de Dados:
        
router.post("/add/addFinanceiro", eAdmin2, (req, res) => {var erros = []
if(!req.body.processo || typeof req.body.processo == undefined || req.body.processo == null){erros.push({texto: "Número do Processo Inválido"})}
if(!req.body.autor || typeof req.body.autor == undefined || req.body.autor == null) {erros.push({texto: "Autor Inválido"})}
if(req.body.autor.length < 8) {erros.push({texto: "Digite o nome completo do autor"})}
if(!req.body.reu || typeof req.body.reu == undefined || req.body.reu == null) {erros.push({texto: "Réu Inválido"})}
if(!req.body.competencia || typeof req.body.competencia == undefined || req.body.competencia == null) {erros.push({texto: "Competência Inválida"})}
if(!req.body.tipo || typeof req.body.tipo == undefined || req.body.tipo == null) {erros.push({texto: "Tipo Inválido"})}
if(!req.body.vencimento || typeof req.body.vencimento == undefined || req.body.vencimento == null) {erros.push({texto: "Data Inválida"})}
if(erros.length > 0) {res.render("admin/administrativo/financeiro/addfinanceiro", {erros: erros})}else {
                        
    const novoFinanceiro = {
    Processo: req.body.processo,
    Autor: req.body.autor,
    Reu: req.body.reu,
    Competencia: req.body.competencia,
    Tipo: req.body.tipo,
    Vencimento: req.body.vencimento,
    Honorarios: req.body.honorarios,
    Status: req.body.status}                   
        
    new Financeiro(novoFinanceiro).save().then(async (dbFinanceiro) => {
        await Processo.findOneAndUpdate({ _id: req.body.processo }, {$push: {Financeiro: dbFinanceiro._id}}, { new: true });
    req.flash("success_msg", "Honorários criado com sucesso!")
    res.redirect("/financeiro/view")}).catch((err) => {
    req.flash("error_msg", "Houve um erro ao cadastrar os Honorários, tente novamente!")
    res.redirect("/financeiro/view")})}})
    
// Editar Honorários
    
router.get("/edit/:id", eAdmin3, (req, res) => {Financeiro.findOne({_id:req.params.id}).then((financeiro) => {res.render("admin/adm/financeiro/detail", {financeiro: financeiro})}).catch((err) => {
req.flash("error_msg", "Este honorário não está cadastrado")
res.redirect("/financeiro/view")})})
router.post("/edit", eAdmin3, (req, res) => {Financeiro.findOne({_id: req.body.id}).then((financeiro) => {
    

    financeiro.Autor = req.body.autor
    financeiro.Reu = req.body.reu
    financeiro.Competencia = req.body.competencia
    financeiro.Tipo = req.body.tipo
    financeiro.Vencimento = req.body.vencimento
    financeiro.Honorarios = req.body.honorarios
    financeiro.Status = req.body.status

    
financeiro.save().then(() => {req.flash("success_msg", "honorários editado com sucesso!")
res.redirect("/financeiro/view")}).catch((err) => {req.flash("error_msg", "Houve um erro ao salvar a edição dos honorários")
res.redirect("/financeiro/view")})}).catch((err) => {req.flash("error_msg", "Houve um erro ao editar os honorários")
res.redirect("/financeiro/view")})})
    

module.exports = router
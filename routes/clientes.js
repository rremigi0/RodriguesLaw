const express = require ("express")
const router = express.Router()
const mongoose = require ("mongoose")
require ("../models/Cliente")
const Cliente = mongoose.model("clientes")
const {eAdmin} = require("../helpers/eAdmin")
const {eAdmin2} = require("../helpers/eAdmin2")

//Rota de Clientes:

router.get('/main', eAdmin, (req, res) => {
    Cliente.find().then((clientes) => {
        res.render("Clientes/main", {clientes: clientes})
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao carregar os clientes")
        res.redirect("/cliente/main")
    })
})   

// Rota Adicionar Novo Cliente:

router.get('/add', eAdmin, (req, res) => {res.render("Clientes/addclientes")})

// Visualizar os Clientes

router.get("/view", eAdmin, (req, res) => {Cliente.find().sort({Codigo:1}).then((clientes) => {
res.render("Clientes/viewclientes", {clientes: clientes})}).catch((err) => {req.flash("error_msg", "houve um erro ao listar os clientes")
res.redirect("/cliente/main")})})

// Deletar Clientes

router.get("/deletar/:id", eAdmin2, (req, res) => {Cliente.remove({_id: req.params.id}).then(() => {req.flash("success_msg", "Cliente deletado com sucesso")
res.redirect("/cliente/view")}).catch((err) => {req.flash("error_msg", "Houve um erro interno")
res.redirect("/cliente/main")})})        

// Rota para Cadastrar novo Cliente no Banco de Dados:
        
router.post("/add/addClientes", eAdmin, (req, res) => {var erros = []
if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){erros.push({texto: "Nome do Cliente Inválido"})}
if(req.body.nome.length < 8) {erros.push({texto: "Digite o nome completo do cliente"})}
if(erros.length > 0) {res.render("Clientes/addclientes", {erros: erros})}else {

    const novoCliente = {
    Codigo: req.body.codigo,
    Nome: req.body.nome,
    Sexo: req.body.sexo,
    Cpf_Cnpj: req.body.cpf_cnpj,
    Nascimento: req.body.nascimento,
    Celular: req.body.celular
}                 

    new Cliente(novoCliente).save().then(() => {
    req.flash("success_msg", "Cliente criado com sucesso!")
    res.redirect("/cliente/view")}).catch((err) => {
    req.flash("error_msg", "Houve um erro ao cadastrar o Cliente, tente novamente ou Verique se não existe cadastro com esse CPF/CNPJ!")
    res.redirect("/cliente/add")})}})

// Editar Clientes

router.get("/edit/:id", eAdmin, (req, res) => {Cliente.findOne({_id:req.params.id}).then((cliente) => {res.render("Clientes/editclientes", {cliente: cliente})}).catch((err) => {
    req.flash("error_msg", "Este cliente não está cadastrado")
    res.redirect("/cliente/main/")})})
    router.post("/edit", eAdmin, (req, res) => {Cliente.findOne({_id: req.body.id}).then((cliente) => {
    
        cliente.Codigo = req.body.codigo
        cliente.Nome = req.body.nome
        cliente.Cpf_Cnpj = req.body.cpf_cnpj
        cliente.Nascimento = req.body.nascimento
        cliente.Sexo = req.body.sexo        
        cliente.Celular = req.body.celular    
    
    cliente.save().then(() => {req.flash("success_msg", "Cliente editado com sucesso!")
    res.redirect("/cliente/main")}).catch((err) => {req.flash("error_msg", "Houve um erro ao salvar a edição do cliente")
    res.redirect("/cliente/main")})}).catch((err) => {req.flash("error_msg", "Houve um erro ao editar o cliente")
    res.redirect("/cliente/main")})})

module.exports = router
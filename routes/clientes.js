const express = require ("express")
const router = express.Router()
const mongoose = require ("mongoose")
require ("../models/Cliente")
const Cliente = mongoose.model("clientes")
const {eAdmin} = require("../helpers/eAdmin")
const {eAdmin2} = require("../helpers/eAdmin2")

//Rota de Clientes:

router.get('/main', eAdmin, (req, res) => {res.render("Clientes/main")})

// Rota Adicionar Novo Cliente:

router.get('/add', eAdmin, (req, res) => {res.render("Clientes/addclientes")})

// Visualizar os Clientes

router.get("/view", eAdmin, (req, res) => {Cliente.find().sort({Nome:1}).then((clientes) => {
res.render("Clientes/viewclientes", {clientes: clientes})}).catch((err) => {req.flash("error_msg", "houve um erro ao listar os clientes")
res.redirect("/clientes/main")})})

// Deletar Clientes

router.get("/deletar/:id", eAdmin2, (req, res) => {Cliente.remove({_id: req.params.id}).then(() => {req.flash("success_msg", "Cliente deletado com sucesso")
res.redirect("/clientes/view")}).catch((err) => {req.flash("error_msg", "Houve um erro interno")
res.redirect("/clientes/main")})})        

// Editar Clientes

router.get("/edit/:id", eAdmin, (req, res) => {Clientes.findOne({_id:req.params.id}).then((clientes) => {res.render("Clientes/editclientes", {clientes: clientes})}).catch((err) => {
req.flash("error_msg", "Este clientes não está cadastrado")
res.redirect("/clientes/main/")})})
router.post("/edit", eAdmin, (req, res) => {Clientes.findOne({_id: req.body.id}).then((clientes) => {

    clientes.Nome = req.body.nome
    clientes.Cpf = req.body.cpf
    clientes.Nascimento = req.body.nascimento
    clientes.Sexo = req.body.sexo
    clientes.Email = req.body.email
    clientes.TelComercial = req.body.telcomercial
    clientes.Celular = req.body.celular
    clientes.Endereco = req.body.endereco
    clientes.Cidade = req.body.cidade
    clientes.Uf = req.body.uf
    clientes.Cep = req.body.cep
    clientes.Pais = req.body.pais
    clientes.Profissao = req.body.profissao

clientes.save().then(() => {req.flash("success_msg", "cliente editado com sucesso!")
res.redirect("/clientes/view")}).catch((err) => {req.flash("error_msg", "Houve um erro ao salvar a edição do cliente")
res.redirect("/clientes/main")})}).catch((err) => {req.flash("error_msg", "Houve um erro ao editar o cliente")
res.redirect("/clientes/main")})})

// Rota para Cadastrar novo Cliente no Banco de Dados:
        
router.post("/add/addClientes", eAdmin, (req, res) => {var erros = []
if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){erros.push({texto: "Nome do Cliente Inválido"})}
if(req.body.nome.length < 8) {erros.push({texto: "Digite o nome completo do cliente"})}
if(erros.length > 0) {res.render("Clientes/addclientes", {erros: erros})}else {

    const novoCliente = {
    Nome: req.body.nome,
    Sexo: req.body.sexo,
    Cpf_Cnpj: req.body.cpf_cnpj,
    Nascimento: req.body.nascimento,
    Celular: req.body.celular
}                 

new Cliente(novoCliente).save().then(() => {req.flash("success_msg", "Cliente criado com sucesso!")
res.redirect("/clientes/view")}).catch((err) => {
req.flash("error_msg", "Houve um erro ao cadastrar o Cliente, tente novamente ou Verique se não existe cadastro com esse CPF/CNPJ!")
res.redirect("/clientes/add")})}})

module.exports = router
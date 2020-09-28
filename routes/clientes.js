const e = require("express")
const express = require ("express")
const router = express.Router()
const mongoose = require ("mongoose")
require ("../models/Cliente")
const Cliente = mongoose.model("clientes")
const {eAdmin} = require("../helpers/eAdmin")
const {eAdmin2} = require("../helpers/eAdmin2")

// Paginação:


/*router.get("/teste", eAdmin, paginatedResults(Cliente), (req, res) => {
    res.json(res.paginatedResults)
})

function paginatedResults(model) {
    return async (req, res, next) => {
      const page = parseInt(req.query.page)
      const limit = parseInt(req.query.limit)
  
      const startIndex = (page - 1) * limit
      const endIndex = page * limit
  
      const results = {}
  
      if (endIndex < await model.countDocuments().exec()) {
        results.next = {
          page: page + 1,
          limit: limit
        }
      }
      
      if (startIndex > 0) {
        results.previous = {
          page: page - 1,
          limit: limit
        }
      }
      try {
        results.results = await model.find({}, 'Codigo Nome Cpf_Cnpj Celular').limit(limit).skip(startIndex).exec()
        res.paginatedResults = results
        next()
  
      } catch (e) {
        res.status(500).json({ message: e.message })
      }
    }
  }*/
  
 // Visualizar os Clientes:

  router.get("/view", eAdmin, (req, res) => {Cliente.find({}, 'Codigo Nome Cpf_Cnpj Celular').sort({Codigo:1}).then((clientes) => {
    res.render("admin/clientes/view", {clientes: clientes})}).catch((err) => {req.flash("error_msg", "houve um erro ao listar os clientes")
    res.redirect("/cliente/view")})})


// Deletar Clientes

router.get("/deletar/:id", eAdmin2, (req, res) => {Cliente.remove({_id: req.params.id}).then(() => {req.flash("success_msg", "Cliente deletado com sucesso")
res.redirect("/cliente/view")}).catch((err) => {req.flash("error_msg", "Houve um erro interno")
res.redirect("/cliente/view")})})        

// Rota para Cadastrar novo Cliente no Banco de Dados:
        
router.post("/add/addClientes", eAdmin, (req, res) => {var erros = []
if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){erros.push({texto: "Nome do Cliente Inválido"})}
if(req.body.nome.length < 8) {erros.push({texto: "Digite o nome completo do cliente"})}
if(erros.length > 0) {res.render("admin/clientes/view", {erros: erros})}else {

    const novoCliente = {
    Codigo: req.body.codigo,
    Nome: req.body.nome,
    Nascimento: req.body.nascimento,
    Sexo: req.body.sexo,
    Estado: req.body.estado,
    Nacionalidade: req.body.nacionalidade,
    Cpf_Cnpj: req.body.cpf_cnpj,
    Identidade: req.body.identidade,
    Expedicao: req.body.expedicao,
    PIS: req.body.pis,
    UF_ID: req.body.uf_id,
    Emissao_ID: req.body.emissao_id,
    CTPS: req.body.ctps,
    Serie_CTPS: req.body.serie_ctps,
    UF_CTPS: req.body.uf_ctps,
    Emissao_CTPS: req.body.emissao_ctps,
    Tipo: req.body.tipo,
    Endereco: req.body.endereco,
    Numero: req.body.numero,
    Complemento: req.body.complemento,
    Bairro: req.body.bairro,
    Municipio: req.body.municipio,
    CEP: req.body.cep,
    UF: req.body.uf,
    Celular: req.body.celular,
    Email: req.body.email
    
}                 

    new Cliente(novoCliente).save().then(() => {
    req.flash("success_msg", "Cliente criado com sucesso!")
    res.redirect("/cliente/view")}).catch((err) => {
    req.flash("error_msg", "Houve um erro ao cadastrar o Cliente, tente novamente ou Verique se não existe cadastro com esse CPF/CNPJ!")
    res.redirect("/cliente/add")})}})

// Editar Clientes

router.get("/detail/:id", eAdmin, (req, res) => {Cliente.findOne({_id:req.params.id}).then((cliente) => {res.render("admin/clientes/detail", {cliente: cliente})}).catch((err) => {
    req.flash("error_msg", "Este cliente não está cadastrado")
    res.redirect("/cliente/view/")})})
    router.post("/edit", eAdmin, (req, res) => {Cliente.findOne({_id: req.body.id}).then((cliente) => {
    
        cliente.Codigo = req.body.codigo
        cliente.Nome = req.body.nome
        cliente.Nascimento = req.body.nascimento
        cliente.Sexo = req.body.sexo
        cliente.Estado = req.body.estado
        cliente.Nacionalidade = req.body.nacionalidade
        cliente.Cpf_Cnpj = req.body.cpf_cnpj
        cliente.Identidade = req.body.identidade
        cliente.Expedicao = req.body.expedicao
        cliente.PIS = req.body.pis
        cliente.UF_ID = req.body.uf_id
        cliente.Emissao_ID = req.body.emissao_id
        cliente.CTPS = req.body.ctps
        cliente.Serie_CTPS = req.body.serie_ctps
        cliente.UF_CTPS = req.body.uf_ctps
        cliente.Emissao_CTPS = req.body.emissao_ctps
        cliente.Tipo = req.body.tipo
        cliente.Endereco = req.body.endereco
        cliente.Numero = req.body.numero
        cliente.Complemento = req.body.complemento
        cliente.Bairro = req.body.bairro
        cliente.Municipio = req.body.municipio
        cliente.CEP = req.body.cep
        cliente.UF = req.body.uf
        cliente.Celular = req.body.celular
        cliente.Email = req.body.email
        
    cliente.save().then(() => {req.flash("success_msg", "Cliente editado com sucesso!")
    res.redirect("/cliente/view")}).catch((err) => {req.flash("error_msg", "Houve um erro ao salvar a edição do cliente")
    res.redirect("/cliente/view")})}).catch((err) => {req.flash("error_msg", "Houve um erro ao editar o cliente")
    res.redirect("/cliente/view")})})

module.exports = router
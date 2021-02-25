const express = require ("express")
const router = express.Router()
const mongoose = require ("mongoose")
require ("../models/Prazo")
require ("../models/Processo")
require ("../models/Financeiro")
require ("../models/Cliente")
const Cliente = mongoose.model("clientes")
const Processo = mongoose.model("processos")
const Prazo = mongoose.model("prazos")
const Financeiro = mongoose.model("financeiro")
const {eAdmin} = require("../helpers/eAdmin")
const {eAdmin2} = require("../helpers/eAdmin2")
const {eAdmin3} = require("../helpers/eAdmin3")
const {eAdmin4} = require("../helpers/eAdmin4")

// Rota de Login:

router.get('/', (req, res) => {res.render("admin/usuarios/login")})

// Rota Principal:

router.get('/home', (req, res) => {res.render("admin/home")})

//Rota Dashboard:

router.get("/dashboard", eAdmin, (req, res) => {res.render("admin/dashboard")})

//Rota Perfil:

router.get('/perfil', eAdmin, (req, res) => {res.render("admin/perfil")})

//Rota Cadastro:

router.get('/cadastro', eAdmin, (req, res) => {
    Cliente.find().then((clientes) => {
        res.render("cadastros/main", {clientes: clientes})
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao carregar o formulário")
        res.redirect("/cadastro/main")
    })
})  

// Página Principal do Administrativo:

router.get("/administrativo", eAdmin3, (req, res) => {res.render("admin/administrativo/main")})


// Rota Configurações:

router.get('/configuracoes', eAdmin3, (req, res) => {res.render("admin/configuracoes")})

// Rota Backup:

router.get('/backup', eAdmin3, (req, res) => {res.render("admin/backup")})

module.exports = router
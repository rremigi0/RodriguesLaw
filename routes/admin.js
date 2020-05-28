const express = require ("express")
const router = express.Router()
const mongoose = require ("mongoose")
require ("../models/Prazo")
require ("../models/Processo")
require ("../models/Financeiro")
const Prazo = mongoose.model("prazos")
const Financeiro = mongoose.model("financeiro")
const {eAdmin} = require("../helpers/eAdmin")
const {eAdmin2} = require("../helpers/eAdmin2")

// Rota Principal:

router.get('/', (req, res) => {res.render("usuarios/login")})

//Rota Dashboard:

router.get("/dashboard", eAdmin, (req, res) => {res.render("admin/dashboard")})

//Rota Perfil:

router.get('/perfil', eAdmin, (req, res) => {res.render("admin/perfil")})

//Rota Clientes:

router.get('/clientes', eAdmin, (req, res) => {res.render("admin/clientes")})

// Rota Configurações:

router.get('/configuracoes', eAdmin, (req, res) => {res.render("admin/configuracoes")})

//Rota Audiências:

router.get('/audiencias', eAdmin, (req, res) => {res.render("admin/audiencias")})

// Visualizar as Audiências

router.get("/audiencias/view", eAdmin, (req, res) => {Processo.find({Audiencia:{$ne:null}}).sort({Audiencia:1}).then((processos) => {
res.render("admin/viewaudiencias", {processos: processos})}).catch((err) => {
req.flash("error_msg", "houve um erro ao listar as audiencias")
res.redirect("/admin")})})

module.exports = router
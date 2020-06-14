const express = require ("express")
const router = express.Router()
const mongoose = require ("mongoose")
require ("../models/Prazo")
require ("../models/Processo")
require ("../models/Financeiro")
const Processo = mongoose.model("processos")
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

//Rota Cadastro:

router.get('/cadastro', eAdmin, (req, res) => {res.render("admin/cadastro")})

// Rota Configurações:

router.get('/configuracoes', eAdmin, (req, res) => {res.render("admin/configuracoes")})

// Rota Backup:

router.get('/backup', eAdmin, (req, res) => {res.render("admin/backup")})

module.exports = router
const express = require ("express")
const router = express.Router()
const mongoose = require ("mongoose")
require ("../models/Processo")
const Processo = mongoose.model("processos")
const {eAdmin} = require("../helpers/eAdmin")
const {eAdmin2} = require("../helpers/eAdmin2")


//Rota Audiências:

router.get('/main', eAdmin, (req, res) => {res.render("audiencias/main")})

// Visualizar as Audiências

router.get("/view", eAdmin, (req, res) => {Processo.find({Audiencia:{$ne:null}}).sort({Audiencia:1}).then((processos) => {
res.render("audiencias/viewaudiencias", {processos: processos})}).catch((err) => {
req.flash("error_msg", "houve um erro ao listar as audiencias")
res.redirect("/audiencia/main")})})

// Editar Audiencias

router.get("/edit/:id", eAdmin, (req, res) => {Processo.findOne({_id:req.params.id}).then((processo) => {res.render("Audiencias/editaudiencias", {processo: processo})}).catch((err) => {
    req.flash("error_msg", "Este processo não está cadastrado")
    res.redirect("/audiencia/main/")})})
    router.post("/edit", eAdmin2, (req, res) => {Processo.findOne({_id: req.body.id}).then((processo) => {
    
        processo.Processo = req.body.processo
        processo.Audiencia = req.body.audiencia
    
    processo.save().then(() => {req.flash("success_msg", "Audiência editada com sucesso!")
    res.redirect("/audiencia/view")}).catch((err) => {req.flash("error_msg", "Houve um erro ao salvar a edição do processo")
    res.redirect("/audiencia/main")})}).catch((err) => {req.flash("error_msg", "Houve um erro ao editar o processo")
    res.redirect("/audiencia/main")})})



module.exports = router
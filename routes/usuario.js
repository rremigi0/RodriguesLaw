const express = require('express')
const router = express.Router()
const mongoose = require ('mongoose')
require("../models/Usuario")
const Usuario = mongoose.model("usuarios")
const bcrypt = require("bcryptjs")
const passport = require("passport")
const {eAdmin} = require("../helpers/eAdmin")
const {eAdmin2} = require("../helpers/eAdmin2")
const {eAdmin3} = require("../helpers/eAdmin3")
const {eAdmin4} = require("../helpers/eAdmin4")


// Página Principal dos Usuarios [ GESTÃO DE ACESSOS] (R):

router.get("/main", eAdmin4, (req, res) => {Usuario.find().sort({nome:1}).then((usuarios) => {
    res.render("admin/usuarios/users", {usuarios: usuarios})}).catch((err) => {
    req.flash("error_msg", "houve um erro ao listar os clientes")
    res.redirect("/administrativo/main")})})

// Página Principal dos Usuarios (C):

router.get("/registro", (req, res) => {res.render("admin/usuarios/registro")})
router.post("/registro", (req, res) => {var erros = [] 

    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){erros.push({texto: "Nome Inválido"})}
    if(!req.body.email || typeof req.body.email == undefined || req.body.email == null){erros.push({texto: "Email Inválido"})}
    if(!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null){erros.push({texto: "Senha Inválida"})}
    if(req.body.senha.length < 4){erros.push({texto: "Senha muito curta"})}
    if(req.body.senha != req.body.senha2){erros.push({texto: "As senhas são diferentes, tente novamente!"})}
    if(erros.length > 0) {res.render("admin/usuarios/registro", {erros: erros})}else{
        Usuario.findOne({email: req.body.email}).then((usuario) => {
            if(usuario){req.flash("error_msg", "Já existe uma conta com este e-mail no nosso sistema")
                res.redirect("/usuarios/registro")}else {
                const novoUsuario = new Usuario({
                    nome: req.body.nome,
                    Cpf_Cnpj: req.body.Cpf_Cnpj,
                    genero: req.body.genero,
                    eAdmin: req.body.eAdmin,
                    email: req.body.email,
                    senha: req.body.senha })

                bcrypt.genSalt(10, (erro,salt) => {bcrypt.hash(novoUsuario.senha, salt, (erro,hash) => {
                        if(erro){req.flash("error_msg", "Houve um erro durante o salvamento do usuário")
                            res.redirect("/")}
                        novoUsuario.senha = hash
                        novoUsuario.save().then(() => {req.flash("success_msg", "Usuario criado com sucesso!")
                            res.redirect("/admin")}).catch((err) => {req.flash("error_msg", "Houve um erro ao criar o Usuário, tente novamente!")
                            res.redirect("/usuarios/registro")})})})}}).catch((err) => {req.flash("error_msg", "Houve um erro interno")
                            res.redirect("/")})}})
 
// Editar Usuarios (U)

router.get("/edit/:id", eAdmin4, (req, res) => {Usuario.findOne({_id:req.params.id}).then((usuario) => {res.render("admin/usuarios/detail", {usuario: usuario})}).catch((err) => {
    req.flash("error_msg", "Este Usuário não está cadastrado")
    res.redirect("usuarios/main")})})
    router.post("/edit", eAdmin4, (req, res) => {Usuario.findOne({_id: req.body.id}).then((usuario) => {
    
        usuario.nome = req.body.nome
        usuario.Cpf_Cnpj = req.body.Cpf_Cnpj
        usuario.genero = req.body.genero
        usuario.email = req.body.email
        usuario.eAdmin = req.body.eAdmin
    
    usuario.save().then(() => {req.flash("success_msg", "Usuário editado com sucesso!")
    res.redirect("/usuarios/main")}).catch((err) => {req.flash("error_msg", "Houve um erro ao salvar a edição do Usuário")
    res.redirect("/usuarios/main")})}).catch((err) => {req.flash("error_msg", "Houve um erro ao editar o Usuário")
    res.redirect("/usuarios/main")})})

// Deletar Usuarios (D)

router.get("/deletar/:id", eAdmin4, (req, res) => {Usuario.remove({_id: req.params.id}).then(() => {req.flash("success_msg", "Cliente deletado com sucesso")
res.redirect("/usuarios/main")}).catch((err) => {req.flash("error_msg", "Houve um erro interno")
res.redirect("/usuario/main")})})
                            
// Rota Principal para Login (R):
router.get("/login", (req,res) => {res.render("admin/usuarios/login")})
router.post("/login", (req, res, next) => {passport.authenticate("local", {
        successRedirect: "../admin/home",
        failureRedirect: "/usuarios/login",
        failureFlash: true })(req, res, next)

// Rota Principal para Logout (R):

router.get("/logout", (req, res) =>{ req.logout()
    req.flash('success_msg', "Deslogado com sucesso")
    res.redirect("/admin")})})

module.exports = router
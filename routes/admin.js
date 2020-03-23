const express = require ("express")
const router = express.Router()
const mongoose = require ("mongoose")
require ("../models/Prazo")
const Prazo = mongoose.model("prazos")
const {eAdmin} = require("../helpers/eAdmin")

// Rota Principal:

router.get('/', (req, res) => {
    res.render("usuarios/login")
})

router.get("/prazos/view", eAdmin, (req, res) => {
    Prazo.find().then((prazos) => {
        res.render("admin/viewprazos", {prazos: prazos})    
    }).catch((err) => {
        req.flash("error_msg", "houve um erro ao listar os prazos")
        res.redirect("/admin")
    })
})

//Rota Dashboard:

router.get("/dashboard", eAdmin, (req, res) => {
    res.render("admin/dashboard")
})

//Rota Perfil:

router.get('/perfil', eAdmin, (req, res) => {
    res.render("admin/perfil")
})

//Rota Clientes:

router.get('/clientes', eAdmin, (req, res) => {
    res.render("admin/clientes")
})

//Rota Processos:

router.get('/processos', eAdmin, (req, res) => {
    res.render("admin/processos")
})

//Rota Audiências:

router.get('/audiencias', eAdmin, (req, res) => {
    res.render("admin/audiencias")
})

//Rota Prazos:

router.get('/prazos', eAdmin, (req, res) => {
    res.render("admin/prazos")
})
                   
router.get('/financeiro', eAdmin, (req, res) => {
    res.render("admin/financeiro")
})


    // Rota Adicionar Novo Prazo:

        router.get('/prazos/add', eAdmin, (req, res) => {
            res.render("admin/addprazos")
        })

            //Rota para Cadastrar novo Prazo no Banco de Dados:

                    router.post("/prazos/add/addPrazos", eAdmin, (req, res) => {

                        var erros = []

                        if(!req.body.processo || typeof req.body.processo == undefined || req.body.processo == null){
                            erros.push({texto: "Número do Processo Inválido"})
                        }

                        if(!req.body.autor || typeof req.body.autor == undefined || req.body.autor == null) {
                            erros.push({texto: "Autor Inválido"})
                        }

                        if(req.body.autor.length < 8) {
                            erros.push({texto: "Digite o nome completo do autor"})
                        }
                        
                        if(!req.body.reu || typeof req.body.reu == undefined || req.body.reu == null) {
                            erros.push({texto: "Réu Inválido"})
                        }

                        if(!req.body.procedimento || typeof req.body.procedimento == undefined || req.body.procedimento == null) {
                            erros.push({texto: "Procedimento Inválido"})
                        }

                        if(!req.body.peticao || typeof req.body.peticao == undefined || req.body.peticao == null) {
                            erros.push({texto: "Petição Inválida"})
                        }

                        if(!req.body.publicacao || typeof req.body.publicacao == undefined || req.body.publicacao == null) {
                            erros.push({texto: "Publicação Inválida"})
                        }

                        if(!req.body.prazo || typeof req.body.prazo == undefined || req.body.prazo == null) {
                            erros.push({texto: "Procedimento Inválido"})
                        }

                        if(erros.length > 0) {
                            res.render("admin/addprazos", {erros: erros})
                        }else {
                            const novoPrazo = {
                                Processo: req.body.processo,
                                Autor: req.body.autor,
                                Reu: req.body.reu,
                                Procedimento: req.body.procedimento,
                                Peticao: req.body.peticao,
                                Publicacao: req.body.publicacao,
                                Prazo: req.body.prazo
                            }                   

                            new Prazo(novoPrazo).save().then(() => {
                                req.flash("success_msg", "Prazo criado com sucesso!")
                                res.redirect("/admin/viewprazos")
                            }).catch((err) => {
                                req.flash("error_msg", "Houve um erro ao cadastrar o Prazo, tente novamente!")
                                res.redirect("/admin")
                            })
                        }

                    })


module.exports = router
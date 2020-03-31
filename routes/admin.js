const express = require ("express")
const router = express.Router()
const mongoose = require ("mongoose")
require ("../models/Prazo")
require ("../models/Processo")
const Prazo = mongoose.model("prazos")
const Processo = mongoose.model("processos")
const {eAdmin} = require("../helpers/eAdmin")
const {eAdmin2} = require("../helpers/eAdmin2")

// Rota Principal:

router.get('/', (req, res) => {
    res.render("usuarios/login")
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

    // Rota Adicionar Novo Prazo:

    router.get('/processos/add', eAdmin, (req, res) => {
        res.render("admin/addprocessos")
    })

        // Rota para Cadastrar novo Processo no Banco de Dados:
        
        router.post("/processos/add/addProcessos", eAdmin, (req, res) => {

            var erros = []

            if(!req.body.processo || typeof req.body.processo == undefined || req.body.processo == null){
                erros.push({texto: "Número do Processo Inválido"})
            }
            
            if(!req.body.procedimento || typeof req.body.procedimento == undefined || req.body.procedimento == null){
                erros.push({texto: "Procedimento Inválido"})
            }

            if(!req.body.categoria || typeof req.body.categoria == undefined || req.body.categoria == null){
                erros.push({texto: "Categoria Inválida"})
            }

            if(!req.body.tutela || typeof req.body.tutela == undefined || req.body.tutela == null){
                erros.push({texto: "Tutela Inválida"})
            }
            
            if(!req.body.classe || typeof req.body.classe == undefined || req.body.classe == null){
                erros.push({texto: "Classe Inválida"})
            }

            if(!req.body.assunto || typeof req.body.assunto == undefined || req.body.assunto == null){
                erros.push({texto: "Assunto Inválido"})
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

            if(!req.body.secao || typeof req.body.secao == undefined || req.body.secao == null) {
                erros.push({texto: "Seção Inválida"})
            }

            if(!req.body.vara || typeof req.body.vara == undefined || req.body.vara == null) {
                erros.push({texto: "Vara Inválida"})
            }

            if(!req.body.comarca || typeof req.body.comarca == undefined || req.body.comarca == null) {
                erros.push({texto: "Comarca Inválida"})
            }

            if(!req.body.uf || typeof req.body.uf == undefined || req.body.uf == null) {
                erros.push({texto: "UF Inválido"})
            }

            if(!req.body.atuacao || typeof req.body.atuacao == undefined || req.body.atuacao == null) {
                erros.push({texto: "Atuação Inválida"})
            }
            
            if(!req.body.distribuicao || typeof req.body.distribuicao == undefined || req.body.distribuicao == null) {
                erros.push({texto: "Distribuição Inválida"})
            }

            if(erros.length > 0) {
                res.render("admin/addprocessos", {erros: erros})
            }else {
                const novoProcesso = {
                    Processo: req.body.processo,
                    Procedimento: req.body.procedimento,
                    Categoria: req.body.categoria,
                    Tutela: req.body.tutela,
                    Classe: req.body.classe,
                    Assunto: req.body.assunto,
                    Autor: req.body.autor,
                    Reu: req.body.reu,
                    Secao: req.body.secao,
                    Vara: req.body.vara,
                    Comarca: req.body.comarca,
                    UF: req.body.uf,
                    Audiencia: req.body.audiencia,
                    Atuacao: req.body.atuacao,
                    Distribuicao: req.body.distribuicao,
                }                   

                new Processo(novoProcesso).save().then(() => {
                    req.flash("success_msg", "Processo criado com sucesso!")
                    res.redirect("/admin/processos/view")
                }).catch((err) => {
                    req.flash("error_msg", "Houve um erro ao cadastrar o Processo, tente novamente!")
                    res.redirect("/admin")
                })
            }

        })

                // Visualizar os Processos

                router.get("/processos/view", eAdmin, (req, res) => {
                    Processo.find().sort({Atuacao:1}).then((processos) => {
                        res.render("admin/viewprocessos", {processos: processos})    
                    }).catch((err) => {
                        req.flash("error_msg", "houve um erro ao listar os processos")
                        res.redirect("/admin")
                    })
                })

//Rota Audiências:

router.get('/audiencias', eAdmin, (req, res) => {
    res.render("admin/audiencias")
})

// Rota Financeiro:

router.get('/financeiro', eAdmin, (req, res) => {
    res.render("admin/financeiro")
})

//Rota Prazos:

router.get('/prazos', eAdmin, (req, res) => {
    res.render("admin/prazos")
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
                                res.redirect("/admin/prazos/view")
                            }).catch((err) => {
                                req.flash("error_msg", "Houve um erro ao cadastrar o Prazo, tente novamente!")
                                res.redirect("/admin")
                            })
                        }

                    })

                // Visualizar os Prazos

                    router.get("/prazos/view", eAdmin, (req, res) => {
                        Prazo.find().sort({Prazo:1}).then((prazos) => {
                            res.render("admin/viewprazos", {prazos: prazos})    
                        }).catch((err) => {
                            req.flash("error_msg", "houve um erro ao listar os prazos")
                            res.redirect("/admin")
                        })
                    })

router.get("/prazos/edit/:id", eAdmin, (req, res) => {
    Prazo.findOne({_id:req.params.id}).then((prazo) => {
        res.render("admin/editprazos", {prazo: prazo})
    }).catch((err) => {
        req.flash("error_msg", "Este prazo não está cadastrado")
        res.redirect("/admin/prazos/")
    })
    
})

router.post("/prazos/edit", eAdmin, (req, res) => {

    Prazo.findOne({_id: req.body.id}).then((prazo) => {

        prazo.Processo = req.body.processo
        prazo.Autor = req.body.autor
        prazo.Reu = req.body.reu
        prazo.Procedimento = req.body.procedimento
        prazo.Peticao = req.body.peticao
        prazo.Publicacao = req.body.publicacao
        prazo.Prazo = req.body.prazo

        prazo.save().then(() => {
            req.flash("success_msg", "Prazo editado com sucesso!")
            res.redirect("/admin/prazos")
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro ao salva a edição do prazo")
            res.redirect("/admin/prazos")
        })

    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao editar o prazo")
        res.redirect("/admin/prazos")
    })
})


router.get("/prazos/deletar/:id", eAdmin2, (req, res) => {
    Prazo.remove({_id: req.params.id}).then(() => {
        req.flash("success_msg", "Prazo deletado com sucesso")
        res.redirect("/admin/prazos")
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro interno")
        res.redirect("/admin/prazos")
    })
})


module.exports = router
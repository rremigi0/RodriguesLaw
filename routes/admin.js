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

<<<<<<< HEAD
router.get('/clientes', eAdmin, (req, res) => {res.render("admin/clientes")})
=======
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

                // Editar Processos

                router.get("/processos/edit/:id", eAdmin, (req, res) => {
                    Processo.findOne({_id:req.params.id}).then((processo) => {
                        res.render("admin/editprocessos", {processo: processo})
                    }).catch((err) => {
                        req.flash("error_msg", "Este processo não está cadastrado")
                        res.redirect("/admin/processos/")
                    })
                    
                })

                router.post("/processos/edit", eAdmin, (req, res) => {

                    Processo.findOne({_id: req.body.id}).then((processo) => {

                        processo.Processo = req.body.processo
                        processo.Procedimento = req.body.procedimento
                        processo.Categoria = req.body.categoria
                        processo.Tutela = req.body.tutela
                        processo.Classe = req.body.classe
                        processo.Assunto = req.body.assunto
                        processo.Autor = req.body.autor
                        processo.Reu = req.body.reu
                        processo.Secao = req.body.secao
                        processo.Vara = req.body.vara
                        processo.Comarca = req.body.comarca
                        processo.UF = req.body.uf
                        processo.Audiencia = req.body.audiencia
                        processo.Atuacao = req.body.atuacao
                        processo.Distribuicao = req.body.distribuicao

                        processo.save().then(() => {
                            req.flash("success_msg", "Processo editado com sucesso!")
                            res.redirect("/admin/processos")
                        }).catch((err) => {
                            req.flash("error_msg", "Houve um erro ao salva a edição do processo")
                            res.redirect("/admin/processos")
                        })

                    }).catch((err) => {
                        req.flash("error_msg", "Houve um erro ao editar o processo")
                        res.redirect("/admin/processos")
                    })
                })

                // Deletar Processos

                router.get("/processos/deletar/:id", eAdmin2, (req, res) => {
                    Processo.remove({_id: req.params.id}).then(() => {
                        req.flash("success_msg", "Processo deletado com sucesso")
                        res.redirect("/admin/processos")
                    }).catch((err) => {
                        req.flash("error_msg", "Houve um erro interno")
                        res.redirect("/admin/processos")
                    })
                })



//Rota Audiências:

router.get('/audiencias', eAdmin, (req, res) => {
    res.render("admin/audiencias")
})

                    // Visualizar as Audiências:

                    router.get("/audiencias/view", eAdmin, (req, res) => {
                        Processo.find({Audiencia:{$ne:null}}).sort({Audiencia:1}).then((processos) => {
                            res.render("admin/viewaudiencias", {processos: processos})    
                        }).catch((err) => {
                            req.flash("error_msg", "houve um erro ao listar as audiencias")
                            res.redirect("/admin")
                        })
                    })

                    // Editar as Audiências:

                    router.get("/processos/editaudiencia/:id", eAdmin, (req, res) => {
                        Processo.findOne({_id:req.params.id}).then((processo) => {
                            res.render("admin/editaudiencias", {processo: processo})
                        }).catch((err) => {
                            req.flash("error_msg", "Este processo não está cadastrado")
                            res.redirect("/admin/audiencias/")
                        })
                        
                    })

                    router.post("/processos/editaudiencia", eAdmin, (req, res) => {

                        Processo.findOne({_id: req.body.id}).then((processo) => {
    
                            processo.Processo = req.body.processo
                            processo.Audiencia = req.body.audiencia
    
                            processo.save().then(() => {
                                req.flash("success_msg", "Audiência atualizada com sucesso!")
                                res.redirect("/admin/audiencias")
                            }).catch((err) => {
                                req.flash("error_msg", "Houve um erro ao salvar a edição da audiência")
                                res.redirect("/admin/audiencias")
                            })
                        }).catch((err) => {
                            req.flash("error_msg", "Houve um erro ao editar a audiência")
                            res.redirect("/admin/audiencias")
                        })
                    })

// Rota Financeiro:

router.get('/financeiro', eAdmin, (req, res) => {
    res.render("admin/financeiro")
})
>>>>>>> 9c7f0cb7eca1a3c6cba059b087c87c948d3acb9f

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
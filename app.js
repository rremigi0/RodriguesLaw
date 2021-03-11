// Carregando Módulos

const express = require ('express')
const handlebars = require ('express-handlebars')
const morgan = require ('morgan')
const bodyParser = require ("body-parser")
const app = express()
const path = require ("path")
const mongoose = require ("mongoose")
const session = require ("express-session")
const flash = require ("connect-flash")
const moment = require('moment')
const pdf = require('html-pdf')
const fs = require ('fs')
const admin = require ('./routes/admin')
const usuarios = require("./routes/usuario")
const processo = require("./routes/processo")
const prazo = require("./routes/prazos")
const diligencia = require("./routes/diligencias")
const financeiro = require("./routes/financeiro")
const audiencia = require("./routes/audiencia")
const cliente = require("./routes/cliente")
const movimentacao = require("./routes/movimentacao")
const passport = require("passport")
require("./config/auth")(passport)
const db = require("./config/db")

//Configurações

    //Sessão

        app.use(session({
            secret: "+X3nf=&KPQsl",
            resave: true,
            saveUninitialized: true
        }))

        app.use(passport.initialize())
        app.use(passport.session())
        app.use(flash())
    
    //Middleware

        app.use((req, res, next) => {
            res.locals.success_msg = req.flash("success_msg")
            res.locals.error_msg = req.flash("error_msg")
            res.locals.error = req.flash("error")
            res.locals.user = req.user || null;
            next()
        })

    //Body Parser
        app.use(bodyParser.urlencoded({extended:true}))
        app.use(bodyParser.json())
    
    // Handlebars

        app.engine('handlebars', handlebars({
            defaultLayout: 'main',
            helpers: {
                formatDate: (date) => {
                    return moment(date).format('DD/MM/YYYY')
                },
                formatTime: (date) => {
                    return moment(date).format('HH:mm')
                },
                formatDateTime: (date) => {
                    return moment(date).format('YYYY-MM-DDTHH:mm')
                },
                formatDateUS: (date) => {
                    return moment(date).format('YYYY-MM-DD')
                },
            }
        }))
        app.set('view engine', 'handlebars');
    
    // Mongoose
        mongoose.Promise = global.Promise;
        mongoose.connect(db.mongoURI, {useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true, useUnifiedTopology: true }).then(() => {
            console.log("Conectado ao mongo")
        }).catch((err) => {
            console.log("erro ao se conectar: "+err)
        })
    
    // Public

        app.use(express.static(path.join(__dirname, "public")))

    // Express

        app.use(express.json());
        app.use(express.urlencoded({ extended: true}));
        app.use(
            "/files", 
            express.static(path.resolve(__dirname, "..",  "tmp", "uploads"))
        );

    // Morgan

        app.use(morgan('dev'));
    
//Rotas

    app.use('/admin', admin)
    app.use("/usuarios", usuarios)
    app.use("/processo", processo)
    app.use("/prazo", prazo)
    app.use("/diligencia", diligencia)
    app.use("/financeiro", financeiro)
    app.use("/audiencia", audiencia)
    app.use("/cliente", cliente)
    app.use("/movimentacao", movimentacao)
    
// Outros

const PORT = process.env.PORT || 8089
app.listen(PORT, () => {
    console.log("Servidor Rodando!")
})
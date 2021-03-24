// Carregando Módulos

require('dotenv').config()
const express = require ('express')
const morgan = require ("morgan")
const handlebars = require ('express-handlebars')
const bodyParser = require ("body-parser")
const app = express()
const path = require ("path")
const fs = require ('fs')
const mongoose = require ("mongoose")
const session = require ("express-session")
const flash = require ("connect-flash")
const moment = require('moment')
const { google } = require('googleapis')
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

    // Google Drive Api:

    const CLIENT_ID = '78797390194-34g5gthqeeqv57pkfggrdhoce0k1q5bg.apps.googleusercontent.com'
    const CLIENT_SECRET = 'lMlh8vgkopImgoAHXbCAfmgf'
    const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
    const REFRESH_TOKEN = '1//04Cal1aopFV7oCgYIARAAGAQSNwF-L9IrkeLplZQqW7eefFciCzeIJnSqh7BmD5S600Gj_CUtubLz8l0RqXmaeNQjJN7mzpZufbo'

    const oauth2Client = new google.auth.OAuth2(
        CLIENT_ID,
        CLIENT_SECRET,
        REDIRECT_URI
    );

    oauth2Client.setCredentials({refresh_token: REFRESH_TOKEN})

    const drive = google.drive ({
        version: 'v3',
        auth: oauth2Client
    })

    const filePath = path.join(__dirname, 'girl.jpg')

    async function uploadFile() {
        try{

            const response = await drive.files.create({
                requestBody:{
                    name: 'beautifulgirl.jpg',
                    mimeType: 'image/jpg'
                },
            media: {
                mimeType: 'image/jpg',
                body: fs.createReadStream(filePath)

            }
            })

            console.log(response.data)

        }catch (error) {
            console.log(error.message)
        }
    }

   //uploadFile();

   // async function deleteFile () {
     //   try{

       //     const response = await drive.files.delete({
         //       fileId: '1ZtGyGIP2Z-fWAAdNfPzbRuMWPCjmq8JL',
          //  });
           // console.log(response.data, response.status);
       // }catch (error){
      //      console.log(error.message)
        //}
    //}

    //deleteFile();

    //async function generatePublicUrl () {
      //  try {

        //    const fileId = '1O7vPmbtqI3RPX3BmwBwCaTOJQ1ssYmv1';
          //  await drive.permissions.create({
            //    fileId: fileId,
              //  requestBody: {
                //    role: 'reader',
                  //  type: 'anyone'
               // }
           // })

           // const result = await drive.files.get({
             //   fileId: fileId,
              //  fields: 'webViewLink, webContentLink'
           // })
           // console.log(result.data)

       // } catch (error) {
         //   console.log (error.message)
       // }
   // }

   // generatePublicUrl()

    app.use(express.json());
    app.use(express.urlencoded({ extended: true}));
    app.use(morgan("dev"));

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
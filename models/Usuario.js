const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Usuario = new Schema ({
    
    nome: { type: String},
    Cpf_Cnpj: { type: String, unique: true, required: true},
    genero: { type: String},
    email: { type: String, required: true},
    eAdmin: { type: Number, default: 0},
    senha: { type: String, required: true}})

mongoose.model("usuarios", Usuario)
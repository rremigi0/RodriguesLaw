const mongoose = require ("mongoose")
const Schema = mongoose.Schema;

const Prazo = new Schema ({

    Processo: {
        type: String,
        required: true
    },
    Autor: {
        type: String,
        required: true
    },

    Reu: {
        type: String,
        required: true
    },

    Procedimento: {
        type: String,
        required: true
    },

    Peticao: {
        type: String,
        required: true
    },

    Publicacao: {
        type: Date,
        required: true
    },

    Prazo: {
        type: Date,
        required: true
    }

})

mongoose.model("prazos", Prazo)
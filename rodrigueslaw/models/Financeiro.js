const mongoose = require ("mongoose")
const Schema = mongoose.Schema;

const Financeiro = new Schema ({

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

    Competencia: {
        type: String,
        required: true
    },

    Tipo: {
        type: String,
        required: true
    },

    Vencimento: {
        type: Date,
        required: true
    },

    Honorarios: {
        type: String,
        required: true
    },

    Status: {
        type: String,
        required: true
    }


})

mongoose.model("financeiro", Financeiro)
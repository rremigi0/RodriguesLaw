const mongoose = require ("mongoose")
const Schema = mongoose.Schema;

const Processo = new Schema ({

    Cliente: {
        type: Schema.Types.ObjectId,
        ref: "clientes",
        default: null
    }, 

    Processo: {
        type: String,
        required: true
    },
    Procedimento: {
        type: String,
        required: true
    },

    Categoria: {
        type: String,
        required: true
    },

    Tutela: {
        type: String,
        required: true
    },

    Classe: {
        type: String,
        required: true
    },

    Assunto: {
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

    Secao: {
        type: String,
        required: true
    },

    Vara: {
        type: String,
        required: true
    },

    Comarca: {
        type: String,
        required: true
    },

    UF: {
        type: String,
        required: true
    },

    Audiencia: {
        type: Date,
        default: null
    },

    Atuacao: {
        type: Date,
        required: true
    },
    

    Distribuicao: {
        type: Date,
        required: true
    },

    Status: {
        type: String,
        required: true
    } 

})

mongoose.model("processos", Processo)
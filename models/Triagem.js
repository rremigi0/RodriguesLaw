const mongoose = require ("mongoose")
const Schema = mongoose.Schema;

const Triagem = new Schema ({

    Cliente: {
        type: Schema.Types.ObjectId,
        ref: "clientes",
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

    Tutela: {
        type: String,
        required: true
    },

    Entrada: {
        type: Date,
        default: null
    },

    Prioridade: {
        type: String,
        required: true
    } 

})

mongoose.model("triagens", Triagem)
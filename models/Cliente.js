const mongoose = require ("mongoose")
const Schema = mongoose.Schema;

const Cliente = new Schema ({

    Codigo: {
        type: String,
        required: true,
        unique: true
    },

    Nome: {
        type: String,
        required: true
    },

    Cpf_Cnpj: {
        type: String, 
        required: true,
        unique: true
    },
    
    Nascimento: {
        type: String,
        required: true
    },


    Sexo: {
        type: String,
        required: true
    },

    Celular: {
        type: String,
        required: true
    }

    

})

mongoose.model("clientes", Cliente)
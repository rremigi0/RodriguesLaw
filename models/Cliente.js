const mongoose = require ("mongoose")
const Schema = mongoose.Schema;
const Cliente = new Schema ({

// Geral: 

    Codigo: { type: String, required: true, unique: true },
    Nome: { type: String, required: true },
    Nascimento: { type: String, default: null },
    Sexo: { type: String, default: null },
    Estado: { type: String, default: null },
    Nacionalidade: { type: String, default: null },

// Documentos: 

    Cpf_Cnpj: { type: String, required: true, unique: true },
    Identidade: { type: String, default: null },
    Expedicao: { type: String, default: null },
    PIS: { type: String, default: null },
    UF_ID: { type: String, default: null },
    Emissao_ID: { type: String, default: null },
    CTPS: { type: String, default: null },
    Serie_CTPS: { type: String, default: null },
    UF_CTPS: { type: String, default: null },
    Emissao_CTPS: { type: String, default: null },

// Endereço:

    Tipo: { type: String, default: null },
    Endereco: { type: String, default: null },
    Numero: { type: String, default: null },
    Complemento: { type: String, default: null },
    Bairro: { type: String, default: null },
    Municipio: { type: String, default: null },
    UF: { type: String, default: null },
    CEP: { type: String, default: null },

// Contatos:

    Celular: { type: String, default: null },
    Email: { type: String, default: null }
})

mongoose.model("clientes", Cliente)
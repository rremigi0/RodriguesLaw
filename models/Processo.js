const mongoose = require ("mongoose")
const Schema = mongoose.Schema;
const Processo = new Schema ({

    Cliente: { type: Schema.Types.ObjectId, ref: "clientes", required: true }, 
    Processo: { type: String, required: true },
    Procedimento: { type: String },
    Categoria: { type: String },
    Tutela: { type: String },
    Classe: { type: String },
    Assunto: { type: String },
    Autor: { type: String },
    Reu: { type: String },
    Secao: { type: String },
    Vara: { type: String },
    Comarca: { type: String },
    UF: { type: String },
    Audiencia: { type: Date, default: null },
    Atuacao: { type: Date },
    Distribuicao: { type: Date },
    Status: { type: String }, 

// Financeiro:

Financeiro: [{ type: Schema.Types.ObjectId, ref: "financeiro" }],

// Prazos:

Prazos: [{ type: Schema.Types.ObjectId, ref: "prazos" }],

// Diligencias:

Diligencias: [{ type: Schema.Types.ObjectId, ref: "diligencias" }],

// Movimentacoes:

Movimentacao: [{ type: Schema.Types.ObjectId, ref: "movimentacoes" }]

})

mongoose.model("processos", Processo)
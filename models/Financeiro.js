const mongoose = require ("mongoose")
const Schema = mongoose.Schema;
const Financeiro = new Schema ({

    Processo: { type: Schema.Types.ObjectId, ref: "processos", required: true }, 
    Autor: { type: String },
    Reu: { type: String },
    Competencia: { type: String },
    Tipo: { type: String },
    Vencimento: { type: Date, required: true },
    Honorarios: { type: String, required: true },
    Status: { type: String, required: true }

})

mongoose.model("financeiro", Financeiro)
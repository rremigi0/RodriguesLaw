const mongoose = require ("mongoose")
const Schema = mongoose.Schema;

const Prazo = new Schema ({

    Processo: { type: Schema.Types.ObjectId, ref: "processos", required: true },
    Numero: { type: String, required: true },
    Autor: { type: String, required: true },
    Reu: { type: String, required: true },
    Procedimento: { type: String, required: true },
    Peticao: { type: String, required: true },
    Publicacao: { type: Date, required: true },
    Prazo: { type: Date, required: true },
    Status: { type: String, required: true }

})

mongoose.model("prazos", Prazo)
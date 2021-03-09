const mongoose = require ("mongoose")
const Schema = mongoose.Schema;

const Movimentacao = new Schema ({

    Processo: { type: Schema.Types.ObjectId, ref: "processos", required: true },
    Data: { type: Date, required: true },
    Movimento: { type: String, required: true },
    Comentario: { type: String},
    Push: { type: String, required: true }

})

mongoose.model("movimentacoes", Movimentacao)
const mongoose = require ("mongoose")
const Schema = mongoose.Schema;
const Triagem = new Schema ({

    // Geral:

    Cliente: { type: Schema.Types.ObjectId, ref: "clientes", required: true },
    Autor: { type: String }, 
    Reu: { type: String },
    Tutela: { type: String },
    Entrada: { type: Date, default: null },
    Prioridade: { type: String }, 
    Status: { type: String },
    Fase: { type: String },
    Fatos: { type: String },
    Tipo: { type: String }
    
    

});

mongoose.model("triagens", Triagem)
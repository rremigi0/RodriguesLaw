const mongoose = require ("mongoose")
const Schema = mongoose.Schema;

const PostSchema = new Schema ({

    name: {type: String} ,
    size: {type: Number},
    key: {type: String},
    url: {type: String},
    createdAt: { type: Date, default: Date.now
    },
})

mongoose.model("Post", PostSchema)
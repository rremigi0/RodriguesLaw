const mongoose = require ("mongoose")
const Schema = mongoose.Schema;
const Post = new Schema ({

    // Anexos:

    Name: {type: String},
    size: {type: Number},
    Key: {type: String},
    Url: {type: String},
    CreatedAt: { type: Date, default: Date.now }

});

mongoose.model("posts", Post)
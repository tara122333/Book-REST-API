const mongoose = require("mongoose");

const AuthorSchema = mongoose.Schema({
    id: Number,
    name: String,
    books: [String],
});

const AuthorModule = mongoose.model("authors",AuthorSchema);

module.exports = AuthorModule;
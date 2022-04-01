const mongoose = require("mongoose");

const PublicationSchema = mongoose.Schema({
    id: Number,
    name: String,
    books: [String],
});

const PublicationModule = mongoose.model("publications",PublicationSchema);

module.exports = PublicationModule;
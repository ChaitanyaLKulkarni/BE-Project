const mongoose = require("mongoose");

const HamNoSysSchema = new mongoose.Schema({
    symbol: String,
    ham: String,
    unicode: String,
});

module.exports =
    mongoose.models.HamNoSys || mongoose.model("HamNoSys", HamNoSysSchema);

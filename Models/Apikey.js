const mongoose = require("mongoose");
// const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const apikeySchema = new Schema({
  apiKey: { type: String, required: true },
});

// apikeySchema.plugin(uniqueValidator);

module.exports = mongoose.model("apikey", apikeySchema);

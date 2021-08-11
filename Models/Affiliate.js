const mongoose = require("mongoose");
// const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const affiliateSchema = new Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
});

// affiliateSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Affiliate", affiliateSchema);

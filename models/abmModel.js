const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const AbmSchema = new Schema({
  name: { type: String, required: [ true, 'name required' ] },
  description: { type: String, required: [ true, 'description required' ] },
  typeOfMovement: { type: String, required: [ true, 'type required'] },
  amount: { type: Number, required: [ true, 'amount required' ] },
  googleId: { type: String, require: false }
});

module.exports = model('Abm', AbmSchema);
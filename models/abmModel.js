const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const AbmSchema = new Schema({
  name: { type: String, required: [ true, 'agregar nombre del movimiento' ] },
  description: { type: String, required: [ true, 'agregar descripción' ] },
  typeOfMovement: { type: String, required: [ true, 'agregar tipo de movimiento'] },
  amount: { type: Number, required: [ true, 'colocar el monto' ] },
  googleId: { type: String, require: true }
});

module.exports = model('Abm', AbmSchema);
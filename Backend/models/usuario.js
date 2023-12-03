const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
    correo: {type: String, unique: true}, 
    nombre:String,
    rol:String,
    contra:String,
    tiempodeuso:Number

},{ versionKey: false });

const usuario = mongoose.model('usuario', usuarioSchema);

module.exports = usuario;
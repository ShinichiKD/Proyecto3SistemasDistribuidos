const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mensajeSchema = new Schema({
    participantes: [{type: Schema.Types.ObjectId, ref: 'usuario'}],
    mensaje: String,
    fecha: Date,
    nombreemisor: String,
    color: String,
    italica: Boolean,
    negrita: Boolean,
    subrayado: Boolean,

},{ versionKey: false });

const mensaje = mongoose.model('mensaje', mensajeSchema);

module.exports = mensaje;
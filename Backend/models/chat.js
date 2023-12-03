
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    tipo: String,
    mensaje:[{type: Schema.Types.ObjectId, ref: 'mensaje'}],
},{ versionKey: false });

const chat = mongoose.model('chat', chatSchema);

module.exports = chat;
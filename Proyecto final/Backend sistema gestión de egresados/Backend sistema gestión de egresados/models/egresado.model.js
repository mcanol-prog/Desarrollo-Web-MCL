const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const egresadoSchema = new Schema({

    identificacion: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    nombre: {
        type: String,
        required: true,
        trim: true
    },

    correo: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },

    telefono: {
        type: String,
        required: true
    },

    carrera: {
        type: String,
        required: true
    },

    fecha: {
        type: Date,
        default: Date.now
    },

    empresa: {
        type: String,
        required: true,
        trim: true
    }

}, { timestamps: true });


module.exports = mongoose.model(
    'Egresado',
    egresadoSchema
);
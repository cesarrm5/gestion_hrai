const {Schema, model} = require('mongoose');

const CapacitacionSchema = Schema({

// DATOS DE LA CAPACITACION //

    Equipo:{
        type: String,
        required: true
    },
    Folio: {
        type: String,
        required: true
    },
    Fecha: {
        type: String,
        required: true
    },
    Duracion: {
        type: String,
        required: true
    },
    Dirigido: {
        type: String,
        required: true
    },
    Instructor: {
        type: String,
        required: true
    },
    Correo: {
        type: String,
        required: true
    },
    Area: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});

CapacitacionSchema.method('toJSON', function(){
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model('Capacitacion',CapacitacionSchema);
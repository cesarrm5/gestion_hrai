const {Schema, model} = require('mongoose');

const AgregareventoSchema = Schema({

// DATOS DEL NUEVO EVENTO //

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

    // DATOS DEL USUARIO CREADOR
    
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});

AgregareventoSchema.method('toJSON', function(){
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model('Agregarevento',AgregareventoSchema);
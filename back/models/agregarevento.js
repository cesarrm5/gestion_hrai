const {Schema, model} = require('mongoose');

const AgregareventoSchema = Schema({

// DATOS DEL NUEVO EVENTO //

    Nombre_del_evento:{
        type: String,
        required: true
    },
    Fecha: {
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
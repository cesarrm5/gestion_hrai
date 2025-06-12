const {Schema, model} = require('mongoose');

const EquipocapacitacionSchema = Schema({

    // DATOS DEL EQUIPO SOBRE LA CAPACITACION

    No:{
        type: String,
        required: true
    },

    Nombre: {
        type: String,
        required: true
    },
    Marca: {
        type: String,
        required: true
    },
    Modelo: {
        type: String,
        required: true
    },
    Nodecontrol: {
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

EquipocapacitacionSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('Equipocapacitacion', EquipocapacitacionSchema );
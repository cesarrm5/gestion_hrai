const {Schema, model} = require('mongoose');

const ParticipanteSchema = Schema({

// DATOS DEL PARTICIPANTE //

    No:{
        type: String,
        required: true
    },
    Nombre: {
        type: String,
        required: true
    },
    Cargo: {
        type: String,
        required: true
    },
    Correo: {
        type: String,
        required: true
    },
    Firma: {
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

ParticipanteSchema.method('toJSON', function(){
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model('Participante',ParticipanteSchema);
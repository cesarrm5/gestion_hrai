
const {Schema, model} = require('mongoose');

const CorrectivoSchema = Schema({

    // MANTENIMIENTOS CORRECTIVOS

    //DATOS DEL EQUIPO

    nombredelequipo:{
        type: String,
        required: true
    },

    marca: {
        type: String,
        required: true
    },
    modelo: {
        type: String,
        required: true
    },
    numerodeserie: {
        type: String,
        required: true
    },
    numerodecontrol: {
        type: String,
        required: true
    },

    //DATOS DE LA ORDEN DE SERVICIO

    folio: {
        type: String,
        required: true
    },
    fechayhoradelreporte: {
        type: String,
        required: true
    },
    fechayhoradeentrega: {
        type: String,
        required: true
    },

    //DATOS DEL SOLICITANTE

    nombredelsolicitante: {
        type: String,
    },
    servicioyextension: {
        type: String,
    },

    //DATOS DEL INGENIERO DE EMPRESA EXTERNA

    nombredelingeniero: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true
    },
    cargo: {
        type: String,
        required: true
    },

    //TIPO DE SERVICIO

    mantpreventivo: {
        type: Boolean,
    },
    mantcorrectivo: {
        type: Boolean,
    },
    mantcapacitacion: {
        type: Boolean,
    },
    soportetecnico: {
        type: Boolean,
    },
    revision: {
        type: Boolean,
    },
    otros: {
        type: Boolean,
    },

    //NOTAS

    descripciondelafalla: {
        type: String,
        required: true
    },
    actividadrealizada: {
        type: String,
        required: true
    },
    observaciones: {
        type: String,
    },
    
   // DATOS DEL USUARIO CREADOR

    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },

});

CorrectivoSchema.method('toJSON', function(){
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model('Correctivo',CorrectivoSchema);
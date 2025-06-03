
const {Schema, model} = require('mongoose');

const CorrectivoSchema = Schema({

    //Datos del equipo

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

    //Datos de la Orden

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

    //Datos del solicitante

    nombredelsolicitante: {
        type: String,
    },
    servicioyextension: {
        type: String,
    },

    //Datos del ingeniero de empresa externa que realizo mantenimiento

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

    //Tipo de Servicio
    mantpreventivo: {
        type: String,
    },
    mantcorrectivo: {
        type: String,
    },
    mantcapacitacion: {
        type: String,
    },
    soportetecnico: {
        type: String,
    },
    revision: {
        type: String,
    },
    otros: {
        type: String,
    },

    //Notas
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
    
    // DECLARACIONES
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
const {Schema, model} = require('mongoose');

const InventarioSchema = Schema({

    id:{
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    serial: {
        type: String,
        required: true
    },
    area: {
        type: String,
        required: true
    },
    ubication: {
        type: String,
        required: true
    },
    notes: {
        type: String,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }

});

InventarioSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('Inventario', InventarioSchema );
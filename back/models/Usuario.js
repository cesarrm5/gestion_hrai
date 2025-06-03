const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({

    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    birthdate:{
        type: String,
        require: true
    },
    role:{
        type: String,
        require: true
    },
    photo:{
        type: String,
        require: true
    }
});

module.exports = model('Usuario', UsuarioSchema);
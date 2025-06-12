/*
    participantes Routes
    /api/participantes

*/
const { Router } = require('express');
const { check } = require('express-validator');


const { validarcampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getParticipantes, crearParticipantes, actualizarParticipantes, eliminarParticipantes } = require('../controllers/participantes');


const router = Router();


// TODAS DEBEN ESTAR VALIDADAS POR JWT
router.use( validarJWT );

// OBTENER TODOS LOS PARTICIPANTES

router.get('/', getParticipantes );

// CREAR UN NUEVO PARTICIPANTE
router.post(
    '/',
    [
        check('No', 'El No es obligatorio').not().isEmpty(),
        check('Nombre', 'El Nombre es obligatorio').not().isEmpty(),
        check('Cargo', 'El Cargo de inicio es obligatoria').not().isEmpty(),
        check('Correo', 'El Correo es obligatorio').not().isEmpty(),
        check('Firma', 'La Firma es obligatoria').not().isEmpty(),        
        
        validarcampos
    ],
    crearParticipantes
    );

// ACTUALIZAR PARTICIPANTE 

router.put('/:id', actualizarParticipantes );

// ELIMINAR PARTICIPANTE 

router.delete('/:id', eliminarParticipantes );

module.exports = router;
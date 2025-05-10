/*
    Event Routes
    /api/events

*/
const { Router } = require('express');
const { check } = require('express-validator');

const { isDate } = require('../helpers/isDate');
const { validarcampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');


const router = Router();


// Todas deben estar validadas por JWT
router.use( validarJWT );

// Obtener eventos

router.get('/', getEventos );

// Crear un nuevo evento
router.post(
    '/',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio es obligatoria').custom( isDate ),
        check('end', 'La fecha de finalización es obligatoria').custom( isDate ),
        validarcampos
    ],
    crearEvento
    );

// Actualizar evento

router.put('/:id', actualizarEvento );

// Borrar evento

router.delete('/:id', eliminarEvento );

module.exports = router;
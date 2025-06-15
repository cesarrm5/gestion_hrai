/*
    agregar evento Routes
    /api/agregarevento

*/
const { Router } = require('express');
const { check } = require('express-validator');


const { validarcampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/agregarevento');


const router = Router();


// TODAS DEBEN ESTAR VALIDADAS POR JWT 
router.use( validarJWT );

// OBTENER TODOS LOS EVENTOS

router.get('/', getEventos );

// CREAR UN NUEVO EVENTO
router.post(
    '/',
    [
        check('Nombre_del_evento', 'El nombre del evento es obligatorio').not().isEmpty(),
        check('Fecha', 'La fecha es obligatoria').not().isEmpty(),

        validarcampos
    ],
    crearEvento
    );

// ACTUALIZAR EVENTO

router.put('/:id', actualizarEvento );

// BORRAR EVENTO

router.delete('/:id', eliminarEvento );

module.exports = router;
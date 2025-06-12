/*
    capacitaciones Routes
    /api/capacitaciones

*/
const { Router } = require('express');
const { check } = require('express-validator');


const { validarcampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getCapacitaciones, crearCapacitacion, actualizarCapacitacion, eliminarCapacitacion } = require('../controllers/capacitaciones');


const router = Router();


// TODAS DEBEN ESTAR VALIDADAS POR JWT 
router.use( validarJWT );

// OBTENER TODAS CAPACITACIONES 

router.get('/', getCapacitaciones );

// CREAR UNA NUEVA CAPACITACION 
router.post(
    '/',
    [
        check('Equipo', 'El Equipo es obligatorio').not().isEmpty(),
        check('Folio', 'El Folio es obligatorio').not().isEmpty(),
        check('Fecha', 'La fecha de inicio es obligatoria').not().isEmpty(),
        check('Duracion', 'La duracion es obligatorio').not().isEmpty(),
        check('Dirigido', 'A quien ira dirigida la capacitacion').not().isEmpty(),
        check('Instructor', 'El nombre del instructor es obligatorio').not().isEmpty(),
        check('Correo', 'El correo del instructor es obligatorio').not().isEmpty(),
        check('Area', 'El area instructor es obligatorio').not().isEmpty(),
        
        
        validarcampos
    ],
    crearCapacitacion
    );

// ACTUALIZAR CAPACITACIONES 

router.put('/:id', actualizarCapacitacion );

// BORRAR CAPACITACIONES 

router.delete('/:id', eliminarCapacitacion );

module.exports = router;
/* 
    Equipo Capacitacion Routes
    /api/equipocapacitacion
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarcampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getEquipocapacitacion, agregarEquipocapacitacion, editarEquipocapacitacion, eliminarEquipocapacitacion } = require('../controllers/equipocapacitacion');



const router = Router();

// TODAS DEBEN ESTAR VALIDADAS POR JWT 
router.use ( validarJWT );

// OBTENER EQUIPO DE CAPACITACION 
router.get('/', getEquipocapacitacion);

// AGREGAR UN NUEVO EQUIPO DE CAPACITACION
router.post(
    '/',
    [
        check('No','El id es obligatorio').not().isEmpty(),
        check('Nombre','El nombre es obligatorio').not().isEmpty(),
        check('Marca','La marca es obligatoria').not().isEmpty(),
        check('Modelo','El modelo es obligatorio').not().isEmpty(),
        check('Nodecontrol','El numero de serie es obligatorio').not().isEmpty(),

        validarcampos
    ],
    agregarEquipocapacitacion
);
 
// EDITAR EQUIPO DE CAPACITACION 
router.put('/:id',editarEquipocapacitacion);

// ELIMINAR EQUIPO DE CAPACITACION 
router.delete('/:id',eliminarEquipocapacitacion);

module.exports = router;
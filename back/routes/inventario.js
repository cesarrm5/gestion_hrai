/* 
    Inventario Routes
    /api/inventario
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarcampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getInventario, agregarEquipo, editarEquipo, eliminarEquipo } = require('../controllers/inventario');



const router = Router();

// TODAS DEBEN ESTAR VALIDADAS POR JWT 
router.use ( validarJWT );

// OBTENER INVENTARIO
router.get('/', getInventario);

// AGREGAR NUEVO EQUIPO
router.post(
    '/',
    [
        check('id','El id es obligatorio').not().isEmpty(),
        check('name','El nombre es obligatorio').not().isEmpty(),
        check('brand','La marca es obligatoria').not().isEmpty(),
        check('model','El modelo es obligatorio').not().isEmpty(),
        check('serial','El numero de serie es obligatorio').not().isEmpty(),
        check('area','El area es obligatorio').not().isEmpty(),
        check('ubication','La ubicación es obligatoria').not().isEmpty(),
        validarcampos
    ],
    agregarEquipo
);
 
// EDITAR EQUIPO
router.put('/:id',editarEquipo);

// ELIMINAR EQUIPO
router.delete('/:id',eliminarEquipo);

module.exports = router;
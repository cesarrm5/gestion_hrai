/*
    Preventivo Routes
    /api/preventivo

*/
const { Router } = require('express');
const { check } = require('express-validator');

const { isDate } = require('../helpers/isDate');
const { validarcampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getPreventivos, crearPreventivo, actualizarPreventivo, eliminarPreventivo } = require('../controllers/preventivo');


const router = Router();


// TODAS DEBEN ESTAR VALIDADAS POR JWT
router.use( validarJWT );

// OBTENER TODOS LOS MANTENIMIENTOS PREVENTIVOS 

router.get('/', getPreventivos );

// CREAR UN NUEVO MANTENIMIENTO PREVENTIVO
router.post(
    '/',
    [
        check('nombredelequipo', 'El nombre del equipo es obligatorio').not().isEmpty(),
        check('marca', 'La marca del equipo es obligatoria').not().isEmpty(),
        check('modelo', 'El modelo del equipo es obligatorio').not().isEmpty(),
        check('numerodeserie', 'El numero de serie del equipo es obligatorio').not().isEmpty(),
        check('numerodecontrol', 'El numero de control del equipo es obligatorio').not().isEmpty(),
        check('folio', 'El folio es obligatorio').not().isEmpty(),
        check('fechayhoradelreporte', 'Los datos del reporte del equipo es obligatorio').not().isEmpty(),
        check('fechayhoradeentrega', 'Los datos de entrega del equipo es obligatorio').not().isEmpty(),
        check('nombredelingeniero', 'El nombre del ingeniero es obligatorio').not().isEmpty(),
        check('correo', 'El correo es obligatorio').not().isEmpty(),
        check('telefono', 'El numero de telefono es obligatorio').not().isEmpty(),
        check('cargo', 'El carago es obligatorio').not().isEmpty(),
        check('descripciondelafalla', 'La descripcion de la falla es obligatoria').not().isEmpty(),
        check('actividadrealizada', 'El folio es obligatorio').not().isEmpty(),
        validarcampos
    ],
    crearPreventivo
    );

// ACTUALIZAR MANTENIMIENTO PREVENTIVO

router.put('/:id', actualizarPreventivo );

// ELIMINAR MANTENIMIENTO PREVENTIVO

router.delete('/:id', eliminarPreventivo );

module.exports = router;
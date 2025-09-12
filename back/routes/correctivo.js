
/*
    Correctivo Routes
    /api/correctivo

*/
const { Router } = require('express');
const { check } = require('express-validator');

const { isDate } = require('../helpers/isDate');
const { validarcampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getCorrectivos, crearCorrectivo, actualizarCorrectivo, eliminarCorrectivo } = require('../controllers/correctivo');


const router = Router();


// Todas deben estar validadas por JWT
router.use( validarJWT );

// Obtener correctivos

router.get('/', getCorrectivos );

// Crear un nuevo correctivo
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
    crearCorrectivo
    );

// Actualizar correctivo

router.put('/:id', actualizarCorrectivo );

// Borrar correctivo

router.delete('/:id', eliminarCorrectivo );

module.exports = router;
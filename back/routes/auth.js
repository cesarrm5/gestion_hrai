/*
    Rutas de Usuarios / Auth
    host + api/auth
*/

const {Router} = require('express');
const { check } = require('express-validator');
const { validarcampos  } = require('../middlewares/validar-campos');
const { crearUsuario,loginUsuario, revalidarToken } = require ('../controllers/auth');
const { validarJWT } = require('../middlewares/validar-jwt'); 

const router = Router();




//CREAR USUARIO
router.post(
    '/new', 
    [ // middlewares
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6  }),
        validarcampos


    ],
    crearUsuario);

//LOGIN
router.post(
    '/',[
        // middlewares
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6  }),
        validarcampos

    ],
     loginUsuario);     


//REVALIDAR TOKEN
router.get('/renew', validarJWT, revalidarToken);



module.exports = router;
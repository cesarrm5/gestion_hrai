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
        check('username', 'El nombre de usuario es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6  }),
        check('birthdate', 'La fecha de nacimiento obligatorio').not().isEmpty(),
        check('role', 'El cargo es obligatorio').not().isEmpty(),
        check('photo', 'La fotografia es obligatoria').not().isEmpty(),
        
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
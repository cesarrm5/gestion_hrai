const {response} = require('express'); 
const { validationResult  } = require ('express-validator');


const validarcampos = (req, res = response, next) =>{

  //Manejo de Errores
  const Errores = validationResult(req);
  if ( !Errores.isEmpty() ) {
      return res.status(400).json({
          ok: false,
          Errores: Errores.mapped()

      });

  }

    next();
}

module.exports = {
    validarcampos
    }

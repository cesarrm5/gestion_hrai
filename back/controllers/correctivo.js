
const {response} = require('express'); 
const Correctivo = require('../models/correctivo');

// SE MOSTRARAN TODOS LOS EVENTOS
const getCorrectivos = async ( req, res = response) => {

    const correctivos = await Correctivo.find()
                                 .populate('user','name');


    res.json({
    ok: true,
    correctivos
    });
}

// SE CREARAN NUEVOS MANTENIMINETOS CORRECTIVOS
const crearCorrectivo = async ( req, res = response) => {
    
    const correctivo = new Correctivo( req.body );

    try {

        correctivo.user = req.uid;

        const correctivoGuardado = await correctivo.save()

        res.json({
            ok:true,
            correctivo: correctivoGuardado
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

// SE ACTUALIZARAN LOS MANTENIMIENTOS CORRECTIVOS
const actualizarCorrectivo = async ( req, res = response) => {

    const correctivoId = req.params.id;
    const uid = req.uid;
    
    try{

        const correctivo = await Correctivo.findById( correctivoId );
 
        if ( !correctivo ){
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese Id'
            }); 
        }

        if ( correctivo.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene autorización de editar este evento'
            });
        } 
        
        const nuevoCorrectivo = {
            ...req.body,
            user: uid
        }

        const correctivoActualizado = await Correctivo.findByIdAndUpdate( correctivoId, nuevoCorrectivo, { new: true }  );

        res.json({
            ok: true,
            correctivo: correctivoActualizado
        }); 

    } catch(error) {
        console.log(error);
        res.status(500).json({
            ok: false.valueOf,
            msg: 'Hable con el administrador'
        });
    }
    
}

// SE PODRAN ELIMINAR EVENTOS QUE SE HAYAN CREADO ANTES 
const eliminarCorrectivo = async ( req, res = response) => {

    const correctivoId = req.params.id;
    const uid = req.uid;
    
    try{

        const correctivo = await Correctivo.findById( correctivoId );
 
        if ( !correctivo ){
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese Id'
            }); 
        }

        if ( correctivo.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene autorización de eliminar este evento'
            });
        } 
        
        await Correctivo.findByIdAndDelete( correctivoId );

        res.json({ ok: true }); 

    } catch(error) {
        console.log(error);
        res.status(500).json({
            ok: false.valueOf,
            msg: 'Hable con el administrador'
        });
    }
     
}

// EXPORTACIONES

module.exports ={
    getCorrectivos,
    crearCorrectivo,
    actualizarCorrectivo,
    eliminarCorrectivo
}
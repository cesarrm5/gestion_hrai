
const {response} = require('express'); 
const Preventivo = require('../models/preventivo');

// SE MOSTRARAN TODOS LOS MANTENIMIENTOS PREVENTIVOS
const getPreventivos = async ( req, res = response) => {

    const preventivos = await Preventivo.find()
                                 .populate('user','name');


    res.json({
    ok: true,
    preventivos
    });
}

// SE CREARAN NUEVOS MANTENIMIENTOS PREVENTIVOS
const crearPreventivo = async ( req, res = response) => {
    
    const preventivo = new Preventivo( req.body );

    try {

        preventivo.user = req.uid;

        const preventivoGuardado = await preventivo.save()

        res.json({
            ok:true,
            preventivo: preventivoGuardado
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

// SE ACTUALIZARAN LOS MANTENIMIENTOS PREVENTIVOS
const actualizarPreventivo = async ( req, res = response) => {

    const preventivoId = req.params.id;
    const uid = req.uid;
    
    try{

        const preventivo = await Preventivo.findById( preventivoId );
 
        if ( !preventivo ){
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese Id'
            }); 
        }

        if ( preventivo.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene autorización de editar este evento'
            });
        } 
        
        const nuevoPreventivo = {
            ...req.body,
            user: uid
        }

        const preventivoActualizado = await Preventivo.findByIdAndUpdate( preventivoId, nuevoPreventivo, { new: true }  );

        res.json({
            ok: true,
            preventivo: preventivoActualizado
        }); 

    } catch(error) {
        console.log(error);
        res.status(500).json({
            ok: false.valueOf,
            msg: 'Hable con el administrador'
        });
    }
    
}

// SE PODRAN ELIMINAR MANTENIMIENTOS PREVENTIVOS QUE SE HAYAN CREADO ANTES 
const eliminarPreventivo = async ( req, res = response) => {

    const preventivoId = req.params.id;
    const uid = req.uid;
    
    try{

        const preventivo = await Preventivo.findById( preventivoId );
 
        if ( !preventivo ){
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese Id'
            }); 
        }

        if ( preventivo.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene autorización de eliminar este evento'
            });
        } 
        
        await Preventivo.findByIdAndDelete( preventivoId );

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
    getPreventivos,
    crearPreventivo,
    actualizarPreventivo,
    eliminarPreventivo
}
const {response} = require('express'); 
const Evento = require('../models/agregarevento');

// SE MOSTRARAN TODOS LOS EVENTOS //
const getEventos = async ( req, res = response) => {

    const eventos = await Evento.find()
                                 .populate('user','name');

    res.json({
    ok: true,
    eventos
    });
}


// SE CREARAN NUEVOS EVENTOS //
const crearEvento = async ( req, res = response) => {
    
    const evento = new Evento( req.body );

    try {

        evento.user = req.uid;

        const eventoGuardada = await evento.save()

        res.json({
            ok:true,
            evento: eventoGuardada
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}


// SE ACTUALIZARAN LOS EVENTOS CREADOS // 
const actualizarEvento = async ( req, res = response) => {

    const eventoId = req.params.id;
    const uid = req.uid;
    
    try{

        const evento = await Evento.findById( eventoId );
 
        if ( !evento ){
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese Id'
            }); 
        }

        if ( evento.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene autorización de editar este evento'
            });
        } 
        
        const nuevaEvento = {
            ...req.body,
            user: uid
        }

        const eventoActualizada = await Evento.findByIdAndUpdate( eventoId, nuevaEvento, { new: true }  );

        res.json({
            ok: true,
            evento: eventoActualizada
        }); 

    } catch(error) {
        console.log(error);
        res.status(500).json({
            ok: false.valueOf,
            msg: 'Hable con el administrador'
        });
    }
}

// SE PODRAN ELIMINAR LOS EVENTOS QUE SE HAYAN CREADO ANTES 
const eliminarEvento = async ( req, res = response) => {

    const eventoId = req.params.id;
    const uid = req.uid;
    
    try{

        const evento = await Evento.findById( eventoId );
 
        if ( !evento ){
            return res.status(404).json({
                ok: false,
                msg: 'Este evento no existe por ese Id'
            }); 
        }

        if ( evento.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene autorización de eliminar este evento'
            });
        } 
        
        await Evento.findByIdAndDelete( eventoId );

        res.json({ ok: true }); 

    } catch(error) {
        console.log(error);
        res.status(500).json({
            ok: false.valueOf,
            msg: 'Hable con el administrador'
        });
    }
     
}



module.exports ={
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}
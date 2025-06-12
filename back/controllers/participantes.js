
const {response} = require('express'); 
const Participante = require('../models/participantes');

// SE MOSTRARAN TODOS LOS PARTICIPANTES
const getParticipantes = async ( req, res = response) => {

    const participantes = await Participante.find()
                                 .populate('user','name');


    res.json({
    ok: true,
    participantes
    });
}

// SE CREARAN NUEVOS PARTICIPANTES
const crearParticipantes = async ( req, res = response) => {
    
    const participante = new Participante( req.body );

    try {

        participante.user = req.uid;

        const participanteGuardada = await participante.save()

        res.json({
            ok:true,
            participante: participanteGuardada
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

// SE ACTUALIZARAN LOS PARTICIPANTES CREADOS 
const actualizarParticipantes = async ( req, res = response) => {

    const participanteId = req.params.id;
    const uid = req.uid;
    
    try{

        const participante = await Participante.findById( participanteId );
 
        if ( !participante ){
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese Id'
            }); 
        }

        if ( participante.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene autorización de editar este participante'
            });
        } 
        
        const nuevaParticipante = {
            ...req.body,
            user: uid
        }

        const participanteActualizada = await Participante.findByIdAndUpdate( participanteId, nuevaParticipante, { new: true }  );

        res.json({
            ok: true,
            participante: participanteActualizada
        }); 

    } catch(error) {
        console.log(error);
        res.status(500).json({
            ok: false.valueOf,
            msg: 'Hable con el administrador'
        });
    }
    
}

// SE PODRAN ELIMINAR PARTICIPANTES QUE SE HAYAN CREADO ANTES 
const eliminarParticipantes = async ( req, res = response) => {

    const participanteId = req.params.id;
    const uid = req.uid;
    
    try{

        const participante = await Participante.findById( participanteId );
 
        if ( !participante ){
            return res.status(404).json({
                ok: false,
                msg: 'Participante no existe por ese Id'
            }); 
        }

        if ( participante.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene autorización de eliminar este participante'
            });
        } 
        
        await Participante.findByIdAndDelete( participanteId );

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
    getParticipantes,
    crearParticipantes,
    actualizarParticipantes,
    eliminarParticipantes
}
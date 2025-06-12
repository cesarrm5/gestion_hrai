
const {response} = require('express'); 
const Capacitacion = require('../models/capacitaciones');

// SE MOSTRARAN TODAS LAS CAPACITACIONES //
const getCapacitaciones = async ( req, res = response) => {

    const capacitaciones = await Capacitacion.find()
                                 .populate('user','name');

    res.json({
    ok: true,
    capacitaciones
    });
}


// SE CREARAN NUEVAS CAPACITACIONES //
const crearCapacitacion = async ( req, res = response) => {
    
    const capacitacion = new Capacitacion( req.body );

    try {

        capacitacion.user = req.uid;

        const capacitacionGuardada = await capacitacion.save()

        res.json({
            ok:true,
            evento: capacitacionGuardada
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}


// SE ACTUALIZARAN LAS CAPACITACIONES CREADAS // 
const actualizarCapacitacion = async ( req, res = response) => {

    const capacitacionId = req.params.id;
    const uid = req.uid;
    
    try{

        const capacitacion = await Capacitacion.findById( capacitacionId );
 
        if ( !capacitacion ){
            return res.status(404).json({
                ok: false,
                msg: 'Capacitacion no existe por ese Id'
            }); 
        }

        if ( capacitacion.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene autorización de editar esta capacitacion'
            });
        } 
        
        const nuevaCapacitacion = {
            ...req.body,
            user: uid
        }

        const capacitacionActualizada = await Capacitacion.findByIdAndUpdate( capacitacionId, nuevaCapacitacion, { new: true }  );

        res.json({
            ok: true,
            capacitacion: capacitacionActualizada
        }); 

    } catch(error) {
        console.log(error);
        res.status(500).json({
            ok: false.valueOf,
            msg: 'Hable con el administrador'
        });
    }
}

// SE PODRAN ELIMINAR CAPACITACIONES QUE SE HAYAN CREADO ANTES 
const eliminarCapacitacion = async ( req, res = response) => {

    const capacitacionId = req.params.id;
    const uid = req.uid;
    
    try{

        const capacitacion = await Capacitacion.findById( capacitacionId );
 
        if ( !capacitacion ){
            return res.status(404).json({
                ok: false,
                msg: 'Capacitacion no existe por ese Id'
            }); 
        }

        if ( capacitacion.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene autorización de eliminar esta capacitacion'
            });
        } 
        
        await Capacitacion.findByIdAndDelete( capacitacionId );

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
    getCapacitaciones,
    crearCapacitacion,
    actualizarCapacitacion,
    eliminarCapacitacion
}
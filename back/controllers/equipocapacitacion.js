
const { response } = require('express');
const Equipocapacitacion = require('../models/equipocapacitacion');

// SE MOSTRARAN TODOS LOS EQUIPOS DE CAPACITACION

const getEquipocapacitacion = async( req, res = response ) => { 

    const equipocapacitacion = await Equipocapacitacion.find()
                                       .populate('user','name');
                                        

    res.json({
        ok: true,   
        equipocapacitacion          
    })
}

// SE CREARAN LOS NUEVOS EQUIPOS DE CAPACITACION

const agregarEquipocapacitacion = async ( req, res = response ) => { 

    const equipocapacitacion = new Equipocapacitacion( req.body );
    
    try {

        equipocapacitacion.user = req.uid;

        const equipocapacitacionGuardado = await equipocapacitacion.save();   
        
        res.json({
                ok: true,
                equipocapacitacion: equipocapacitacionGuardado
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

// SE ACTUALIZARAN LOS EQUIPOS DE CAPACITACION


const editarEquipocapacitacion = async ( req, res = response) => {

    const equipocapacitacionId = req.params.id;
    const uid = req.uid;
    
    try{

        const equipocapacitacion = await Equipocapacitacion.findById( equipocapacitacionId );
 
        if ( !equipocapacitacion ){
            return res.status(404).json({
                ok: false,
                msg: 'El equipo no existe por ese Id'
            }); 
        }

        if ( equipocapacitacion.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene autorización de editar los datos de este equipo'
            });
        } 
        
        const nuevodato = {
            ...req.body,
            user: uid
        }

        const equipocapacitacionActualizado = await Equipocapacitacion.findByIdAndUpdate( equipocapacitacionId, nuevodato, { new: true }  );

        res.json({
            ok: true,
            equipocapacitacion: equipocapacitacionActualizado
        }); 

    } catch(error) {
        console.log(error);
        res.status(500).json({
            ok: false.valueOf,
            msg: 'Hable con el administrador'
        });
    }
    
}

// SE PODRAN ELIMINAR LOS EQUIPOS DE CAPACITACION

const eliminarEquipocapacitacion = async ( req, res = response) => {

    const equipocapacitacionId = req.params.id;
    const uid = req.uid;
    
    try{

        const equipocapacitacion = await Equipocapacitacion.findById( equipocapacitacionId );
 
        if ( !equipocapacitacion ){
            return res.status(404).json({
                ok: false,
                msg: 'Equipo no existe por ese Id'
            }); 
        }

        if ( equipocapacitacion.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene autorización de eliminar este equipo'
            });
        } 
        
        await Equipocapacitacion.findByIdAndDelete( equipocapacitacionId );

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

module.exports = {
    getEquipocapacitacion,
    agregarEquipocapacitacion,
    editarEquipocapacitacion,
    eliminarEquipocapacitacion
}
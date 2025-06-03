const { response } = require('express');
const Inventario = require('../models/Inventario');


const getInventario = async( req, res = response ) => { 

    const inventario = await Inventario.find()
                                       .populate('user','name');
                                        

    res.json({
        ok: true,   
        inventario          
    })
}

const agregarEquipo = async ( req, res = response ) => { 

    const inventario = new Inventario( req.body );
    
    try {

        inventario.user = req.uid;

        const inventarioGuardado = await inventario.save();   
        
        res.json({
                ok: true,
                inventario: inventarioGuardado
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}


const editarEquipo = async ( req, res = response) => {

    const inventarioId = req.params.id;
    const uid = req.uid;
    
    try{

        const inventario = await Inventario.findById( inventarioId );
 
        if ( !inventario ){
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese Id'
            }); 
        }

        if ( inventario.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene autorización de editar los datos de este equipo'
            });
        } 
        
        const nuevodato = {
            ...req.body,
            user: uid
        }

        const inventarioActualizado = await Inventario.findByIdAndUpdate( inventarioId, nuevodato, { new: true }  );

        res.json({
            ok: true,
            inventario: inventarioActualizado
        }); 

    } catch(error) {
        console.log(error);
        res.status(500).json({
            ok: false.valueOf,
            msg: 'Hable con el administrador'
        });
    }
    
}

const eliminarEquipo = async ( req, res = response) => {

    const inventarioId = req.params.id;
    const uid = req.uid;
    
    try{

        const inventario = await Inventario.findById( inventarioId );
 
        if ( !inventario ){
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese Id'
            }); 
        }

        if ( inventario.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene autorización de eliminar este equipo'
            });
        } 
        
        await Inventario.findByIdAndDelete( inventarioId );

        res.json({ ok: true }); 

    } catch(error) {
        console.log(error);
        res.status(500).json({
            ok: false.valueOf,
            msg: 'Hable con el administrador'
        });
    }
     
}

module.exports = {
    getInventario,
    agregarEquipo,
    editarEquipo,
    eliminarEquipo
}
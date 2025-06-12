const express = require ('express');   
const cors = require('cors');
require ('dotenv').config();
const { dbConnection} = require('./database/config');

console.log( process.env );

// Crear el servidor express
const app = express ();

// Base de Datos
dbConnection ();

// CORS
app.use(cors());


// Directorio Publico

app.use( express.static('public') );
     

// Lectura y parseo del body 
app.use( express.json ());

// Rutas 
app.use('/api/auth', require('./routes/auth')); // USUARIO //
app.use('/api/preventivo', require('./routes/preventivo')); // MANTENIMIENTOS PREVENTIVOS //
app.use('/api/correctivo', require('./routes/correctivo')); // MANTENIMIENTOS CORRECTIVOS //
app.use('/api/inventario', require('./routes/inventario')); // INVENTARIO //
app.use('/api/capacitaciones', require('./routes/capacitaciones')); // CAPACITACIONES //
app.use('/api/participantes', require('./routes/participantes')); // PARTICIPANTES //
app.use('/api/equipocapacitacion', require('./routes/equipocapacitacion')); // EQUIPO DE CAPACITACION //
app.use('/api/agregarevento', require('./routes/agregarevento')); // AGREGAR EVENTO //




// Escuchar peticiones 
app.listen (process.env.PORT,() =>{
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`)

});

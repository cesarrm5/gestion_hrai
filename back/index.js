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
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));




// Escuchar peticiones 
app.listen (process.env.PORT,() =>{
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`)

});

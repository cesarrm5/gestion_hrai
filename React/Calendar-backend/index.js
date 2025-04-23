const express = require ('express');   

require ('dotenv').config();
const { dbConnection} = require('./database/config');

console.log( process.env );

// Crear el servidor express
const app = express ();

// Base de Datos
dbConnection ();


// Directorio Publico

app.use( express.static('public') );
     

// Lectura y parseo del body 
app.use( express.json ());

// Rutas 
app.use('/api/auth', require('./routes/auth'));
// TODO: Eventos



// Escuchar peticiones 
app.listen (process.env.PORT,() =>{
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`)

});

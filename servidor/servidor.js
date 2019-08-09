//paquetes necesarios para el proyecto
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const controlador = require('./controladores/controlador');
const controladorGeneros = require('./controladores/controladorGeneros');
const controladorTraerPeliculas = require('./controladores/controladorTraerPeliculas')
const controladorRecomendaciones = require('./controladores/controladorRecomendaciones')

app.use(cors());
app.use(
	bodyParser.urlencoded({
		extended: true
	})
);
app.use(bodyParser.json());
app.get('/peliculas', controlador.peliculasFiltradas);
app.get('/peliculas/recomendacion',controladorRecomendaciones.recomendaciones)
app.get('/peliculas/:id', controladorTraerPeliculas.buscarPelicula);
app.get('/generos', controladorGeneros.mostrarGeneros);

//seteamos el puerto en el cual va a escuchar los pedidos la aplicación
const puerto = '8080';

app.listen(puerto, function() {
	console.log('Escuchando en el puerto ' + puerto);
});

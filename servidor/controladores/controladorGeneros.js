const connection = require('../lib/conexionbd');

const mostrarGeneros = (req, res) => {
	const sqlGeneros = 'SELECT * FROM genero';

	connection.query(sqlGeneros, function(error, resultado, fields) {
		if (error) {
			console.log('Hubo un error en la consulta', error.message);
			return res.status(404).send('Hubo un error en la consulta');
		}
		const response = {
			generos: resultado
		};
		res.send(JSON.stringify(response));
	});
};

module.exports = { mostrarGeneros };

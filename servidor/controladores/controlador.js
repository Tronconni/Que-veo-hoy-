const connection = require('../lib/conexionbd');

const getConsulta = (params) => {
	const { titulo, genero, anio, titulo_orden, columna_orden, pagina } = params;
	let sql = `SELECT * FROM pelicula `;
	let sql1 = ' SELECT COUNT(*) AS TOTAL FROM pelicula';
	let sqlTitulo = ` WHERE titulo like '%${params.titulo}%' `;
	let sqlGenero = ` WHERE genero_id = ${params.genero} `;
	let sqlAnio = ` WHERE anio = ${params.anio} `;
	if (titulo && anio) {
		sql += sqlTitulo + ' ' + 'AND' + ` anio = ${params.anio}`;
		sql1 += sqlTitulo + ' ' + 'AND' + ` anio = ${params.anio}`;
	} else if (titulo && genero) {
		sql += sqlTitulo + ' ' + 'AND' + ` genero_id = ${params.genero}`;
		sql1 += sqlTitulo + ' ' + 'AND' + ` genero_id = ${params.genero}`;
	} else if (anio && genero) {
		sql += sqlGenero + ' ' + 'AND' + ` anio = ${params.anio}`;
		sql1 += sqlGenero + ' ' + 'AND' + ` anio = ${params.anio}`;
	} else if (titulo && genero && anio) {
		sql += sqlTitulo + 'AND' + ` genero_id = ${params.genero}` + ' ' + 'AND' + ` anio = ${params.anio}`;
		sql1 += sqlTitulo + 'AND' + ` genero_id = ${params.genero}` + ' ' + 'AND' + ` anio = ${params.anio}`;
	} else if (titulo) {
		sql += sqlTitulo;
		sql1 += sqlTitulo;
	} else if (anio) {
		sql += sqlAnio;
		sql1 += sqlAnio;
	} else if (genero) {
		sql += sqlGenero;
		sql1 += sqlGenero;
	}
	return {
		sql: sql,
		sql1: sql1
	};
};

const peliculasFiltradas = (req, res) => {
	let ordenSolicitado = req.query.columna_orden;
	const orderBy = ` order by `;
	let tipoDeOrden = req.query.tipo_orden;
	const { sql, sql1 } = getConsulta(req.query);
	const cantidad = req.query.cantidad;
	const pagina = (req.query.pagina - 1) * cantidad;
	const limite = `limit ${pagina},${cantidad}`;
	let consultaFinal = sql + ' ' + orderBy + '' + ordenSolicitado + ' ' + tipoDeOrden + ' ' + limite;
	connection.query(consultaFinal, (error, resultado, fields) => {
		if (error) {
			console.log('Hubo un error en la consulta', error.message);
			return res.status(404).send('Hubo un error en la consulta');
		}
		let response = {
			peliculas: resultado,
			total: ''
		};
		connection.query(sql1, (error, resultado1, fields) => {
			if (error) return res.status(404).send('Hubo un error en la consulta');
			response.total = resultado1[0].TOTAL;
			res.send(JSON.stringify(response));
		});
	});
};

module.exports = { peliculasFiltradas };

const connection = require('../lib/conexionbd');

const recomendaciones = (req, res)=> {
    const genero = req.query.genero; 
    let   anio_inicio = req.query.anio_inicio;
    let   anio_fin = req.query.anio_fin;
    let   puntuacion = req.query.puntuacion;
    let sql = "SELECT * FROM pelicula JOIN genero ON pelicula.genero_id = genero.id";
    let where = " ";        

    if (genero){
        where += "genero.nombre = ' " + genero + "'";
    }
    if (anio_inicio){
        if (genero){
            where += " AND ";
        }
        where += " "+"anio >= " + anio_inicio;
    }
    if (anio_fin){
        if (genero || anio_inicio){
            where += " AND ";
        }
        where += "anio <= " + anio_fin;
    }
    if (puntuacion){
        if (genero || anio_inicio || anio_fin){
            where+= " AND ";
        }
        where += "puntuacion = " + puntuacion;
    }
    if (where){
        sql += " WHERE " + where;
    }
    connection.query(sql, function(error, resultado, fields) {
        if (error) {
            console.log("Hubo un error en la consulta", error.message);
            return res.status(404).send("Hubo un error en la consulta");
        }
        const response = {
            'peliculas': resultado
            };
        res.send(JSON.stringify(response));    
    });
};

module.exports = {recomendaciones}
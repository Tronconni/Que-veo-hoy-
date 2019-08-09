const connection = require('../lib/conexionbd');

const buscarPelicula = (req, res)=> {
    const id = req.params.id; 
    let sql = "SELECT * FROM pelicula WHERE id = " + id;
    connection.query(sql, function(error, resultado, fields) {
        if (error) {
            console.log("Hubo un error en la consulta", error.message);
            return res.status(404).send("Hubo un error en la consulta");
        }

        if (resultado.length === 0) {
            console.log("No se encontro ninguna pelicula con este id");
            return res.status(404).send("No se encontro ninguna pelicula con este id");
        }
        const pelicula = resultado[0];
        sql = "SELECT actor.nombre FROM actor_pelicula INNER JOIN actor ON actor_pelicula.actor_id = actor.id WHERE actor_pelicula.pelicula_id = " + id;

        connection.query(sql, function(error, resultado, fields) {
            if (error) {
                console.log("Hubo un error en la consulta", error.message);
                return res.status(404).send("Hubo un error en la consulta");
            }

            const actores = resultado;

            sql = "SELECT * FROM genero WHERE id = " + pelicula.genero_id;

            connection.query(sql, function(error, resultado, fields) {
                if (error) {
                    console.log("Hubo un error en la consulta", error.message);
                    return res.status(404).send("Hubo un error en la consulta");
                }

                const response = {
                    'pelicula': pelicula,
                    'actores': actores,
                    'genero': resultado[0]
                };
                
                res.send(JSON.stringify(response));    
            });             
        });     
    });
};

module.exports = {buscarPelicula}
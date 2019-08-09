CREATE TABLE `pelicula`
(
    `id` int
(20) NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR
(30) NOT NULL,
    `duracion` int
(5) DEFAULT NULL,
    `director` VARCHAR
(400) NOT NULL,
    `anio` int
(5) NOT NULL,
    `fecha_lanzamiento` DATE DEFAULT NULL,
    `puntuacion` int
(2) NOT NULL,
    `poster` VARCHAR
(300),
    `trama` VARCHAR
(300),
     PRIMARY KEY
(`id`)
);

CREATE TABLE `actor`
(
    `id` int
(20) NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR
(70) NOT NULL,
    PRIMARY KEY
(`id`)
);

CREATE TABLE actor_pelicula (
    id Int Not Null auto_increment,
    actor_id int,
    pelicula_id int,
    PRIMARY KEY (id),
    FOREIGN KEY (actor_id) REFERENCES actor(id),
    FOREIGN KEY (pelicula_id) REFERENCES pelicula(id)
    );

CREATE TABLE `genero` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) 
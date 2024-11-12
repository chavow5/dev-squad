-- SQL para crear la tabla
-- nombre de base de datos 
-- db-lab4

-- tabla usuarios
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(25) NOT NULL,
  `password` varchar(150) NOT NULL,
  `rol` VARCHAR(45) NULL DEFAULT 'usuario', -- x dfcto se crea el rol d usuario

  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `password_UNIQUE` (`password`)
) 
-- tabla vehiculos
CREATE TABLE `db-lab4`.`vehiculos` (
  `id_vehiculo` INT NOT NULL AUTO_INCREMENT,
  `tipo_vehiculo` VARCHAR(45) NOT NULL,
  `precio_vehiculo` DECIMAL NOT NULL,
  `pago_vehiculo` VARCHAR(45) NOT NULL,
  `fecha_vehiculo` TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- x dfcto cuando cargas dtos
  PRIMARY KEY (`id_vehiculo`)
);
-- tabla precios
CREATE TABLE `db-lab4`.`precios` (
  `id_precios` INT NOT NULL AUTO_INCREMENT,
  `categoria_precio` VARCHAR(45) NOT NULL,
  `precio_precio` DECIMAL NOT NULL,
  `fecha_act_precio` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_precios`));


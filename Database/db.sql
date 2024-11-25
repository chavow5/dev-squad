-- Crear base de datos
CREATE DATABASE IF NOT EXISTS `db-lab4` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `db-lab4`;

-- Tabla `usuarios`
DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(25) NOT NULL,
  `password` varchar(150) NOT NULL,
  `rol` varchar(45) DEFAULT 'usuario',
  `mail_usuario` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `mail_usuario_UNIQUE` (`mail_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- Tabla `vehiculos`
DROP TABLE IF EXISTS `vehiculos`;
CREATE TABLE `vehiculos` (
  `idvehiculos` int NOT NULL AUTO_INCREMENT,
  `tipo_vehiculo` varchar(45) NOT NULL,
  `precio_vehiculo` int NOT NULL,
  `pago_vehiculo` varchar(20) NOT NULL,
  `fecha_vehiculo` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_act_inicio` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `categoria_precio` varchar(45) NOT NULL,
  `id_usuario` int DEFAULT NULL,
  `username` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`idvehiculos`),
  UNIQUE KEY `idvehiculos_UNIQUE` (`idvehiculos`),
  CONSTRAINT `fk_vehiculos_usuarios_id` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_vehiculos_usuarios_username` FOREIGN KEY (`username`) REFERENCES `usuarios` (`username`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla `historial`
DROP TABLE IF EXISTS `historial`;
CREATE TABLE `historial` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fecha_peaje` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `cobros` int NOT NULL,
  `id_vehiculo` int DEFAULT NULL,
  `username` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_historial_vehiculos_id` FOREIGN KEY (`id_vehiculo`) REFERENCES `vehiculos` (`idvehiculos`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_historial_vehiculos_username` FOREIGN KEY (`username`) REFERENCES `usuarios` (`username`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Datos

-- usuarios
INSERT INTO `usuarios` VALUES 
(1,'Ceciliabolado1','$2b$10$qS7wnjSWHFszgiIm3k0b3O5SZt7ou2VzohF9onGGD3uY5HEnZG89q','usuario','ceciliabolado1@mail.com'),
(2,'Ceciliabolado2','$2b$10$T8VOpTGrmo08Ze33oAWOIO77MwxS8LG7uJhniDSaFB8eSzxew2b.e','usuario','ceciliabolado2@mail.com'),
(3,'Ceciliabolado3','$2b$10$kZgUcFO4Z5LgyQ8qNfQ/4eOMYrnWvGBdMwUifcX1DS8uI5XSNrPdu','usuario','ceciliabolado3@mail.com');

-- vehiculos
INSERT INTO `vehiculos` VALUES 
(1,'Automóvil',1500,'efectivo','2024-11-24 21:23:32','2024-11-24 21:23:32','1500',1,'Ceciliabolado1'),
(2,'Motocicleta',1000,'efectivo','2024-11-24 21:23:32','2024-11-24 21:23:32','1000',1,'Ceciliabolado1'),
(3,'Camioneta',2000,'efectivo','2024-11-24 21:25:45','2024-11-24 21:25:45','2000',1,'Ceciliabolado1'),
(4,'Camión',2500,'efectivo','2024-11-24 21:26:16','2024-11-24 21:26:16','2500',1,'Ceciliabolado1');

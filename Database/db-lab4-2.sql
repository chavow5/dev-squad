-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: db-lab4
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.28-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cabinas`
--

DROP TABLE IF EXISTS `cabinas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cabinas` (
  `id_cabina` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` int(11) NOT NULL,
  `ubicacion` varchar(45) NOT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id_cabina`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cabinas`
--

LOCK TABLES `cabinas` WRITE;
/*!40000 ALTER TABLE `cabinas` DISABLE KEYS */;
INSERT INTO `cabinas` VALUES (1,1,'larioja','2024-11-29 13:03:43'),(2,2,'cordoba','2024-11-29 13:03:43'),(3,3,'chilecito','2024-11-29 13:03:43'),(4,4,'aimogasta','2024-11-29 13:03:43'),(5,5,'sanagasta','2024-11-29 13:03:43'),(6,6,'dique','2024-11-29 13:03:43');
/*!40000 ALTER TABLE `cabinas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `historial`
--

DROP TABLE IF EXISTS `historial`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `historial` (
  `id_historial` int(11) NOT NULL AUTO_INCREMENT,
  `fecha_peaje` timestamp NOT NULL DEFAULT current_timestamp(),
  `id_cabina` int(11) DEFAULT NULL,
  `id_vehiculo` int(11) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `monto_pagado` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id_historial`),
  KEY `id_cabina_idx` (`id_cabina`),
  KEY `id_vehiculo` (`id_vehiculo`),
  KEY `id_usuario_idx` (`id_usuario`),
  CONSTRAINT `id_cabina` FOREIGN KEY (`id_cabina`) REFERENCES `cabinas` (`id_cabina`),
  CONSTRAINT `id_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`),
  CONSTRAINT `id_vehiculo` FOREIGN KEY (`id_vehiculo`) REFERENCES `vehiculos` (`id_vehiculos`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historial`
--

LOCK TABLES `historial` WRITE;
/*!40000 ALTER TABLE `historial` DISABLE KEYS */;
INSERT INTO `historial` VALUES (1,'2024-11-28 15:39:44',1,1,5,1500.00);
/*!40000 ALTER TABLE `historial` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id_rol` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  PRIMARY KEY (`id_rol`),
  UNIQUE KEY `nombre_UNIQUE` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'administrador'),(2,'operador');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(25) NOT NULL,
  `nombre_completo` varchar(45) DEFAULT NULL,
  `password` varchar(150) NOT NULL,
  `id_rol` int(11) NOT NULL,
  `dni` int(11) DEFAULT NULL,
  `fecha_nac` varchar(45) DEFAULT NULL,
  `mail` varchar(45) DEFAULT NULL,
  `telefono` varchar(45) DEFAULT NULL,
  `domicilio` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  KEY `id_rol_idx` (`id_rol`),
  CONSTRAINT `id_rol` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id_rol`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (5,'Davidramirez7',NULL,'$2b$10$XnyBSJybH92AsEROIye49.mNkp1uTMWbheSZPmDY2hYp3csxINVjW',1,NULL,NULL,'david@gmail.com',NULL,NULL),(6,'Davidramirez19',NULL,'$2b$10$7CBxmhG7bqCVd2vKSOBJYOLZ18aGnAN4kFwvK7uQ5h1tgW0DjcGy6',2,NULL,NULL,'david@gmail.com',NULL,NULL),(7,'Ceciliabolado1',NULL,'$2b$10$jDHcw4H6Yr2BY6n4dq6pxueq/oCfJZOubqa/f2B41OYk.eGq4SNmq',1,NULL,NULL,'ceci@gmail.com',NULL,NULL),(9,'Davidramirez2',NULL,'$2b$10$wWLstYBnbe5HZEQtxtai4OXWBythxJvkxxQrIZbtKCSjg4iTBjq5G',1,NULL,NULL,'david@gmail.com',NULL,NULL),(10,'Davidramirez3',NULL,'$2b$10$gtVGEwoRN6JAu6EygQsPMug.FYNp7CkfyU03kEKWdApQhMADiD5nG',1,NULL,NULL,'david@gmail.com',NULL,NULL),(11,'Cecibolado21',NULL,'$2b$10$GQhRuWwOfvrES6v7CL4ub.Svkz4xAGlZNUeLM1Yb8SS82d6wjvoVW',1,NULL,NULL,'Cecibolado21@gmial.com',NULL,NULL);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vehiculos`
--

DROP TABLE IF EXISTS `vehiculos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vehiculos` (
  `id_vehiculos` int(11) NOT NULL AUTO_INCREMENT,
  `patente` varchar(45) NOT NULL,
  `tipo_vehiculo` varchar(45) DEFAULT NULL,
  `numero_cabina` int(11) DEFAULT NULL,
  `precio` int(11) DEFAULT NULL,
  `fecha` date DEFAULT curdate(),
  `metodo_pago` enum('efectivo','transferencia','qr','cheques','criptomonedas') DEFAULT 'efectivo',
  PRIMARY KEY (`id_vehiculos`),
  UNIQUE KEY `patente_UNIQUE` (`patente`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehiculos`
--

LOCK TABLES `vehiculos` WRITE;
/*!40000 ALTER TABLE `vehiculos` DISABLE KEYS */;
INSERT INTO `vehiculos` VALUES (1,'abc123','moto',1,1000,'2024-11-28','efectivo'),(2,'abb123','auto',1,1500,'2024-11-28','efectivo'),(3,'aaa123','camion',1,2000,'2024-11-28','efectivo'),(4,'aa123','camioneta',2,1500,'2024-11-28','efectivo'),(5,'abcd1234','moto',3,1000,'2024-11-28','efectivo'),(6,'abcc1312','auto',1,1000,'2024-11-28','efectivo'),(7,'prueba123','camion',2,3000,'2024-11-28','efectivo'),(8,'chavo123','camioneta',3,2500,'2024-11-28','efectivo'),(9,'thun672','Moto',4,1000,'2024-11-28','efectivo'),(10,'thun092','Moto',1,1000,'2024-11-28','efectivo'),(11,'chav651','moto',2,1500,'2024-11-28','efectivo'),(12,'13123adsda','',2,1000,'2024-11-28','efectivo'),(13,'dada1312','',1,1500,'2024-11-28','efectivo'),(14,'chav123','camioneta',2,2500,'2024-11-30',''),(15,'pfn028','camioneta',3,2500,'2024-11-01','efectivo'),(16,'pfd012','moto',4,1500,'2024-11-29','qr'),(17,'2131d','camion',6,15000,'2024-11-28','transferencia'),(18,'jask12','moto',6,1500,'2024-11-29','efectivo'),(19,'lok654','auto',3,1500,'2024-11-28','efectivo'),(20,'new871','camion',2,500,'2024-11-28','efectivo'),(21,'abs763','moto',2,1000,'2024-11-28','efectivo'),(22,'ksj133po','moto',5,1500,'2024-11-29','qr'),(23,'fff543','moto',4,1500,'2024-11-29','qr');
/*!40000 ALTER TABLE `vehiculos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;

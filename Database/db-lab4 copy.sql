CREATE DATABASE  IF NOT EXISTS `db-lab4` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `db-lab4`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
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
-- Dumping data for table `perfiles`
--

LOCK TABLES `perfiles` WRITE;
/*!40000 ALTER TABLE `perfiles` DISABLE KEYS */;
/*!40000 ALTER TABLE `perfiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `precios`
--

LOCK TABLES `precios` WRITE;
/*!40000 ALTER TABLE `precios` DISABLE KEYS */;
INSERT INTO `precios` VALUES (1,'Autos',1000,'2024-11-12 04:46:12'),(2,'Motos',500,'2024-11-12 04:46:12'),(3,'Camioneta',1500,'2024-11-12 04:46:12'),(4,'Camiones',2000,'2024-11-12 04:46:12'),(5,'Auto + Trailer',1500,'2024-11-12 04:46:12'),(6,'Camioneta + Trailer',2500,'2024-11-12 04:46:12');
/*!40000 ALTER TABLE `precios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Davidramirez5','$2b$10$1mGnR/xVCDBWmsWg11A/E.jnitz8c0AL3Z2bhxTVcvH2k2OrtxLr2','usuario'),(2,'Davidramirez6','$2b$10$pJog2Zt2euFJf15UVxrhf.NHkckgLoknWXsS14nRNof/VR0a9dSAO','usuario'),(3,'Davidramirez7','$2b$10$t9RdPTlUkIqsQJhnJv5Jpe1SxaikuHTXWfi2CCVqgMXoDL/X4U5DC','usuario'),(5,'Davidramirez10','$2b$10$CtQHQ0nlf6Luc0678yhO2ugqatpPnsixLdujqOLP4eYdpoIX9ji0i','usuario'),(6,'Davidramirez11','$2b$10$M82qgql8W022btJqjbyRUeyE/Ke/2BHCsDx4Y7F8LU3OJ/8h4qFye','usuario'),(7,'Davidramirez20','$2b$10$ldSjg1Q64j6T5.k0YcWRjeRGcuehK9dxOWeWvpKKmhusfo5AAZMFu','usuario'),(8,'Davidramirez60','$2b$10$8EjOM2PIjN/Vw7aT9w8ruOgaOWwEH9cv1MzsHlcqfrNtw8.I4HZaC','usuario'),(9,'Davidramirez62','$2b$10$Idr3YjkZNsz.FoVQgHGrbuxGqpX1qbMTeqltbnkgaOeCvhDF3JCsy','usuario');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `vehiculos`
--

LOCK TABLES `vehiculos` WRITE;
/*!40000 ALTER TABLE `vehiculos` DISABLE KEYS */;
INSERT INTO `vehiculos` VALUES (1,'auto',1000,'efectivo','2024-11-12 04:37:25');
/*!40000 ALTER TABLE `vehiculos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-19 22:52:52

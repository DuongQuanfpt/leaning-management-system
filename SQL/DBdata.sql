-- MySQL dump 10.13  Distrib 8.0.13, for Win64 (x86_64)
--
-- Host: localhost    Database: learning-management-system
-- ------------------------------------------------------
-- Server version	8.0.13

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `class`
--

LOCK TABLES `class` WRITE;
/*!40000 ALTER TABLE `class` DISABLE KEYS */;
INSERT INTO `class` VALUES (1,NULL,'2022-10-07 23:15:04',NULL,'2022-10-07 23:15:04','SWP390','Web project','ACTIVE',19,7,5);
/*!40000 ALTER TABLE `class` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `class_user`
--

LOCK TABLES `class_user` WRITE;
/*!40000 ALTER TABLE `class_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `class_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `package`
--

LOCK TABLES `package` WRITE;
/*!40000 ALTER TABLE `package` DISABLE KEYS */;
/*!40000 ALTER TABLE `package` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `permission`
--

LOCK TABLES `permission` WRITE;
/*!40000 ALTER TABLE `permission` DISABLE KEYS */;
INSERT INTO `permission` VALUES (4,24,_binary '\0',_binary '\0',_binary '',_binary ''),(4,25,_binary '\0',_binary '\0',_binary '',_binary ''),(4,26,_binary '\0',_binary '\0',_binary '',_binary '\0'),(4,27,_binary '\0',_binary '\0',_binary '',_binary ''),(5,24,_binary '\0',_binary '\0',_binary '\0',_binary '\0'),(5,25,_binary '\0',_binary '\0',_binary '\0',_binary '\0'),(6,24,_binary '\0',_binary '\0',_binary '\0',_binary '\0'),(6,25,_binary '\0',_binary '\0',_binary '\0',_binary '\0'),(6,28,_binary '\0',_binary '\0',_binary '\0',_binary ''),(6,29,_binary '\0',_binary '\0',_binary '',_binary '\0'),(6,30,_binary '\0',_binary '\0',_binary '',_binary ''),(6,31,_binary '\0',_binary '\0',_binary '',_binary '\0'),(7,24,_binary '\0',_binary '\0',_binary '\0',_binary '\0'),(7,25,_binary '\0',_binary '\0',_binary '\0',_binary '\0'),(8,24,_binary '\0',_binary '\0',_binary '\0',_binary '\0'),(8,25,_binary '\0',_binary '\0',_binary '\0',_binary '\0');
/*!40000 ALTER TABLE `permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `setting`
--

LOCK TABLES `setting` WRITE;
/*!40000 ALTER TABLE `setting` DISABLE KEYS */;
INSERT INTO `setting` VALUES (1,NULL,'2022-10-07 23:15:03',NULL,'2022-10-07 23:15:03','contain setting for each screen in system',NULL,'System Screen','TYPE_SCREEN',NULL,NULL,NULL),(2,NULL,'2022-10-07 23:15:03',NULL,'2022-10-07 23:15:03','contain api link',NULL,'API','TYPE_API',NULL,NULL,NULL),(3,NULL,'2022-10-07 23:15:03',NULL,'2022-10-07 23:15:03','contain settings relate to user role',NULL,'User Role','TYPE_ROLE',NULL,NULL,NULL),(4,NULL,'2022-10-07 23:15:03',NULL,'2022-10-07 23:15:03','description for admin','1','admin','ROLE_ADMIN','1',NULL,3),(5,NULL,'2022-10-07 23:15:03',NULL,'2022-10-07 23:15:03','description for trainee','1','trainee','ROLE_TRAINEE','1',NULL,3),(6,NULL,'2022-10-07 23:15:03',NULL,'2022-10-07 23:15:03','description for manager','1','manager','ROLE_MANAGER','1',NULL,3),(7,NULL,'2022-10-07 23:15:03',NULL,'2022-10-07 23:15:03','description for supporter','1','supporter','ROLE_SUPPORTER','1',NULL,3),(8,NULL,'2022-10-07 23:15:03',NULL,'2022-10-07 23:15:03','description for trainer','1','trainer','ROLE_TRAINER','1',NULL,3),(9,NULL,'2022-10-07 23:15:03',NULL,'2022-10-07 23:15:03','description for expert','1','expert','ROLE_EXPERT','1',NULL,3),(10,NULL,'2022-10-07 23:15:03',NULL,'2022-10-07 23:15:03','type for test',NULL,'Test','TYPE_TEST',NULL,NULL,NULL),(11,NULL,'2022-10-07 23:15:03',NULL,'2022-10-07 23:15:03','description','1','Setting List ','/api/setting','1',24,2),(12,NULL,'2022-10-07 23:15:03',NULL,'2022-10-07 23:15:03','description ','1','Setting Filter','/api/setting-filter','1',24,2),(13,NULL,'2022-10-07 23:15:03',NULL,'2022-10-07 23:15:03','description ','1','Setting Status','/api/setting-status','1',24,2),(14,NULL,'2022-10-07 23:15:03',NULL,'2022-10-07 23:15:03','description ','1','Subject List','/api/subjects','1',28,2),(15,NULL,'2022-10-07 23:15:03',NULL,'2022-10-07 23:15:03','description ','1','Subject Status','/api/subjects-status','1',28,2),(16,NULL,'2022-10-07 23:15:03',NULL,'2022-10-07 23:15:03','description ','1','User List','/api/user','1',27,2),(17,NULL,'2022-10-07 23:15:03',NULL,'2022-10-07 23:15:03','description ','1','User Filter','/api/user-filter','1',27,2),(18,NULL,'2022-10-07 23:15:03',NULL,'2022-10-07 23:15:03','description ','1','User Status','/api/user-status','1',27,2),(19,NULL,'2022-10-07 23:15:03',NULL,'2022-10-07 23:15:03','description for test','2','test3','TEST3','0',NULL,10),(20,NULL,'2022-10-07 23:15:03',NULL,'2022-10-07 23:58:31','dfsfdfsfs','2','GRRRR 3','TEST4','0',NULL,10),(21,NULL,'2022-10-07 23:15:03',NULL,'2022-10-07 23:15:03','description','1','Dashboard ','/dashboard','1',NULL,1),(22,NULL,'2022-10-07 23:15:03',NULL,'2022-10-07 23:15:03','description','1','Profile  ','/profile','1',NULL,1),(23,NULL,'2022-10-07 23:15:03',NULL,'2022-10-07 23:15:03','description','1','ChangePassword   ','/change-password','1',NULL,1),(24,NULL,'2022-10-07 23:15:03',NULL,'2022-10-07 23:15:03','description','1','SettingList ','/setting-list','1',NULL,1),(25,NULL,'2022-10-07 23:15:03',NULL,'2022-10-07 23:15:03','description','1','SettingDetail','/setting-detail/:id','1',NULL,1),(26,NULL,'2022-10-07 23:15:03',NULL,'2022-10-07 23:15:03','description','1','UserDetail ','/user-detail/:id','1',NULL,1),(27,NULL,'2022-10-07 23:15:03',NULL,'2022-10-07 23:15:03','description','1','UserList','/user-list','1',NULL,1),(28,NULL,'2022-10-07 23:15:03',NULL,'2022-10-07 23:15:03','description','1','SubjectList','/subject-list','1',NULL,1),(29,NULL,'2022-10-07 23:15:03',NULL,'2022-10-07 23:15:03','description','1','SubjectDetail','/subject-detail/:id','1',NULL,1),(30,NULL,'2022-10-07 23:15:03',NULL,'2022-10-07 23:15:03','description','1','ClassList','/class-list','1',NULL,1),(31,NULL,'2022-10-07 23:15:03',NULL,'2022-10-07 23:15:03','description','1','ClassDetail','/class-detail/:id','1',NULL,1),(32,NULL,NULL,NULL,NULL,'API setting details','1','ApiSettingDetails','/api/setting-detail','1',25,2);
/*!40000 ALTER TABLE `setting` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `subject`
--

LOCK TABLES `subject` WRITE;
/*!40000 ALTER TABLE `subject` DISABLE KEYS */;
INSERT INTO `subject` VALUES (1,NULL,'LAB101','Lab Java','1',NULL,2),(2,NULL,'MAE203','Math','1',NULL,2),(3,NULL,'PRF192','Programming Fundamentals','1',NULL,6),(4,NULL,'PRO201','Front-end Web Development','1',NULL,6),(5,NULL,'JPD121','Elementary Japanese 1.2','1',NULL,2);
/*!40000 ALTER TABLE `subject` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,NULL,'2022-10-07 23:15:04',NULL,'2022-10-07 23:15:04',NULL,'xucxichbo@doivl.com',NULL,NULL,NULL,NULL,'$2a$10$G9Ju2dnNxBD.en./j1C7Vu0bcyhFcB.G7mQ.bkIn8jtsvWXj/oNHi','1'),(2,NULL,'2022-10-07 23:15:04',NULL,'2022-10-07 23:15:04',NULL,'quan1@doivl.com',NULL,NULL,NULL,NULL,'$2a$10$vKy59vg6SIktVAnlxoX9OuBNbZiOP0lWJJeFACxwK3KM2rnRLAPIK','1'),(3,NULL,'2022-10-07 23:15:04',NULL,'2022-10-07 23:15:04',NULL,'quan22@doivl.com',NULL,NULL,NULL,NULL,'$2a$10$V2knZSxoDgNhCFv9KSp/q.wQ5KWMITUduSCbCvmjrPinvJVncMI1O','1'),(4,NULL,'2022-10-07 23:15:04',NULL,'2022-10-07 23:15:04',NULL,'quan3@doivl.com',NULL,NULL,NULL,NULL,'$2a$10$sCybsiL5KbDTlNQ4uhvu5OLlFDhzpq2E6obsbjd1DjOkb6Keog8pS','1'),(5,NULL,'2022-10-07 23:15:04',NULL,'2022-10-07 23:15:04',NULL,'quan4@doivl.com',NULL,NULL,NULL,NULL,'$2a$10$GcGHU7u/hxqASlTmjIVnyeznmq6H.ahh88U.v8NwOsqW4pQHEnGii','1'),(6,NULL,'2022-10-07 23:15:04',NULL,'2022-10-07 23:15:04',NULL,'hoangnhhe141380@fpt.edu.vn',NULL,NULL,NULL,NULL,'$2a$10$.lzyRua4zLzBfPUssazey.rBZFFFW6MdoNt7n32tZsMRFKECNu1JC','1'),(7,NULL,'2022-10-07 23:15:04',NULL,'2022-10-07 23:15:04',NULL,'quan6@doivl.com',NULL,NULL,NULL,NULL,'$2a$10$/hwQssrnlxDprjFKo9129e6Jpv31/GNnRTUEJ5NBp.AERD5eIx7xe','1');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user_roles`
--

LOCK TABLES `user_roles` WRITE;
/*!40000 ALTER TABLE `user_roles` DISABLE KEYS */;
INSERT INTO `user_roles` VALUES (1,4),(1,5),(2,6),(3,7),(4,5),(5,8),(6,4),(6,6),(6,7),(6,8),(6,8),(7,9);
/*!40000 ALTER TABLE `user_roles` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-07 23:59:22

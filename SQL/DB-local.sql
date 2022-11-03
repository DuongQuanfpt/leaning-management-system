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
-- Table structure for table `assignment`
--

DROP TABLE IF EXISTS `assignment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `assignment` (
  `ass_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `ass_body` varchar(255) DEFAULT NULL,
  `eval_weight` varchar(255) DEFAULT NULL,
  `is_on_going` bit(1) DEFAULT NULL,
  `is_team_work` bit(1) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `subject_id` bigint(20) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_date` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`ass_id`),
  KEY `FKp1gsvxfhi4e5ek8pubhmnh6ol` (`subject_id`),
  CONSTRAINT `FKp1gsvxfhi4e5ek8pubhmnh6ol` FOREIGN KEY (`subject_id`) REFERENCES `subject` (`subject_id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assignment`
--

LOCK TABLES `assignment` WRITE;
/*!40000 ALTER TABLE `assignment` DISABLE KEYS */;
INSERT INTO `assignment` VALUES (1,'Students can do assignment about matrix at home','15%',_binary '',_binary '\0','1','matrix assignment',1,NULL,NULL,'quan1@doivl.com','2022-11-01 17:00:52.031000'),(2,'Students must complete 700 LOC','15%',_binary '',_binary '\0','1','Reach 700 LOC',1,NULL,NULL,NULL,NULL),(3,'Students can do assignment about matrix at home','10%',_binary '',_binary '\0','1','matrix assignment',2,NULL,NULL,NULL,NULL),(4,'Students can do assignment about matrix at home','15%',_binary '',_binary '\0','1','matrix assignment',1,NULL,NULL,'quan1@doivl.com','2022-11-01 17:02:32.897000'),(5,'Students can do assignment about matrix at home','15%',_binary '',_binary '\0','1','matrix assignment',2,'quan1@doivl.com','2022-11-01 17:04:15.192000','quan1@doivl.com','2022-11-01 17:11:08.988000'),(14,'Matrix 2 des','15%',_binary '\0',_binary '\0','1','Matrix 2',2,'hoangnhhe141380@fpt.edu.vn','2022-11-02 18:07:09.135000','hoangnhhe141380@fpt.edu.vn','2022-11-02 18:07:09.135000'),(24,'Matrix 3 des','20%',_binary '\0',_binary '','1','Matrix 3',2,'hoangnhhe141380@fpt.edu.vn','2022-11-02 18:07:16.575000','hoangnhhe141380@fpt.edu.vn','2022-11-02 19:07:45.192000');
/*!40000 ALTER TABLE `assignment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `assignment_eval_criteria_list`
--

DROP TABLE IF EXISTS `assignment_eval_criteria_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `assignment_eval_criteria_list` (
  `assignment_ass_id` bigint(20) NOT NULL,
  `eval_criteria_list_criteria_id` bigint(20) NOT NULL,
  UNIQUE KEY `UK_k09f6kr2kue6rn7je91hqd4ph` (`eval_criteria_list_criteria_id`),
  KEY `FKcub617ucli4jrcp1wcd74wkok` (`assignment_ass_id`),
  CONSTRAINT `FKcub617ucli4jrcp1wcd74wkok` FOREIGN KEY (`assignment_ass_id`) REFERENCES `assignment` (`ass_id`),
  CONSTRAINT `FKtqxb89rtvopnp1a7lxejabfai` FOREIGN KEY (`eval_criteria_list_criteria_id`) REFERENCES `eval_criteria` (`criteria_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assignment_eval_criteria_list`
--

LOCK TABLES `assignment_eval_criteria_list` WRITE;
/*!40000 ALTER TABLE `assignment_eval_criteria_list` DISABLE KEYS */;
/*!40000 ALTER TABLE `assignment_eval_criteria_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `class`
--

DROP TABLE IF EXISTS `class`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `class` (
  `class_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_date` datetime(6) DEFAULT NULL,
  `code` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `setting_branch_setting_id` bigint(20) DEFAULT NULL,
  `setting_term_setting_id` bigint(20) DEFAULT NULL,
  `subject_id` bigint(20) DEFAULT NULL,
  `user_supporter_user_id` bigint(20) DEFAULT NULL,
  `user_trainer_user_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`class_id`),
  UNIQUE KEY `UK_mtq71nmcpoqpxqvgklo7v06na` (`code`),
  KEY `FKa0huwpllqdwlr8qhtr7n9wvn` (`setting_branch_setting_id`),
  KEY `FKeflmvnyoj9c88otvv12q6snum` (`setting_term_setting_id`),
  KEY `FKh0eyrgvqpfux7dvr8elhhdaf6` (`subject_id`),
  KEY `FKidldf3knwm4u7q56g8cbm8dp1` (`user_supporter_user_id`),
  KEY `FK2nhu6kke1w1cumqbgp62r0x09` (`user_trainer_user_id`),
  CONSTRAINT `FK2nhu6kke1w1cumqbgp62r0x09` FOREIGN KEY (`user_trainer_user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FKa0huwpllqdwlr8qhtr7n9wvn` FOREIGN KEY (`setting_branch_setting_id`) REFERENCES `setting` (`setting_id`),
  CONSTRAINT `FKeflmvnyoj9c88otvv12q6snum` FOREIGN KEY (`setting_term_setting_id`) REFERENCES `setting` (`setting_id`),
  CONSTRAINT `FKh0eyrgvqpfux7dvr8elhhdaf6` FOREIGN KEY (`subject_id`) REFERENCES `subject` (`subject_id`),
  CONSTRAINT `FKidldf3knwm4u7q56g8cbm8dp1` FOREIGN KEY (`user_supporter_user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=125 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `class`
--

LOCK TABLES `class` WRITE;
/*!40000 ALTER TABLE `class` DISABLE KEYS */;
INSERT INTO `class` VALUES (1,NULL,NULL,'quan1@doivl.com','2022-10-19 12:50:50.414000','SE1230','Lop SE1230','1',84,54,1,24,1),(2,NULL,NULL,'quan1@doivl.com','2022-10-19 13:07:00.282000','abccc','     ','1',84,54,3,24,1),(3,NULL,NULL,NULL,NULL,'SE1208','Lop SE1208','1',74,44,1,14,3),(4,NULL,NULL,NULL,NULL,'SB1222','Lop SB1222','1',84,64,7,6,24),(5,NULL,NULL,'hoangnhhe141380@fpt.edu.vn','2022-10-18 07:05:50.799000','IA1502','Lop IA1502','1',74,54,3,24,5),(7,NULL,NULL,'hoangnhhe141380@fpt.edu.vn','2022-10-17 18:04:08.733000','HM1505','Lop HE1511','0',94,54,2,6,24),(8,NULL,NULL,NULL,NULL,'HE1511','Lop HE1511','0',84,64,1,2,1),(9,NULL,NULL,'quan22@doivl.com','2022-10-17 18:41:44.160000','SE1501','Lop SE1501c','1',94,64,7,3,24),(10,NULL,NULL,NULL,NULL,'SB1411','Lop SB1411','1',84,54,2,3,5),(11,NULL,NULL,NULL,NULL,'SE1428','Lop SE1428','1',74,54,1,2,14),(12,NULL,NULL,NULL,NULL,'SE1506','Lop SE1506','1',84,44,2,24,5),(124,'hoangnhhe141380@fpt.edu.vn','2022-10-19 14:10:40.401000','hoangnhhe141380@fpt.edu.vn','2022-10-19 14:10:40.401000','PB1231','sadfasdf','0',74,44,44,3,6);
/*!40000 ALTER TABLE `class` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `class_setting`
--

DROP TABLE IF EXISTS `class_setting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `class_setting` (
  `class_setting_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `display_order` varchar(255) DEFAULT NULL,
  `setting_title` varchar(255) DEFAULT NULL,
  `setting_value` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `class_id` bigint(20) DEFAULT NULL,
  `type_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`class_setting_id`),
  KEY `FKfp1ke91vftddcvny9f1uyfnmy` (`class_id`),
  KEY `FKdpj05ced45tidkwjs1v1a5s3x` (`type_id`),
  CONSTRAINT `FKdpj05ced45tidkwjs1v1a5s3x` FOREIGN KEY (`type_id`) REFERENCES `setting` (`setting_id`),
  CONSTRAINT `FKfp1ke91vftddcvny9f1uyfnmy` FOREIGN KEY (`class_id`) REFERENCES `class` (`class_id`)
) ENGINE=InnoDB AUTO_INCREMENT=332 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `class_setting`
--

LOCK TABLES `class_setting` WRITE;
/*!40000 ALTER TABLE `class_setting` DISABLE KEYS */;
INSERT INTO `class_setting` VALUES (14,NULL,NULL,NULL,NULL,'description for task 1','2','Evaluate','Evaluate','0',1,534),(24,NULL,NULL,NULL,NULL,'description for defect 1','1','Live meeting','Meeting','1',1,534),(34,NULL,NULL,NULL,NULL,'Q&a description 1','1','SE1320 Q&A','Q&a 1','1',5,534),(44,NULL,NULL,NULL,NULL,'idk','','Cancelled','Cancelled','1',1,544),(54,NULL,NULL,NULL,NULL,'idk','','Delayed','Delayed','1',1,544),(64,NULL,NULL,NULL,NULL,'Description for slot 01','2','SE1501 slot','Slot 01','0',5,280),(74,'','0000-00-00 00:00:00','','0000-00-00 00:00:00','Basic Java','2','SE1501 slot','Slot 02','1',9,280),(84,'','0000-00-00 00:00:00','','0000-00-00 00:00:00','Exercises','2','SE1501 slot','Slot 03','1',9,280),(94,'','0000-00-00 00:00:00','','0000-00-00 00:00:00','If else statement','2','SE1501 slot','Slot 04','1',9,280),(104,'','0000-00-00 00:00:00','','0000-00-00 00:00:00','Complete homewỏk','2','SE1501 Task','task value','1',9,534),(114,'','0000-00-00 00:00:00','hoangnhhe141380@fpt.edu.vn','2022-10-22 12:31:09','Doing excercises at class','2','IA1502 Task','Task','0',5,534),(124,'','0000-00-00 00:00:00','','0000-00-00 00:00:00','Introduction','2','IA1502 Slot','Slot 1','1',5,280),(134,'','0000-00-00 00:00:00','hoangnhhe141380@fpt.edu.vn','2022-10-22 12:30:44','Matrix introduction2','2','IA1502 Slot','Slot 2','1',5,280),(144,'','0000-00-00 00:00:00','hoangnhhe141380@fpt.edu.vn','2022-10-22 08:52:07','Matrix Exercise','2','IA1502 Slot','Slot 3','0',5,280),(154,'','0000-00-00 00:00:00','','0000-00-00 00:00:00','Algorithm introduction','2','IA1502 Slot','Slot 4','0',5,280),(164,'','0000-00-00 00:00:00','','0000-00-00 00:00:00','Q&A with student about matrix','1','IA1502 Q&A','Q&A','1',5,534),(174,'','0000-00-00 00:00:00','hoangnhhe141380@fpt.edu.vn','2022-10-22 12:32:57','Doing progress test 1','1','IA1502 To do','Todo','1',5,544),(184,'','0000-00-00 00:00:00','','0000-00-00 00:00:00','Complete exercise at home','1','IA1502 Doing','doing','1',5,544),(194,'quan1@doivl.com','2022-10-22 15:25:34','quan1@doivl.com','2022-10-22 15:25:34','Description for slot 01','2','SE1501 slot','Slot 01','0',9,280),(204,'hoangnhhe141380@fpt.edu.vn','2022-10-22 15:35:55','hoangnhhe141380@fpt.edu.vn','2022-10-22 15:35:55','','1','Cobug','Select Value','0',4,534),(214,'vietnqhe140773@gmail.com','2022-10-24 04:56:46','vietnqhe140773@gmail.com','2022-10-24 04:56:46','','1','a','b','0',1,280),(224,'vietnqhe140773@gmail.com','2022-10-24 04:58:44','vietnqhe140773@gmail.com','2022-10-24 04:58:44','','1','a','b','0',1,280),(234,'','0000-00-00 00:00:00','','0000-00-00 00:00:00','','2','SE1501 slot','Slot 05','0',9,280),(244,'','0000-00-00 00:00:00','','0000-00-00 00:00:00','','2','SE1501 slot','Slot 06','0',9,280),(254,'','0000-00-00 00:00:00','','0000-00-00 00:00:00','','2','SE1501 slot','Slot 07','0',9,280),(264,'','0000-00-00 00:00:00','','0000-00-00 00:00:00','','2','SE1501 slot','Slot 08','0',9,280),(274,'','0000-00-00 00:00:00','','0000-00-00 00:00:00','','2','SE1501 slot','Slot 09','0',9,280),(284,'','0000-00-00 00:00:00','','0000-00-00 00:00:00','','2','SE1501 slot','Slot 10','0',9,280),(294,'','0000-00-00 00:00:00','','0000-00-00 00:00:00','','2','SE1501 slot','Slot 11','0',9,280),(304,'','0000-00-00 00:00:00','','0000-00-00 00:00:00','','2','SE1501 slot','Slot 12','0',9,280),(314,'','0000-00-00 00:00:00','','0000-00-00 00:00:00','','2','SE1501 slot','Slot 13','0',9,280),(324,'','0000-00-00 00:00:00','','0000-00-00 00:00:00','','2','SE1501 slot','Slot 14','0',9,280),(325,NULL,NULL,NULL,NULL,'Task of SE1501','3','Task','Task','1',12,534),(326,NULL,NULL,NULL,NULL,'Defect of SE1501','4','Defect','Defect','1',12,534),(327,NULL,NULL,NULL,NULL,'Q&A of SE1501','5','Q&A','Q&A','1',12,534),(328,NULL,NULL,NULL,NULL,'Work in progress','6','WIP','WIP','1',12,534),(329,NULL,NULL,NULL,NULL,'Done status','7','Done','Done','1',12,544),(330,NULL,NULL,NULL,NULL,'Waiting for review status','8','Review Pending','Review Pending','1',12,544),(331,NULL,NULL,NULL,NULL,'Doing status','9','Doing','Doing','1',12,544);
/*!40000 ALTER TABLE `class_setting` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `class_user`
--

DROP TABLE IF EXISTS `class_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `class_user` (
  `class_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `dropout_date` date DEFAULT NULL,
  `final_eval` varchar(255) DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  `ongoing_eval` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `topic_eval` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`class_id`,`user_id`),
  KEY `FKt965l5m9twycbgm4wc88x5tlb` (`user_id`),
  CONSTRAINT `FKmxw4wosuc6cmjt76so5c7hmto` FOREIGN KEY (`class_id`) REFERENCES `class` (`class_id`),
  CONSTRAINT `FKt965l5m9twycbgm4wc88x5tlb` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `class_user`
--

LOCK TABLES `class_user` WRITE;
/*!40000 ALTER TABLE `class_user` DISABLE KEYS */;
INSERT INTO `class_user` VALUES (1,1,'2022-10-12','','note 13','','1',''),(1,14,NULL,'','note 2','','1',''),(1,24,'2022-10-19','','note 32','','1',''),(1,34,'2022-10-11','','note 4','','1',''),(1,44,NULL,'','note 5','','1',''),(1,194,NULL,NULL,NULL,NULL,'0',NULL),(1,204,NULL,NULL,NULL,NULL,'1',NULL),(2,1,NULL,'','note 6','','1',''),(2,4,NULL,'','note 7','','0',''),(2,6,NULL,'','note 8','','1',''),(2,14,'2022-10-18','','note 9','','-1',''),(2,44,NULL,'','note 10','','1',''),(3,1,NULL,'','note 11','','1',''),(3,4,NULL,'','note 12','','1',''),(3,6,'2022-10-14','','note 13','','-1',''),(3,14,'2022-10-21','','note 14','','-1',''),(3,34,'2022-10-21','','note 15','','1',''),(4,44,NULL,'','note 16','','1',''),(9,44,NULL,NULL,'note17',NULL,'1',NULL),(12,224,NULL,NULL,NULL,NULL,'0',NULL),(12,234,NULL,NULL,NULL,NULL,'0',NULL),(12,244,NULL,NULL,NULL,NULL,'0',NULL),(12,254,NULL,NULL,NULL,NULL,'0',NULL),(12,264,NULL,NULL,NULL,NULL,'0',NULL),(12,274,NULL,NULL,NULL,NULL,'0',NULL),(12,284,NULL,NULL,NULL,NULL,'0',NULL),(12,294,NULL,NULL,NULL,NULL,'0',NULL),(12,304,NULL,NULL,NULL,NULL,'0',NULL),(12,314,NULL,NULL,NULL,NULL,'0',NULL),(12,324,NULL,NULL,NULL,NULL,'0',NULL),(12,334,NULL,NULL,NULL,NULL,'0',NULL),(12,344,NULL,NULL,NULL,NULL,'0',NULL);
/*!40000 ALTER TABLE `class_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `eval_criteria`
--

DROP TABLE IF EXISTS `eval_criteria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `eval_criteria` (
  `criteria_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `criteria_name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `eval_weight` varchar(255) DEFAULT NULL,
  `expected_work` varchar(255) DEFAULT NULL,
  `is_team_eval` bit(1) NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  `ass_id` bigint(20) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_date` datetime(6) DEFAULT NULL,
  `milestone_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`criteria_id`),
  KEY `FK6u4cby2sx5ji9xqd75r3nh38d` (`ass_id`),
  KEY `FKsp0nsploous3rb2klu7o5jttb` (`milestone_id`),
  CONSTRAINT `FK6u4cby2sx5ji9xqd75r3nh38d` FOREIGN KEY (`ass_id`) REFERENCES `assignment` (`ass_id`),
  CONSTRAINT `FKsp0nsploous3rb2klu7o5jttb` FOREIGN KEY (`milestone_id`) REFERENCES `milestone` (`milestone_id`)
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eval_criteria`
--

LOCK TABLES `eval_criteria` WRITE;
/*!40000 ALTER TABLE `eval_criteria` DISABLE KEYS */;
INSERT INTO `eval_criteria` VALUES (1,'Students code 2','Students code programs like requirements1','99%','Students must completed programs exactly like requirements1',_binary '','1',1,NULL,NULL,NULL,NULL,NULL),(2,'Teacher review code1','Teacher check code with requirements123','25%','Teacher must check programs are passed all case123',_binary '','1',1,NULL,NULL,NULL,NULL,NULL),(3,'Students submit','Students submit code to system','5%','Students must submit successfully ',_binary '','0',1,NULL,NULL,NULL,NULL,NULL),(4,'Students code','Students code programs like requirements','5%','Students must completed programs exactly like requirements',_binary '','0',2,NULL,NULL,NULL,NULL,NULL),(5,'Teacher review code','Teacher check code with requirements','5%','Teacher must check programs are passed all case',_binary '','1',2,NULL,NULL,NULL,NULL,NULL),(6,'Students submit','Students submit code to system','5%','Students must submit successfully ',_binary '','0',2,NULL,NULL,NULL,NULL,NULL),(14,'Students code','Students code programs like requirements','5%','Students must completed programs exactly like requirements',_binary '','1',1,NULL,NULL,NULL,NULL,NULL),(24,'Teacher review code','Teacher check code with requirementsOK','10%','Teacher must check programs are passed all caseOK',_binary '','1',2,NULL,NULL,NULL,NULL,NULL),(34,'Test1','must attendance full','5%','must attendance full',_binary '','1',3,NULL,NULL,NULL,NULL,NULL),(44,'Test1','must attendance full','5%','must attendance full',_binary '','1',3,NULL,NULL,NULL,NULL,NULL),(54,'Students code','Students code programs like requirements','5%','Students must completed programs exactly like requirements',_binary '','0',2,NULL,NULL,NULL,NULL,NULL),(64,'Students submit123','Students submit code to system','6%','Students must submit successfully ',_binary '','1',2,NULL,NULL,NULL,NULL,NULL),(84,'FE','FE','40%','FE',_binary '','0',14,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `eval_criteria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `group_member`
--

DROP TABLE IF EXISTS `group_member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `group_member` (
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_date` datetime(6) DEFAULT NULL,
  `is_active` bit(1) DEFAULT NULL,
  `is_leader` bit(1) DEFAULT NULL,
  `group_group_id` bigint(20) NOT NULL,
  `member_user_id` bigint(20) NOT NULL,
  PRIMARY KEY (`group_group_id`,`member_user_id`),
  KEY `FK8jfgcouo6lr2ybpjxaticsw0m` (`member_user_id`),
  CONSTRAINT `FK8jfgcouo6lr2ybpjxaticsw0m` FOREIGN KEY (`member_user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FK9f2c1gok8tcfajepaxdr4b4ob` FOREIGN KEY (`group_group_id`) REFERENCES `group_tbl` (`group_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `group_member`
--

LOCK TABLES `group_member` WRITE;
/*!40000 ALTER TABLE `group_member` DISABLE KEYS */;
INSERT INTO `group_member` VALUES ('quan1@doivl.com','2022-11-02 23:32:48.620000','quan1@doivl.com','2022-11-02 23:32:48.620000',_binary '',_binary '',114,1),('quan1@doivl.com','2022-11-03 00:37:21.048000','quan1@doivl.com','2022-11-03 00:37:21.048000',_binary '',_binary '',124,4),('vietnqhe140773@gmail.com','2022-11-02 17:47:10.205000','vietnqhe140773@gmail.com','2022-11-02 18:08:20.365000',_binary '',_binary '\0',144,1),('vietnqhe140773@gmail.com','2022-11-02 17:47:45.473000','vietnqhe140773@gmail.com','2022-11-02 18:08:20.364000',_binary '',_binary '',144,14),('quan4@doivl.com','2022-11-02 18:05:17.969000','quan4@doivl.com','2022-11-02 18:05:17.969000',_binary '\0',_binary '\0',174,234),('quan4@doivl.com','2022-11-02 18:05:17.966000','quan4@doivl.com','2022-11-02 18:05:17.966000',_binary '\0',_binary '\0',174,264),('quan4@doivl.com','2022-11-02 18:05:17.958000','quan4@doivl.com','2022-11-02 18:05:17.958000',_binary '\0',_binary '',174,274),('quan4@doivl.com','2022-11-02 18:05:17.963000','quan4@doivl.com','2022-11-02 18:05:17.963000',_binary '\0',_binary '\0',174,314),('quan4@doivl.com','2022-11-02 18:05:17.975000','quan4@doivl.com','2022-11-02 18:05:17.975000',_binary '\0',_binary '\0',184,244),('quan4@doivl.com','2022-11-02 18:05:17.972000','quan4@doivl.com','2022-11-02 18:05:17.972000',_binary '\0',_binary '',184,254),('quan4@doivl.com','2022-11-02 18:05:17.978000','quan4@doivl.com','2022-11-02 18:05:17.978000',_binary '\0',_binary '\0',184,294),('quan4@doivl.com','2022-11-02 18:05:17.986000','quan4@doivl.com','2022-11-02 18:05:17.986000',_binary '\0',_binary '\0',194,224),('quan4@doivl.com','2022-11-02 18:05:17.981000','quan4@doivl.com','2022-11-02 18:05:17.981000',_binary '\0',_binary '',194,284),('quan4@doivl.com','2022-11-02 18:05:17.983000','quan4@doivl.com','2022-11-02 18:05:17.983000',_binary '\0',_binary '\0',194,304),('quan1@doivl.com','2022-11-03 07:27:55.278000','quan1@doivl.com','2022-11-03 07:27:55.278000',_binary '\0',_binary '',244,224);
/*!40000 ALTER TABLE `group_member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `group_tbl`
--

DROP TABLE IF EXISTS `group_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `group_tbl` (
  `group_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_date` datetime(6) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `group_code` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `topic_name` varchar(255) DEFAULT NULL,
  `class_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`group_id`),
  KEY `FKjx9ivqp2tjb4x1ctjxokkcfs9` (`class_id`),
  CONSTRAINT `FKjx9ivqp2tjb4x1ctjxokkcfs9` FOREIGN KEY (`class_id`) REFERENCES `class` (`class_id`)
) ENGINE=InnoDB AUTO_INCREMENT=245 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `group_tbl`
--

LOCK TABLES `group_tbl` WRITE;
/*!40000 ALTER TABLE `group_tbl` DISABLE KEYS */;
INSERT INTO `group_tbl` VALUES (114,'quan1@doivl.com','2022-11-02 23:32:48.489000','quan1@doivl.com','2022-11-02 23:32:48.489000','group 6','group 6','1','TEST2',3),(124,'quan1@doivl.com','2022-11-03 00:37:19.750000','quan1@doivl.com','2022-11-03 00:37:19.750000','group 6','group 6','1','TEST2',3),(144,'vietnqhe140773@gmail.com','2022-11-02 17:46:49.007000','vietnqhe140773@gmail.com','2022-11-02 17:46:49.007000','g2','g2','1','t2',1),(174,'quan4@doivl.com','2022-11-02 18:05:17.877000','quan4@doivl.com','2022-11-02 18:05:17.877000','','G1','1','Topic 1',12),(184,'quan4@doivl.com','2022-11-02 18:05:17.888000','quan4@doivl.com','2022-11-02 18:05:17.888000','','G2','1','Topic 2',12),(194,'quan4@doivl.com','2022-11-02 18:05:17.892000','quan4@doivl.com','2022-11-02 18:05:17.892000','','G3','1','Topic 3',12),(244,'quan1@doivl.com','2022-11-03 07:27:55.150000','quan1@doivl.com','2022-11-03 07:27:55.150000','group 6','group 6','1','TEST2',12);
/*!40000 ALTER TABLE `group_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `issue_tbl`
--

DROP TABLE IF EXISTS `issue_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `issue_tbl` (
  `issue_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_date` datetime(6) DEFAULT NULL,
  `deadline` date DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `is_closed` bit(1) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `asignee_id` bigint(20) DEFAULT NULL,
  `author_id` bigint(20) DEFAULT NULL,
  `class_id` bigint(20) DEFAULT NULL,
  `group_id` bigint(20) DEFAULT NULL,
  `milestone_id` bigint(20) DEFAULT NULL,
  `status_id` bigint(20) DEFAULT NULL,
  `type_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`issue_id`),
  KEY `FKdocj47ssqy0lyq594vqn7t5y4` (`asignee_id`),
  KEY `FK48winckjudv0nkwkenq4dq8l` (`author_id`),
  KEY `FKk0b9qk0cfnbfo693qu5aarpl4` (`class_id`),
  KEY `FKdcmkgwap4n2h4tdm6f3ov0odx` (`group_id`),
  KEY `FKgg0gdjddp1847wscsxb8jvvrd` (`milestone_id`),
  KEY `FKk5cvieekhq7dskoxo79l5112h` (`status_id`),
  KEY `FK27s4gopce6pqysl1v76kehypc` (`type_id`),
  CONSTRAINT `FK27s4gopce6pqysl1v76kehypc` FOREIGN KEY (`type_id`) REFERENCES `class_setting` (`class_setting_id`),
  CONSTRAINT `FK48winckjudv0nkwkenq4dq8l` FOREIGN KEY (`author_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FKdcmkgwap4n2h4tdm6f3ov0odx` FOREIGN KEY (`group_id`) REFERENCES `group_tbl` (`group_id`),
  CONSTRAINT `FKdocj47ssqy0lyq594vqn7t5y4` FOREIGN KEY (`asignee_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FKgg0gdjddp1847wscsxb8jvvrd` FOREIGN KEY (`milestone_id`) REFERENCES `milestone` (`milestone_id`),
  CONSTRAINT `FKk0b9qk0cfnbfo693qu5aarpl4` FOREIGN KEY (`class_id`) REFERENCES `class` (`class_id`),
  CONSTRAINT `FKk5cvieekhq7dskoxo79l5112h` FOREIGN KEY (`status_id`) REFERENCES `class_setting` (`class_setting_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `issue_tbl`
--

LOCK TABLES `issue_tbl` WRITE;
/*!40000 ALTER TABLE `issue_tbl` DISABLE KEYS */;
INSERT INTO `issue_tbl` VALUES (1,NULL,NULL,NULL,NULL,'2022-11-04','Description',_binary '','Code BE : ko xong thi chet',254,254,12,194,44,331,325),(2,NULL,NULL,NULL,NULL,'2022-11-05','Description',_binary '\0','Code FE : ',264,244,12,174,44,330,325),(3,NULL,NULL,NULL,NULL,'2022-11-05','Description',_binary '\0','Bug BE : request return 500',254,244,12,194,44,330,326),(4,NULL,NULL,NULL,NULL,'2022-11-05','Description',_binary '\0','Doc Review',254,264,12,194,54,329,327),(6,NULL,NULL,NULL,NULL,NULL,NULL,_binary '\0','General issue 1',254,264,12,244,NULL,330,326),(7,NULL,NULL,NULL,NULL,NULL,'Description',_binary '','General issue 2',14,14,1,NULL,NULL,44,14);
/*!40000 ALTER TABLE `issue_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `milestone`
--

DROP TABLE IF EXISTS `milestone`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `milestone` (
  `milestone_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_date` datetime(6) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `from_date` date DEFAULT NULL,
  `status` bit(1) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `to_date` date DEFAULT NULL,
  `ass_id` bigint(20) DEFAULT NULL,
  `class_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`milestone_id`),
  UNIQUE KEY `UK_o2ipg0xqpr8mbb3hklwbod09y` (`ass_id`),
  KEY `FKodyoxmk0w776nvo4n66wyudev` (`class_id`),
  CONSTRAINT `FKd7oqvs9p3pey4678iqt66ll1y` FOREIGN KEY (`ass_id`) REFERENCES `assignment` (`ass_id`),
  CONSTRAINT `FKodyoxmk0w776nvo4n66wyudev` FOREIGN KEY (`class_id`) REFERENCES `class` (`class_id`)
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `milestone`
--

LOCK TABLES `milestone` WRITE;
/*!40000 ALTER TABLE `milestone` DISABLE KEYS */;
INSERT INTO `milestone` VALUES (39,'quan1@doivl.com','2022-10-30 17:09:54.014000','quan1@doivl.com','2022-10-31 11:21:33.920000','CCCCCCCCCC','2000-12-29',_binary '\0','Test Milestone B','2020-12-29',4,1),(41,'quan1@doivl.com','2022-10-31 10:35:53.787000','quan1@doivl.com','2022-10-31 22:16:15.229000','CCCCCCCCCC','2000-12-29',_binary '\0','Test Milestone B','2020-12-29',1,1),(42,'quan1@doivl.com','2022-11-01 17:10:43.916000','quan1@doivl.com','2022-11-01 17:11:08.988000','Indi des','2022-11-01',_binary '\0','Indi','2022-11-01',5,3),(44,'quan4@doivl.com','2022-11-02 17:53:48.520000','quan4@doivl.com','2022-11-02 18:06:03.494000','Matrix 1 des','2022-11-03',_binary '','Matrix 1','2022-11-03',3,12),(54,'quan4@doivl.com','2022-11-02 18:08:37.207000','quan4@doivl.com','2022-11-02 18:08:37.233000','Matrix 2 mil des','2022-11-03',_binary '\0','Matrix 2 mil title','2022-11-03',14,12),(64,'quan4@doivl.com','2022-11-02 18:08:45.007000','quan4@doivl.com','2022-11-02 18:51:29.820000','Matrix 3 mil des','2022-11-03',_binary '\0','Matrix 3 mil title','2022-11-03',24,12);
/*!40000 ALTER TABLE `milestone` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permission`
--

DROP TABLE IF EXISTS `permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `permission` (
  `role_id` bigint(20) NOT NULL,
  `screen_id` bigint(20) NOT NULL,
  `can_add` bit(1) DEFAULT NULL,
  `can_delete` bit(1) DEFAULT NULL,
  `can_edit` bit(1) DEFAULT NULL,
  `get_all_data` bit(1) DEFAULT NULL,
  PRIMARY KEY (`role_id`,`screen_id`),
  KEY `FKq08sawwu420t1x8w1d9ri9nyq` (`screen_id`),
  CONSTRAINT `FKn3pl49a555fbcdhl5nhbdtfo7` FOREIGN KEY (`role_id`) REFERENCES `setting` (`setting_id`),
  CONSTRAINT `FKq08sawwu420t1x8w1d9ri9nyq` FOREIGN KEY (`screen_id`) REFERENCES `setting` (`setting_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permission`
--

LOCK TABLES `permission` WRITE;
/*!40000 ALTER TABLE `permission` DISABLE KEYS */;
INSERT INTO `permission` VALUES (4,24,_binary '\0',_binary '\0',_binary '',_binary ''),(4,25,_binary '\0',_binary '\0',_binary '',_binary ''),(4,26,_binary '\0',_binary '\0',_binary '',_binary ''),(4,27,_binary '\0',_binary '\0',_binary '',_binary ''),(4,28,_binary '\0',_binary '\0',_binary '',_binary ''),(4,29,_binary '\0',_binary '\0',_binary '',_binary ''),(5,24,_binary '\0',_binary '\0',_binary '\0',_binary '\0'),(5,25,_binary '\0',_binary '\0',_binary '\0',_binary '\0'),(5,26,_binary '\0',_binary '\0',_binary '\0',_binary '\0'),(5,27,_binary '\0',_binary '\0',_binary '\0',_binary '\0'),(5,28,_binary '\0',_binary '\0',_binary '\0',_binary '\0'),(6,24,_binary '\0',_binary '\0',_binary '\0',_binary '\0'),(6,25,_binary '\0',_binary '\0',_binary '\0',_binary '\0'),(6,26,_binary '\0',_binary '\0',_binary '\0',_binary '\0'),(6,27,_binary '\0',_binary '\0',_binary '\0',_binary '\0'),(6,28,_binary '\0',_binary '\0',_binary '',_binary ''),(6,29,_binary '\0',_binary '\0',_binary '',_binary ''),(6,30,_binary '\0',_binary '\0',_binary '',_binary ''),(6,31,_binary '\0',_binary '\0',_binary '',_binary ''),(7,24,_binary '\0',_binary '\0',_binary '\0',_binary '\0'),(7,25,_binary '\0',_binary '\0',_binary '\0',_binary '\0'),(7,26,_binary '\0',_binary '\0',_binary '\0',_binary '\0'),(7,27,_binary '\0',_binary '\0',_binary '\0',_binary '\0'),(7,28,_binary '\0',_binary '\0',_binary '\0',_binary '\0'),(7,30,_binary '\0',_binary '\0',_binary '',_binary ''),(7,31,_binary '\0',_binary '\0',_binary '',_binary ''),(7,244,_binary '\0',_binary '\0',_binary '',_binary ''),(7,254,_binary '\0',_binary '\0',_binary '',_binary ''),(8,24,_binary '\0',_binary '\0',_binary '\0',_binary '\0'),(8,25,_binary '\0',_binary '\0',_binary '\0',_binary '\0'),(8,26,_binary '\0',_binary '\0',_binary '\0',_binary '\0'),(8,27,_binary '\0',_binary '\0',_binary '\0',_binary '\0'),(8,28,_binary '\0',_binary '\0',_binary '\0',_binary '\0'),(8,30,_binary '\0',_binary '\0',_binary '\0',_binary ''),(8,31,_binary '\0',_binary '\0',_binary '\0',_binary '');
/*!40000 ALTER TABLE `permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schedule`
--

DROP TABLE IF EXISTS `schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `schedule` (
  `schedule_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_date` datetime(6) DEFAULT NULL,
  `from_time` time DEFAULT NULL,
  `status` bit(1) DEFAULT NULL,
  `to_time` time DEFAULT NULL,
  `training_date` date DEFAULT NULL,
  `module_id` bigint(20) DEFAULT NULL,
  `class_id` bigint(20) DEFAULT NULL,
  `room_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`schedule_id`),
  KEY `FK60xg4jvuwici9qugyyr45ktgf` (`module_id`),
  KEY `FKqqv2rqy5xxw2oyhie35seyclw` (`class_id`),
  KEY `FKbe4um70jjtrh25fo6kmxscl18` (`room_id`),
  CONSTRAINT `FK60xg4jvuwici9qugyyr45ktgf` FOREIGN KEY (`module_id`) REFERENCES `class_setting` (`class_setting_id`),
  CONSTRAINT `FKbe4um70jjtrh25fo6kmxscl18` FOREIGN KEY (`room_id`) REFERENCES `setting` (`setting_id`),
  CONSTRAINT `FKqqv2rqy5xxw2oyhie35seyclw` FOREIGN KEY (`class_id`) REFERENCES `class` (`class_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schedule`
--

LOCK TABLES `schedule` WRITE;
/*!40000 ALTER TABLE `schedule` DISABLE KEYS */;
INSERT INTO `schedule` VALUES (1,NULL,NULL,NULL,NULL,'09:00:00',_binary '','10:40:00','2022-10-27',214,1,644),(2,NULL,NULL,NULL,NULL,'12:50:00',_binary '','14:20:00','2022-10-24',64,9,654),(3,NULL,NULL,NULL,NULL,'14:30:00',_binary '','16:10:00','2022-10-28',74,9,654),(4,NULL,NULL,NULL,NULL,'14:30:00',_binary '\0','16:00:00','2022-10-29',224,1,644);
/*!40000 ALTER TABLE `schedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `setting`
--

DROP TABLE IF EXISTS `setting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `setting` (
  `setting_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_date` datetime(6) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `display_order` varchar(255) DEFAULT NULL,
  `setting_title` varchar(255) DEFAULT NULL,
  `setting_value` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `screen_id` bigint(20) DEFAULT NULL,
  `type_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`setting_id`),
  UNIQUE KEY `UK_3e4tk32iq98it81o0q40h5r1d` (`setting_value`),
  KEY `FKf0djegitn7cetorr7upxwc3vt` (`screen_id`),
  KEY `FKgd88q3lg873hfpg9vkjew3dvr` (`type_id`),
  CONSTRAINT `FKf0djegitn7cetorr7upxwc3vt` FOREIGN KEY (`screen_id`) REFERENCES `setting` (`setting_id`),
  CONSTRAINT `FKgd88q3lg873hfpg9vkjew3dvr` FOREIGN KEY (`type_id`) REFERENCES `setting` (`setting_id`)
) ENGINE=InnoDB AUTO_INCREMENT=705 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `setting`
--

LOCK TABLES `setting` WRITE;
/*!40000 ALTER TABLE `setting` DISABLE KEYS */;
INSERT INTO `setting` VALUES (1,NULL,'2022-10-07 23:15:03.000000',NULL,'2022-10-07 23:15:03.000000','contain setting for each screen in system',NULL,'System Screen','TYPE_SCREEN',NULL,NULL,NULL),(2,NULL,'2022-10-07 23:15:03.000000',NULL,'2022-10-07 23:15:03.000000','contain api link',NULL,'API','TYPE_API',NULL,NULL,NULL),(3,NULL,'2022-10-07 23:15:03.000000',NULL,'2022-10-07 23:15:03.000000','contain settings relate to user role',NULL,'User Role','TYPE_ROLE',NULL,NULL,NULL),(4,NULL,'2022-10-07 23:15:03.000000',NULL,'2022-10-09 05:25:19.000000','admin12','2','admin','ROLE_ADMIN','1',NULL,3),(5,NULL,'2022-10-07 23:15:03.000000',NULL,'2022-10-09 05:52:04.000000','trainee','1000000000000000000000000000000000000000000000000','trainee','ROLE_TRAINEE','1',NULL,3),(6,NULL,'2022-10-07 23:15:03.000000',NULL,'2022-10-07 23:15:03.000000','description for manager','1','manager','ROLE_MANAGER','1',NULL,3),(7,NULL,'2022-10-07 23:15:03.000000',NULL,'2022-10-08 14:29:14.000000','description for supporter','1','supporter','ROLE_SUPPORTER','1',NULL,3),(8,NULL,'2022-10-07 23:15:03.000000',NULL,'2022-10-07 23:15:03.000000','description for trainer','1','trainer','ROLE_TRAINER','1',NULL,3),(9,NULL,'2022-10-07 23:15:03.000000',NULL,'2022-10-07 23:15:03.000000','description for expert','1','expert','ROLE_EXPERT','1',NULL,3),(10,NULL,'2022-10-07 23:15:03.000000',NULL,'2022-10-07 23:15:03.000000','type for test',NULL,'Test','TYPE_TEST',NULL,NULL,NULL),(11,NULL,'2022-10-07 23:15:03.000000',NULL,'2022-10-07 23:15:03.000000','description','1','Setting List ','/api/setting','1',24,2),(12,NULL,'2022-10-07 23:15:03.000000',NULL,'2022-10-07 23:15:03.000000','description ','1','Setting Filter','/api/setting-filter','1',24,2),(13,NULL,'2022-10-07 23:15:03.000000',NULL,'2022-10-07 23:15:03.000000','description ','1','Setting Status','/api/setting-status','1',24,2),(14,NULL,'2022-10-07 23:15:03.000000',NULL,'2022-10-07 23:15:03.000000','description ','1','Subject List','/api/subjects','1',28,2),(15,NULL,'2022-10-07 23:15:03.000000',NULL,'2022-10-07 23:15:03.000000','description ','1','Subject Status','/api/subjects-status','1',28,2),(16,NULL,'2022-10-07 23:15:03.000000',NULL,'2022-10-07 23:15:03.000000','description ','1','User List','/api/user','1',27,2),(17,NULL,'2022-10-07 23:15:03.000000',NULL,'2022-10-07 23:15:03.000000','description ','1','User Filter','/api/user-filter','1',27,2),(18,NULL,'2022-10-07 23:15:03.000000',NULL,'2022-10-07 23:15:03.000000','description ','1','User Status','/api/user-status','1',27,2),(19,NULL,'2022-10-07 23:15:03.000000','hoangnhhe141380@fpt.edu.vn','2022-10-12 18:39:59.166000','description for test','2','test3','TEST3','0',NULL,10),(20,NULL,'2022-10-07 23:15:03.000000','hoangnhhe141380@fpt.edu.vn','2022-10-18 14:00:31.241000','dfsfdfsfs','2','GRRRR 3','TEEST','0',NULL,10),(21,NULL,'2022-10-07 23:15:03.000000',NULL,'2022-10-07 23:15:03.000000','description','1','Dashboard ','/dashboard','1',NULL,1),(22,NULL,'2022-10-07 23:15:03.000000',NULL,'2022-10-07 23:15:03.000000','description','1','Profile  ','/profile','1',NULL,1),(23,NULL,'2022-10-07 23:15:03.000000',NULL,'2022-10-07 23:15:03.000000','description','1','ChangePassword   ','/change-password','1',NULL,1),(24,NULL,'2022-10-07 23:15:03.000000',NULL,'2022-10-07 23:15:03.000000','description','1','SettingList ','/setting-list','1',NULL,1),(25,NULL,'2022-10-07 23:15:03.000000',NULL,'2022-10-07 23:15:03.000000','description','1','SettingDetail','/setting-detail/:id','1',NULL,1),(26,NULL,'2022-10-07 23:15:03.000000',NULL,'2022-10-07 23:15:03.000000','description','1','UserDetail ','/user-detail/:id','1',NULL,1),(27,NULL,'2022-10-07 23:15:03.000000',NULL,'2022-10-08 14:45:23.000000','description','1','UserList','/user-list','1',NULL,1),(28,NULL,'2022-10-07 23:15:03.000000',NULL,'2022-10-07 23:15:03.000000','description','1','SubjectList','/subject-list','1',NULL,1),(29,NULL,'2022-10-07 23:15:03.000000',NULL,'2022-10-07 23:15:03.000000','description','1','SubjectDetail','/subject-detail/:id','1',NULL,1),(30,NULL,'2022-10-07 23:15:03.000000',NULL,'2022-10-07 23:15:03.000000','description','1','ClassList','/class-list','1',NULL,1),(31,NULL,'2022-10-07 23:15:03.000000',NULL,'2022-10-07 23:15:03.000000','description','1','ClassDetail','/class-detail/:id','1',NULL,1),(32,NULL,NULL,NULL,NULL,'API setting details','1','ApiSettingDetails','/api/setting-detail','1',25,2),(33,NULL,NULL,NULL,NULL,'API subject details','1','ApiSubjectDetail','/api/subjects-detail','1',29,2),(34,NULL,NULL,NULL,NULL,'API for user detail','1','ApiUserDetail','/api/user-detail','1',26,2),(35,NULL,NULL,NULL,NULL,'API for class','1','APIClasslist','/api/class','1',30,2),(36,NULL,NULL,NULL,NULL,'API for class detail','1','APIClassDetail','/api/class-detail','1',31,2),(37,NULL,NULL,NULL,NULL,'API for class-status','1','API class status','/api/class-status','1',30,2),(38,NULL,NULL,NULL,NULL,'term for classes','1','Term','TYPE_TERM','1',NULL,NULL),(39,NULL,NULL,NULL,NULL,'branch of classes','1','Branch','TYPE_BRANCH','1',NULL,NULL),(40,NULL,NULL,NULL,NULL,'contain different type of web contact','1','Contact Category','TYPE_CONTACT','1',NULL,NULL),(44,NULL,NULL,NULL,NULL,'term spring','3','Spring','TERM_SPRING','1',NULL,38),(54,NULL,NULL,NULL,NULL,'term summer','3','Summer','TERM_SUMMER','1',NULL,38),(64,NULL,NULL,NULL,NULL,'term fall','3','Fall','TERM_FALL','1',NULL,38),(74,NULL,NULL,NULL,NULL,'branch Ho Chi Minh','4','HCM','BRANCH_HCM','1',NULL,39),(84,NULL,NULL,NULL,NULL,'branch Ha Noi','4','Ha Noi','BRANCH_HN','1',NULL,39),(94,NULL,NULL,NULL,'2022-10-09 07:25:00.000000','','1','Da Nang','BRANCH_DN','1',NULL,39),(104,NULL,NULL,NULL,NULL,'question about account','1','Account and billing','CONTACT_ACCOUNT','1',NULL,40),(114,NULL,NULL,NULL,NULL,'general question','1','General','CONTACT_GENERAL','1',NULL,40),(124,NULL,NULL,NULL,NULL,'report a bug , problem','1','Report a problem, bugs','CONTACT_PROBLEM','1',NULL,40),(164,'xucxichbo@doivl.com','2022-10-11 10:24:21.456000','hoangnhhe141380@fpt.edu.vn','2022-10-18 06:42:06.967000','asdfasdfasdf','2','aabc','a','1',NULL,10),(174,'xucxichbo@doivl.com','2022-10-11 10:25:00.389000','hoangnhhe141380@fpt.edu.vn','2022-10-18 06:41:13.640000','vailonluondesciption','2','vailonluon','vailonluonvalue','1',NULL,10),(184,'xucxichbo@doivl.com','2022-10-11 14:16:11.437000','xucxichbo@doivl.com','2022-10-11 16:47:02.565000','termtest12','1','termtest12','123123','1',NULL,38),(194,'xucxichbo@doivl.com','2022-10-11 16:13:35.047000','hoangnhhe141380@fpt.edu.vn','2022-10-12 18:39:28.578000','termtest','1','termtest','123','1',NULL,38),(204,NULL,NULL,NULL,NULL,'API for webcontact list','1','Web Contact List','/api/contact','1',244,2),(214,NULL,NULL,NULL,NULL,'API for webcontact detail','1','Web Contact Detail','/api/contact-detail','1',254,2),(224,NULL,NULL,NULL,NULL,'API for webcontact add','1','Web Contact add','/api/contact-add','1',NULL,2),(234,NULL,NULL,NULL,NULL,'API for webcontact subject','1','Web Contact subject','/api/contact-subjects','1',NULL,2),(244,NULL,NULL,NULL,NULL,'Screen for contact list','1','ContactList ','/contact-list','1',NULL,1),(254,NULL,NULL,NULL,NULL,'Screen for contact detail','1','ContactDetail ','/contact-detail/:id','1',NULL,1),(264,'xucxichbo@doivl.com','2022-10-13 01:30:22.335000','xucxichbo@doivl.com','2022-10-13 01:30:22.335000','GRRRR 3','2','GRRRR 3','TEST444','1',NULL,10),(275,NULL,NULL,NULL,NULL,'Setting for subject complexity','1','Subject complexity','TYPE_COMPLEXITY','1',NULL,284),(276,NULL,NULL,NULL,NULL,'Setting for subject quality','1','Subject quality','TYPE_QUALITY','1',NULL,284),(277,NULL,NULL,NULL,NULL,'Setting for subject slots','1','Subject slots','TYPE_SLOT','1',NULL,284),(280,NULL,NULL,NULL,NULL,'Setting for Class slots','1','Class slot','TYPE_CLASS_SLOT','1',NULL,364),(284,NULL,NULL,NULL,NULL,'contain subject setting','1','Subject setting','TYPE_SUBJECT_SETTING','1',NULL,NULL),(364,NULL,NULL,NULL,NULL,'contain class setting','1','Class setting','TYPE_CLASS_SETTING','1',NULL,NULL),(534,NULL,NULL,NULL,NULL,'Setting for issue type','1','Issue type','TYPE_ISSUE_TYPE','1',NULL,364),(544,NULL,NULL,NULL,NULL,'Setting for issue status','1','Issue status','TYPE_ISSUE_STATUS','1',NULL,364),(554,NULL,NULL,NULL,NULL,'Setting for subject modules','1','Subject modules','TYPE_SUBJECT_MODULES','1',NULL,284),(564,NULL,NULL,NULL,NULL,'Setting for keyword category','1','Keyword Category','TYPE_KEYWORD_CATEGORY','1',NULL,284),(574,NULL,NULL,NULL,NULL,'Setting forcontent group type','1','Subject Content group type','TYPE_CONTENT_GROUP','1',NULL,284),(634,NULL,NULL,NULL,NULL,'Setting for room','1','Room','TYPE_ROOM','1',NULL,NULL),(644,NULL,NULL,NULL,NULL,'Setting for room Delta 303','2','Room D303','ROOM_D303','1',NULL,634),(654,NULL,NULL,NULL,NULL,'Setting for room Alpha 202','2','Room A202','ROOM_A202','1',NULL,634),(664,NULL,NULL,NULL,NULL,'Setting for room Alpha 306','2','Room A306','ROOM_A306','1',NULL,634),(674,NULL,NULL,NULL,NULL,'Setting for room Alpha 301','2','Room A301','ROOM_A301','1',NULL,634),(684,NULL,NULL,NULL,NULL,'Setting for room Alpha 302','2','Room A302','ROOM_A302','1',NULL,634),(694,NULL,NULL,NULL,NULL,'Setting for room Alpha 303','2','Room A303','ROOM_A303','1',NULL,634),(704,NULL,NULL,NULL,NULL,'Setting for room Alpha 304','2','Room A304','ROOM_A304','1',NULL,634);
/*!40000 ALTER TABLE `setting` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subject`
--

DROP TABLE IF EXISTS `subject`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `subject` (
  `subject_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_date` datetime(6) DEFAULT NULL,
  `body` varchar(255) DEFAULT NULL,
  `subject_code` varchar(255) DEFAULT NULL,
  `subject_name` varchar(255) DEFAULT NULL,
  `subject_status` varchar(255) DEFAULT NULL,
  `expert_id` bigint(20) DEFAULT NULL,
  `manager_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`subject_id`),
  UNIQUE KEY `UK_bqn0dl9ld0wcq9na8amhhramm` (`subject_code`),
  KEY `FK3q2ooejviwaxfhel0gs1cdgrw` (`expert_id`),
  KEY `FKnymjcv6wa4jysqsm7sw9trxiv` (`manager_id`),
  CONSTRAINT `FK3q2ooejviwaxfhel0gs1cdgrw` FOREIGN KEY (`expert_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FKnymjcv6wa4jysqsm7sw9trxiv` FOREIGN KEY (`manager_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subject`
--

LOCK TABLES `subject` WRITE;
/*!40000 ALTER TABLE `subject` DISABLE KEYS */;
INSERT INTO `subject` VALUES (1,NULL,NULL,'hoangnhhe141380@fpt.edu.vn','2022-10-21 02:53:37.130000','','LAB101','Lab Java','1',1,2),(2,NULL,NULL,'hoangnhhe141380@fpt.edu.vn','2022-10-18 07:45:16.584000','sadasdasd','MAE203','Math','1',1,24),(3,NULL,NULL,NULL,NULL,'','PRF192','Programming Fundamentals','1',NULL,6),(4,NULL,NULL,'hoangnhhe141380@fpt.edu.vn','2022-10-18 07:47:47.225000','','JAV69','Japan for beginner123','0',6,6),(5,NULL,NULL,'xucxichbo@doivl.com','2022-10-11 16:28:50.230000','','CODE_B','Subject B','0',NULL,2),(6,'Some thing hêre','2022-10-11 14:39:22.599000','hoangnhhe141380@fpt.edu.vn','2022-10-12 18:43:06.783000',NULL,'CODE_A112','qqqqq','1',2,NULL),(7,'null','2022-10-11 16:01:43.108000','hoangnhhe141380@fpt.edu.vn','2022-10-18 06:50:42.428000',NULL,'CODE_A12','qqqqq','1',1,2),(14,'hoangnhhe141380@fpt.edu.vn','2022-10-12 18:52:34.406000','hoangnhhe141380@fpt.edu.vn','2022-10-12 18:52:47.155000',NULL,'HNG123','hoansdgasdgasdg','1',6,6),(24,'hoangnhhe141380@fpt.edu.vn','2022-10-13 04:12:22.487000','hoangnhhe141380@fpt.edu.vn','2022-10-13 04:12:22.487000','','ASB123','safasdfasdf','0',7,6),(34,'hoangnhhe141380@fpt.edu.vn','2022-10-13 04:13:46.786000','hoangnhhe141380@fpt.edu.vn','2022-10-13 04:13:46.786000','','ASC123','safasdfasdf','0',7,2),(44,'hoangnhhe141380@fpt.edu.vn','2022-10-13 04:18:18.150000','hoangnhhe141380@fpt.edu.vn','2022-10-18 13:59:48.533000','bcvsdfe','QRE321','bcvbrer qứad','1',24,4),(54,'hoangnhhe141380@fpt.edu.vn','2022-10-18 13:59:13.437000','hoangnhhe141380@fpt.edu.vn','2022-10-18 13:59:13.437000','PA des','PA1234','PA','0',24,24);
/*!40000 ALTER TABLE `subject` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subject_setting`
--

DROP TABLE IF EXISTS `subject_setting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `subject_setting` (
  `subject_setting_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_date` datetime(6) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `display_order` varchar(255) DEFAULT NULL,
  `setting_title` varchar(255) DEFAULT NULL,
  `setting_value` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `subject_id` bigint(20) NOT NULL,
  `type_id` bigint(20) NOT NULL,
  PRIMARY KEY (`subject_setting_id`),
  KEY `FKe2c0cr1iyuls138jgg70waqaj` (`subject_id`),
  KEY `FKg268byjfs9pf1h1gb23ic55p7` (`type_id`),
  CONSTRAINT `FKe2c0cr1iyuls138jgg70waqaj` FOREIGN KEY (`subject_id`) REFERENCES `subject` (`subject_id`),
  CONSTRAINT `FKg268byjfs9pf1h1gb23ic55p7` FOREIGN KEY (`type_id`) REFERENCES `setting` (`setting_id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subject_setting`
--

LOCK TABLES `subject_setting` WRITE;
/*!40000 ALTER TABLE `subject_setting` DISABLE KEYS */;
INSERT INTO `subject_setting` VALUES (1,NULL,NULL,NULL,NULL,'Complexity of subject  LAB101','1','Lab 101 complexity','Complex','1',1,275),(2,NULL,NULL,NULL,NULL,'Quality of subject LAB101','1','Lab 101 quality','Medium','1',1,276),(3,NULL,NULL,NULL,NULL,'Teach students about lab 101\'s rules','2','Slot 01 : Rules of class','Lab101_Slot1','1',1,277),(4,NULL,NULL,NULL,NULL,'Teach students how to code and submit code in lab room','2','Slot 02 : Guide student to code and submit','Lab101_Slot2','1',1,277),(5,NULL,NULL,NULL,NULL,' Let students code and review their works','2','Slot 03: Code and reviews','Lab101_Slot3','1',1,277),(6,NULL,NULL,NULL,NULL,'Student continue coding, teacher review and guide student fix problems','2','Slot 04: Code and reviews','Lab101_Slot4','1',1,277),(7,NULL,NULL,NULL,NULL,'Complexity of subject MAE203','1','MAE203 complexity','Complex','1',2,275),(8,NULL,NULL,'hoangnhhe141380@fpt.edu.vn','2022-10-21 16:59:36.433000','Quality of subject MAE203','1','MAE203 quality','Medium','1',2,276),(9,NULL,NULL,'hoangnhhe141380@fpt.edu.vn','2022-10-21 16:56:22.511000','Introduce basic of MAE203dsdsdfdf','2','Slot 01: Introduction','MAE203_Slot1','0',2,277),(10,NULL,NULL,NULL,NULL,'Introduce about matrix and logic in matrix','2','Slot 02: Introduce about matrix','MAE203_Slot2','1',2,277),(11,NULL,NULL,NULL,NULL,'Giving excercise and homework about matrix','2','Slot 03: Exercise with matrix','MAE203_Slot3','1',2,277),(12,NULL,NULL,'hoangnhhe141380@fpt.edu.vn','2022-10-21 17:00:38.612000','Introduce basic algorithm and excercises','2','Slot 04: Basic Algorithm 2 ','MAE203_Slot4.1','0',2,277),(13,NULL,NULL,NULL,NULL,'Complexity of subject PRF192','1','PRF192 complexity','Medium','0',3,275),(14,NULL,NULL,NULL,NULL,'Quality of subject PRF192','1','PRF192 quality','Medium','0',3,276),(24,'xucxichbo@doivl.com','2022-10-21 18:29:20.681000','xucxichbo@doivl.com','2022-10-21 18:29:20.681000','Description','2','Lab 101 complexity','Medium','0',1,276);
/*!40000 ALTER TABLE `subject_setting` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `submit_tbl`
--

DROP TABLE IF EXISTS `submit_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `submit_tbl` (
  `submit_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_date` datetime(6) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `submit_file_url` varchar(255) DEFAULT NULL,
  `submit_time` varchar(255) DEFAULT NULL,
  `user_note` varchar(255) DEFAULT NULL,
  `class_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `group_id` bigint(20) DEFAULT NULL,
  `milestone_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`submit_id`),
  KEY `FKiwjdbqc50w5kg38iylwatmhlx` (`class_id`,`user_id`),
  KEY `FKinvtjwii9msmjtru01t1mw0xa` (`group_id`),
  KEY `FKp1agsivyliuq4l9x89r8rklwh` (`milestone_id`),
  CONSTRAINT `FKinvtjwii9msmjtru01t1mw0xa` FOREIGN KEY (`group_id`) REFERENCES `group_tbl` (`group_id`),
  CONSTRAINT `FKiwjdbqc50w5kg38iylwatmhlx` FOREIGN KEY (`class_id`, `user_id`) REFERENCES `class_user` (`class_id`, `user_id`),
  CONSTRAINT `FKp1agsivyliuq4l9x89r8rklwh` FOREIGN KEY (`milestone_id`) REFERENCES `milestone` (`milestone_id`)
) ENGINE=InnoDB AUTO_INCREMENT=875 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `submit_tbl`
--

LOCK TABLES `submit_tbl` WRITE;
/*!40000 ALTER TABLE `submit_tbl` DISABLE KEYS */;
INSERT INTO `submit_tbl` VALUES (224,'quan1@doivl.com','2022-10-30 17:09:54.118000','quan1@doivl.com','2022-11-01 17:02:33.071000',NULL,NULL,NULL,NULL,1,24,NULL,39),(225,'quan1@doivl.com','2022-10-30 17:09:54.121000','quan1@doivl.com','2022-11-01 17:02:33.040000',NULL,NULL,NULL,NULL,1,34,NULL,39),(226,'quan1@doivl.com','2022-10-30 17:09:54.123000','quan1@doivl.com','2022-10-30 17:09:54.123000',NULL,NULL,NULL,NULL,1,44,NULL,39),(227,'quan1@doivl.com','2022-10-30 17:09:54.124000','vietnqhe140773@gmail.com','2022-11-02 17:58:13.015000',NULL,NULL,NULL,NULL,1,194,NULL,39),(235,'quan1@doivl.com','2022-10-30 18:51:43.192000','vietnqhe140773@gmail.com','2022-11-02 17:47:45.451000',NULL,NULL,NULL,NULL,1,14,144,39),(251,'quan1@doivl.com','2022-10-31 10:35:53.818000','quan1@doivl.com','2022-11-01 17:00:52.044000',NULL,NULL,NULL,NULL,1,14,NULL,41),(252,'quan1@doivl.com','2022-10-31 10:35:53.820000','quan1@doivl.com','2022-10-31 10:35:53.820000',NULL,NULL,NULL,NULL,1,24,NULL,41),(253,'quan1@doivl.com','2022-10-31 10:35:53.823000','quan1@doivl.com','2022-11-01 17:00:52.265000',NULL,NULL,NULL,NULL,1,34,NULL,41),(254,'quan1@doivl.com','2022-10-31 10:35:53.823000','quan1@doivl.com','2022-10-31 10:35:53.823000',NULL,NULL,NULL,NULL,1,44,NULL,41),(255,'quan1@doivl.com','2022-10-31 10:35:53.825000','quan1@doivl.com','2022-10-31 10:35:53.825000',NULL,NULL,NULL,NULL,1,194,NULL,41),(256,'quan1@doivl.com','2022-10-31 10:35:53.826000','quan1@doivl.com','2022-10-31 10:35:53.826000',NULL,NULL,NULL,NULL,1,204,NULL,41),(282,'quan1@doivl.com','2022-10-31 14:31:21.024000','quan1@doivl.com','2022-11-01 17:00:52.215000',NULL,NULL,NULL,NULL,1,1,NULL,41),(290,'quan1@doivl.com','2022-11-01 17:10:44.071000','quan1@doivl.com','2022-11-02 23:32:48.697000',NULL,NULL,NULL,NULL,3,1,114,42),(291,'quan1@doivl.com','2022-11-01 17:10:44.073000','quan1@doivl.com','2022-11-03 00:37:23.533000',NULL,NULL,NULL,NULL,3,4,124,42),(292,'quan1@doivl.com','2022-11-01 17:10:44.074000','quan1@doivl.com','2022-11-01 17:10:44.074000',NULL,NULL,NULL,NULL,3,6,NULL,42),(293,'quan1@doivl.com','2022-11-01 17:10:44.076000','quan1@doivl.com','2022-11-01 17:10:44.076000',NULL,NULL,NULL,NULL,3,14,NULL,42),(294,'quan1@doivl.com','2022-11-01 17:10:44.078000','quan1@doivl.com','2022-11-01 17:10:44.078000',NULL,NULL,NULL,NULL,3,34,NULL,42),(295,'quan1@doivl.com','2022-11-02 23:32:48.688000','quan1@doivl.com','2022-11-02 23:32:48.688000',NULL,NULL,NULL,NULL,NULL,NULL,114,42),(304,'quan1@doivl.com','2022-11-03 00:37:23.287000','quan1@doivl.com','2022-11-03 00:37:23.287000',NULL,NULL,NULL,NULL,NULL,NULL,124,42),(324,'vietnqhe140773@gmail.com','2022-11-02 17:46:49.048000','vietnqhe140773@gmail.com','2022-11-02 17:46:49.048000',NULL,NULL,NULL,NULL,NULL,NULL,144,39),(334,'vietnqhe140773@gmail.com','2022-11-02 17:47:10.236000','vietnqhe140773@gmail.com','2022-11-02 17:47:10.236000',NULL,NULL,NULL,NULL,1,1,144,39),(344,'vietnqhe140773@gmail.com','2022-11-02 17:47:29.813000','vietnqhe140773@gmail.com','2022-11-02 18:10:04.238000',NULL,NULL,NULL,NULL,1,204,NULL,39),(354,'quan4@doivl.com','2022-11-02 17:55:14.906000','quan4@doivl.com','2022-11-02 18:05:17.906000',NULL,NULL,NULL,NULL,12,224,194,44),(364,'quan4@doivl.com','2022-11-02 17:55:15.131000','quan4@doivl.com','2022-11-02 18:05:17.906000',NULL,NULL,NULL,NULL,12,234,174,44),(374,'quan4@doivl.com','2022-11-02 17:56:54.073000','quan4@doivl.com','2022-11-02 18:05:17.906000',NULL,NULL,NULL,NULL,12,244,184,44),(384,'quan4@doivl.com','2022-11-02 17:56:54.243000','quan4@doivl.com','2022-11-02 18:05:17.906000',NULL,NULL,NULL,NULL,12,254,184,44),(394,'quan4@doivl.com','2022-11-02 17:56:54.380000','quan4@doivl.com','2022-11-02 18:05:17.906000',NULL,NULL,NULL,NULL,12,264,174,44),(404,'quan4@doivl.com','2022-11-02 17:56:54.531000','quan4@doivl.com','2022-11-02 18:05:17.907000',NULL,NULL,NULL,NULL,12,274,174,44),(414,'quan4@doivl.com','2022-11-02 17:56:54.673000','quan4@doivl.com','2022-11-02 18:05:17.907000',NULL,NULL,NULL,NULL,12,284,194,44),(424,'quan4@doivl.com','2022-11-02 17:57:40.412000','quan4@doivl.com','2022-11-02 18:05:17.905000',NULL,NULL,NULL,NULL,12,294,184,44),(434,'quan4@doivl.com','2022-11-02 17:57:40.565000','quan4@doivl.com','2022-11-02 18:05:17.908000',NULL,NULL,NULL,NULL,12,304,194,44),(474,'quan4@doivl.com','2022-11-02 18:00:08.102000','quan4@doivl.com','2022-11-02 18:05:17.908000',NULL,NULL,NULL,NULL,12,314,174,44),(484,'quan4@doivl.com','2022-11-02 18:05:18.032000','quan4@doivl.com','2022-11-02 18:05:18.032000',NULL,NULL,NULL,NULL,NULL,NULL,174,44),(494,'quan4@doivl.com','2022-11-02 18:05:18.036000','quan4@doivl.com','2022-11-02 18:05:18.036000',NULL,NULL,NULL,NULL,NULL,NULL,184,44),(504,'quan4@doivl.com','2022-11-02 18:05:18.040000','quan4@doivl.com','2022-11-02 18:05:18.040000',NULL,NULL,NULL,NULL,NULL,NULL,194,44),(514,'quan4@doivl.com','2022-11-02 18:08:37.245000','quan1@doivl.com','2022-11-03 07:27:55.330000',NULL,NULL,NULL,NULL,12,224,244,54),(524,'quan4@doivl.com','2022-11-02 18:08:37.248000','quan4@doivl.com','2022-11-02 18:08:37.248000',NULL,NULL,NULL,NULL,12,234,NULL,54),(534,'quan4@doivl.com','2022-11-02 18:08:37.262000','quan4@doivl.com','2022-11-02 18:08:37.262000',NULL,NULL,NULL,NULL,12,244,NULL,54),(544,'quan4@doivl.com','2022-11-02 18:08:37.264000','quan4@doivl.com','2022-11-02 18:08:37.264000',NULL,NULL,NULL,NULL,12,254,NULL,54),(554,'quan4@doivl.com','2022-11-02 18:08:37.267000','quan4@doivl.com','2022-11-02 18:08:37.267000',NULL,NULL,NULL,NULL,12,264,NULL,54),(564,'quan4@doivl.com','2022-11-02 18:08:37.271000','quan4@doivl.com','2022-11-02 18:08:37.271000',NULL,NULL,NULL,NULL,12,274,NULL,54),(574,'quan4@doivl.com','2022-11-02 18:08:37.273000','quan4@doivl.com','2022-11-02 18:08:37.273000',NULL,NULL,NULL,NULL,12,284,NULL,54),(584,'quan4@doivl.com','2022-11-02 18:08:37.276000','quan4@doivl.com','2022-11-02 18:08:37.276000',NULL,NULL,NULL,NULL,12,294,NULL,54),(594,'quan4@doivl.com','2022-11-02 18:08:37.278000','quan4@doivl.com','2022-11-02 18:08:37.278000',NULL,NULL,NULL,NULL,12,304,NULL,54),(604,'quan4@doivl.com','2022-11-02 18:08:37.280000','quan4@doivl.com','2022-11-02 18:08:37.280000',NULL,NULL,NULL,NULL,12,314,NULL,54),(614,'quan4@doivl.com','2022-11-02 18:08:45.038000','hoangnhhe141380@fpt.edu.vn','2022-11-02 18:55:20.954000',NULL,NULL,NULL,NULL,12,224,NULL,64),(624,'quan4@doivl.com','2022-11-02 18:08:45.041000','hoangnhhe141380@fpt.edu.vn','2022-11-02 18:55:20.892000',NULL,NULL,NULL,NULL,12,234,NULL,64),(634,'quan4@doivl.com','2022-11-02 18:08:45.043000','hoangnhhe141380@fpt.edu.vn','2022-11-02 18:55:20.926000',NULL,NULL,NULL,NULL,12,244,NULL,64),(644,'quan4@doivl.com','2022-11-02 18:08:45.045000','hoangnhhe141380@fpt.edu.vn','2022-11-02 18:55:20.926000',NULL,NULL,NULL,NULL,12,254,NULL,64),(654,'quan4@doivl.com','2022-11-02 18:08:45.047000','hoangnhhe141380@fpt.edu.vn','2022-11-02 18:55:20.892000',NULL,NULL,NULL,NULL,12,264,NULL,64),(664,'quan4@doivl.com','2022-11-02 18:08:45.050000','hoangnhhe141380@fpt.edu.vn','2022-11-02 18:55:20.892000',NULL,NULL,NULL,NULL,12,274,NULL,64),(674,'quan4@doivl.com','2022-11-02 18:08:45.052000','hoangnhhe141380@fpt.edu.vn','2022-11-02 18:55:20.954000',NULL,NULL,NULL,NULL,12,284,NULL,64),(684,'quan4@doivl.com','2022-11-02 18:08:45.054000','hoangnhhe141380@fpt.edu.vn','2022-11-02 18:55:20.926000',NULL,NULL,NULL,NULL,12,294,NULL,64),(694,'quan4@doivl.com','2022-11-02 18:08:45.056000','hoangnhhe141380@fpt.edu.vn','2022-11-02 18:55:20.954000',NULL,NULL,NULL,NULL,12,304,NULL,64),(704,'quan4@doivl.com','2022-11-02 18:08:45.058000','hoangnhhe141380@fpt.edu.vn','2022-11-02 18:55:20.892000',NULL,NULL,NULL,NULL,12,314,NULL,64),(744,'quan4@doivl.com','2022-11-02 18:12:29.528000','quan4@doivl.com','2022-11-02 18:12:29.528000',NULL,NULL,NULL,NULL,12,324,NULL,44),(754,'quan4@doivl.com','2022-11-02 18:12:29.533000','quan4@doivl.com','2022-11-02 18:12:29.533000',NULL,NULL,NULL,NULL,12,324,NULL,54),(764,'quan4@doivl.com','2022-11-02 18:12:29.536000','quan4@doivl.com','2022-11-02 18:12:29.536000',NULL,NULL,NULL,NULL,12,324,NULL,64),(774,'quan4@doivl.com','2022-11-02 18:12:29.665000','quan4@doivl.com','2022-11-02 18:12:29.665000',NULL,NULL,NULL,NULL,12,334,NULL,44),(784,'quan4@doivl.com','2022-11-02 18:12:29.669000','quan4@doivl.com','2022-11-02 18:12:29.669000',NULL,NULL,NULL,NULL,12,334,NULL,54),(794,'quan4@doivl.com','2022-11-02 18:12:29.671000','quan4@doivl.com','2022-11-02 18:16:51.868000',NULL,NULL,NULL,NULL,12,334,NULL,64),(804,'quan4@doivl.com','2022-11-02 18:12:29.835000','quan4@doivl.com','2022-11-02 18:12:29.835000',NULL,NULL,NULL,NULL,12,344,NULL,44),(814,'quan4@doivl.com','2022-11-02 18:12:29.840000','quan4@doivl.com','2022-11-02 18:12:29.840000',NULL,NULL,NULL,NULL,12,344,NULL,54),(824,'quan4@doivl.com','2022-11-02 18:12:29.842000','quan4@doivl.com','2022-11-02 18:14:44.750000',NULL,NULL,NULL,NULL,12,344,NULL,64),(874,'quan1@doivl.com','2022-11-03 07:27:55.327000','quan1@doivl.com','2022-11-03 07:27:55.327000',NULL,NULL,NULL,NULL,NULL,NULL,244,54);
/*!40000 ALTER TABLE `submit_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user` (
  `user_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_date` datetime(6) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `avatar_url` varchar(255) DEFAULT NULL,
  `email` varchar(40) DEFAULT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `mail_token` varchar(255) DEFAULT NULL,
  `mobile` varchar(255) DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `UK_sb8bbouer5wak8vyiiy4pf2bx` (`username`),
  UNIQUE KEY `UK_ob8kqyqqgmefl0aco34akdtpe` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=354 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'','2022-10-07 23:15:04.000000','xucxichbo@doivl.com','2022-10-27 21:42:21.515000','xucxixh','https://lms-bucket-g23.s3.ap-southeast-1.amazonaws.com/xucxichbo','xucxichbo@doivl.com','xucxichbo','','0123123123',NULL,'$2a$10$EaRMMJf70xsA8dr5fguwxOjMwMBzG5NMBFLGtWcYgdY.uvTwnopye','1'),(2,'','2022-10-07 23:15:04.000000','quan1@doivl.com','2022-10-25 11:13:40.899000','QuanDVVAV1','https://lms-bucket-g23.s3.ap-southeast-1.amazonaws.com/quan1','quan1@doivl.com','Duong Vu Viet Quan2',NULL,'09024324352',NULL,'$2a$10$ABGaqbzKvTujlckdm2L20uPesiaNhnTOua0FB75wW4WIWZGabnJEu','1'),(3,'','2022-10-07 23:15:04.000000','','2022-10-07 23:15:04.000000','quan22','','quan22@doivl.com','','','','','$2a$10$V2knZSxoDgNhCFv9KSp/q.wQ5KWMITUduSCbCvmjrPinvJVncMI1O','1'),(4,'','2022-10-07 23:15:04.000000','hoangnhhe141380@fpt.edu.vn','2022-10-18 08:08:48.402000','quan3','','quan3@doivl.com','','','05454514124','abc','$2a$10$sCybsiL5KbDTlNQ4uhvu5OLlFDhzpq2E6obsbjd1DjOkb6Keog8pS','1'),(5,'','2022-10-07 23:15:04.000000','quan4@doivl.com','2022-10-17 14:19:07.634000','quan4','','quan4@doivl.com','','','0123123123','abcccedfadsfasd','$2a$10$GcGHU7u/hxqASlTmjIVnyeznmq6H.ahh88U.v8NwOsqW4pQHEnGii','1'),(6,'','2022-10-07 23:15:04.000000','','2022-10-09 05:42:30.000000','hoangnh','','hoangnhhe141380@fpt.edu.vn','','','','','$2a$10$.lzyRua4zLzBfPUssazey.rBZFFFW6MdoNt7n32tZsMRFKECNu1JC','1'),(7,'','2022-10-07 23:15:04.000000','','2022-10-07 23:15:04.000000','quan6','','quan6@doivl.com','','','','','$2a$10$/hwQssrnlxDprjFKo9129e6Jpv31/GNnRTUEJ5NBp.AERD5eIx7xe','1'),(14,'','2022-10-09 01:38:48.000000','anonymousUser','2022-10-16 21:17:43.345000','gepiwqeeee','','gepiwe9397@dineroa.com','Duong Vu Viet Quan123',NULL,'0123123123','abc','$2a$10$ZBDeQwZzWE/ZWh0B2554deNleW9xXDWkg1j49xWvl03ScMstS8hZi','1'),(24,'','2022-10-09 04:28:18.000000','vietnqhe140773@gmail.com','2022-11-02 17:44:49.115000','vietnq','https://lh3.googleusercontent.com/a/ALm5wu3ZuZCBJPMKDMaoG4ZW8Dl5rCM1Qqf8sNKpSaQV=s96-c','vietnqhe140773@gmail.com','Việt Nguyễn','wY3JAv5h7z59VRbgQHubR87u1tpJmo','1111111111','','$2a$10$Jk9iCGGvBq6zp0vsgaVcfeU.MdXplWwt1oabmtOiD1EZZs0/MkFry','1'),(34,'','2022-10-09 08:15:52.000000','vietnqhe140773@gmail.com','2022-10-18 05:45:59.535000','hoang','https://g23-lms.s3.ap-southeast-1.amazonaws.com/hoangdiudang3','hoangdiudang3@gmail.com','','','','','$2a$10$ox8C3.znPezZo5Py1GgEeeJ53C0vXdeUvACatsR8TT/Y.hYN37LIm','0'),(44,'','2022-10-09 08:32:09.000000','vietnqhe140773@gmail.com','2022-10-13 14:02:05.687000','hoang131','','hoang131231235@gmail.com','','YVovlP9043DC997l84TftwGf44d44e','','','$2a$10$FN94yEiUGrIXx2UlxMRZ8OwjnreFfmwcwp6bLYnMCW3ldI6fY5RoK','1'),(54,'anonymousUser','2022-10-12 03:04:03.185000','vietnqhe140773@gmail.com','2022-10-15 15:31:05.779000','ggg','https://lh3.googleusercontent.com/a/ALm5wu3qe0FKwwGSzAygriaOQ7PC8iFyrPGONj1T7GT8=s96-c','hoangdiudang1@gmail.com','',NULL,'1234567899','','$2a$10$YuiCeMy..v.p3CDlfzbqfuoRBx0wNKckwwJEt7I586zUAfN084eYW','1'),(64,'anonymousUser','2022-10-12 08:42:06.431000','anonymousUser','2022-10-12 08:42:06.431000','name2',NULL,'blahblah@dineroa.com','Duong Vu Viet Quan','IcyPMEC3QEZY4fx6HMUGezYTOft9N4',NULL,NULL,'$2a$10$mt8UJUmBD47tocb480JnS.K5DKogy1CEA/rUkf8DShe7SAC147Jqa','-1'),(74,'anonymousUser','2022-10-12 08:53:34.927000','anonymousUser','2022-10-12 08:53:34.927000','nmae3',NULL,'hoangasdf@gmail.com',NULL,'7BWsDb6FxewfHFRQlVNjLHQZ2Y9TFE',NULL,NULL,'$2a$10$4eNxA46b3Ve7sEJN89.fde1/wh3GfIQw4cLMDVPlwVC9phYWT.oJS','-1'),(84,'anonymousUser','2022-10-12 09:17:10.166000','hoangnhhe141380@fpt.edu.vn','2022-10-18 06:45:36.299000','name4',NULL,'hoangasldfkasdf@gmail.com','hoang',NULL,NULL,NULL,'$2a$10$nJTElntpyWADM5hFDV2lMObaA.UMcqMAXiHEydQ/LaA1.iQe48aIa','0'),(94,'xucxichbo@doivl.com','2022-10-12 10:18:24.955000','hoangnhhe141380@fpt.edu.vn','2022-10-18 06:45:23.614000','ưeeeeeeeeeeeeeeee',NULL,'hoansdgasdfas@doivl.com','Duong ',NULL,'0343218830','tao la ma','$2a$10$jIo5kolMeIA19Kt1llaFJey0KJAMjByZsPKoNnvxTTrCQH3FVPZJW','0'),(104,'anonymousUser','2022-10-17 15:11:57.370000','anonymousUser','2022-10-17 15:12:06.609000',NULL,NULL,'hoang13123@gmail.com','hoang',NULL,NULL,NULL,'$2a$10$/KJcfrB.oSllfdDUSEnKbO/AksOad3tRVnOJFs8lXFvo.iRj9RTji','1'),(114,'anonymousUser','2022-10-17 15:12:41.350000','anonymousUser','2022-10-17 15:12:41.350000',NULL,'https://lh3.googleusercontent.com/a/ALm5wu1eX9cLm3dPy9FCSDntfaL_MEBigHihvkn4tAu2=s96-c','vietnqhe140773@fpt.edu.vn','Nguyen Quoc Viet (K14 HL)',NULL,NULL,NULL,'$2a$10$reoO0VNcmfVObjAnHyX1Eeq3eRw1ZLaNUYkwOrFBRRS5wwDCELdky','1'),(124,'anonymousUser','2022-10-18 05:40:35.327000','vietnqhe140773@gmail.com','2022-10-18 05:46:39.023000',NULL,NULL,'mactin111220@gmail.com','Viet Nguyen','bquOA8oAarDPeyY4Aggo8riGl7g7K3',NULL,NULL,'$2a$10$XqW6.0hfHK/5VIAFPAIGyOVTcDqzKTILHWVEWv1Tosr5Tz4aUxkdC','0'),(134,'hoangnhhe141380@fpt.edu.vn','2022-10-21 14:00:17.503000','hoangnhhe141380@fpt.edu.vn','2022-10-21 14:00:17.503000','a',NULL,'hoang@gmail.com',NULL,NULL,NULL,NULL,'$2a$10$t6.PsGbW3g98teA4pP7fAuUxKyjQdQ.UJxiYESvFZJ3JZZRdcKxvm','0'),(144,'hoangnhhe141380@fpt.edu.vn','2022-10-21 14:01:02.500000','hoangnhhe141380@fpt.edu.vn','2022-10-21 14:01:02.500000','aaaa',NULL,'honagagagag@gmail.com',NULL,NULL,NULL,NULL,'$2a$10$qwkX9tRAwnSI0sfd8zVd5.j3jpySYyJ1319i1CyU1W0jmdGzzfVuO','0'),(154,'hoangnhhe141380@fpt.edu.vn','2022-10-21 14:01:14.324000','hoangnhhe141380@fpt.edu.vn','2022-10-21 14:01:14.324000','hoangnhhe141414',NULL,'hoangnhhe141414@gmail.com',NULL,NULL,NULL,NULL,'$2a$10$0b6onNlakz7lCU0EV2dVI.4f1PDA/1JmB2KeSBI173pYIkB4jSqXm','0'),(164,'hoangnhhe141380@fpt.edu.vn','2022-10-21 15:44:38.533000','hoangnhhe141380@fpt.edu.vn','2022-10-21 15:44:38.533000','hoangnhhe141415',NULL,'hoangnhhe141415@gmail.com',NULL,NULL,NULL,NULL,'$2a$10$BOiy2UrxAO4/8In50Tvzy.Zya/6ZqU/u8BqC9QKbBGL3gjt6ce.3m','0'),(174,'hoangnhhe141380@fpt.edu.vn','2022-10-21 15:46:47.067000','hoangnhhe141380@fpt.edu.vn','2022-10-21 15:46:47.067000','hoangnhhe143213',NULL,'hoangnhhe143213@gmail.com',NULL,NULL,NULL,NULL,'$2a$10$LLxMWca2yrabU/apFg6/y.2sZMRXBsRq57TUL8nCtA.XsyGanhT3y','0'),(184,'hoangnhhe141380@fpt.edu.vn','2022-10-21 15:53:33.162000','hoangnhhe141380@fpt.edu.vn','2022-10-21 15:53:33.162000','hoangnhhe140000',NULL,'hoangnhhe140000@fpt.edu.vn',NULL,NULL,NULL,NULL,'$2a$10$hbOosqjeneFFL14f2zvNeeNjT.85.zQoLFbvKoefQOoi/AvnH7xRK','0'),(194,'hoangnhhe141380@fpt.edu.vn','2022-10-21 18:26:43.853000','hoangnhhe141380@fpt.edu.vn','2022-10-21 18:26:43.853000','hoangnhhe140001',NULL,'hoangnhhe140001@fpt.edu.vn',NULL,NULL,NULL,NULL,'$2a$10$Ak2WqrCJ243cuYpnWqDFe.8vCCzusGxHSkgfsu1rCWYJWy8.L.Og2','0'),(204,'hoangnhhe141380@fpt.edu.vn','2022-10-21 18:40:20.153000','hoangnhhe141380@fpt.edu.vn','2022-10-21 18:40:20.153000','hoangnhhe140004',NULL,'hoangnhhe140004@fpt.edu.vn',NULL,NULL,NULL,NULL,'$2a$10$9OMw5oIKZqB.ND0O.u7dXuJ2Yihl2UeT8AJYXuqLSdDM5Il3w44ri','0'),(205,'anonymousUser','2022-10-23 19:28:29.235000','anonymousUser','2022-10-23 19:28:29.235000',NULL,NULL,'oandiection@gmail.com','Duong Vu Viet Quan','1sDaLH4bHwA304PgYnmBIbSpIZk8wO',NULL,NULL,'$2a$10$BAnA9kStMUI.AuuvVc6Pw.t52aTiEU771CB5pUYO482Ky8T0U3A7S','-1'),(206,'anonymousUser','2022-10-23 19:29:10.223000','anonymousUser','2022-10-23 19:29:10.223000',NULL,NULL,'cagamib580@24rumen.com','Duong Vu Viet Quan','otAn5Um59OYPuTu8lUj2FqYKBgofyV',NULL,NULL,'$2a$10$QuTMZcqJi7AY0JWssH9TOedKl/gGOfyx9lw5Y51siSR9PqbcrxxsK','-1'),(207,'anonymousUser','2022-10-23 19:29:53.890000','anonymousUser','2022-10-23 19:29:53.890000',NULL,NULL,'minhteng0412@gmail.com','Duong Vu Viet Quan','wxGuA53IyVzXrdOIw2BV6Ts4TbCIbW',NULL,NULL,'$2a$10$Jay/u6d.DUhaUY9er.c7KeU2HuxRbFdsyFYjS6PfFOVhIeC/xC/82','-1'),(208,'anonymousUser','2022-10-23 19:30:34.683000','anonymousUser','2022-10-23 19:30:34.683000',NULL,NULL,'duongvuvietquan2912@gmail.com','Duong Vu Viet Quan','EUUycXkjnr8XF0im8bK7mMhyQIuZVP',NULL,NULL,'$2a$10$9rMYKIRt.SDtSTqEFZV1SelfoLAQrkU31Um0pxxmdSNyS7.CxSlY.','-1'),(209,'anonymousUser','2022-10-23 19:38:03.170000','anonymousUser','2022-10-23 19:38:03.170000',NULL,NULL,'duongvuvietqeeuan2912@gmail.com','Duong Vu Viet Quan','Kj7DFzjkPovakUqEJo8dbLI8XYwkTw',NULL,NULL,'$2a$10$zqVnC1k/GPbTTo7oSvEJmeiE/lSH8Wtovj9GFCDJbUL1a00VInI5y','-1'),(210,'anonymousUser','2022-11-01 22:58:23.343000','anonymousUser','2022-11-01 22:58:23.343000','hoangggg',NULL,'teacher1@gmail.com','hoangggg','eHLNTnTo24V9YjTcCvUA7C7Ugox9Z0',NULL,NULL,'$2a$10$kCQNnapK4OCwxFGijTI.E.k2s4BD.wlT0XxvJU6zKKzfBS.1LVi.6','-1'),(211,'anonymousUser','2022-11-01 22:59:05.302000','anonymousUser','2022-11-01 22:59:05.302000','hoangggg1',NULL,'teacher11@gmail.com','hoangggg','kolmeEFqbPitYpSnist8mvnKKKDqWS',NULL,NULL,'$2a$10$CRFi/D9/gxyIXmEAr3LmveNsvTksxDmDbGOqBEQ2oBk4odlM3jALG','-1'),(212,'anonymousUser','2022-11-01 22:59:26.122000','anonymousUser','2022-11-01 22:59:26.122000','hoanggggvannguyen',NULL,'teacher110@gmail.com','hoangggg van nguyen','tQ41kHxWjho47sRO72fXoOA7gq6cbT',NULL,NULL,'$2a$10$SkDnkneXWkKTLpIF41i0v.ydfPhnoA68djp9sDA0/AZLVFCmdQr/e','-1'),(213,'anonymousUser','2022-11-01 23:00:14.707000','anonymousUser','2022-11-01 23:00:14.707000','duongvuvietquan',NULL,'vodichthienha@gmail.com','Duong Vu viet quan','EDzc0WRdxGrFUl1Uz0L6L8fDfI9PnK',NULL,NULL,'$2a$10$6xUWuSCrBEt7ozdzPxJsFeA1hTSCG1Xhomgz96leUJTReEGyJ4uDy','-1'),(214,'anonymousUser','2022-11-01 23:00:49.721000','anonymousUser','2022-11-01 23:00:49.721000','duongvuvietquan1',NULL,'sdagasgs@gmail.com','Duong Vu viet quan','gl8vF1BF63fi6rdA2voaT7Gywi3yrk',NULL,NULL,'$2a$10$jMrtGmqFinZ2yl1Ha3e4veDgfzHNNuIAUMAvucMhCRVIgEYxoKSWC','-1'),(215,'anonymousUser','2022-11-01 23:14:59.766000','anonymousUser','2022-11-01 23:27:26.763000','quândương','https://lh3.googleusercontent.com/a/ALm5wu10TIpQGQ7CB-xwLwPlZKsdCrI6jESt_GYmZcAj=s96-c','gaoxanhvn2000@gmail.com','Quân Dương',NULL,NULL,NULL,'$2a$10$RspPSWnr.oCRwnn7uCI.pOKrzKn8g7buKVJyv8KfPMNm/kcQGDAna','1'),(216,'anonymousUser','2022-11-02 00:16:56.014000','anonymousUser','2022-11-02 00:16:56.014000','quândươngvũviệt',NULL,'d@gmail.com','Quân Dương Vũ Việt','4ntn1kR2dib2GYKzoblSpGhyZD4cbU',NULL,NULL,'$2a$10$NgLFGK0VlB6IWcOCh/pjie7AVDMQmxOeobSYnRJH5Hy1GR5hknPjK','-1'),(224,'quan4@doivl.com','2022-11-02 17:55:14.855000','quan4@doivl.com','2022-11-02 17:55:14.855000','hoangnh00001',NULL,'hoangnh00001@gmail.com',NULL,NULL,NULL,NULL,'$2a$10$UcubHuCZ1ArdNb/onKlQuuT89uIlzx0D..PfrhYnJK/2SSb9mm/yS','0'),(234,'quan4@doivl.com','2022-11-02 17:55:15.105000','quan4@doivl.com','2022-11-02 17:55:15.105000','hoangnh00002',NULL,'hoangnh00002@gmail.com',NULL,NULL,NULL,NULL,'$2a$10$SQHID3yhw165avtQzG2.peSUqXt175FqHYVBItymOvvnk6tmBaURu','0'),(244,'quan4@doivl.com','2022-11-02 17:56:54.029000','quan4@doivl.com','2022-11-02 17:56:54.029000','hoangnh00003',NULL,'hoangnh00003@gmail.com',NULL,NULL,NULL,NULL,'$2a$10$N31z/PZn1W8Ac4Ht4K2gvOLgWTg1p6jvBfq3viZjMtoLNLObOEv2u','0'),(254,'quan4@doivl.com','2022-11-02 17:56:54.227000','quan4@doivl.com','2022-11-02 17:56:54.227000','hoangnh00004',NULL,'hoangnh00004@gmail.com',NULL,NULL,NULL,NULL,'$2a$10$AzcwSvsZdgFJN9yhGNHN0eFQsQVaXrFTIVAbn9G0tdGAcbIhfnVw6','0'),(264,'quan4@doivl.com','2022-11-02 17:56:54.363000','quan4@doivl.com','2022-11-02 17:56:54.363000','hoangnh00005',NULL,'hoangnh00005@gmail.com',NULL,NULL,NULL,NULL,'$2a$10$ohVFo1sSmY06PHwRxmCtTedWae6/EEQt3FZ1ATn10A/0gv4p.CVgi','0'),(274,'quan4@doivl.com','2022-11-02 17:56:54.513000','quan4@doivl.com','2022-11-02 17:56:54.513000','hoangnh00006',NULL,'hoangnh00006@gmail.com',NULL,NULL,NULL,NULL,'$2a$10$tSdZzE249xJoo/gIz1rFzeTqtfaWabA1KB8gyzxKaOYRaw2hhavgC','0'),(284,'quan4@doivl.com','2022-11-02 17:56:54.651000','quan4@doivl.com','2022-11-02 17:56:54.651000','hoangnh00007',NULL,'hoangnh00007@gmail.com',NULL,NULL,NULL,NULL,'$2a$10$ftjMjD/kwPr9IEu0.BMklOHv/TnnWYoao1clssy6BszD0o/cwgKOm','0'),(294,'quan4@doivl.com','2022-11-02 17:57:40.388000','quan4@doivl.com','2022-11-02 17:57:40.388000','hoangnh00008',NULL,'hoangnh00008@gmail.com',NULL,NULL,NULL,NULL,'$2a$10$PqUZBQJzxQ5nIS8YnjjK..uBDG1V/v.TEJoNQ50uv/tg1S3XFTLw2','0'),(304,'quan4@doivl.com','2022-11-02 17:57:40.547000','quan4@doivl.com','2022-11-02 17:57:40.547000','hoangnh00009',NULL,'hoangnh00009@gmail.com',NULL,NULL,NULL,NULL,'$2a$10$DPmDfzgcLIbcWk8Tug2uRe4TDdOctOn0tq4Fr29pf7U.G3mlBmrF6','0'),(314,'quan4@doivl.com','2022-11-02 17:57:40.686000','quan4@doivl.com','2022-11-02 17:57:40.686000','hoangnh00010',NULL,'hoangnh00010@gmail.com',NULL,NULL,NULL,NULL,'$2a$10$2HOHA.DnUTkIai7NvcYYmOplzr91I9h20dFhunEySfeHYivzM8M5C','0'),(324,'quan4@doivl.com','2022-11-02 18:12:29.491000','quan4@doivl.com','2022-11-02 18:12:29.491000','hoangnh00011',NULL,'hoangnh00011@gmail.com',NULL,NULL,NULL,NULL,'$2a$10$0qRkQ8ZmqO5ROi3AP.H/0.Xy0kHeMX1kjCeAWXSpMdNjmaFVKRlPy','0'),(334,'quan4@doivl.com','2022-11-02 18:12:29.646000','quan4@doivl.com','2022-11-02 18:12:29.646000','hoangnh00012',NULL,'hoangnh00012@gmail.com',NULL,NULL,NULL,NULL,'$2a$10$8VOsh5/w.XuT3T/QuzHE/eWTK6mRQW7lHEzlifEb2259prwYFjlXS','0'),(344,'quan4@doivl.com','2022-11-02 18:12:29.815000','quan4@doivl.com','2022-11-02 18:12:29.815000','hoangnh00013',NULL,'hoangnh00013@gmail.com',NULL,NULL,NULL,NULL,'$2a$10$W/KQB2lcdE9/GqIvOrAAo.JQuE6EVGlzgUIxoqrCtV7.IrpZaBpba','0');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_role`
--

DROP TABLE IF EXISTS `user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user_role` (
  `role_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_date` datetime(6) DEFAULT NULL,
  `is_leader` bit(1) DEFAULT NULL,
  PRIMARY KEY (`role_id`,`user_id`),
  KEY `FK859n2jvi8ivhui0rl0esws6o` (`user_id`),
  CONSTRAINT `FK1sc2g2ox9c5m3j7k2horvcsmy` FOREIGN KEY (`role_id`) REFERENCES `setting` (`setting_id`),
  CONSTRAINT `FK859n2jvi8ivhui0rl0esws6o` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_role`
--

LOCK TABLES `user_role` WRITE;
/*!40000 ALTER TABLE `user_role` DISABLE KEYS */;
INSERT INTO `user_role` VALUES (4,1,NULL,NULL,NULL,NULL,NULL),(4,2,NULL,NULL,NULL,NULL,NULL),(4,6,NULL,NULL,NULL,NULL,NULL),(4,24,NULL,NULL,NULL,NULL,NULL),(5,1,NULL,NULL,NULL,NULL,NULL),(5,4,NULL,NULL,NULL,NULL,NULL),(5,6,NULL,NULL,NULL,NULL,NULL),(5,14,NULL,NULL,NULL,NULL,NULL),(5,24,NULL,NULL,NULL,NULL,NULL),(5,34,NULL,NULL,NULL,NULL,NULL),(5,44,NULL,NULL,NULL,NULL,NULL),(6,1,NULL,NULL,NULL,NULL,NULL),(6,2,NULL,NULL,NULL,NULL,NULL),(6,4,NULL,NULL,NULL,NULL,NULL),(6,6,NULL,NULL,NULL,NULL,NULL),(6,24,NULL,NULL,NULL,NULL,NULL),(7,1,NULL,NULL,NULL,NULL,NULL),(7,2,NULL,NULL,NULL,NULL,NULL),(7,3,NULL,NULL,NULL,NULL,_binary '\0'),(7,6,NULL,NULL,NULL,NULL,_binary '\0'),(7,24,NULL,NULL,NULL,NULL,_binary '\0'),(8,1,NULL,NULL,NULL,NULL,_binary '\0'),(8,5,NULL,NULL,NULL,NULL,_binary '\0'),(8,6,NULL,NULL,NULL,NULL,_binary '\0'),(8,24,NULL,NULL,NULL,NULL,_binary '\0'),(9,1,NULL,NULL,NULL,NULL,_binary '\0'),(9,6,NULL,NULL,NULL,NULL,_binary '\0'),(9,7,NULL,NULL,NULL,NULL,_binary '\0'),(9,24,NULL,NULL,NULL,NULL,_binary '\0');
/*!40000 ALTER TABLE `user_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_roles`
--

DROP TABLE IF EXISTS `user_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user_roles` (
  `user_id` bigint(20) NOT NULL,
  `role_id` bigint(20) NOT NULL,
  KEY `FK7so15cfdoxfy1w9e9o8spfrdy` (`role_id`),
  KEY `FK55itppkw3i07do3h7qoclqd4k` (`user_id`),
  CONSTRAINT `FK55itppkw3i07do3h7qoclqd4k` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FK7so15cfdoxfy1w9e9o8spfrdy` FOREIGN KEY (`role_id`) REFERENCES `setting` (`setting_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_roles`
--

LOCK TABLES `user_roles` WRITE;
/*!40000 ALTER TABLE `user_roles` DISABLE KEYS */;
INSERT INTO `user_roles` VALUES (3,7),(7,9),(6,4),(6,5),(6,6),(6,7),(6,8),(6,9),(34,5),(44,5),(14,5),(14,7),(14,8),(64,5),(74,5),(84,5),(2,6),(54,4),(54,5),(5,8),(104,5),(114,5),(124,5),(4,8),(1,4),(134,5),(144,5),(154,5),(164,5),(174,5),(184,5),(194,5),(204,5),(205,5),(206,5),(207,5),(208,5),(209,5),(210,5),(211,5),(212,5),(213,5),(214,5),(215,5),(216,5),(24,4),(24,8),(224,5),(234,5),(244,5),(254,5),(264,5),(274,5),(284,5),(294,5),(304,5),(314,5),(324,5),(334,5),(344,5);
/*!40000 ALTER TABLE `user_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `web_contact`
--

DROP TABLE IF EXISTS `web_contact`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `web_contact` (
  `contact_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `email` varchar(40) DEFAULT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `message` text,
  `mobile` varchar(255) DEFAULT NULL,
  `response` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `category_id` bigint(20) DEFAULT NULL,
  `staff_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`contact_id`),
  KEY `FK5vib470hmeexgdgrm8hpi1sqn` (`category_id`),
  KEY `FK75it2sei0l4vtj7cobflr7q4h` (`staff_id`),
  CONSTRAINT `FK5vib470hmeexgdgrm8hpi1sqn` FOREIGN KEY (`category_id`) REFERENCES `setting` (`setting_id`),
  CONSTRAINT `FK75it2sei0l4vtj7cobflr7q4h` FOREIGN KEY (`staff_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=115 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `web_contact`
--

LOCK TABLES `web_contact` WRITE;
/*!40000 ALTER TABLE `web_contact` DISABLE KEYS */;
INSERT INTO `web_contact` VALUES (4,'xucxichbo@doivl.com','2022-10-12 10:13:10','hoangnhhe141380@fpt.edu.vn','2022-10-14 14:06:01','random123@gmail.com',NULL,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec nisl in libero posuere dapibus eget nec neque. Maecenas venenatis elit sed nunc volutpat efficitur. Donec at iaculis sapien. Nam eget turpis pulvinar','0123456789','ok nhe','0',104,6),(14,'anonymousUser','2022-10-12 14:34:29','hoangnhhe141380@fpt.edu.vn','2022-10-14 01:24:00','hoangnguyen@gmail.com',NULL,'asdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdf','0123123123','ádasdasd','1',104,6),(24,'anonymousUser','2022-10-12 14:34:48','hoangnhhe141380@fpt.edu.vn','2022-10-14 01:27:32','hoang3232nguyen@gmail.com',NULL,'rtwetertwetertwetertwetertwetertwetertwetertwetertwetertwetertwetertwetertwetertwetertwetertwetertwetertwetertwetertwetertwetertwetertwete','0123123323','ok ban nhe','0',104,6),(34,'xucxichbo@doivl.com','2022-10-12 15:14:46','hoangnhhe141380@fpt.edu.vn','2022-10-14 02:54:43','random123@gmail.com',NULL,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec nisl in libero posuere dapibus eget nec neque. Maecenas venenatis elit sed nunc volutpat efficitur. Donec at iaculis sapien. Nam eget turpis pulvinar','0123456789','oke anh nhe','0',104,6),(44,'xucxichbo@doivl.com','2022-10-12 15:15:06','quan22@doivl.com','2022-10-17 14:54:56','random123@gmail.com',NULL,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec nisl in libero posuere dapibus eget nec neque. Maecenas venenatis elit sed nunc volutpat efficitur. Donec at iaculis sapien. Nam eget turpis pulvinar','0123456789','a','1',104,3),(74,'quan22@doivl.com','2022-10-13 01:27:03','quan22@doivl.com','2022-10-17 14:46:16','hehe@gmail.com','CuMeo2000xx','something something something','0123456789','uk thi sao2a','0',114,3),(84,'anonymousUser','2022-10-13 16:29:32','quan22@doivl.com','2022-10-17 14:46:47','hoansgasdf@xyz.com','hoang','bug ne','054583213','dadad','0',124,3),(94,'anonymousUser','2022-10-14 02:56:41','hoangnhhe141380@fpt.edu.vn','2022-10-14 02:57:37','asdfawer@vzcv.xzx','asdfasdfas dpfasdf','dm web nhu cl','0124234434','deo tra loi','0',124,6),(104,'anonymousUser','2022-10-17 13:32:45','anonymousUser','2022-10-17 13:32:45','soaicaviet2000@gmail.com','Viet ','a','0968549998',NULL,'1',104,NULL),(114,'anonymousUser','2022-10-17 13:36:20','anonymousUser','2022-10-17 13:36:20','soaicaviet2000@gmail.com','Viet Nguyen','a','0968549998',NULL,'1',104,NULL);
/*!40000 ALTER TABLE `web_contact` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-03 12:04:28

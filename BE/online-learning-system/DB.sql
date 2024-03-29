-- MySQL dump 10.13  Distrib 5.6.50, for Linux (x86_64)
--
-- Host: localhost    Database: heroku_740a305870b5dd6
-- ------------------------------------------------------
-- Server version	5.6.50-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `class`
--

DROP TABLE IF EXISTS `class`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `class` (
  `class_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_by` bigint(20) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_by` bigint(20) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `setting_setting_id` bigint(20) DEFAULT NULL,
  `user_supporter_user_id` bigint(20) DEFAULT NULL,
  `user_trainer_user_id` bigint(20) DEFAULT NULL,
  `setting_branch_setting_id` bigint(20) DEFAULT NULL,
  `setting_term_setting_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`class_id`),
  KEY `FKop5vi4jnj9xbciqbnaxj6bqvq` (`setting_setting_id`),
  KEY `FKidldf3knwm4u7q56g8cbm8dp1` (`user_supporter_user_id`),
  KEY `FK2nhu6kke1w1cumqbgp62r0x09` (`user_trainer_user_id`),
  KEY `FKa0huwpllqdwlr8qhtr7n9wvn` (`setting_branch_setting_id`),
  KEY `FKeflmvnyoj9c88otvv12q6snum` (`setting_term_setting_id`),
  CONSTRAINT `FK2nhu6kke1w1cumqbgp62r0x09` FOREIGN KEY (`user_trainer_user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FKa0huwpllqdwlr8qhtr7n9wvn` FOREIGN KEY (`setting_branch_setting_id`) REFERENCES `setting` (`setting_id`),
  CONSTRAINT `FKeflmvnyoj9c88otvv12q6snum` FOREIGN KEY (`setting_term_setting_id`) REFERENCES `setting` (`setting_id`),
  CONSTRAINT `FKidldf3knwm4u7q56g8cbm8dp1` FOREIGN KEY (`user_supporter_user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FKop5vi4jnj9xbciqbnaxj6bqvq` FOREIGN KEY (`setting_setting_id`) REFERENCES `setting` (`setting_id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `class`
--

LOCK TABLES `class` WRITE;
/*!40000 ALTER TABLE `class` DISABLE KEYS */;
INSERT INTO `class` VALUES (1,NULL,'2022-10-07 23:15:04',NULL,'2022-10-07 23:15:04','SE1208','Lop SE1208','1',19,7,5,84,44),(4,NULL,NULL,NULL,'2022-10-09 07:30:36','SE1220','Lop SE1220','1',NULL,7,5,74,54),(14,NULL,NULL,NULL,NULL,'SE1231','Lop SE1231','1',NULL,7,5,94,64);
/*!40000 ALTER TABLE `class` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `class_user`
--

DROP TABLE IF EXISTS `class_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
/*!40000 ALTER TABLE `class_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `package`
--

DROP TABLE IF EXISTS `package`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `package` (
  `class_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  `discount_rate` bigint(20) DEFAULT NULL,
  `list_price` bigint(20) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `subject_subject_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`class_id`),
  KEY `FKhqylbfxmaef9sxn5a886h3p9q` (`subject_subject_id`),
  CONSTRAINT `FKhqylbfxmaef9sxn5a886h3p9q` FOREIGN KEY (`subject_subject_id`) REFERENCES `subject` (`subject_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `package`
--

LOCK TABLES `package` WRITE;
/*!40000 ALTER TABLE `package` DISABLE KEYS */;
/*!40000 ALTER TABLE `package` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permission`
--

DROP TABLE IF EXISTS `permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
INSERT INTO `permission` VALUES (4,24,'\0','\0','',''),(4,25,'\0','\0','',''),(4,26,'\0','\0','',''),(4,27,'\0','\0','',''),(4,28,'\0','\0','',''),(4,29,'\0','\0','',''),(5,24,'\0','\0','\0','\0'),(5,25,'\0','\0','\0','\0'),(5,26,'\0','\0','\0','\0'),(5,27,'\0','\0','\0','\0'),(5,28,'\0','\0','\0','\0'),(6,24,'\0','\0','\0','\0'),(6,25,'\0','\0','\0','\0'),(6,26,'\0','\0','\0','\0'),(6,27,'\0','\0','\0','\0'),(6,28,'\0','\0','',''),(6,29,'\0','\0','',''),(6,30,'\0','\0','',''),(6,31,'\0','\0','',''),(7,24,'\0','\0','\0','\0'),(7,25,'\0','\0','\0','\0'),(7,26,'\0','\0','\0','\0'),(7,27,'\0','\0','\0','\0'),(7,28,'\0','\0','\0','\0'),(8,24,'\0','\0','\0','\0'),(8,25,'\0','\0','\0','\0'),(8,26,'\0','\0','\0','\0'),(8,27,'\0','\0','\0','\0'),(8,28,'\0','\0','\0','\0');
/*!40000 ALTER TABLE `permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `setting`
--

DROP TABLE IF EXISTS `setting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `setting` (
  `setting_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_by` bigint(20) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_by` bigint(20) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=134 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `setting`
--

LOCK TABLES `setting` WRITE;
/*!40000 ALTER TABLE `setting` DISABLE KEYS */;
INSERT INTO `setting` VALUES (1,NULL,'2022-10-07 23:15:03',NULL,'2022-10-07 23:15:03','contain setting for each screen in system',NULL,'System Screen','TYPE_SCREEN',NULL,NULL,NULL),(2,NULL,'2022-10-07 23:15:03',NULL,'2022-10-07 23:15:03','contain api link',NULL,'API','TYPE_API',NULL,NULL,NULL),(3,NULL,'2022-10-07 23:15:03',NULL,'2022-10-07 23:15:03','contain settings relate to user role',NULL,'User Role','TYPE_ROLE',NULL,NULL,NULL),(4,NULL,'2022-10-07 23:15:03',NULL,'2022-10-09 05:25:19','admin12','2','admin','ROLE_ADMIN','1',NULL,3),(5,NULL,'2022-10-07 23:15:03',NULL,'2022-10-09 05:52:04','trainee','1000000000000000000000000000000000000000000000000','trainee','ROLE_TRAINEE','1',NULL,3),(6,NULL,'2022-10-07 23:15:03',NULL,'2022-10-07 23:15:03','description for manager','1','manager','ROLE_MANAGER','1',NULL,3),(7,NULL,'2022-10-07 23:15:03',NULL,'2022-10-08 14:29:14','description for supporter','1','supporter','ROLE_SUPPORTER','1',NULL,3),(8,NULL,'2022-10-07 23:15:03',NULL,'2022-10-07 23:15:03','description for trainer','1','trainer','ROLE_TRAINER','1',NULL,3),(9,NULL,'2022-10-07 23:15:03',NULL,'2022-10-07 23:15:03','description for expert','1','expert','ROLE_EXPERT','1',NULL,3),(10,NULL,'2022-10-07 23:15:03',NULL,'2022-10-07 23:15:03','type for test',NULL,'Test','TYPE_TEST',NULL,NULL,NULL),(11,NULL,'2022-10-07 23:15:03',NULL,'2022-10-07 23:15:03','description','1','Setting List ','/api/setting','1',24,2),(12,NULL,'2022-10-07 23:15:03',NULL,'2022-10-07 23:15:03','description ','1','Setting Filter','/api/setting-filter','1',24,2),(13,NULL,'2022-10-07 23:15:03',NULL,'2022-10-07 23:15:03','description ','1','Setting Status','/api/setting-status','1',24,2),(14,NULL,'2022-10-07 23:15:03',NULL,'2022-10-07 23:15:03','description ','1','Subject List','/api/subjects','1',28,2),(15,NULL,'2022-10-07 23:15:03',NULL,'2022-10-07 23:15:03','description ','1','Subject Status','/api/subjects-status','1',28,2),(16,NULL,'2022-10-07 23:15:03',NULL,'2022-10-07 23:15:03','description ','1','User List','/api/user','1',27,2),(17,NULL,'2022-10-07 23:15:03',NULL,'2022-10-07 23:15:03','description ','1','User Filter','/api/user-filter','1',27,2),(18,NULL,'2022-10-07 23:15:03',NULL,'2022-10-07 23:15:03','description ','1','User Status','/api/user-status','1',27,2),(19,NULL,'2022-10-07 23:15:03',NULL,'2022-10-09 08:50:29','description for test','2','test3','TEST3','1',NULL,10),(20,NULL,'2022-10-07 23:15:03',NULL,'2022-10-07 23:58:31','dfsfdfsfs','2','GRRRR 3','TEST4','0',NULL,10),(21,NULL,'2022-10-07 23:15:03',NULL,'2022-10-07 23:15:03','description','1','Dashboard ','/dashboard','1',NULL,1),(22,NULL,'2022-10-07 23:15:03',NULL,'2022-10-07 23:15:03','description','1','Profile  ','/profile','1',NULL,1),(23,NULL,'2022-10-07 23:15:03',NULL,'2022-10-07 23:15:03','description','1','ChangePassword   ','/change-password','1',NULL,1),(24,NULL,'2022-10-07 23:15:03',NULL,'2022-10-07 23:15:03','description','1','SettingList ','/setting-list','1',NULL,1),(25,NULL,'2022-10-07 23:15:03',NULL,'2022-10-07 23:15:03','description','1','SettingDetail','/setting-detail/:id','1',NULL,1),(26,NULL,'2022-10-07 23:15:03',NULL,'2022-10-07 23:15:03','description','1','UserDetail ','/user-detail/:id','1',NULL,1),(27,NULL,'2022-10-07 23:15:03',NULL,'2022-10-08 14:45:23','description','1','UserList','/user-list','1',NULL,1),(28,NULL,'2022-10-07 23:15:03',NULL,'2022-10-07 23:15:03','description','1','SubjectList','/subject-list','1',NULL,1),(29,NULL,'2022-10-07 23:15:03',NULL,'2022-10-07 23:15:03','description','1','SubjectDetail','/subject-detail/:id','1',NULL,1),(30,NULL,'2022-10-07 23:15:03',NULL,'2022-10-07 23:15:03','description','1','ClassList','/class-list','1',NULL,1),(31,NULL,'2022-10-07 23:15:03',NULL,'2022-10-07 23:15:03','description','1','ClassDetail','/class-detail/:id','1',NULL,1),(32,NULL,NULL,NULL,NULL,'API setting details','1','ApiSettingDetails','/api/setting-detail','1',25,2),(33,NULL,NULL,NULL,NULL,'API subject details','1','ApiSubjectDetail','/api/subjects-detail','1',29,2),(34,NULL,NULL,NULL,NULL,'API for user detail','1','ApiUserDetail','/api/user-detail','1',26,2),(35,NULL,NULL,NULL,NULL,'API for class','1','APIClasslist','/api/class','1',30,2),(36,NULL,NULL,NULL,NULL,'API for class detail','1','APIClassDetail','/api/class-detail','1',31,2),(37,NULL,NULL,NULL,NULL,'API for class-status','1','API class status','/api/class-status','1',30,2),(38,NULL,NULL,NULL,NULL,'term for classes','1','Term','TYPE_TERM','1',NULL,NULL),(39,NULL,NULL,NULL,NULL,'branch of classes','1','Branch','TYPE_BRANCH','1',NULL,NULL),(40,NULL,NULL,NULL,NULL,'contain different type of web contact','1','Contact Category','TYPE_CONTACT','1',NULL,NULL),(44,NULL,NULL,NULL,NULL,'term spring','3','Spring','TERM_SPRING','1',NULL,38),(54,NULL,NULL,NULL,NULL,'term summer','3','Summer','TERM_SUMMER','1',NULL,38),(64,NULL,NULL,NULL,NULL,'term fall','3','Fall','TERM_FALL','1',NULL,38),(74,NULL,NULL,NULL,NULL,'branch Ho Chi Minh','4','HCM','BRANCH_HCM','1',NULL,39),(84,NULL,NULL,NULL,NULL,'branch Ha Noi','4','Ha Noi','BRANCH_HN','1',NULL,39),(94,NULL,NULL,NULL,'2022-10-09 07:25:00','','1','Da Nang','BRANCH_DN','1',NULL,39),(104,NULL,NULL,NULL,NULL,'question about account','1','Account and billing','CONTACT_ACCOUNT','1',NULL,40),(114,NULL,NULL,NULL,NULL,'general question','1','General','CONTACT_GENERAL','1',NULL,40),(124,NULL,NULL,NULL,NULL,'report a bug , problem','1','Report a problem, bugs','CONTACT_PROBLEM','1',NULL,40);
/*!40000 ALTER TABLE `setting` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subject`
--

DROP TABLE IF EXISTS `subject`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `subject` (
  `subject_id` bigint(20) NOT NULL AUTO_INCREMENT,
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subject`
--

LOCK TABLES `subject` WRITE;
/*!40000 ALTER TABLE `subject` DISABLE KEYS */;
INSERT INTO `subject` VALUES (1,NULL,'LAB101','Lab Java','1',NULL,2),(2,NULL,'MAE203','Math','1',NULL,2),(3,NULL,'PRF192','Programming Fundamentals','1',NULL,6),(4,NULL,'PRO201','Front-end Web Development','1',NULL,6),(5,NULL,'CODE_A1','Subject A','1',3,2);
/*!40000 ALTER TABLE `subject` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `user_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_by` bigint(20) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_by` bigint(20) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `avatar_url` varchar(255) DEFAULT NULL,
  `email` varchar(40) DEFAULT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `mail_token` varchar(255) DEFAULT NULL,
  `mobile` varchar(255) DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `UK_ob8kqyqqgmefl0aco34akdtpe` (`email`),
  UNIQUE KEY `UK_sb8bbouer5wak8vyiiy4pf2bx` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,NULL,'2022-10-07 23:15:04',NULL,'2022-10-09 15:53:49','https://g23-lms.s3.ap-southeast-1.amazonaws.com/xucxichbo','xucxichbo@doivl.com','Duong Vu Viet Quan2',NULL,'09024324352','ỉuhewflasdvnbnvdtsry1231412','$2a$10$EaRMMJf70xsA8dr5fguwxOjMwMBzG5NMBFLGtWcYgdY.uvTwnopye','1','QuanDVVHE'),(2,NULL,'2022-10-07 23:15:04',NULL,'2022-10-09 08:35:41','https://g23-lms.s3.ap-southeast-1.amazonaws.com/quan1','quan1@doivl.com',NULL,NULL,NULL,'add note here abc','$2a$10$PRkuaL8bRCbKHc3eYO9wxeIWOqgkwzUCI8VOr8z0me1GnWg/9GxKe','1','quan1'),(3,NULL,'2022-10-07 23:15:04',NULL,'2022-10-07 23:15:04',NULL,'quan22@doivl.com',NULL,NULL,NULL,NULL,'$2a$10$V2knZSxoDgNhCFv9KSp/q.wQ5KWMITUduSCbCvmjrPinvJVncMI1O','1','quan22'),(4,NULL,'2022-10-07 23:15:04',NULL,'2022-10-09 06:45:51',NULL,'quan3@doivl.com',NULL,NULL,NULL,NULL,'$2a$10$sCybsiL5KbDTlNQ4uhvu5OLlFDhzpq2E6obsbjd1DjOkb6Keog8pS','1','quan3'),(5,NULL,'2022-10-07 23:15:04',NULL,'2022-10-09 06:46:12',NULL,'quan4@doivl.com',NULL,NULL,NULL,'abcccedfadsfasd','$2a$10$GcGHU7u/hxqASlTmjIVnyeznmq6H.ahh88U.v8NwOsqW4pQHEnGii','0','quan4'),(6,NULL,'2022-10-07 23:15:04',NULL,'2022-10-09 05:42:30',NULL,'hoangnhhe141380@fpt.edu.vn',NULL,NULL,NULL,NULL,'$2a$10$.lzyRua4zLzBfPUssazey.rBZFFFW6MdoNt7n32tZsMRFKECNu1JC','1','hoangnh'),(7,NULL,'2022-10-07 23:15:04',NULL,'2022-10-07 23:15:04',NULL,'quan6@doivl.com',NULL,NULL,NULL,NULL,'$2a$10$/hwQssrnlxDprjFKo9129e6Jpv31/GNnRTUEJ5NBp.AERD5eIx7xe','1','quan6'),(14,NULL,'2022-10-09 01:38:48',NULL,'2022-10-09 01:39:59',NULL,'gepiwe9397@dineroa.com','Duong Vu Viet Quan',NULL,NULL,NULL,'$2a$10$FEjJaaIG6Huzg3FSNXjxDuWj792xZvFwQcYAEYlVF4GGROZRh/C/G','1','gepiwqe'),(24,NULL,'2022-10-09 04:28:18',NULL,'2022-10-09 05:47:02','https://lh3.googleusercontent.com/a/ALm5wu3ZuZCBJPMKDMaoG4ZW8Dl5rCM1Qqf8sNKpSaQV=s96-c','vietnqhe140773@gmail.com','Việt Nguyễn','wY3JAv5h7z59VRbgQHubR87u1tpJmo',NULL,NULL,'$2a$10$Jk9iCGGvBq6zp0vsgaVcfeU.MdXplWwt1oabmtOiD1EZZs0/MkFry','1','vietnq'),(34,NULL,'2022-10-09 08:15:52',NULL,'2022-10-09 08:23:41','https://g23-lms.s3.ap-southeast-1.amazonaws.com/hoangdiudang3','hoangdiudang3@gmail.com',NULL,NULL,NULL,NULL,'$2a$10$ox8C3.znPezZo5Py1GgEeeJ53C0vXdeUvACatsR8TT/Y.hYN37LIm','1','hoang'),(44,NULL,'2022-10-09 08:32:09',NULL,'2022-10-09 08:32:09',NULL,'hoang131231235@gmail.com',NULL,'YVovlP9043DC997l84TftwGf44d44e',NULL,NULL,'$2a$10$FN94yEiUGrIXx2UlxMRZ8OwjnreFfmwcwp6bLYnMCW3ldI6fY5RoK','-1','hoang131');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_roles`
--

DROP TABLE IF EXISTS `user_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
INSERT INTO `user_roles` VALUES (3,7),(7,9),(14,5),(5,8),(6,4),(6,5),(6,6),(6,7),(6,8),(6,9),(24,5),(24,4),(24,6),(24,7),(24,8),(24,9),(2,7),(2,6),(2,4),(4,5),(4,6),(1,4),(1,5),(1,6),(1,7),(1,8),(1,9),(34,5),(44,5);
/*!40000 ALTER TABLE `user_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `web_contact`
--

DROP TABLE IF EXISTS `web_contact`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `web_contact` (
  `contact_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `email` varchar(40) DEFAULT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `web_contact`
--

LOCK TABLES `web_contact` WRITE;
/*!40000 ALTER TABLE `web_contact` DISABLE KEYS */;
INSERT INTO `web_contact` VALUES (4,'random123@gmail.com','Viet Quan','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec nisl in libero posuere dapibus eget nec neque. Maecenas venenatis elit sed nunc volutpat efficitur. Donec at iaculis sapien. Nam eget turpis pulvinar','0123456789',NULL,NULL,114,6),(14,'random123@gmail.com','Viet Quan','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec nisl in libero posuere dapibus eget nec neque. Maecenas venenatis elit sed nunc volutpat efficitur. Donec at iaculis sapien. Nam eget turpis pulvinar','0123456789',NULL,'1',114,NULL),(24,'random123@gmail.com','Viet Anh','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec nisl in libero posuere dapibus eget nec neque. Maecenas venenatis elit sed nunc volutpat efficitur. Donec at iaculis sapien. Nam eget turpis pulvinar','0123456789',NULL,'1',NULL,NULL),(34,'random123@gmail.com','Viet Anh','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec nisl in libero posuere dapibus eget nec neque. Maecenas venenatis elit sed nunc volutpat efficitur. Donec at iaculis sapien. Nam eget turpis pulvinar','0123456789',NULL,'1',104,NULL);
/*!40000 ALTER TABLE `web_contact` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'heroku_740a305870b5dd6'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-09 19:09:15

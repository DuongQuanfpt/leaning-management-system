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


--
-- Dumping data for table `class_subject`
--

LOCK TABLES `class_subject` WRITE;
/*!40000 ALTER TABLE `class_subject` DISABLE KEYS */;
/*!40000 ALTER TABLE `class_subject` ENABLE KEYS */;
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

--
-- Dumping data for table `permission`
--

LOCK TABLES `permission` WRITE;
/*!40000 ALTER TABLE `permission` DISABLE KEYS */;
INSERT INTO `permission` VALUES (4,24,_binary '\0',_binary '\0',_binary '',_binary ''),(4,25,_binary '\0',_binary '\0',_binary '',_binary ''),(4,26,_binary '\0',_binary '\0',_binary '',_binary ''),(4,27,_binary '\0',_binary '\0',_binary '',_binary ''),(4,28,_binary '\0',_binary '\0',_binary '',_binary ''),(4,29,_binary '\0',_binary '\0',_binary '',_binary ''),(5,24,_binary '\0',_binary '\0',_binary '\0',_binary '\0'),(5,25,_binary '\0',_binary '\0',_binary '\0',_binary '\0'),(5,26,_binary '\0',_binary '\0',_binary '\0',_binary '\0'),(5,27,_binary '\0',_binary '\0',_binary '\0',_binary '\0'),(5,28,_binary '\0',_binary '\0',_binary '\0',_binary '\0'),(6,24,_binary '\0',_binary '\0',_binary '\0',_binary '\0'),(6,25,_binary '\0',_binary '\0',_binary '\0',_binary '\0'),(6,26,_binary '\0',_binary '\0',_binary '\0',_binary '\0'),(6,27,_binary '\0',_binary '\0',_binary '\0',_binary '\0'),(6,28,_binary '\0',_binary '\0',_binary '',_binary ''),(6,29,_binary '\0',_binary '\0',_binary '',_binary ''),(6,30,_binary '\0',_binary '\0',_binary '',_binary ''),(6,31,_binary '\0',_binary '\0',_binary '',_binary ''),(7,24,_binary '\0',_binary '\0',_binary '\0',_binary '\0'),(7,25,_binary '\0',_binary '\0',_binary '\0',_binary '\0'),(7,26,_binary '\0',_binary '\0',_binary '\0',_binary '\0'),(7,27,_binary '\0',_binary '\0',_binary '\0',_binary '\0'),(7,28,_binary '\0',_binary '\0',_binary '\0',_binary '\0'),(8,24,_binary '\0',_binary '\0',_binary '\0',_binary '\0'),(8,25,_binary '\0',_binary '\0',_binary '\0',_binary '\0'),(8,26,_binary '\0',_binary '\0',_binary '\0',_binary '\0'),(8,27,_binary '\0',_binary '\0',_binary '\0',_binary '\0'),(8,28,_binary '\0',_binary '\0',_binary '\0',_binary '\0');
/*!40000 ALTER TABLE `permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `setting`
--

LOCK TABLES `setting` WRITE;
/*!40000 ALTER TABLE `setting` DISABLE KEYS */;
INSERT INTO `setting` VALUES (1,NULL,'2022-10-07 23:15:03',NULL,'2022-10-07 23:15:03','contain setting for each screen in system',NULL,'System Screen','TYPE_SCREEN',NULL,NULL,NULL),(2,NULL,'2022-10-07 23:15:03',NULL,'2022-10-07 23:15:03','contain api link',NULL,'API','TYPE_API',NULL,NULL,NULL),(3,NULL,'2022-10-07 23:15:03',NULL,'2022-10-07 23:15:03','contain settings relate to user role',NULL,'User Role','TYPE_ROLE',NULL,NULL,NULL),(4,NULL,'2022-10-07 23:15:03',NULL,'2022-10-09 05:25:19','admin12','2','admin','ROLE_ADMIN','1',NULL,3),(5,NULL,'2022-10-07 23:15:03',NULL,'2022-10-09 05:52:04','trainee','1000000000000000000000000000000000000000000000000','trainee','ROLE_TRAINEE','1',NULL,3),(6,NULL,'2022-10-07 23:15:03',NULL,'2022-10-07 23:15:03','description for manager','1','manager','ROLE_MANAGER','1',NULL,3),(7,NULL,'2022-10-07 23:15:03',NULL,'2022-10-08 14:29:14','description for supporter','1','supporter','ROLE_SUPPORTER','1',NULL,3),(8,NULL,'2022-10-07 23:15:03',NULL,'2022-10-07 23:15:03','description for trainer','1','trainer','ROLE_TRAINER','1',NULL,3),(9,NULL,'2022-10-07 23:15:03',NULL,'2022-10-07 23:15:03','description for expert','1','expert','ROLE_EXPERT','1',NULL,3),(10,NULL,'2022-10-07 23:15:03',NULL,'2022-10-07 23:15:03','type for test',NULL,'Test','TYPE_TEST',NULL,NULL,NULL),(11,NULL,'2022-10-07 23:15:03',NULL,'2022-10-07 23:15:03','description','1','Setting List ','/api/setting','1',24,2),(12,NULL,'2022-10-07 23:15:03',NULL,'2022-10-07 23:15:03','description ','1','Setting Filter','/api/setting-filter','1',24,2),(13,NULL,'2022-10-07 23:15:03',NULL,'2022-10-07 23:15:03','description ','1','Setting Status','/api/setting-status','1',24,2),(14,NULL,'2022-10-07 23:15:03',NULL,'2022-10-07 23:15:03','description ','1','Subject List','/api/subjects','1',28,2),(15,NULL,'2022-10-07 23:15:03',NULL,'2022-10-07 23:15:03','description ','1','Subject Status','/api/subjects-status','1',28,2),(16,NULL,'2022-10-07 23:15:03',NULL,'2022-10-07 23:15:03','description ','1','User List','/api/user','1',27,2),(17,NULL,'2022-10-07 23:15:03',NULL,'2022-10-07 23:15:03','description ','1','User Filter','/api/user-filter','1',27,2),(18,NULL,'2022-10-07 23:15:03',NULL,'2022-10-07 23:15:03','description ','1','User Status','/api/user-status','1',27,2),(19,NULL,'2022-10-07 23:15:03',NULL,'2022-10-09 08:50:29','description for test','2','test3','TEST3','1',NULL,10),(20,NULL,'2022-10-07 23:15:03',NULL,'2022-10-07 23:58:31','dfsfdfsfs','2','GRRRR 3','TEST4','0',NULL,10),(21,NULL,'2022-10-07 23:15:03',NULL,'2022-10-07 23:15:03','description','1','Dashboard ','/dashboard','1',NULL,1),(22,NULL,'2022-10-07 23:15:03',NULL,'2022-10-07 23:15:03','description','1','Profile  ','/profile','1',NULL,1),(23,NULL,'2022-10-07 23:15:03',NULL,'2022-10-07 23:15:03','description','1','ChangePassword   ','/change-password','1',NULL,1),(24,NULL,'2022-10-07 23:15:03',NULL,'2022-10-07 23:15:03','description','1','SettingList ','/setting-list','1',NULL,1),(25,NULL,'2022-10-07 23:15:03',NULL,'2022-10-07 23:15:03','description','1','SettingDetail','/setting-detail/:id','1',NULL,1),(26,NULL,'2022-10-07 23:15:03',NULL,'2022-10-07 23:15:03','description','1','UserDetail ','/user-detail/:id','1',NULL,1),(27,NULL,'2022-10-07 23:15:03',NULL,'2022-10-08 14:45:23','description','1','UserList','/user-list','1',NULL,1),(28,NULL,'2022-10-07 23:15:03',NULL,'2022-10-07 23:15:03','description','1','SubjectList','/subject-list','1',NULL,1),(29,NULL,'2022-10-07 23:15:03',NULL,'2022-10-07 23:15:03','description','1','SubjectDetail','/subject-detail/:id','1',NULL,1),(30,NULL,'2022-10-07 23:15:03',NULL,'2022-10-07 23:15:03','description','1','ClassList','/class-list','1',NULL,1),(31,NULL,'2022-10-07 23:15:03',NULL,'2022-10-07 23:15:03','description','1','ClassDetail','/class-detail/:id','1',NULL,1),(32,NULL,NULL,NULL,NULL,'API setting details','1','ApiSettingDetails','/api/setting-detail','1',25,2),(33,NULL,NULL,NULL,NULL,'API subject details','1','ApiSubjectDetail','/api/subjects-detail','1',29,2),(34,NULL,NULL,NULL,NULL,'API for user detail','1','ApiUserDetail','/api/user-detail','1',26,2),(35,NULL,NULL,NULL,NULL,'API for class','1','APIClasslist','/api/class','1',30,2),(36,NULL,NULL,NULL,NULL,'API for class detail','1','APIClassDetail','/api/class-detail','1',31,2),(37,NULL,NULL,NULL,NULL,'API for class-status','1','API class status','/api/class-status','1',30,2),(38,NULL,NULL,NULL,NULL,'term for classes','1','Term','TYPE_TERM','1',NULL,NULL),(39,NULL,NULL,NULL,NULL,'branch of classes','1','Branch','TYPE_BRANCH','1',NULL,NULL),(40,NULL,NULL,NULL,NULL,'contain different type of web contact','1','Contact Category','TYPE_CONTACT','1',NULL,NULL),(44,NULL,NULL,NULL,NULL,'term spring','3','Spring','TERM_SPRING','1',NULL,38),(54,NULL,NULL,NULL,NULL,'term summer','3','Summer','TERM_SUMMER','1',NULL,38),(64,NULL,NULL,NULL,NULL,'term fall','3','Fall','TERM_FALL','1',NULL,38),(74,NULL,NULL,NULL,NULL,'branch Ho Chi Minh','4','HCM','BRANCH_HCM','1',NULL,39),(84,NULL,NULL,NULL,NULL,'branch Ha Noi','4','Ha Noi','BRANCH_HN','1',NULL,39),(94,NULL,NULL,NULL,'2022-10-09 07:25:00','','1','Da Nang','BRANCH_DN','1',NULL,39),(104,NULL,NULL,NULL,NULL,'question about account','1','Account and billing','CONTACT_ACCOUNT','1',NULL,40),(114,NULL,NULL,NULL,NULL,'general question','1','General','CONTACT_GENERAL','1',NULL,40),(124,NULL,NULL,NULL,NULL,'report a bug , problem','1','Report a problem, bugs','CONTACT_PROBLEM','1',NULL,40);
/*!40000 ALTER TABLE `setting` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `subject`
--

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,NULL,'2022-10-07 23:15:04',NULL,'2022-10-09 15:53:49','https://g23-lms.s3.ap-southeast-1.amazonaws.com/xucxichbo','xucxichbo@doivl.com','Duong Vu Viet Quan2',NULL,'09024324352','ỉuhewflasdvnbnvdtsry1231412','$2a$10$EaRMMJf70xsA8dr5fguwxOjMwMBzG5NMBFLGtWcYgdY.uvTwnopye','1','QuanDVVHE'),(2,NULL,'2022-10-07 23:15:04',NULL,'2022-10-09 08:35:41','https://g23-lms.s3.ap-southeast-1.amazonaws.com/quan1','quan1@doivl.com',NULL,NULL,NULL,'add note here abc','$2a$10$PRkuaL8bRCbKHc3eYO9wxeIWOqgkwzUCI8VOr8z0me1GnWg/9GxKe','1','quan1'),(3,NULL,'2022-10-07 23:15:04',NULL,'2022-10-07 23:15:04',NULL,'quan22@doivl.com',NULL,NULL,NULL,NULL,'$2a$10$V2knZSxoDgNhCFv9KSp/q.wQ5KWMITUduSCbCvmjrPinvJVncMI1O','1','quan22'),(4,NULL,'2022-10-07 23:15:04',NULL,'2022-10-09 06:45:51',NULL,'quan3@doivl.com',NULL,NULL,NULL,NULL,'$2a$10$sCybsiL5KbDTlNQ4uhvu5OLlFDhzpq2E6obsbjd1DjOkb6Keog8pS','1','quan3'),(5,NULL,'2022-10-07 23:15:04',NULL,'2022-10-09 06:46:12',NULL,'quan4@doivl.com',NULL,NULL,NULL,'abcccedfadsfasd','$2a$10$GcGHU7u/hxqASlTmjIVnyeznmq6H.ahh88U.v8NwOsqW4pQHEnGii','0','quan4'),(6,NULL,'2022-10-07 23:15:04',NULL,'2022-10-09 05:42:30',NULL,'hoangnhhe141380@fpt.edu.vn',NULL,NULL,NULL,NULL,'$2a$10$.lzyRua4zLzBfPUssazey.rBZFFFW6MdoNt7n32tZsMRFKECNu1JC','1','hoangnh'),(7,NULL,'2022-10-07 23:15:04',NULL,'2022-10-07 23:15:04',NULL,'quan6@doivl.com',NULL,NULL,NULL,NULL,'$2a$10$/hwQssrnlxDprjFKo9129e6Jpv31/GNnRTUEJ5NBp.AERD5eIx7xe','1','quan6'),(14,NULL,'2022-10-09 01:38:48',NULL,'2022-10-09 01:39:59',NULL,'gepiwe9397@dineroa.com','Duong Vu Viet Quan',NULL,NULL,NULL,'$2a$10$FEjJaaIG6Huzg3FSNXjxDuWj792xZvFwQcYAEYlVF4GGROZRh/C/G','1','gepiwqe'),(24,NULL,'2022-10-09 04:28:18',NULL,'2022-10-09 05:47:02','https://lh3.googleusercontent.com/a/ALm5wu3ZuZCBJPMKDMaoG4ZW8Dl5rCM1Qqf8sNKpSaQV=s96-c','vietnqhe140773@gmail.com','Việt Nguyễn','wY3JAv5h7z59VRbgQHubR87u1tpJmo',NULL,NULL,'$2a$10$Jk9iCGGvBq6zp0vsgaVcfeU.MdXplWwt1oabmtOiD1EZZs0/MkFry','1','vietnq'),(34,NULL,'2022-10-09 08:15:52',NULL,'2022-10-09 08:23:41','https://g23-lms.s3.ap-southeast-1.amazonaws.com/hoangdiudang3','hoangdiudang3@gmail.com',NULL,NULL,NULL,NULL,'$2a$10$ox8C3.znPezZo5Py1GgEeeJ53C0vXdeUvACatsR8TT/Y.hYN37LIm','1','hoang'),(44,NULL,'2022-10-09 08:32:09',NULL,'2022-10-09 08:32:09',NULL,'hoang131231235@gmail.com',NULL,'YVovlP9043DC997l84TftwGf44d44e',NULL,NULL,'$2a$10$FN94yEiUGrIXx2UlxMRZ8OwjnreFfmwcwp6bLYnMCW3ldI6fY5RoK','-1','hoang131');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user_roles`
--

LOCK TABLES `user_roles` WRITE;
/*!40000 ALTER TABLE `user_roles` DISABLE KEYS */;
INSERT INTO `user_roles` VALUES (3,7),(7,9),(14,5),(5,8),(6,4),(6,5),(6,6),(6,7),(6,8),(6,9),(24,5),(24,4),(24,6),(24,7),(24,8),(24,9),(2,7),(2,6),(2,4),(4,5),(4,6),(1,4),(1,5),(1,6),(1,7),(1,8),(1,9),(34,5),(44,5);
/*!40000 ALTER TABLE `user_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `web_contact`
--


/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-11 11:37:21

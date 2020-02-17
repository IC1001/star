-- MySQL dump 10.13  Distrib 8.0.18, for Win64 (x86_64)
--
-- Host: localhost    Database: star-album
-- ------------------------------------------------------
-- Server version	8.0.18

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
-- Table structure for table `album`
--

DROP TABLE IF EXISTS `album`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `album` (
  `album_id` int(5) NOT NULL AUTO_INCREMENT,
  `user_id` int(5) NOT NULL,
  `user_name` varchar(30) NOT NULL,
  `album_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `cover` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `type` varchar(255) NOT NULL,
  `date` varchar(255) DEFAULT NULL,
  `views` int(5) DEFAULT '0',
  `collect` int(5) DEFAULT '0',
  `img` varchar(20000) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `img_name` text CHARACTER SET utf8 COLLATE utf8_general_ci,
  `likes` int(5) DEFAULT '0',
  PRIMARY KEY (`album_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=84 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `album`
--

LOCK TABLES `album` WRITE;
/*!40000 ALTER TABLE `album` DISABLE KEYS */;
INSERT INTO `album` VALUES (1,64,'admin','城市 建筑','8eeb9e40692a020b02a4b499e38639f2','风景','',117,2,'8eeb9e40692a020b02a4b499e38639f2,9d77983cdfd3045fd0dc55d2523fd5ac,7a6aadad57da785934befb2d2fd125bd,d0558a4e95e5d91efa6a8ba091cc809e,','1,2,3,4,',5),(57,70,'haha','海浪','9e47fe6818cf9731488e3673d2de1fd9','风景','2020-1-19',26,1,'9e47fe6818cf9731488e3673d2de1fd9,cb80f67ec01cece80a9fa48af9ad9615,','海浪,浪',4),(58,64,'admin','张国荣','f8f61d155855f489453ce1b97b2a59b2','人像','2020-1-19',6,2,'f8f61d155855f489453ce1b97b2a59b2,0a34991ba4a9b31c73a362c943b1941f,1f9316a20dccb70073400f067f977487,','1,2,3,',3),(59,64,'admin','吴彦祖','271ae011dbd5c842d0934d15d93c6458','人像','2020-1-19',3,1,'271ae011dbd5c842d0934d15d93c6458,443147dc89591fda1f009e4b4a4c07e2,f37d061cf8abfcf8b3bbf1b7a3c09c63,','1,2,3,',2),(60,64,'admin','朴宝英','174b48c227b4f6ec4cf346cad3fade60','人像','2020-1-19',17,4,'174b48c227b4f6ec4cf346cad3fade60,bd9e01b683e3705c016419ba811a2e7a,b6a1d8325205e7ad62673c2f3cd43174,acfe1a028c7e36539d48f5fe395a6bf8,','1,2,3,4,',5),(61,64,'admin','狗','56b58aaef6ae94d2e3b7cae0d1d5f219','生态','2020-1-19',5,0,'56b58aaef6ae94d2e3b7cae0d1d5f219,b267ab08f9f6c6c0b24c05b27008f462,7da2413d7a2fa8c298edfa71acb2c46b,','1,2,3,',2),(62,64,'admin','猫','2f94bd30548006f0a97cec878cfa0633','生态','2020-1-19',11,1,'2f94bd30548006f0a97cec878cfa0633,5e5466e17c7241411a979ac44e49c45e,','白,望,',5),(63,64,'admin','黑白','de805c3690a1a5214264a6c26fbbf292','艺术','2020-1-19',13,2,'de805c3690a1a5214264a6c26fbbf292,6ea3fe2ecebe1208153b6e717830fe3f,','1,2,',3),(64,64,'admin','冬','3a0efff762cbcaf9766d9af51948f3fa','风景','2020-1-19',55,3,'3a0efff762cbcaf9766d9af51948f3fa,21f536334b0f1562ed0076f8e07e372a,c3d73a676510bfda5be3d45125438057,','雪,第一场雪,,',4),(65,71,'hehe','默认相册',NULL,'private','2020-1-19',0,0,'',NULL,0),(66,71,'hehe','猫','113bd821c85053405e28c4e524661d73','生态','2020-1-19',3,1,'113bd821c85053405e28c4e524661d73,9b48afc8945210661afbe65d870aa12f,','1,2,',3),(67,71,'hehe','黑白','f639d96bc544b9c1e92cd9e34cc5099d','艺术','2020-1-19',2,0,'f639d96bc544b9c1e92cd9e34cc5099d,5014c6744968ba4dea918ae40f3a0977,','1,2,',3),(68,71,'hehe','雾','22ba8a507e507386572fd0809c6f460f','艺术','2020-1-19',2,0,'22ba8a507e507386572fd0809c6f460f,00d963d43a93690e8cfdc4514deb962d,','雾气腾腾,2,',2),(69,71,'hehe','美图美景','7765f0907a3c1cf215c210ab5727ed99','风景','2020-1-19',6,2,'7765f0907a3c1cf215c210ab5727ed99,80fc22f17e6d7d88e2c49765d8fdfc0a,','11,22,',4),(70,72,'heihei','默认相册','04e606e1547285711899757cf504c742','private','2020-1-19',20,2,'04e606e1547285711899757cf504c742,','1,',4),(71,72,'heihei','节日习俗','e830e55499d3de3ff051b25c2090a2c5','纪实','2020-1-19',3,0,'e830e55499d3de3ff051b25c2090a2c5,561e943c3f5af341aaa150f53ea0463c,','贴春联,挂灯笼,',1),(72,72,'heihei','民俗风情','256ff70f37cd371e2f18a08ab80e38c8','纪实','2020-1-19',0,0,'256ff70f37cd371e2f18a08ab80e38c8,e39707cce65909356fd310a2b34123c9,','1,2,',1),(73,72,'heihei','默认相册',NULL,'风景','2020-1-19',0,0,'',NULL,0),(74,73,'xixi','默认相册',NULL,'private','2020-1-19',0,0,'',NULL,0),(75,73,'xixi','随意','f2cec8c97718e1dfe0b38ce222d3936e','艺术','2020-1-19',1,0,'f2cec8c97718e1dfe0b38ce222d3936e,80a0d098d1dc9edbcdb0778d28f7a4dd,','1,2,',1),(76,73,'xixi','李钟硕','4bbb1e6ae68f705d74cb4116629b744b','人像','2020-1-19',4,1,'4bbb1e6ae68f705d74cb4116629b744b,fe6c31ce8198d67dba180375ad2912a3,','笑,再笑,',1),(77,73,'xixi','春节','e2f31723cd9ebd3e5e91c1c65996e31d','纪实','2020-1-19',2,0,'e2f31723cd9ebd3e5e91c1c65996e31d,','1,',1),(78,74,'lala','默认相册',NULL,'private','2020-1-19',0,0,'',NULL,0),(79,74,'lala','习俗活动','0ee1976d0d8b7837ab4f7735560d5455','纪实','2020-1-19',3,0,'0ee1976d0d8b7837ab4f7735560d5455,c0521aa94f93d9d175593221163caf37,','1,2,',1),(80,74,'lala','灯','bd961e9779c83e5b4ca2a5c29cf0c184','艺术','2020-1-19',17,1,'bd961e9779c83e5b4ca2a5c29cf0c184,aa5bdf42b51b6028668bc7bc03d61d65,','1,2,',2),(81,74,'lala','吴亦凡','89229b24c7b8a7acbb68dc3d828c2970','人像','2020-1-19',4,0,'89229b24c7b8a7acbb68dc3d828c2970,d4d386cf0cae080447abc6d373d207cb,','1,2,',1),(82,75,'777','默认相册',NULL,'private','2020-1-19',0,0,'',NULL,0),(83,76,'guagua','默认相册',NULL,'private','2020-1-21',0,0,'',NULL,0);
/*!40000 ALTER TABLE `album` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `album_id` int(5) NOT NULL,
  `user_id` int(5) NOT NULL,
  `from_name` varchar(30) NOT NULL,
  `from_id` int(5) NOT NULL,
  `content` text NOT NULL,
  `date` varchar(100) DEFAULT NULL,
  `portrait` varchar(255) DEFAULT NULL,
  `id` int(5) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (39,65,'admin',64,'222','2020-01-13 21:41:59','c19925963ca07221b70ceef5b02dc8c4',1),(39,65,'admin',64,'22333','2020-01-13 21:44:59','c19925963ca07221b70ceef5b02dc8c4',2),(39,65,'admin',64,'77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777','2020-01-13 23:31:43','c19925963ca07221b70ceef5b02dc8c4',3),(36,64,'admin',64,'111','2020-01-16 22:40:41','c19925963ca07221b70ceef5b02dc8c4',4),(36,64,'admin',64,'222','2020-01-16 22:49:33','c19925963ca07221b70ceef5b02dc8c4',5),(36,64,'admin',64,'333','2020-01-16 22:50:04','c19925963ca07221b70ceef5b02dc8c4',6),(36,64,'admin',64,'444','2020-01-16 22:54:01','c19925963ca07221b70ceef5b02dc8c4',7),(35,64,'admin',64,'1111','2020-01-17 12:55:57','c19925963ca07221b70ceef5b02dc8c4',8),(35,64,'admin',64,'222','2020-01-17 13:02:45','c19925963ca07221b70ceef5b02dc8c4',9),(36,64,'admin',64,'5555','2020-01-17 13:05:24','c19925963ca07221b70ceef5b02dc8c4',10),(35,64,'admin',64,'333','2020-01-17 13:32:33','c19925963ca07221b70ceef5b02dc8c4',11),(58,64,'hehe',71,'帅！','2020-01-19 20:40:08','2b768fc3cff19145e7ed4c71ad194da2',12),(60,64,'hehe',71,'美！','2020-01-19 20:40:38','2b768fc3cff19145e7ed4c71ad194da2',13),(62,64,'hehe',71,'可爱！','2020-01-19 20:41:09','2b768fc3cff19145e7ed4c71ad194da2',14),(60,64,'heihei',72,'plmm！','2020-01-19 20:45:39','d454b342ebf8ded0fc5241e68ca6c405',15),(59,64,'heihei',72,'帅！','2020-01-19 20:47:25','d454b342ebf8ded0fc5241e68ca6c405',16),(64,64,'heihei',72,'冷！','2020-01-19 20:47:50','d454b342ebf8ded0fc5241e68ca6c405',17),(60,64,'xixi',73,'女神！','2020-01-19 20:49:49','07612f83aa474a59bac432aa67173ba4',18),(1,64,'xixi',73,'cool','2020-01-19 20:50:00','07612f83aa474a59bac432aa67173ba4',19),(57,70,'xixi',73,'cool！','2020-01-19 20:50:13','07612f83aa474a59bac432aa67173ba4',20),(62,64,'lala',74,'cute~','2020-01-19 20:54:29','user.png',21),(63,64,'lala',74,'1111','2020-01-19 20:56:42','user.png',22),(64,64,'admin',64,'下雪啦','2020-01-19 22:55:09','c8f3632c0ef7a4b8c29f11b2ec3ce444',23),(1,64,'haha',70,'收藏当壁纸了！','2020-01-19 22:56:46','665a1969dc1e4167fc65c58e16fe9c19',24),(1,64,'lala',74,'科技感十足！','2020-01-19 22:57:46','471b84b10ecf5ac5ad767a785dda0863',25),(64,64,'haha',70,'','2020-01-20 13:54:00','665a1969dc1e4167fc65c58e16fe9c19',26),(1,64,'guagua',76,'帅！','2020-1-21-16-23','user.png',27);
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `friend_view`
--

DROP TABLE IF EXISTS `friend_view`;
/*!50001 DROP VIEW IF EXISTS `friend_view`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `friend_view` AS SELECT 
 1 AS `id`,
 1 AS `name`,
 1 AS `portrait`,
 1 AS `follow`,
 1 AS `fans`,
 1 AS `followed_user`,
 1 AS `like_album`,
 1 AS `collect_album`,
 1 AS `fans_user`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `nopw`
--

DROP TABLE IF EXISTS `nopw`;
/*!50001 DROP VIEW IF EXISTS `nopw`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `nopw` AS SELECT 
 1 AS `id`,
 1 AS `name`,
 1 AS `portrait`,
 1 AS `follow`,
 1 AS `fans`,
 1 AS `followed_user`,
 1 AS `fans_user`,
 1 AS `like_album`,
 1 AS `collect_album`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `portrait` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT 'user.png',
  `follow` int(10) DEFAULT '0',
  `fans` int(10) DEFAULT '0',
  `followed_user` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '',
  `like_album` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '',
  `collect_album` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '',
  `fans_user` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '',
  `sex` int(2) DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (64,'admin','123456','c8f3632c0ef7a4b8c29f11b2ec3ce444',0,5,'','35,36,37,35,38,1,80,62,63,69,70,60,','36,70,','74,73,70,72,71,',1),(70,'haha','123456','665a1969dc1e4167fc65c58e16fe9c19',1,0,'64,','','','',1),(71,'hehe','123456','2b768fc3cff19145e7ed4c71ad194da2',1,0,'64,','1,60,62,61,66,64,67,68,63,57,58,59,','60,63,58,','',1),(72,'heihei','123456','d454b342ebf8ded0fc5241e68ca6c405',1,0,'64,','58,60,62,68,67,71,72,70,69,64,66,61,57,1,','60,62,66,64,','',1),(73,'xixi','123456','07612f83aa474a59bac432aa67173ba4',1,0,'64,','1,60,57,62,64,70,69,','1,60,57,64,70,69,','',1),(74,'lala','123456','471b84b10ecf5ac5ad767a785dda0863',1,0,'64,','1,57,60,62,67,66,64,70,69,59,76,80,63,81,75,77,79,58,','60,64,69,1,58,63,59,76,80,','',1),(75,'777','123456','user.png',0,0,'','','','',1),(76,'guagua','123456','user.png',0,0,'','','','',1);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `zone_view`
--

DROP TABLE IF EXISTS `zone_view`;
/*!50001 DROP VIEW IF EXISTS `zone_view`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `zone_view` AS SELECT 
 1 AS `id`,
 1 AS `name`,
 1 AS `portrait`,
 1 AS `follow`,
 1 AS `fans`,
 1 AS `followed_user`,
 1 AS `fans_user`,
 1 AS `like_album`,
 1 AS `collect_album`,
 1 AS `album_id`,
 1 AS `cover`,
 1 AS `type`,
 1 AS `date`,
 1 AS `img`,
 1 AS `img_name`,
 1 AS `collect`,
 1 AS `views`,
 1 AS `likes`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `friend_view`
--

/*!50001 DROP VIEW IF EXISTS `friend_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `friend_view` AS select distinct `user`.`id` AS `id`,`user`.`name` AS `name`,`user`.`portrait` AS `portrait`,`user`.`follow` AS `follow`,`user`.`fans` AS `fans`,`user`.`followed_user` AS `followed_user`,`user`.`like_album` AS `like_album`,`user`.`collect_album` AS `collect_album`,`user`.`fans_user` AS `fans_user` from `user` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `nopw`
--

/*!50001 DROP VIEW IF EXISTS `nopw`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `nopw` AS select `user`.`id` AS `id`,`user`.`name` AS `name`,`user`.`portrait` AS `portrait`,`user`.`follow` AS `follow`,`user`.`fans` AS `fans`,`user`.`followed_user` AS `followed_user`,`user`.`fans_user` AS `fans_user`,`user`.`like_album` AS `like_album`,`user`.`collect_album` AS `collect_album` from `user` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `zone_view`
--

/*!50001 DROP VIEW IF EXISTS `zone_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `zone_view` AS select `user`.`id` AS `id`,`user`.`name` AS `name`,`user`.`portrait` AS `portrait`,`user`.`follow` AS `follow`,`user`.`fans` AS `fans`,`user`.`followed_user` AS `followed_user`,`user`.`fans_user` AS `fans_user`,`user`.`like_album` AS `like_album`,`user`.`collect_album` AS `collect_album`,`album`.`album_id` AS `album_id`,`album`.`cover` AS `cover`,`album`.`type` AS `type`,`album`.`date` AS `date`,`album`.`img` AS `img`,`album`.`img_name` AS `img_name`,`album`.`collect` AS `collect`,`album`.`views` AS `views`,`album`.`likes` AS `likes` from (`user` join `album` on((`user`.`id` = `album`.`user_id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-02-16 14:44:16

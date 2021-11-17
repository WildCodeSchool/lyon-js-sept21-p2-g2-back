DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `tag`;
CREATE TABLE `tag` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tagName` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `post`;
CREATE TABLE `post` (
  `id` int NOT NULL AUTO_INCREMENT,
  `authorId` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `postContent` text NOT NULL,
  `pictures` text,
  `createdAt` datetime(6) NOT NULL,
  `tripDate` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `post_fk0` (`authorId`),
  CONSTRAINT `post_fk0` FOREIGN KEY (`authorId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `postId` int NOT NULL,
  `commentAuthor` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `publishedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `comment_fk0` (`postId`),
  CONSTRAINT `comment_fk0` FOREIGN KEY (`postId`) REFERENCES `post` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



DROP TABLE IF EXISTS `post_tag`;
CREATE TABLE `post_tag` (
  `postId` int NOT NULL,
  `tagId` int DEFAULT NULL,
  KEY `post_tag_fk0` (`postId`),
  KEY `post_tag_fk1` (`tagId`),
  CONSTRAINT `post_tag_fk0` FOREIGN KEY (`postId`) REFERENCES `post` (`id`),
  CONSTRAINT `post_tag_fk1` FOREIGN KEY (`tagId`) REFERENCES `tag` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

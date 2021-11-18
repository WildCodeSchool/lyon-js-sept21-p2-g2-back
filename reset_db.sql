SET
  FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `post`;
DROP TABLE IF EXISTS `comment`;
DROP TABLE IF EXISTS `post_tag`;
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
    `id` int NOT NULL AUTO_INCREMENT,
    `avatar` text,
    `username` varchar(50) NOT NULL,
    PRIMARY KEY (`id`)
  ) ENGINE = InnoDB AUTO_INCREMENT = 32 DEFAULT CHARSET = utf8mb4;
CREATE TABLE `post` (
    `id` int NOT NULL AUTO_INCREMENT,
    `authorId` int NOT NULL,
    `country` varchar(255) NOT NULL,
    `postContent` text NOT NULL,
    `pictures` text,
    `createdAt` datetime(6) DEFAULT NULL,
    `tripDate` date NOT NULL,
    PRIMARY KEY (`id`),
    KEY `post_fk0` (`authorId`),
    CONSTRAINT `post_fk0` FOREIGN KEY (`authorId`) REFERENCES `user` (`id`)
  ) ENGINE = InnoDB AUTO_INCREMENT = 39 DEFAULT CHARSET = utf8mb4;
CREATE TABLE `comment` (
    `id` int NOT NULL AUTO_INCREMENT,
    `postId` int NOT NULL,
    `commentAuthor` varchar(255) NOT NULL,
    `content` text NOT NULL,
    `publishedAt` datetime DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `comment_fk0` (`postId`),
    CONSTRAINT `comment_fk0` FOREIGN KEY (`postId`) REFERENCES `post` (`id`)
  ) ENGINE = InnoDB AUTO_INCREMENT = 7 DEFAULT CHARSET = utf8mb4;
CREATE TABLE `post_tag` (
    `postId` int NOT NULL,
    `tags` varchar(255) DEFAULT NULL,
    KEY `post_tag_fk0` (`postId`),
    CONSTRAINT `post_tag_fk0` FOREIGN KEY (`postId`) REFERENCES `post` (`id`)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
INSERT INTO
  `comment` (
    `id`,
    `postId`,
    `commentAuthor`,
    `content`,
    `publishedAt`
  )
VALUES
  (
    1,
    1,
    'John D.',
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione sequi praesentium commodi dolorem, accusamus itaque dolor laborum magnam et consequatur sed impedit quasi dolorum necessitatibus, nulla sint inventore! Minima tempora sapiente quisquam nam. Nam eum, odio commodi ullam maiores porro, reprehenderit quas voluptate quia necessitatibus numquam vel, voluptatem accusamus quibusdam?',
    NULL
  ),
  (
    4,
    1,
    'Timothy B.',
    'Totam doloremque ipsum ducimus aut ab, dicta dignissimos at blanditiis nostrum magni beatae laboriosam modi voluptatibus sunt eveniet quo illum laborum minus autem adipisci recusandae ipsa? Voluptatibus voluptas veniam dolore ullam neque.',
    NULL
  ),
  (
    5,
    1,
    'Anna K.',
    'Quae qui officia eum doloremque soluta perferendis consequatur, quasi, quis non numquam debitis? Impedit cumque laboriosam totam eos aperiam, ullam accusamus reprehenderit officiis! Velit, ut ea quas expedita sit, cupiditate totam consequuntur nemo voluptate maiores vitae vero non? Quasi velit unde illo assumenda, minus fuga consequuntur impedit ipsa cumque saepe optio repellat nisi ab, sed sapiente tempora quidem quia quibusdam aspernatur nostrum iusto in earum magnam! Molestias nihil iste veniam quam ullam.',
    NULL
  ),
  (
    6,
    1,
    'Daniel L.',
    'Corrupti eligendi sapiente aperiam magnam neque provident velit illum nam dolorum ullam.',
    NULL
  );
INSERT INTO
  `post` (
    `id`,
    `authorId`,
    `country`,
    `postContent`,
    `pictures`,
    `createdAt`,
    `tripDate`
  )
VALUES
  (
    1,
    3,
    'indonesia',
    'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.',
    'https://images.unsplash.com/photo-1523592121529-f6dde35f079e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80,https://images.unsplash.com/photo-1501179691627-eeaa65ea017c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80,https://images.unsplash.com/photo-1526494631344-8c6fa6462b17?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80',
    NULL,
    '2020-06-12'
  ),
  (
    2,
    2,
    'argentina',
    'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.',
    'https://images.unsplash.com/photo-1545889238-ae8ff5ab582f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=869&q=80,https://images.unsplash.com/photo-1588388866431-15cbdbe37634?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80,https://images.unsplash.com/photo-1586397205525-231a3e327902?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80',
    NULL,
    '2019-02-24'
  ),
  (
    3,
    1,
    'japan',
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae totam quis nam. Placeat modi error non eveniet eligendi expedita autem officia? Aperiam soluta, iste sequi, perferendis aliquam molestiae expedita nisi molestias asperiores quidem, omnis veritatis. Commodi cupiditate nulla quo ab quod accusamus ex? Aperiam fugiat dolores quaerat nam rem, a nihil ex? Pariatur in ullam delectus eius. Ad, illum neque.',
    'https://images.unsplash.com/photo-1480796927426-f609979314bd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80,https://images.unsplash.com/photo-1528164344705-47542687000d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=892&q=80,https://images.unsplash.com/photo-1528360983277-13d401cdc186?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80,https://images.unsplash.com/photo-1533050487297-09b450131914?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
    NULL,
    '2021-09-02'
  ),
  (
    38,
    31,
    'japan',
    'Eum, ducimus fugit molestiae, quibusdam officiis ad temporibus saepe provident quos dolorum obcaecati ipsam quisquam, vel quae velit ullam. Adipisci quidem corporis, quae aspernatur sed fugiat fugit unde non harum deleniti rem. Rerum asperiores sunt eveniet omnis, ab unde dolorem, necessitatibus, quam quasi veniam quaerat cum? Autem deserunt quas at natus fuga culpa doloremque veritatis ullam qui repellat totam veniam officia corporis aliquam nihil eaque laudantium placeat repellendus esse voluptatibus, architecto, mollitia sunt rem? Quia, sed animi. Nulla fuga soluta, delectus suscipit hic tempore minima deserunt inventore eaque. Saepe totam rem facere sit cum, similique blanditiis quisquam, animi possimus consequatur dolor itaque id? Doloribus nostrum omnis incidunt neque eum eligendi quas perspiciatis ratione officiis odio, tenetur veniam expedita repellendus iusto necessitatibus nam quasi suscipit ullam tempora deserunt illo inventore commodi vel iste? Facere, dignissimos voluptate tempora amet, reiciendis assumenda molestiae nostrum quasi temporibus eius expedita deserunt beatae commodi distinctio. Omnis mollitia illum similique ab in rem quas, atque, quo perferendis error laborum. Ut reiciendis dignissimos ipsa quisquam iure facilis est dicta praesentium!',
    'https://ucarecdn.com/a0af2b90-b066-4f62-b884-88d06cd4725d/photo2.jpeg,https://ucarecdn.com/da6433fb-d508-47a2-8760-6c06f5ca19e2/photo1.jpeg,https://ucarecdn.com/79310c84-6a40-4a25-b79d-852e7d42d49d/photo3.jpeg,https://ucarecdn.com/436f7019-30a0-4f1d-af57-66aa44d4a78b/photo4.jpeg',
    NULL,
    '2021-05-10'
  );
INSERT INTO
  `user` (`id`, `avatar`, `username`)
VALUES
  (
    1,
    'https://images.unsplash.com/photo-1624561172888-ac93c696e10c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=389&q=80',
    'Joshua B.'
  ),
  (
    2,
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80',
    'Erembert Q.'
  ),
  (
    3,
    'https://images.unsplash.com/photo-1623330188314-8f4645626731?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=417&q=80https://unsplash.com/photos/-Tc8w2Kvsf8',
    'Nicolas C.'
  ),
  (
    31,
    'https://images.unsplash.com/photo-1602745724567-e665476f2519?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=385&q=80',
    'Georges Q.'
  );
SET
  FOREIGN_KEY_CHECKS = 1;
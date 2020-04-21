-- phpMyAdmin SQL Dump
-- version phpStudy 2014
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2020 年 04 月 21 日 12:17
-- 服务器版本: 8.0.18
-- PHP 版本: 5.3.29

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `blog`
--

-- --------------------------------------------------------

--
-- 表的结构 `blog`
--

CREATE TABLE IF NOT EXISTS `blog` (
  `blog_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'id',
  `title` text NOT NULL COMMENT '标题',
  `content` longtext NOT NULL COMMENT '内容',
  `blog_date` varchar(255) NOT NULL COMMENT '发表日期',
  `user_id` int(255) NOT NULL COMMENT '发布人',
  `views` int(255) NOT NULL DEFAULT '0' COMMENT '观看数',
  `comments` int(255) NOT NULL DEFAULT '0' COMMENT '评论数',
  `front_content` text NOT NULL COMMENT '前言',
  `cover` varchar(255) NOT NULL COMMENT '封面',
  PRIMARY KEY (`blog_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT='博文表' AUTO_INCREMENT=12 ;

--
-- 转存表中的数据 `blog`
--

INSERT INTO `blog` (`blog_id`, `title`, `content`, `blog_date`, `user_id`, `views`, `comments`, `front_content`, `cover`) VALUES
(19, '我不知道将去何方，但我已在路上', '<p><span>    人在年轻的时候，很容易陷入迷茫。完全不知道自己该如何选择道路，又无人指点迷津。遇到这种情况，很多人干脆原地不动，开始画地为牢。</span></p><p><img src="/blog/dd245e269dca8c73f3e33c9accdb3262"></p><p><br></p><p>我在上大学时，也经历过这一阶段。那时我总感觉诸事不顺、到处碰壁，郁闷之余放弃了挣扎，随波逐流，犹如行尸走肉。</p><p>时过境迁后，我为当初的碌碌无为而深感悔恨。原本是最应该轰轰烈烈的黄金年代，偏偏被我活成了窝窝囊囊的黑铁年代。</p><p>当你不知道自己将去何方时，不要呆在原地胡思乱想，只管抬头挺胸、迈步上路。先让自己行动起来，比什么都重要。</p><p>就像写作一样，不知道该写什么的时候，不能停笔，要勇敢地写下第一句话，然后一句接一句写下去。写着写着，你就感到思维活跃起来了。</p><p><br></p><p><img src="/blog/7d6049d587ca56dc302bd77f8cdac28e"></p>', '2020-4-21 0:14', 3, 7, 5, '    人在年轻的时候，很容易陷入迷茫。完全不知道自己该如何选择道路，又无人指点迷津。遇到这种情况，很多人干脆原地不动，开始画地为牢。\n\n\n\n\n我在上大学时，也经历过这一阶段。那时我总感觉诸事不顺、到处碰壁，郁闷之余放弃了挣扎，随波逐流，犹如行尸走肉。\n\n时过境迁后，我为当初的碌碌无为而深感悔恨。原本是最应该轰轰烈烈的黄金年代，偏偏被我活成了窝窝囊囊的黑铁年代。\n\n当你不知道自己将去何方时，不要呆在原地胡思乱想，只管抬头挺胸、迈步上路。先让自己行动起来，比什么都重要。\n\n就像写作一样，不知道该写什么的时候，不能停笔，要勇敢地写下第一句话，然后一句接一句写下去。写着写着，你就感到思维活跃起来了。\n\n\n', '/blog/dd245e269dca8c73f3e33c9accdb3262'),
(20, '儿子从疫区回来后，看中英文化的差异', '<p>儿子去日本旅行的计划取消了，我悬着的心放下了。可是他打电话告诉他老爸说周末要回家，我紧张担心得一晚上没睡好，埋怨老公为什么不立刻劝阻儿子不要回家。</p><p>第二天亲自给儿子打电话，“你的火车票买好了？你回家有什么事吗？回家的路上人挤人不安全，容易感染病毒，最好不要回来……”</p><p>儿子没有听我啰嗦完就挂了我的电话，他说他要回家。</p><p>在我们家，儿子是我的大老板，我是老公的董事长。被儿子撂了电话，我反而心里平静，不纠结了，安心地等他回来。</p><p>晚上九点儿子到家了，他的朋友在火车站接他回来的。儿子一进门就保证说：“我没有病毒，放心！”</p><p>我叫他先洗澡，然后吃了一碗热汤面。背着儿子悄悄的把他推过的门把手用消毒液擦了一遍，并把他换下的衣服放入洗衣机，倒入一些消毒水去洗。</p><p>这种防疫真有效果吗？我想更多的是一种心理安慰，在儿子眼里，他认为是过度恐慌，是Crazy 。</p><p>伦敦是疫情的重灾区，从伦敦坐地铁搭火车回来的儿子被我列入了病毒携带者的名单。一起吃的第一顿饭，我把他的菜和调味汁都单独分开了，儿子感觉到了异常，饭餐上就跟我讨论了对疫情的看法。</p><p>大概是儿子在网上看多了外国人对中国人囤货的一些不良的看法，他看见了杂物房里有3捆厕所纸，他觉得不可思议，超市里没有厕所纸，没有洗手液的断货现象，就是像我这样没头脑的人造成的，他批评我说：“你肯定还买了很多洗手液、口罩和其他东西。”</p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p>', '2020-4-21 0:47', 4, 13, 4, '儿子去日本旅行的计划取消了，我悬着的心放下了。可是他打电话告诉他老爸说周末要回家，我紧张担心得一晚上没睡好，埋怨老公为什么不立刻劝阻儿子不要回家。\n\n第二天亲自给儿子打电话，“你的火车票买好了？你回家有什么事吗？回家的路上人挤人不安全，容易感染病毒，最好不要回来……”\n\n儿子没有听我啰嗦完就挂了我的电话，他说他要回家。\n\n在我们家，儿子是我的大老板，我是老公的董事长。被儿子撂了电话，我反而心里平静，不纠结了，安心地等他回来。\n\n晚上九点儿子到家了，他的朋友在火车站接他回来的。儿子一进门就保证说：“我没有病毒，放心！”\n\n我叫他先洗澡，然后吃了一碗热汤面。背着儿子悄悄的把他推过的门把手用消毒液擦了一遍，并把他换下的衣服放入洗衣机，倒入一些消毒水去洗。\n\n这种防疫真有效果吗？我想更多的是一种心理安慰，在儿子眼里，他认为是过度恐慌，是Crazy 。\n\n伦敦是疫情的重灾区，从伦敦坐地铁搭火车回来的儿子被我列入了病毒携带者的名单。一起吃的第一顿饭，我把他的菜和调味汁都单独分开了，儿子感觉到了异常，饭餐上就跟我讨论了对疫情的看法。\n\n大概是儿子在网上看多了外国人对中国人囤货的一些不良的看法，他看见了杂物房里有3捆厕所纸，他觉得不可思议，超市里没有厕所纸，没有洗手液的断货现象，就是像我这样没头脑的人造成的，他批评我说：“你肯定还买了很多洗手液、口罩和其他东西。”\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n', 'noimg');

-- --------------------------------------------------------

--
-- 表的结构 `comment`
--

CREATE TABLE IF NOT EXISTS `comment` (
  `comment_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(255) NOT NULL COMMENT '评论人',
  `blog_id` int(255) NOT NULL COMMENT '所属博客',
  `c_content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '评论内容',
  `c_date` varchar(255) CHARACTER SET utf8 NOT NULL COMMENT '评论日期',
  `p_c_id` int(255) DEFAULT '0' COMMENT '父评论ID',
  `user_name` varchar(20) CHARACTER SET utf8 NOT NULL,
  `user_portrait` varchar(255) CHARACTER SET utf8 NOT NULL COMMENT '头像',
  PRIMARY KEY (`comment_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=COMPACT COMMENT='评论表' AUTO_INCREMENT=1 ;

--
-- 转存表中的数据 `comment`
--

INSERT INTO `comment` (`comment_id`, `user_id`, `blog_id`, `c_content`, `c_date`, `p_c_id`, `user_name`, `user_portrait`) VALUES
(22, 3, 19, '<p><img src="http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/50/pcmoren_huaixiao_org.png" alt="[坏笑]"><br></p>', '2020-4-21 0:43', 0, 'admin', '1a37b688c049b56a067b73ac69285ab1'),
(23, 4, 19, '<p>11111</p>', '2020-4-21 0:44', 0, 'test1', '361c5f5206cdafd47ac38de06555b311'),
(24, 4, 19, '<p><img src="http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/7a/shenshou_thumb.gif" alt="[草泥马]"><br></p>', '2020-4-21 0:44', 22, 'test1', '361c5f5206cdafd47ac38de06555b311'),
(25, 4, 19, '<p>13333</p>', '2020-4-21 0:45', 0, 'test1', '361c5f5206cdafd47ac38de06555b311'),
(26, 4, 19, '<p>123</p>', '2020-4-21 0:45', 22, 'test1', '361c5f5206cdafd47ac38de06555b311');

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `password` varchar(16) NOT NULL,
  `date` varchar(255) NOT NULL,
  `portrait` varchar(255) DEFAULT 'user.png',
  `sex` int(2) NOT NULL DEFAULT '1',
  `intro` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`id`, `name`, `password`, `date`, `portrait`, `sex`, `intro`) VALUES
(3, 'admin', '123456', '2020-4-21', '1a37b688c049b56a067b73ac69285ab1', 1, 'Hello World!!!'),
(4, 'test1', '123456', '2020-4-21', '361c5f5206cdafd47ac38de06555b311', 0, NULL);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

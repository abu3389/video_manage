/*
Navicat MySQL Data Transfer

Source Server         : 视频管理
Source Server Version : 50553
Source Host           : 127.0.0.1:3306
Source Database       : video_manage

Target Server Type    : MYSQL
Target Server Version : 50553
File Encoding         : 65001

Date: 2018-08-21 16:34:19
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for admin_menu
-- ----------------------------
DROP TABLE IF EXISTS `admin_menu`;
CREATE TABLE `admin_menu` (
  `menu_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '菜单ID',
  `menu_name` varchar(10) COLLATE utf8_unicode_ci NOT NULL COMMENT '菜单名称',
  `parent_id` int(11) NOT NULL COMMENT '菜单父级ID',
  `menu_url` text COLLATE utf8_unicode_ci NOT NULL COMMENT '菜单链接',
  PRIMARY KEY (`menu_id`),
  KEY `admin_parentid` (`parent_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of admin_menu
-- ----------------------------
INSERT INTO `admin_menu` VALUES ('1', '资源管理', '0', '');
INSERT INTO `admin_menu` VALUES ('2', '资源列表', '1', 'index.php?m=Admin&c=ManageUser&a=videoList');
INSERT INTO `admin_menu` VALUES ('3', '分类管理', '1', 'index.php?m=Admin&c=ManageUser&a=videoClassifyList');
INSERT INTO `admin_menu` VALUES ('4', '员工管理', '0', '');
INSERT INTO `admin_menu` VALUES ('5', '员工列表', '4', 'index.php?m=Admin&c=ManageUser&a=adminList');
INSERT INTO `admin_menu` VALUES ('6', '权限管理', '4', 'index.php?m=Admin&c=ManageUser&a=adminRoleList');
INSERT INTO `admin_menu` VALUES ('7', '客户管理', '0', '');
INSERT INTO `admin_menu` VALUES ('8', '客户列表', '7', 'index.php?m=Admin&c=ManageUser&a=clientList');
INSERT INTO `admin_menu` VALUES ('9', 'VIP等级管理', '7', 'index.php?m=Admin&c=ManageUser&a=vipList');
INSERT INTO `admin_menu` VALUES ('10', '评论管理', '1', 'index.php?m=Admin&c=ManageUser&a=videoCommentList');
INSERT INTO `admin_menu` VALUES ('11', '平台客服', '0', 'index.php?m=Admin&c=ManageUser&a=adminChat');
INSERT INTO `admin_menu` VALUES ('12', '报表统计', '0', 'index.php?m=Admin&c=ManageUser&a=adminCount');

-- ----------------------------
-- Table structure for admin_role
-- ----------------------------
DROP TABLE IF EXISTS `admin_role`;
CREATE TABLE `admin_role` (
  `role_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '角色ID',
  `role_name` varchar(10) COLLATE utf8_unicode_ci NOT NULL COMMENT '角色名',
  `role_pow` text COLLATE utf8_unicode_ci NOT NULL COMMENT '角色权限',
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of admin_role
-- ----------------------------
INSERT INTO `admin_role` VALUES ('1', '超级管理员', '1,2,3,4,5,6,7,8,9,10,11,12');
INSERT INTO `admin_role` VALUES ('2', '资源管理员', '1,2,3,10,12');
INSERT INTO `admin_role` VALUES ('3', '业务员', '7,8,12');
INSERT INTO `admin_role` VALUES ('4', '客服', '11,12');
INSERT INTO `admin_role` VALUES ('7', '超级客服', '1,2,3,10,11,12');
INSERT INTO `admin_role` VALUES ('8', '超级业务员', '1,2,3,10,7,8,9,11,12');

-- ----------------------------
-- Table structure for admin_user
-- ----------------------------
DROP TABLE IF EXISTS `admin_user`;
CREATE TABLE `admin_user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '员工ID',
  `user_name` varchar(10) COLLATE utf8_unicode_ci NOT NULL COMMENT '用户名',
  `user_pwd` char(32) COLLATE utf8_unicode_ci NOT NULL COMMENT '密码',
  `user_head` text COLLATE utf8_unicode_ci NOT NULL COMMENT '用户头像',
  `role_id` int(11) NOT NULL COMMENT '角色ID',
  `user_state` varchar(5) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'true' COMMENT '锁定状态',
  `reg_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`user_id`),
  KEY `admin_roleid` (`role_id`),
  CONSTRAINT `admin_roleid` FOREIGN KEY (`role_id`) REFERENCES `admin_role` (`role_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of admin_user
-- ----------------------------
INSERT INTO `admin_user` VALUES ('1', 'admin', 'e10adc3949ba59abbe56e057f20f883e', 'Public/Images/admin_head1.jpg', '1', 'true', '2018-07-08 10:29:29');
INSERT INTO `admin_user` VALUES ('2', 'admin888', 'e10adc3949ba59abbe56e057f20f883e', 'Public/Images/admin_head1.jpg', '1', 'false', '2018-09-08 18:21:23');
INSERT INTO `admin_user` VALUES ('3', 'admin99', 'e10adc3949ba59abbe56e057f20f883e', 'Public/Images/admin_head1.jpg', '1', 'false', '2018-08-08 18:21:23');
INSERT INTO `admin_user` VALUES ('4', 'admin66', 'e10adc3949ba59abbe56e057f20f883e', 'Public/Images/admin_head1.jpg', '1', 'false', '2018-07-08 18:21:23');
INSERT INTO `admin_user` VALUES ('5', 'chen22', 'e10adc3949ba59abbe56e057f20f883e', 'Public/Images/admin_head1.jpg', '2', 'true', '2018-08-11 23:12:32');
INSERT INTO `admin_user` VALUES ('6', 'admin555', 'e10adc3949ba59abbe56e057f20f883e', 'Public/Images/admin_head1.jpg', '2', 'true', '2018-07-11 23:14:43');
INSERT INTO `admin_user` VALUES ('7', 'chen224', 'e10adc3949ba59abbe56e057f20f883e', 'Public/Images/admin_head1.jpg', '1', 'true', '2018-08-11 23:16:44');
INSERT INTO `admin_user` VALUES ('8', 'admin000', 'e10adc3949ba59abbe56e057f20f883e', 'Public/Images/admin_head1.jpg', '3', 'false', '2018-09-11 23:46:54');
INSERT INTO `admin_user` VALUES ('9', 'admin666', 'e10adc3949ba59abbe56e057f20f883e', 'Public/Images/admin_head1.jpg', '1', 'true', '2018-07-11 23:52:03');
INSERT INTO `admin_user` VALUES ('10', 'admin444', 'e10adc3949ba59abbe56e057f20f883e', 'Public/Images/admin_head1.jpg', '4', 'true', '2018-08-12 13:51:15');
INSERT INTO `admin_user` VALUES ('11', 'adminaa', 'e10adc3949ba59abbe56e057f20f883e', 'Public/Images/admin_head1.jpg', '3', 'true', '2018-08-12 13:52:07');
INSERT INTO `admin_user` VALUES ('35', 'admin6664', 'e10adc3949ba59abbe56e057f20f883e', 'Public/Images/admin_head1.jpg', '2', 'true', '2018-07-12 17:04:45');
INSERT INTO `admin_user` VALUES ('36', 'admin6663', 'e10adc3949ba59abbe56e057f20f883e', 'Public/Images/admin_head1.jpg', '2', 'true', '2018-09-12 17:05:23');
INSERT INTO `admin_user` VALUES ('37', 'admin222', 'b0baee9d279d34fa1dfd71aadb908c3f', 'Public/Images/admin_head1.jpg', '2', 'true', '2018-06-12 17:08:29');
INSERT INTO `admin_user` VALUES ('38', 'admin3333', 'e10adc3949ba59abbe56e057f20f883e', 'Public/Images/admin_head1.jpg', '1', 'true', '2018-06-12 17:13:09');
INSERT INTO `admin_user` VALUES ('39', 'admin3322', 'e10adc3949ba59abbe56e057f20f883e', 'Public/Images/admin_head1.jpg', '3', 'true', '2018-08-12 17:14:14');
INSERT INTO `admin_user` VALUES ('40', 'asdas', 'a8f5f167f44f4964e6c998dee827110c', 'Public/Images/admin_head1.jpg', '1', 'true', '2018-07-12 17:16:12');
INSERT INTO `admin_user` VALUES ('41', 'asdas21', 'a8f5f167f44f4964e6c998dee827110c', 'Public/Images/admin_head1.jpg', '1', 'true', '2018-09-12 17:17:05');
INSERT INTO `admin_user` VALUES ('42', 'adasd', 'a8f5f167f44f4964e6c998dee827110c', 'Public/Images/admin_head1.jpg', '2', 'false', '2018-08-12 17:22:49');
INSERT INTO `admin_user` VALUES ('43', 'admin333', 'e10adc3949ba59abbe56e057f20f883e', 'Public/Images/admin_head1.jpg', '2', 'false', '2018-09-12 17:30:03');
INSERT INTO `admin_user` VALUES ('44', 'dgdfg', 'e10adc3949ba59abbe56e057f20f883e', 'Public/Images/admin_head1.jpg', '2', 'true', '2018-07-12 17:35:13');
INSERT INTO `admin_user` VALUES ('45', 'aaaa', 'e10adc3949ba59abbe56e057f20f883e', 'Public/Images/admin_head1.jpg', '4', 'false', '2018-08-12 17:37:06');
INSERT INTO `admin_user` VALUES ('46', 'chen44', 'e10adc3949ba59abbe56e057f20f883e', 'Public/Images/admin_head1.jpg', '2', 'true', '2018-05-13 10:26:55');
INSERT INTO `admin_user` VALUES ('47', 'dfsdfs', 'e10adc3949ba59abbe56e057f20f883e', '', '3', 'true', '2018-09-13 20:02:03');
INSERT INTO `admin_user` VALUES ('48', 'admin3344', 'e2fc714c4727ee9395f324cd2e7f331f', 'Public/Images/admin_head1.jpg', '2', 'true', '2018-08-13 20:50:02');
INSERT INTO `admin_user` VALUES ('49', 'zzyyy', 'e10adc3949ba59abbe56e057f20f883e', 'Public/Images/admin_head1.jpg', '4', 'true', '2018-08-15 09:02:50');
INSERT INTO `admin_user` VALUES ('50', 'adsa', '21218cca77804d2ba1922c33e0151105', 'Public/Images/admin_head1.jpg', '4', 'true', '2018-08-19 23:02:26');

-- ----------------------------
-- Table structure for admin_vip
-- ----------------------------
DROP TABLE IF EXISTS `admin_vip`;
CREATE TABLE `admin_vip` (
  `vip_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'VIP类型ID',
  `vip_name` varchar(10) COLLATE utf8_unicode_ci NOT NULL COMMENT 'VIP等级名称',
  `vip_time` varchar(5) COLLATE utf8_unicode_ci NOT NULL COMMENT 'VIP时效/小时',
  `vip_cost` decimal(5,2) NOT NULL COMMENT 'VIP费用',
  `vip_type` varchar(6) COLLATE utf8_unicode_ci NOT NULL COMMENT 'VIP类型',
  PRIMARY KEY (`vip_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of admin_vip
-- ----------------------------
INSERT INTO `admin_vip` VALUES ('1', '白银会员一个月', '30', '9.00', '白银会员');
INSERT INTO `admin_vip` VALUES ('2', '黄金会员一个月', '30', '9.00', '黄金会员');
INSERT INTO `admin_vip` VALUES ('3', '白银会员一周', '7', '9.00', '白银会员');
INSERT INTO `admin_vip` VALUES ('4', '黄金会员一周', '7', '9.00', '黄金会员');
INSERT INTO `admin_vip` VALUES ('5', '白银会员一季度', '120', '9.00', '白银会员');
INSERT INTO `admin_vip` VALUES ('7', '黄金会员一季度', '120', '9.00', '黄金会员');

-- ----------------------------
-- Table structure for home_user
-- ----------------------------
DROP TABLE IF EXISTS `home_user`;
CREATE TABLE `home_user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '客户ID',
  `user_name` varchar(10) COLLATE utf8_unicode_ci NOT NULL COMMENT '用户名',
  `user_pwd` char(32) COLLATE utf8_unicode_ci NOT NULL COMMENT '用户密码',
  `user_head` text COLLATE utf8_unicode_ci NOT NULL COMMENT '用户头像',
  `vip_id` int(11) NOT NULL COMMENT '用户VIP类型',
  `vip_timeStart` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT 'VIP购买时间',
  `vip_timeEnd` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT 'VIP结束时间',
  `user_money` decimal(10,0) NOT NULL COMMENT '账户余额',
  `last_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '最近登录时间',
  `user_state` varchar(5) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'true' COMMENT '用户锁定状态',
  `reg_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '注册时间',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of home_user
-- ----------------------------
INSERT INTO `home_user` VALUES ('0', 'sfsfe3', 'e10adc3949ba59abbe56e057f20f883e', 'Public/Images/admin_head1.jpg', '5', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00', 'true', '2018-01-19 23:08:06');
INSERT INTO `home_user` VALUES ('1', 'zhanshan67', 'e10adc3949ba59abbe56e057f20f883e', 'Public/Images/admin_head1.jpg', '0', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00', 'true', '2018-01-19 23:08:06');
INSERT INTO `home_user` VALUES ('2', 'lisi34', 'e10adc3949ba59abbe56e057f20f883e', 'Public/Images/admin_head1.jpg', '1', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00', 'true', '2018-03-19 23:03:06');
INSERT INTO `home_user` VALUES ('3', 'wangwu32', 'e10adc3949ba59abbe56e057f20f883e', 'Public/Images/admin_head1.jpg', '2', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00', 'true', '2018-03-01 23:08:06');
INSERT INTO `home_user` VALUES ('4', 'zhaoliu2', 'e10adc3949ba59abbe56e057f20f883e', 'Public/Images/admin_head1.jpg', '3', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00', 'false', '2018-04-01 23:08:06');
INSERT INTO `home_user` VALUES ('5', 'abu888', 'e10adc3949ba59abbe56e057f20f883e', 'Public/Images/admin_head1.jpg', '4', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00', 'true', '2018-03-01 23:08:06');
INSERT INTO `home_user` VALUES ('6', 'rain33891', 'e10adc3949ba59abbe56e057f20f883e', 'Public/Images/admin_head1.jpg', '5', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00', 'true', '2018-03-01 23:08:06');
INSERT INTO `home_user` VALUES ('7', 'rain33s334', 'e10adc3949ba59abbe56e057f20f883e', 'Public/Images/admin_head1.jpg', '5', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00', 'true', '2018-02-01 01:56:47');
INSERT INTO `home_user` VALUES ('9', 'dfge35', 'e10adc3949ba59abbe56e057f20f883e', 'Public/Images/admin_head1.jpg', '0', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00', 'true', '2018-01-21 01:48:18');
INSERT INTO `home_user` VALUES ('10', '32425', 'e10adc3949ba59abbe56e057f20f883e', 'Public/Images/admin_head1.jpg', '0', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00', 'true', '2018-04-21 01:48:59');
INSERT INTO `home_user` VALUES ('11', 'sdfsdf33', 'e10adc3949ba59abbe56e057f20f883e', 'Public/Images/admin_head1.jpg', '0', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00', 'true', '2018-05-21 01:49:44');
INSERT INTO `home_user` VALUES ('12', 'sdas55', 'e10adc3949ba59abbe56e057f20f883e', 'Public/Images/admin_head1.jpg', '0', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00', 'true', '2018-06-19 23:08:06');
INSERT INTO `home_user` VALUES ('13', 'fgdf', 'e10adc3949ba59abbe56e057f20f883e', 'Public/Images/admin_head1.jpg', '0', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00', 'true', '2018-04-19 23:08:06');
INSERT INTO `home_user` VALUES ('14', 'dfj44', 'e10adc3949ba59abbe56e057f20f883e', 'Public/Images/admin_head1.jpg', '1', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00', 'true', '2018-06-19 23:08:06');
INSERT INTO `home_user` VALUES ('15', 'sfsfs444', 'e10adc3949ba59abbe56e057f20f883e', 'Public/Images/admin_head1.jpg', '2', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00', 'true', '2018-10-19 23:08:06');
INSERT INTO `home_user` VALUES ('16', 'khj9', 'e10adc3949ba59abbe56e057f20f883e', 'Public/Images/admin_head1.jpg', '3', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00', 'false', '2018-07-19 23:08:06');
INSERT INTO `home_user` VALUES ('17', 'fdg334', 'e10adc3949ba59abbe56e057f20f883e', 'Public/Images/admin_head1.jpg', '4', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00', 'true', '2018-06-19 23:08:06');
INSERT INTO `home_user` VALUES ('18', 'sdfsew232', 'e10adc3949ba59abbe56e057f20f883e', 'Public/Images/admin_head1.jpg', '5', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00', 'true', '2018-09-19 23:08:06');
INSERT INTO `home_user` VALUES ('19', '3536dsfs', 'e10adc3949ba59abbe56e057f20f883e', 'Public/Images/admin_head1.jpg', '1', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00', 'true', '2018-10-21 01:52:47');
INSERT INTO `home_user` VALUES ('20', 'sdfsgg', 'e10adc3949ba59abbe56e057f20f883e', 'Public/Images/admin_head1.jpg', '3', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00', 'true', '2018-10-21 01:52:48');
INSERT INTO `home_user` VALUES ('21', 'xvgdf676', 'e10adc3949ba59abbe56e057f20f883e', 'Public/Images/admin_head1.jpg', '5', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00', 'true', '2018-11-21 01:52:48');
INSERT INTO `home_user` VALUES ('22', 'dfgdfg35', 'e10adc3949ba59abbe56e057f20f883e', 'Public/Images/admin_head1.jpg', '4', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00', 'true', '2018-12-21 01:52:48');
INSERT INTO `home_user` VALUES ('23', 'sdfs88', 'e10adc3949ba59abbe56e057f20f883e', 'Public/Images/admin_head1.jpg', '2', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00', 'true', '2018-06-21 01:52:49');
INSERT INTO `home_user` VALUES ('24', '445ds', 'e10adc3949ba59abbe56e057f20f883e', 'Public/Images/admin_head1.jpg', '1', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00', 'true', '2018-08-21 01:52:49');
INSERT INTO `home_user` VALUES ('25', 'fsddf5', 'e10adc3949ba59abbe56e057f20f883e', 'Public/Images/admin_head1.jpg', '3', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00', 'true', '2018-11-21 01:52:49');
INSERT INTO `home_user` VALUES ('26', 'reer43', 'e10adc3949ba59abbe56e057f20f883e', 'Public/Images/admin_head1.jpg', '4', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00', 'true', '2018-08-21 01:52:50');
INSERT INTO `home_user` VALUES ('27', 'fdfg43', 'e10adc3949ba59abbe56e057f20f883e', 'Public/Images/admin_head1.jpg', '2', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00', 'true', '2018-12-21 01:52:50');
INSERT INTO `home_user` VALUES ('28', 'dfgd', 'e10adc3949ba59abbe56e057f20f883e', 'Public/Images/admin_head1.jpg', '5', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00', 'true', '2018-08-21 01:52:50');
INSERT INTO `home_user` VALUES ('29', 'dfgj', 'e10adc3949ba59abbe56e057f20f883e', 'Public/Images/admin_head1.jpg', '1', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00', 'true', '2018-09-21 01:52:51');
INSERT INTO `home_user` VALUES ('30', 'ht', 'e10adc3949ba59abbe56e057f20f883e', 'Public/Images/admin_head1.jpg', '2', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00', 'true', '2018-08-21 01:52:51');
INSERT INTO `home_user` VALUES ('31', 'fsdwrw', 'e10adc3949ba59abbe56e057f20f883e', 'Public/Images/admin_head1.jpg', '4', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00', 'true', '2018-08-21 01:52:51');
INSERT INTO `home_user` VALUES ('32', 'rtrfge4', 'e10adc3949ba59abbe56e057f20f883e', 'Public/Images/admin_head1.jpg', '3', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0', '0000-00-00 00:00:00', 'true', '2018-09-21 01:52:52');

-- ----------------------------
-- Table structure for userbuy_record
-- ----------------------------
DROP TABLE IF EXISTS `userbuy_record`;
CREATE TABLE `userbuy_record` (
  `record_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '交易记录ID',
  `user_id` int(11) NOT NULL COMMENT '客户ID',
  `buy_type` varchar(8) COLLATE utf8_unicode_ci NOT NULL COMMENT '交易类型',
  `good_name` varchar(20) COLLATE utf8_unicode_ci NOT NULL COMMENT '商品名称',
  `buy_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '交易时间',
  `buy_cost` decimal(10,0) NOT NULL COMMENT '交易金额',
  `order_state` varchar(8) COLLATE utf8_unicode_ci NOT NULL COMMENT '订单状态',
  PRIMARY KEY (`record_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of userbuy_record
-- ----------------------------

-- ----------------------------
-- Table structure for userchat_record
-- ----------------------------
DROP TABLE IF EXISTS `userchat_record`;
CREATE TABLE `userchat_record` (
  `record_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '聊天记录ID',
  `user_id` int(11) NOT NULL COMMENT '所属客户ID',
  `user_type` varchar(6) COLLATE utf8_unicode_ci NOT NULL COMMENT '消息用户类型',
  `chat_content` text COLLATE utf8_unicode_ci NOT NULL COMMENT '聊天内容',
  `chat_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '聊天时间',
  PRIMARY KEY (`record_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of userchat_record
-- ----------------------------

-- ----------------------------
-- Table structure for userplay_record
-- ----------------------------
DROP TABLE IF EXISTS `userplay_record`;
CREATE TABLE `userplay_record` (
  `record_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '播放记录ID',
  `user_id` int(11) NOT NULL COMMENT '客户ID',
  `video_name` varchar(25) COLLATE utf8_unicode_ci NOT NULL COMMENT '视频名称',
  `play_costtime` varchar(6) COLLATE utf8_unicode_ci NOT NULL COMMENT '播放时长',
  `play_starttime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '播放时间',
  PRIMARY KEY (`record_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of userplay_record
-- ----------------------------

-- ----------------------------
-- Table structure for video_classify
-- ----------------------------
DROP TABLE IF EXISTS `video_classify`;
CREATE TABLE `video_classify` (
  `classify_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '分类ID',
  `classify_name` varchar(10) COLLATE utf8_unicode_ci NOT NULL COMMENT '分类名称',
  `parent_id` int(11) NOT NULL COMMENT '父级分类ID',
  `rank` int(11) NOT NULL COMMENT '前置分类ID',
  PRIMARY KEY (`classify_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of video_classify
-- ----------------------------
INSERT INTO `video_classify` VALUES ('1', '总分类', '0', '0');
INSERT INTO `video_classify` VALUES ('2', '精选', '1', '0');
INSERT INTO `video_classify` VALUES ('3', '电影', '1', '5');
INSERT INTO `video_classify` VALUES ('4', '综艺', '1', '11');
INSERT INTO `video_classify` VALUES ('5', '大陆', '4', '2');
INSERT INTO `video_classify` VALUES ('6', '港台', '4', '0');
INSERT INTO `video_classify` VALUES ('7', '音乐', '1', '12');
INSERT INTO `video_classify` VALUES ('8', '动漫', '1', '13');
INSERT INTO `video_classify` VALUES ('9', '电视剧', '1', '14');
INSERT INTO `video_classify` VALUES ('10', '日韩', '4', '5');
INSERT INTO `video_classify` VALUES ('16', '欧美', '4', '8');

-- ----------------------------
-- Table structure for video_comment
-- ----------------------------
DROP TABLE IF EXISTS `video_comment`;
CREATE TABLE `video_comment` (
  `comment_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '评论ID',
  `video_id` int(11) NOT NULL COMMENT '资源ID',
  `user_id` int(11) NOT NULL COMMENT '客户ID',
  `comment_content` text COLLATE utf8_unicode_ci NOT NULL COMMENT '评论内容',
  `comment_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '评论时间',
  PRIMARY KEY (`comment_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of video_comment
-- ----------------------------

-- ----------------------------
-- Table structure for video_resouce
-- ----------------------------
DROP TABLE IF EXISTS `video_resouce`;
CREATE TABLE `video_resouce` (
  `video_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '资源ID',
  `classify_id` int(11) NOT NULL COMMENT '资源分类ID',
  `vip_type` varchar(6) COLLATE utf8_unicode_ci NOT NULL COMMENT 'VIP类型ID',
  `video_img` text COLLATE utf8_unicode_ci NOT NULL COMMENT '封面图片url',
  `video_file` text COLLATE utf8_unicode_ci NOT NULL COMMENT '视频文件url',
  `video_name` varchar(25) COLLATE utf8_unicode_ci NOT NULL COMMENT '视频名称',
  `video_director` varchar(15) COLLATE utf8_unicode_ci NOT NULL COMMENT '视频导演',
  `video_actor` varchar(15) COLLATE utf8_unicode_ci NOT NULL COMMENT '视频主演',
  `video_area` varchar(8) COLLATE utf8_unicode_ci NOT NULL COMMENT '视频地区',
  `video_detail` text COLLATE utf8_unicode_ci NOT NULL COMMENT '视频简介',
  `video_playnum` int(11) NOT NULL DEFAULT '0' COMMENT '播放总数',
  `video_uptime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '上传时间',
  PRIMARY KEY (`video_id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of video_resouce
-- ----------------------------
INSERT INTO `video_resouce` VALUES ('1', '2', '普通会员', 'Public/Images/video_img/1.jpg', 'Public/Video/1.mp4', '视频1', '导演1', '主演1', '地区1', '视频介绍1', '0', '2018-08-17 00:05:42');
INSERT INTO `video_resouce` VALUES ('2', '3', '白银会员', 'Public/Images/video_img/2.jpg', 'Public/Video/1.mp4', '视频2', '导演2', '主演2', '地区2', '视频介绍2', '1', '2018-08-17 00:05:45');
INSERT INTO `video_resouce` VALUES ('3', '4', '白银会员', 'Public/Images/video_img/3.jpg', 'Public/Video/1.mp4', '视频3', '导演3', '主演3', '地区3', '视频介绍3', '2', '2018-08-17 00:05:47');
INSERT INTO `video_resouce` VALUES ('5', '3', '普通会员', 'Public/Images/video_img/4.jpg', 'Public/Video/1.mp4', '视频5', '导演5', '主演5', '地区5', '视频介绍5', '3', '2018-08-17 00:05:50');
INSERT INTO `video_resouce` VALUES ('6', '7', '普通会员', 'Public/Images/video_img/3.jpg', 'Public/Video/1.mp4', '视频6', '导演6', '主演6', '地区6', '视频介绍6', '2', '2018-08-17 00:05:55');
INSERT INTO `video_resouce` VALUES ('24', '5', '普通会员', './Public/Images/video_img/1534690886.jpg', './Public/Video/1534690887.mp4', 'werer', 'gjjhghj', 'zxczx', 'xzczx', 'czxcxzc', '0', '2018-08-19 23:01:27');

/*
 Navicat Premium Data Transfer

 Source Server         : sys
 Source Server Type    : MySQL
 Source Server Version : 50527
 Source Host           : localhost:3306
 Source Schema         : youpin

 Target Server Type    : MySQL
 Target Server Version : 50527
 File Encoding         : 65001

 Date: 26/01/2021 16:16:06
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for address
-- ----------------------------
DROP TABLE IF EXISTS `address`;
CREATE TABLE `address`  (
  `addressID` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `userName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `addressName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `area` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `phone` varchar(15) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `tag` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`addressID`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of address
-- ----------------------------
INSERT INTO `address` VALUES ('aabc164d-5e05-11eb-a535-40b03452ffe1', 'ningning', '新新', '河北省沧州市海兴县高湾镇', 'test', '17344222832', '公司');
INSERT INTO `address` VALUES ('bb47f0a8-547a-11eb-b31b-40b03452ffe1', 'ningning', '宁宁', '广西壮族自治区北海市海城区西街街道', '3434', '17377555423', '学校');
INSERT INTO `address` VALUES ('cbf10d11-547e-11eb-b31b-40b03452ffe1', 'ningning', '宁宁', '广西壮族自治区北海市海城区西街街道', '宏源生态新城', '17377555423', '家');
INSERT INTO `address` VALUES ('db222d71-547a-11eb-b31b-40b03452ffe1', 'ningning', '宁宁', '广西壮族自治区北海市海城区西街街道', '甲骨文海文培训基地门口的小卖部', '17377555423', '公司');
INSERT INTO `address` VALUES ('e4978ace-547a-11eb-b31b-40b03452ffe1', 'ningning', '宁宁', '广西壮族自治区北海市海城区西街街道', '宏源生态新城', '17377555423', '家');

-- ----------------------------
-- Table structure for dingdan
-- ----------------------------
DROP TABLE IF EXISTS `dingdan`;
CREATE TABLE `dingdan`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '订单id',
  `oname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '商品名',
  `num` int(11) NOT NULL COMMENT '数量',
  `inPrice` decimal(10, 2) NULL DEFAULT NULL COMMENT '进价',
  `time` date NOT NULL COMMENT '时间',
  `supply` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '货源\r\n供应商',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 21 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of dingdan
-- ----------------------------
INSERT INTO `dingdan` VALUES (2, '白菜', 10, NULL, '2020-11-22', '雨哥生鲜');
INSERT INTO `dingdan` VALUES (4, '牛丸', 30, NULL, '2020-11-21', '雨哥生鲜');
INSERT INTO `dingdan` VALUES (6, '鸭脖', 7, NULL, '2020-11-14', '绝味美食');
INSERT INTO `dingdan` VALUES (7, '洗洁精', 12, 13.00, '2020-11-25', '好宜家');
INSERT INTO `dingdan` VALUES (8, '洗洁精', 23, 12.00, '2020-11-25', '好宜家');
INSERT INTO `dingdan` VALUES (12, '洗洁精', 3, 13.00, '2020-11-28', '好宜家');
INSERT INTO `dingdan` VALUES (13, '老北京面包', 22, 2.00, '2020-11-28', '好宜家');
INSERT INTO `dingdan` VALUES (14, '老北京面包', 5, 2.00, '2020-11-28', '好宜家');
INSERT INTO `dingdan` VALUES (15, '老北京面包', 5, 2.00, '2020-11-28', '好宜家');
INSERT INTO `dingdan` VALUES (17, '魔法少女', 2, 168.00, '2020-12-30', '魔仙堡');
INSERT INTO `dingdan` VALUES (18, '松果糖豆', 200, 3.00, '2020-01-19', '混元食品');
INSERT INTO `dingdan` VALUES (19, '松果糖豆', 20, 6.00, '2020-01-23', '混元食品');
INSERT INTO `dingdan` VALUES (20, '洗洁精', 4, 3.00, '2020-01-23', '混元食品');

-- ----------------------------
-- Table structure for goods
-- ----------------------------
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods`  (
  `id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `gname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '商品名称',
  `stock` int(10) NULL DEFAULT NULL COMMENT '库存',
  `price` decimal(10, 2) NULL DEFAULT NULL COMMENT '价格',
  `sale` int(10) NULL DEFAULT NULL COMMENT '销量',
  `cover` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '封面',
  `tag` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '类型标签',
  `expatiate` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '详细介绍',
  `isSale` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '上架信息',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of goods
-- ----------------------------
INSERT INTO `goods` VALUES ('15', '比巴卜泡泡糖', 9, 5.00, 1, 'src=http___img.alicdn.com_imgextra_i1_436245932_TB2i7zkvolnpuFjSZFjXXXTaVXa_!!436245932.jpg&refer=http___img.alicdn.jpg', '', '', '否');
INSERT INTO `goods` VALUES ('16', '大大泡泡糖', 30, 3.00, 0, '大大泡泡糖.jpg', '', '', '否');
INSERT INTO `goods` VALUES ('17', '小小夹心饼', 13, 4.00, 0, '', '', '', '否');
INSERT INTO `goods` VALUES ('18', '颈椎按摩棒', 14, 45.00, 1, '4275771461.jpg', '', '', '否');
INSERT INTO `goods` VALUES ('19', '撑衣杆', 76, 12.00, 0, '10524681002_980116768.220x220.jpg', '好哥哥超市', '解决了现有撑衣杆的叉头无法收缩的问题该撑衣杆结构简单,设计巧妙,生产成本低,使用方便灵活,普遍适用于每个家庭,特别有利于中老年人使用。', '是');
INSERT INTO `goods` VALUES ('2', '旺旺仙贝', 20, 1.50, 26, '67c54c91a1c26563.jpg', '一般', '买上大大的一包，全家人都爱吃，香香的脆脆的，而且吃了不会上火，不是油炸食品。尤其孩子是他们的最爱，越吃越香甜，根本停不下来，春节快到了，吃旺旺雪饼也意味着来年越来越好，全家幸福美满，旺旺。', '是');
INSERT INTO `goods` VALUES ('20', '衣架', 14, 6.00, 0, 'yijia.jpg', '好哥哥超市', '结实的衣架', '是');
INSERT INTO `goods` VALUES ('23', '洗洁精', 30, 8.00, 0, '', '', '', '否');
INSERT INTO `goods` VALUES ('24', '老北京面包', 40, 2.00, 7, 'u=386396177,1086780800&fm=26&gp=0.jpg', '', '', '否');
INSERT INTO `goods` VALUES ('25', '威化饼干', 29, 5.00, 2, 'u=3127540982,4190857156&fm=26&gp=0.jpg', '', '', '否');
INSERT INTO `goods` VALUES ('26', '手冲咖啡', 5, 8.00, 0, '', '', '', '否');
INSERT INTO `goods` VALUES ('3', '旺仔牛奶糖', 52, 5.00, 23, '旺仔牛奶糖.jpg', '一般', '旺仔牛奶糖', '是');
INSERT INTO `goods` VALUES ('34', 'laotie555', 1, 4.00, 0, '', '', '', '否');
INSERT INTO `goods` VALUES ('35', '魔法少女', 5, 188.00, 0, 'babi.jpg', '', '', '否');
INSERT INTO `goods` VALUES ('36', '爱人巧克力', 30, 5.00, 0, '', '', '', '否');
INSERT INTO `goods` VALUES ('37', '黑猫洗衣粉', 50, 10.00, 0, '20080228201_449067549.220x220.jpg', '一般', '起泡快，健康环保', '是');
INSERT INTO `goods` VALUES ('4', '旺仔摇滚冻', 36, 7.00, 6, '摇滚冻.jpg', '一般', '旺仔摇滚冻', '是');
INSERT INTO `goods` VALUES ('43', '旺旺零食大礼包 网红爆款送女友送朋友生日礼物 2.8kg', 200, 258.00, 0, 'cb90852427f13cd1.jpg', '好哥哥超市', '零食的种类特别多。总共有31种零食。从 膨化类的食品到糖类，再到饮品类，种类繁多，看的人特别想吃。主要是零食几乎不重复，可以体验不同的口味，不同的口感。特别推荐这个零食大礼包，适合儿童大人各个人群，推荐购买，绝对物超所值。', '是');
INSERT INTO `goods` VALUES ('44', '浪味仙 膨化食品 零食薯片 蕃茄味70g', 30, 2.90, 0, '5ae145b4Naf7891f7.jpg', '好哥哥超市', '吃了一口还想吃，吃了两口继续吃，嗯，韩式鲜美，嗯翻起的味儿浓浓地那特别是对他的品质也很放心，这么多年的老品牌了，特别的值得信任和信赖', '是');
INSERT INTO `goods` VALUES ('45', '红茶茶叶 云南滇红大金针凤庆金芽滇红茶', 60, 208.00, 0, 'bd997782cce1c80a.jpg', '好哥哥超市', '香滇红，泡一杯，一个办公室都是香的。品质高，性价比高，送人很有信心，懂红茶的人都猜不出价。包装也考究', '是');
INSERT INTO `goods` VALUES ('46', '西班牙原装进口 黛尼（DalySol）特级初榨橄榄油和低芥酸菜籽油 食用植物调和油3L 食用油', 37, 78.00, 0, '033ae4b86418edee.jpg', '一般', '炒出来的菜品味道鲜美，没有异味。主要是价格便宜，比超市便宜好多好多。物美价廉，推荐购买！', '否');
INSERT INTO `goods` VALUES ('47', '金桂飘香】桂花鸭南京特产正宗盐水鸭1000g整只鸭真空包装卤味年货零食', 6, 49.90, 0, '19596eda380aaf0f.jpg', '好哥哥超市', '金桂飘香】桂花鸭南京特产正宗盐水鸭1000g整只鸭真空包装卤味年货零食', '是');
INSERT INTO `goods` VALUES ('48', '桂花鸭【送礼袋】南京酱鸭1000g 正宗江苏特产烤鸭酱板鸭卤味鸭货熟食真空装', 9, 23.80, 0, '3556bff6cc8ea660.jpg', '好哥哥超市', '桂花鸭【送礼袋】南京酱鸭1000g 正宗江苏特产烤鸭酱板鸭卤味鸭货熟食真空装', '是');
INSERT INTO `goods` VALUES ('5', '旺旺碎冰冰', 31, 5.00, 15, '碎冰冰.jpg', '好哥哥超市', '旺旺碎碎冰，天天好心情 旺旺碎碎冰，天天好心情 旺旺碎碎冰，天天好心情 旺旺碎碎冰，天天好心情 旺旺碎碎冰，天天好心情 旺旺碎碎冰，天天好心情', '是');
INSERT INTO `goods` VALUES ('6', '牛肉棒plus', 41, 5.00, 53, 'QQ图片20201019162658.png', '好哥哥超市', 'ababbba', '是');
INSERT INTO `goods` VALUES ('6f7f34ff-f115-4f11-8428-a6704e1fafea', '雀巢脆脆鲨', 23, 1.50, 21, '下载.jpg', '', '', '否');
INSERT INTO `goods` VALUES ('7', '上好佳薄荷糖', 79, 5.00, 5, 'u=1862108754,3902098018&fm=26&gp=0.jpg', '一般', '一丝凉意', '是');
INSERT INTO `goods` VALUES ('7a873735-5e0b-11eb-a535-40b03452ffe1', '有病啊 ', 0, 0.00, 0, '0af74a55564e9258a15437b18b82d158cdbf4e66.jpg', '一般', '暂无商品描述', '否');
INSERT INTO `goods` VALUES ('8', '奥利奥夹心饼', 114, 8.00, 82, 'u=221831975,983534330&fm=26&gp=0.jpg', '好哥哥超市', '奥利奥夹心饼', '是');
INSERT INTO `goods` VALUES ('8006a6fe-bcf5-49c6-80eb-9a64c597e440', '可口可乐', 196, 3.00, 30, 'kekkl.jpg', '好哥哥超市', '全球每天有17亿人次的消费者在畅饮可口可乐公司的产品，大约每秒钟售出19,400瓶饮料', '是');
INSERT INTO `goods` VALUES ('9', '麦旋风', 14, 8.00, 31, '', '', '', '否');
INSERT INTO `goods` VALUES ('acfe63cb-5e10-11eb-a535-40b03452ffe1', 'dickies短袖T恤男士街头潮流经典宽松潮牌LOGO字母夏装情侣装', 62, 128.00, 0, 'O1CN014dSaPV1LPmHCBHZ3e_!!0-item_pic.jpg', '好哥哥国际', 'dickies短袖T恤男士街头潮流经典宽松潮牌LOGO字母夏装情侣装', '否');
INSERT INTO `goods` VALUES ('d6eec0fb-f308-4716-8bf0-a79feb1e1b77', '小布丁', 26, 1.50, 49, 'u=1154271191,4022469564&fm=26&gp=0.jpg', '', '', '否');
INSERT INTO `goods` VALUES ('d7154126-5e09-11eb-a535-40b03452ffe1', 'uu棒棒糖', 156, 2.00, 0, '558c73ce3bc79f3d4f54846cada1cd11738b2963.jpg', '一般', 'uu棒棒糖', '否');
INSERT INTO `goods` VALUES ('ddc17917-aefa-4f6c-b15d-34d91089d00c', '德芙洗衣液', 25, 13.00, 0, 'a43b591a9d16fdfac36280afa38f8c5495ee7bbe.jpg', '天猫超市', '德芙洗衣液德芙洗衣液德芙洗衣液', '是');

-- ----------------------------
-- Table structure for jiaose
-- ----------------------------
DROP TABLE IF EXISTS `jiaose`;
CREATE TABLE `jiaose`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '角色名称',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of jiaose
-- ----------------------------
INSERT INTO `jiaose` VALUES (1, '普通用户');
INSERT INTO `jiaose` VALUES (2, '店员');
INSERT INTO `jiaose` VALUES (3, '店长');
INSERT INTO `jiaose` VALUES (4, '系统管理员');

-- ----------------------------
-- Table structure for sale
-- ----------------------------
DROP TABLE IF EXISTS `sale`;
CREATE TABLE `sale`  (
  `id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `userid` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户id',
  `addressID` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '地址id',
  `time` datetime NOT NULL COMMENT '产生时间',
  `type` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '订单状态',
  `code` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '快递码',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of sale
-- ----------------------------
INSERT INTO `sale` VALUES ('370e73aa-5f94-11eb-a535-40b03452ffe1', '8', 'bb47f0a8-547a-11eb-b31b-40b03452ffe1', '2021-01-26 13:06:04', '待发货', '');

-- ----------------------------
-- Table structure for saledetails
-- ----------------------------
DROP TABLE IF EXISTS `saledetails`;
CREATE TABLE `saledetails`  (
  `id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `saleID` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `goodsID` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `buyNum` int(11) NOT NULL,
  `price` decimal(10, 2) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `saleID`(`saleID`) USING BTREE,
  CONSTRAINT `saledetails_ibfk_1` FOREIGN KEY (`saleID`) REFERENCES `sale` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of saledetails
-- ----------------------------
INSERT INTO `saledetails` VALUES ('370ede9d5f9411eba53540b03452ffe1', '370e73aa-5f94-11eb-a535-40b03452ffe1', ' 43', 2, 258.00);
INSERT INTO `saledetails` VALUES ('370edef15f9411eba53540b03452ffe1', '370e73aa-5f94-11eb-a535-40b03452ffe1', ' 5', 3, 5.00);

-- ----------------------------
-- Table structure for shopcar
-- ----------------------------
DROP TABLE IF EXISTS `shopcar`;
CREATE TABLE `shopcar`  (
  `id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `userid` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户名',
  `goodsid` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `goodsNum` int(11) NULL DEFAULT NULL COMMENT '所购商品数量',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of shopcar
-- ----------------------------
INSERT INTO `shopcar` VALUES ('2c4a5fbb-5f93-11eb-a535-40b03452ffe1', '8', '8', 3);
INSERT INTO `shopcar` VALUES ('2fe59114-5f93-11eb-a535-40b03452ffe1', '8', '43', 2);
INSERT INTO `shopcar` VALUES ('b59c4e2b-5f8f-11eb-a535-40b03452ffe1', '8', '5', 3);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `uid` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户id',
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户名',
  `phone` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '电话号码',
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户密码',
  `jiaoseID` int(11) NOT NULL DEFAULT 1 COMMENT '角色id',
  PRIMARY KEY (`uid`) USING BTREE,
  INDEX `jiaoseID`(`jiaoseID`) USING BTREE,
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`jiaoseID`) REFERENCES `jiaose` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('033d9965-4e58-11eb-b31b-40b03452ffe1', 'dahu', '', '123123', 1);
INSERT INTO `user` VALUES ('10', 'wang', '', 'laoban', 3);
INSERT INTO `user` VALUES ('11', 'yifan', '', 'dagongzai', 2);
INSERT INTO `user` VALUES ('12', 'malu', '', 'malugame', 1);
INSERT INTO `user` VALUES ('21', 'fuerdai', '', '321456', 3);
INSERT INTO `user` VALUES ('22', 'xiaohuang', '', '123456', 1);
INSERT INTO `user` VALUES ('2ad3e21b-4f48-11eb-b31b-40b03452ffe1', 'ningning', '', '123123123', 1);
INSERT INTO `user` VALUES ('3', 'jack', '', '123456', 1);
INSERT INTO `user` VALUES ('3a76ad3c-5b13-11eb-93c8-40b03452ffe1', 'fangxin', '17377111268', '753951', 1);
INSERT INTO `user` VALUES ('4', 'bigman3487', '', '784333', 1);
INSERT INTO `user` VALUES ('409cd27a-4e3d-11eb-b31b-40b03452ffe1', 'xiaomei', '', '123123', 2);
INSERT INTO `user` VALUES ('5', 'overLower', '', '744322', 2);
INSERT INTO `user` VALUES ('56610e7b-5b13-11eb-93c8-40b03452ffe1', 'fangxindd', '17377111267', '456852', 1);
INSERT INTO `user` VALUES ('5d73ae63-450f-11eb-8817-40b03452ffe1', 'xiaohh', '', '123123', 1);
INSERT INTO `user` VALUES ('6', 'bigjhson', '', '199232', 1);
INSERT INTO `user` VALUES ('7', 'youku', '', '3322456', 1);
INSERT INTO `user` VALUES ('8', 'ningning', '', '456852', 1);
INSERT INTO `user` VALUES ('83aebeef-4f49-11eb-b31b-40b03452ffe1', 'ningning', '', '123123123', 1);
INSERT INTO `user` VALUES ('9', 'exage', '', '456778', 2);
INSERT INTO `user` VALUES ('98422f17-4f49-11eb-b31b-40b03452ffe1', 'ningning', '', '123123123', 1);
INSERT INTO `user` VALUES ('c9510ff8-4512-11eb-8817-40b03452ffe1', 'admin', '', '123456', 4);
INSERT INTO `user` VALUES ('ebfbb358-4f4d-11eb-b31b-40b03452ffe1', 'miaomiao', '', '123123', 1);

-- ----------------------------
-- Table structure for userorder
-- ----------------------------
DROP TABLE IF EXISTS `userorder`;
CREATE TABLE `userorder`  (
  `id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `userid` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `saleid` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `time` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of userorder
-- ----------------------------

SET FOREIGN_KEY_CHECKS = 1;

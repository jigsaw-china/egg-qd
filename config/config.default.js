'use strict';
const path = require('path');

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1525226392025_2580';

  // 静态文件存储域名
  config.site_static_host = 'http://127.0.0.1:7001';
  config.mini_assets = process.env.EGG_MINI_ASSETS || false;

  // 文件上传配置
  config.upload = {
    path: path.join(__dirname, '../app/public/upload/'),
    url: config.site_static_host + '/public/upload/',
  };

  // 添加 view 配置
  config.view = {
    defaultViewEngine: 'nunjucks',
    defaultExtension: '.njk',
    mapping: {
      '.njk': 'nunjucks',
    },
  };

  // 数据库配置
  config.sequelize = {
    dialect: 'mysql',
    database: 'egg-qd',
    host: 'localhost',
    port: '3306',
    username: 'root',
    password: 'root',
  };

  config.passportLocal = {
    usernameField: 'username',
    passwordField: 'pass',
  };

  config.passportQQ = {
    key: '101474166',
    secret: '85805ccb4b1a82314702907c49db8c25',
  };

  config.auth_cookie_name = 'egg-qd';
  config.admins = {
    ADMIN_USER: true,
  };

  // 上传配置
  config.multipart = {
    fileSize: '50mb',
    whitelist: [
      '.jpg',
      '.png',
      '.zip',
    ],
  };

  // 404
  // config.notfound = {
  //   pageUrl: '/404',
  // };

  // add your config here
  config.middleware = [ 'locals', 'authUser' ];

  config.authUser = {
    enable: true,
    match: '/admin',
  };

  return config;
};

'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1525226392025_2580';

  // 添加 view 配置
  config.view = {
    defaultViewEngine: 'nunjucks',
    defaultExtension: '.njk',
    mapping: {
      '.njk': 'nunjucks',
    },
  };

  // 添加 news 的配置项
  config.news = {
    pageSize: 5,
    serverUrl: 'https://hacker-news.firebaseio.com/v0',
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

  // add your config here
  config.middleware = [ 'authUser' ];

  config.authUser = {
    enable: true,
    match: '/',
  };

  return config;
};

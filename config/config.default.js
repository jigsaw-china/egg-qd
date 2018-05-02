'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1525226392025_2580';

  // 添加 view 配置
  config.view = {
    defaultViewEngine: 'nunjucks',
    defaultExtension: '.nj',
    mapping: {
      '.nj': 'nunjucks',
    },
  };

  // 添加 news 的配置项
  config.news = {
    pageSize: 5,
    serverUrl: 'https://hacker-news.firebaseio.com/v0',
  };

  // 添加 数据库配置
  config.sequelize = {
    dialect: 'mysql',
    database: 'egg-qd',
    host: 'localhost',
    port: '3306',
    username: 'root',
    password: 'root',
  };

  // add your config here
  config.middleware = [];

  return config;
};

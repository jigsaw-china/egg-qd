'use strict';

// had enabled by egg
// exports.static = true;
// 模板引擎
exports.nunjucks = {
  enable: true,
  package: 'egg-view-nunjucks',
};

// 数据映射
exports.sequelize = {
  enable: true,
  package: 'egg-sequelize',
};

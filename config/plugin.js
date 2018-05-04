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

exports.validate = {
  enable: true,
  package: 'egg-validate',
};

exports.passport = {
  enable: true,
  package: 'egg-passport',
};

exports.passportLocal = {
  enable: true,
  package: 'egg-passport-local',
};

exports.passportQQ = {
  enable: true,
  package: 'egg-passport-qq',
};

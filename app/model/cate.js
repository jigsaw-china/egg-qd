'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Cate = app.model.define('cate', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: STRING(50),
    iconfont: STRING(50),
    created_at: DATE,
    updated_at: DATE,
  });

  return Cate;
};

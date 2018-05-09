'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Tag = app.model.define('tag', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: STRING(30),
    cate_id: INTEGER,
    created_at: DATE,
    updated_at: DATE,
  });

  return Tag;
};

'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const User = app.model.define('user', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: STRING(50),
    pass: STRING(100),
    email: STRING(50),
    avatar: STRING(100),
    qqId: STRING(100),
    created_at: DATE,
    updated_at: DATE,
  });

  User.prototype.associate = function() {
    app.model.User.hasMany(app.model.Post, { as: 'posts', foreignKey: 'user_id' });
  };

  return User;
};

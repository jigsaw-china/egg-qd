'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, BOOLEAN } = app.Sequelize;

  const Site = app.model.define('site', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: STRING(50),
    des: STRING(255),
    image: STRING(255),
    url: STRING(255),
    user_id: INTEGER,
    created_at: DATE,
    updated_at: DATE,
    deleted: {
      type: BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });

  Site.associate = function() {
    app.model.Site.belongsTo(app.model.User, { as: 'user', foreignKey: 'user_id' });
  };

  return Site;
};

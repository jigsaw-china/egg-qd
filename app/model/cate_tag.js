'use strict';

module.exports = app => {
  const { INTEGER, DATE } = app.Sequelize;

  const CateTag = app.model.define('cate_tag', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    cate_id: INTEGER,
    tag_id: INTEGER,
    created_at: DATE,
    updated_at: DATE,
  });

  CateTag.associate = function() {
    app.model.CateTag.belongsTo(app.model.Cate, { as: 'cate', foreignKey: 'cate_id' });
  };

  return CateTag;
};

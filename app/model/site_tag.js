'use strict';

module.exports = app => {
  const { INTEGER, DATE } = app.Sequelize;

  const SiteTag = app.model.define('site_tag', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    site_id: INTEGER,
    tag_id: INTEGER,
    created_at: DATE,
    updated_at: DATE,
  });

  return SiteTag;
};

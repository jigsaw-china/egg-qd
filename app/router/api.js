'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const apiV1Router = app.router.namespace('/api/v1');
  const { controller, middleware } = app;

  const { site } = controller.api;

  // 所有网站
  apiV1Router.get('/sites', site.list);
  apiV1Router.get('/sites/:id', site.index);
};

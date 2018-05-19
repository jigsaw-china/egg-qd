'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const apiV1Router = app.router.namespace('/api/v1');
  const { controller, middleware } = app;

  const { site, cate, search } = controller.api;

  // 网站列表
  apiV1Router.get('/sites', site.list);
  apiV1Router.get('/sites/:id', site.index);

  // 分类列表
  apiV1Router.get('/cates', cate.list);

  // 搜索
  apiV1Router.get('/search', search.index);

};

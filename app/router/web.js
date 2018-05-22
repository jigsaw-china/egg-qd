'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  const adminRequired = middleware.adminRequired();

  // 前台首页
  router.get('/', controller.portal.index);

  // 后台首页
  router.get('/admin', adminRequired, controller.home.index);

  // 注册页面
  router.get('/signup', controller.sign.showSignup);
  router.post('/signup', controller.sign.signup);

  // 鉴权
  const localStrategy = app.passport.authenticate('local', {
    successRedirect: '/admin',
    failureRedirect: '/signin',
  });
  const qqStrategy = app.passport.authenticate('qq', {
    successRedirect: '/admin',
    failureRedirect: '/signin',
  });

  // qq登录
  router.get('/passport/qq', qqStrategy);
  router.get('/passport/qq/callback', qqStrategy);

  // 本地登录
  router.get('/signin', controller.sign.showLogin);
  router.post('/passport/local', localStrategy);

  // 退出
  router.get('/signout', controller.sign.signout);

  // 网站管理
  router.get('/site/create', adminRequired, controller.site.create); // 创建页面
  router.post('/site/create', adminRequired, controller.site.save); // 保存网站

  router.get('/site/:sid/edit', adminRequired, controller.site.showEdit); // 显示编辑页面
  router.post('/site/:sid/edit', adminRequired, controller.site.update); // 更新网站
  router.post('/site/:sid/del', adminRequired, controller.site.delete); // 删除网站

  router.get('/site/list', adminRequired, controller.site.list); // 显示网站列表
  router.post('/upload', adminRequired, controller.site.upload); // 上传

  // 分类
  router.get('/cate/create', adminRequired, controller.cate.create); // 创建页面
  router.post('/cate/create', adminRequired, controller.cate.save); // 保存分类

  router.get('/cate/:id/edit', adminRequired, controller.cate.showEdit); // 显示编辑页面
  router.post('/cate/:id/edit', adminRequired, controller.cate.update); // 更新分类
  router.post('/cate/:id/del', adminRequired, controller.cate.delete); // 删除分类

  router.get('/cate/list', adminRequired, controller.cate.list); // 分类列表

  // 标签
  router.get('/tags/list', adminRequired, controller.tags.list); // 标签列表
};

'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // 首页
  router.get('/admin', controller.home.index);

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
  router.get('/site/index', controller.site.index); // 创建页面
  router.get('/site/:sid/edit', controller.site.showEdit); // 显示编辑页面
  router.get('/site/list', controller.site.list); // 显示网站列表
  router.post('/site/save', controller.site.save); // 保存网站


};

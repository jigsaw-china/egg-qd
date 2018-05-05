'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, passport } = app;
  // 首页
  router.get('/', controller.home.index);

  // 注册页面
  router.get('/signup', controller.sign.showSignup);
  router.post('/signup', controller.sign.signup);

  const localStrategy = app.passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/signin',
  });

  // 挂载鉴权路由
  // mount 是语法糖，等价于
  // const qq = app.passport.authenticate('qq', {});
  // router.get('/passport/qq', qq);
  // router.get('/passport/qq/callback', qq);
  passport.mount('qq');

  // 登录
  router.get('/signin', controller.sign.showLogin);
  router.post('/passport/local', localStrategy);

  // 退出
  router.get('/signout', controller.sign.signout);

  // 网站
  router.get('/site/index', controller.site.index);
  router.get('/site/upload', controller.site.upload);

};

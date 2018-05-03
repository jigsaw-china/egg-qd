'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // 首页
  router.get('/', controller.home.index);

  // 注册页面
  router.get('/signup', controller.sign.showSignup);
  router.post('/signup', controller.sign.signup);

  const localStrategy = app.passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/signin',
  });

  // 登录
  router.get('/signin', controller.sign.showLogin);
  router.post('/passport/local', localStrategy);
};

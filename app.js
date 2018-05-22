'use strict';
const qqStrategy = require('passport-qq').Strategy;

module.exports = app => {
  // if (app.config.env === 'local') {
  //   app.beforeStart(function* () {
  //     yield app.model.sync({ force: true });
  //   });
  // }

  // 包有点问题，重写一下
  const config = app.config.passportQQ;
  app.passport.use('qq', new qqStrategy(config, (req, accessToken, refreshToken, profile, done) => {
    const user = {
      provider: 'qq',
      id: profile.id,
      nickname: profile.nickname,
      avatar: profile._json.figureurl_2,
    };

    app.passport.doVerify(req, user, done);
  }));

  const localHandler = async (ctx, { username, password }) => {
    const getUser = username => {
      if (username.indexOf('@') > 0) {
        return ctx.service.user.getUserByMail(username);
      }
      return ctx.service.user.getUsersByName(username);
    };
    const existUser = await getUser(username);

    // 用户不存在
    if (!existUser) {
      return null;
    }

    const passhash = existUser.pass;
    // TODO: change to async compare
    const equal = ctx.helper.bcompare(password, passhash);
    // 密码不匹配
    if (!equal) {
      return null;
    }

    // // 用户未激活
    // if (!existUser.active) {
    //   // 发送激活邮件
    //   return null;
    // }

    // 验证通过
    return existUser;
  };

  const qqHandler = async (ctx, user) => {
    let existUser = await ctx.service.user.getUserByQQId(user.id);

    // 用户不存在则创建
    if (!existUser) {
      existUser = new ctx.model.User();
      existUser.qqId = user.id;
    }

    // 用户存在，更新字段
    existUser.username = user.nickname;
    existUser.avatar = user.avatar;

    try {
      await existUser.save();
    } catch (ex) {
      throw ex;
    }

    return existUser;
  };

  app.passport.verify(async (ctx, user) => {
    ctx.logger.debug('passport.verify', user);
    const handler = user.provider === 'qq' ? qqHandler : localHandler;
    const existUser = await handler(ctx, user);
    if (existUser) {
      // id存入Cookie, 用于验证过期.
      const auth_token = existUser.id + '$$$$'; // 以后可能会存储更多信息，用 $$$$ 来分隔
      const opts = {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 30,
        signed: true,
        httpOnly: true,
      };
      ctx.cookies.set(app.config.auth_cookie_name, auth_token, opts); // cookie 有效期30天
    }

    return existUser;
  });

  app.passport.deserializeUser(async (ctx, user) => {
    if (user) {
      const auth_token = ctx.cookies.get(ctx.app.config.auth_cookie_name, {
        signed: true,
      });

      if (!auth_token) {
        return user;
      }

      const auth = auth_token.split('$$$$');
      const user_id = auth[ 0 ];
      user = await ctx.service.user.getUserById(user_id);

      if (!user) {
        return user;
      }
      // if (ctx.app.config.admins.hasOwnProperty(user.ADMIN_USER)) {
      //   user.is_admin = true;
      // }
    }

    return user;
  });
};

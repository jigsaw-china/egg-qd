'use strict';

module.exports = () => {
  /*
   * 需要管理员权限
   */

  return async function(ctx, next) {
    if (!ctx.user) {
      await ctx.render('error', { error: '你还没有登录。' });
      return;
    }

    if (!ctx.user.is_admin) {
      await ctx.render('error', { error: '需要管理员权限。' });
      return;
    }

    await next();
  };
};

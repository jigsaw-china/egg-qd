'use strict';

const Controller = require('egg').Controller;

class SiteController extends Controller {
  /**
   * 列表
   */
  async list(ctx) {

    const cates = await ctx.service.cate.findAll();
    const result = [];

    for (let i = 0; i < cates.length; i++) {
      const item = cates[i];
      const cate = {};
      cate.id = item.id;
      cate.title = item.title;
      cate.tags = await ctx.service.cate.findTagsByCid(item.id);

      result.push(cate);
    }
    ctx.body = {
      success: true,
      data: result,
    };
  }

}

module.exports = SiteController;

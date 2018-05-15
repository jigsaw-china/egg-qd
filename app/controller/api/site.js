'use strict';

const Controller = require('egg').Controller;

class SiteController extends Controller {
  /**
   * 显示创建页面
   */
  async index(ctx) {
    const sites = await ctx.service.site.findAll();

    ctx.body = {
      success: true,
      data: sites,
    };
  }

}

module.exports = SiteController;

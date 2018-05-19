'use strict';
const fs = require('fs');
const Controller = require('egg').Controller;

class SiteController extends Controller {
  /**
   * 搜索信息
   */
  async index(ctx) {
    const config = ctx.app.config;
    const query = ctx.query;
    const options = {};

    // 关键词
    if (query.keyword) {
      options.where = {
        title: {
          $like: `%${query.keyword}%`,
        },
      };
    } else {
      ctx.body = {
        success: false,
      };
    }

    options.limit = Math.min(100, parseInt(query.limit || config.default_limit, 10));
    const page = Math.max(1, parseInt(query.page || config.default_page, 10));
    options.offset = (page - 1) * options.limit;

    const sites = await ctx.service.site.findAllByQuery(options);

    ctx.body = {
      success: true,
      data: sites,
    };
  }

}

module.exports = SiteController;

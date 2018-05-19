'use strict';
const fs = require('fs');
const Controller = require('egg').Controller;

class SiteController extends Controller {
  /**
   * 获取信息
   */
  async index(ctx) {
    const params = ctx.params;
    const id = params.id;
    if (isNaN(id)) {
      ctx.body = {
        success: false,
        data: '此网站不存在或已被删除。',
      };
    }

    const site = await ctx.service.site.findById(id);
    const url = site.url.slice(site.url.lastIndexOf('upload/') + 7);
    const data = fs.readFileSync(this.config.upload.path + url).toString();

    site.visit_count = site.visit_count + 1;
    await site.save();

    ctx.body = {
      success: true,
      data: {
        base: site.url,
        html: data,
      },
    };
  }

  /**
   * 列表
   */
  async list(ctx) {
    const config = ctx.app.config;
    const query = ctx.query;
    const options = {};
    options.order = [];

    // 标签
    if (query.tags) {
      const opt = {
        attributes: [ 'site_id' ],
        where: {
          tag_id: {
            $in: query.tags.split(','),
          },
        },
        group: 'site_id',
      };

      // 网站ids
      const sids = await ctx.service.tagsSite.findAllByQuery(opt);

      options.where = {
        id: {
          $in: sids,
        },
      };
    }

    // 类型
    if (query.type === 'hot') { // 热门
      options.order.push([ 'visit_count', 'DESC' ]);
    } else if (query.type === 'new') { // 最新
      options.order.push([ 'created_at', 'DESC' ]);
    } else if (query.type === 'com') { // 常用
      options.order.push([ 'collect_count', 'DESC' ]);
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

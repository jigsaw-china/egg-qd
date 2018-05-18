'use strict';

const Controller = require('egg').Controller;

class TagsController extends Controller {
  /**
   * 显示列表页面
   */
  async list() {
    const { ctx, service } = this;
    const tags = await service.tags.findAll();
    await ctx.render('/tags/list', { tags });
  }

}

module.exports = TagsController;

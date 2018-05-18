'use strict';

const Controller = require('egg').Controller;

class CateController extends Controller {
  /**
   * 显示列表页面
   */
  async list() {
    const { ctx, service } = this;
    const cates = await service.cate.findAll();
    await ctx.render('/cate/list', { cates });
  }

  /**
   * 显示创建页面
   */
  async create() {
    const { ctx, service } = this;
    const tags = await service.tags.findAll();
    await ctx.render('/cate/index', { tags });
  }

  /**
   * 显示编辑页面
   */
  async showEdit() {
    const { ctx, service } = this;
    const id = ctx.params.id;

    if (isNaN(id)) {
      ctx.status = 404;
      ctx.message = '此分类不存在或已被删除。';
      return;
    }
    const cate = await service.cate.find(id);
    const tags = await service.tags.findAll();
    const tag_ids = await service.tagsCate.findByCateId(id);

    tags.map(function(tag) {
      if (tag_ids.includes(tag.id)) {
        tag.selected = true;
      }
      return tag;
    });

    await ctx.render('/cate/index', { id, cate, tags });
  }

  /**
   * 保存分类
   */
  async save() {
    const { ctx, service } = this;
    const { title, iconfont, tags } = ctx.request.body;

    let msg;
    // 验证信息的正确性
    if ([ title, iconfont ].some(item => {
      return item === '';
    })) {
      msg = '信息不完整。';
    }
    // END 验证信息的正确性
    if (msg) {
      ctx.status = 422;
      await ctx.render('error', {
        error: msg,
      });
      return;
    }

    // 保存分类
    const cate = await service.cate.newAndSave(title, iconfont);

    const records = [];
    const records_tag = [];

    // 选择了标签
    tags && tags.forEach(function(tag) {
      if (isNaN(tag)) {
        records.push({ title: tag });
      } else {
        records_tag.push({
          cate_id: cate.id,
          tag_id: tag,
        });
      }
    });

    // 保存标签
    const tag_list = await service.tags.bulkCreate(records);
    tag_list.forEach(function(tag) {
      records_tag.push({
        cate_id: cate.id,
        tag_id: tag.id,
      });
    });

    // 保存标签关联
    await service.tagsCate.bulkCreateSite(records_tag);

    await ctx.redirect('/cate/list');
  }

  /**
   * 更新分类
   */
  async update() {
    const { ctx, service } = this;

    const id = ctx.params.id;
    const cate = await service.cate.find(id);
    if (!cate) {
      ctx.status = 404;
      ctx.message = '此分类不存在或已被删除。';
      return;
    }

    const { title, iconfont, tags } = ctx.request.body;
    let msg;
    // 验证信息的正确性
    if ([ title, iconfont ].some(item => {
      return item === '';
    })) {
      msg = '信息不完整。';
    }
    // END 验证信息的正确性
    if (msg) {
      ctx.status = 422;
      await ctx.render('error', {
        error: msg,
      });
      return;
    }

    cate.title = title;
    cate.iconfont = iconfont;

    // 更新分类
    await cate.save();

    const records = [];
    const records_tag = [];

    // 选择了标签
    tags && tags.forEach(function(tag) {
      if (isNaN(tag)) {
        records.push({ title: tag });
      } else {
        records_tag.push({
          cate_id: cate.id,
          tag_id: tag,
        });
      }
    });

    // 保存标签
    const tag_list = await service.tags.bulkCreate(records);
    tag_list.forEach(function(tag) {
      records_tag.push({
        cate_id: cate.id,
        tag_id: tag.id,
      });
    });

    // 删除标签关联
    await service.tagsCate.delByCateId(id);

    // 保存标签关联
    await service.tagsCate.bulkCreateSite(records_tag);

    await ctx.redirect('/cate/list');
  }

  /**
   * 删除分类
   */
  async delete() {
    const { ctx, service } = this;

    const id = ctx.params.id;
    const tags_cate = await service.cate.find(id);
    if (!tags_cate) {
      ctx.status = 422;
      ctx.body = { message: '此分类不存在或已被删除。', success: false };
      return;
    }

    await service.cate.destroy(id);

    ctx.body = { message: '分类已被删除。', success: true };
  }

}

module.exports = CateController;

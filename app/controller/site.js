'use strict';

const fs = require('fs');
const path = require('path');
const Controller = require('egg').Controller;
const awaitWriteStream = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');
const unzip = require('unzip');
const validator = require('validator');

class SiteController extends Controller {
  /**
   * 显示创建页面
   */
  async create() {
    const { ctx, service } = this;
    const tags = await service.tag.findAll();
    await ctx.render('/site/index', { tags });
  }

  /**
   * 显示编辑页面
   */
  async showEdit() {
    const { ctx, service } = this;
    const sid = ctx.params.sid;

    if (isNaN(sid)) {
      ctx.status = 404;
      ctx.message = '此网站不存在或已被删除。';
      return;
    }
    const site = await service.site.findById(sid);
    const tags = await service.tag.findAll();
    const tag_ids = await service.tag.findTagsById(sid);

    tags.map(function(tag) {
      if (tag_ids.includes(tag.id)) {
        tag.selected = true;
      }
      return tag;
    });

    await ctx.render('/site/index', { sid, site, tags });
  }

  /**
   * 显示列表页面
   */
  async list() {
    const { ctx, service } = this;
    const sites = await service.site.findAll();
    await ctx.render('/site/list', { sites });
  }

  /**
   * 保存网站
   */
  async save() {
    const { ctx, service, config } = this;

    const stream = await this.ctx.getFileStream();
    const title = validator.trim(stream.fields.title || '').toLowerCase();
    const des = validator.trim(stream.fields.des || '').toLowerCase();
    const tags = stream.fields.tags;

    let msg;
    // 验证信息的正确性
    if ([ title, des ].some(item => {
      return item === '';
    })) {
      msg = '信息不完整。';
    }
    // END 验证信息的正确性
    if (msg) {
      console.log(msg);
      ctx.status = 422;
      await sendToWormhole(stream);
      await ctx.render('site/index', {
        error: msg,
        title,
        des,
      });
      return;
    }

    const filename = path.basename(stream.filename).toLowerCase();
    const target = path.join(this.config.baseDir, 'app/public/upload/zip', filename);
    const writeStream = fs.createWriteStream(target);
    try {
      await awaitWriteStream(stream.pipe(writeStream));
      // 解压到目录
      await fs.createReadStream(target).pipe(unzip.Extract({ path: 'app/public/upload/site' }));
    } catch (err) {
      await sendToWormhole(stream);
      throw err;
    }

    const url = config.site_static_host + '/public/upload/site/' + filename.slice(0, filename.lastIndexOf('.')) + '/index.html';

    // 保存网站
    const site = await service.site.newAndSave(title, des, url);

    const records = [];
    const records_tag = [];

    // 选择了标签
    tags && tags.forEach(function(tag) {
      if (isNaN(tag)) {
        records.push({ title: tag });
      } else {
        records_tag.push({
          site_id: site.id,
          tag_id: tag,
        });
      }
    });

    // 保存标签
    const tag_list = await service.tag.bulkCreate(records);
    tag_list.forEach(function(tag) {
      records_tag.push({
        site_id: site.id,
        tag_id: tag.id,
      });
    });

    // 保存标签关联
    await service.tag.bulkCreateSite(records_tag);

    await ctx.redirect('/site/list');
  }

  /**
   * 更新网站
   */
  async update() {
    const { ctx, service, config } = this;

    const sid = ctx.params.sid;
    const site = await service.site.findById(sid);
    if (!site) {
      ctx.status = 404;
      ctx.message = '此网站不存在或已被删除。';
      return;
    }
    console.log(ctx.request.body);
    try {
      await this.ctx.getFileStream();
    } catch (e) {
      console.log(e);
    }
    // const title = validator.trim(stream.fields.title || '').toLowerCase();
    // const des = validator.trim(stream.fields.des || '').toLowerCase();
    // const tags = stream.fields.tags;
    //
    // let msg;
    // // 验证信息的正确性
    // if ([ title, des ].some(item => {
    //   return item === '';
    // })) {
    //   msg = '信息不完整。';
    // }
    // // END 验证信息的正确性
    // if (msg) {
    //   console.log(msg);
    //   ctx.status = 422;
    //   await sendToWormhole(stream);
    //   await ctx.render('site/index', {
    //     error: msg,
    //     title,
    //     des,
    //   });
    //   return;
    // }
    //
    // const filename = path.basename(stream.filename).toLowerCase();
    // const target = path.join(this.config.baseDir, 'app/public/upload/zip', filename);
    // const writeStream = fs.createWriteStream(target);
    // try {
    //   await awaitWriteStream(stream.pipe(writeStream));
    //   // 解压到目录
    //   await fs.createReadStream(target).pipe(unzip.Extract({ path: 'app/public/upload/site' }));
    // } catch (err) {
    //   await sendToWormhole(stream);
    //   throw err;
    // }
    //
    // const url = config.site_static_host + '/public/upload/site/' + filename.slice(0, filename.lastIndexOf('.')) + '/index.html';
    //
    // // 保存网站
    // await service.site.newAndSave(title, des, url);
    //
    // const records = [];
    // const records_tag = [];
    //
    // // 选择了标签
    // tags && tags.forEach(function(tag) {
    //   if (isNaN(tag)) {
    //     records.push({ title: tag });
    //   } else {
    //     records_tag.push({
    //       site_id: site.id,
    //       tag_id: tag,
    //     });
    //   }
    // });
    //
    // // 保存标签
    // const tag_list = await service.tag.bulkCreate(records);
    // tag_list.forEach(function(tag) {
    //   records_tag.push({
    //     site_id: site.id,
    //     tag_id: tag.id,
    //   });
    // });
    //
    // // 保存标签关联
    // await service.tag.bulkCreateSite(records_tag);

    await ctx.redirect('/site/list');
  }
}

module.exports = SiteController;

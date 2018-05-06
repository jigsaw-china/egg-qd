'use strict';

const fs = require('fs');
const path = require('path');
const Controller = require('egg').Controller;
const awaitWriteStream = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');
const unzip = require('unzip');
const validator = require('validator');

class SiteController extends Controller {

  async index() {
    const { ctx } = this;
    await ctx.render('/site/index', { pageTitle: '网站' });
  }

  async list() {
    const { ctx, service } = this;
    const sites = await service.site.findAll();
    await ctx.render('/site/list', { sites });
  }

  async save() {
    const { ctx, service, config } = this;

    const stream = await this.ctx.getFileStream();
    const title = validator.trim(stream.fields.title || '').toLowerCase();
    const des = validator.trim(stream.fields.des || '').toLowerCase();

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
      console.log(1333311);
      ctx.status = 422;
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

    // 保存到数据库
    await service.site.newAndSave(title, des, url);

    await ctx.redirect('/site/list');
  }
}

module.exports = SiteController;

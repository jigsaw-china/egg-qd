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
    const { ctx, service } = this;
    const tags = await service.tag.findAll();
    await ctx.render('/site/index', { pageTitle: '网站', tags });
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
    await service.site.newAndSave(title, des, url)
      .then(function(site) {
        // 选择了标签
        if (tags) {
          const records = [];
          const records_tag = [];
          tags.forEach(function(tag) {
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
          service.tag.bulkCreate(records)
            .then(function(list) {
              if (site.id) {
                list.forEach(function(tag) {
                  records_tag.push({
                    site_id: site.id,
                    tag_id: tag.id,
                  });
                });
                // 保存标签关联
                service.tag.bulkCreateSite(records_tag);
              }
            });
        }
      });

    await ctx.redirect('/site/list');
  }
}

module.exports = SiteController;

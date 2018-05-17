'use strict';

const Service = require('egg').Service;

class SiteService extends Service {
  async findById(id) {
    const site = await this.ctx.model.Site.findById(id);
    if (!site) {
      this.ctx.throw(404, 'site not found');
    }
    return site;
  }

  async findAll() {
    return await this.ctx.model.Site.findAll({
      where: {
        deleted: 0,
      },
    });
  }

  async findAllByQuery(options) {
    return await this.ctx.model.Site.findAll(options);
  }

  async newAndSave(title, des, image, url) {
    const site = new this.ctx.model.Site();
    site.title = title;
    site.des = des;
    site.image = image;
    site.url = url;

    return site.save();
  }

  async upsert(values) {
    return await this.ctx.model.Site.upsert(values);
  }
}

module.exports = SiteService;

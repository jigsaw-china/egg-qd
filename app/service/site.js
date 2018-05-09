'use strict';

const Service = require('egg').Service;

class SiteService extends Service {
  async find(id) {
    const site = await this.ctx.model.Site.findById(id);
    if (!site) {
      this.ctx.throw(404, 'site not found');
    }
    return site;
  }

  async findAll() {
    return await this.ctx.model.Site.findAll();
  }

  newAndSave(title, des, url) {
    const site = new this.ctx.model.Site();
    site.title = title;
    site.des = des;
    site.url = url;

    return site.save();
  }
}

module.exports = SiteService;

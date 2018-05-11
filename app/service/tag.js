'use strict';

const Service = require('egg').Service;

class TagService extends Service {
  async find(id) {
    const tag = await this.ctx.model.Tag.findById(id);
    if (!tag) {
      this.ctx.throw(404, 'tag not found');
    }
    return tag;
  }

  async findAll() {
    return await this.ctx.model.Tag.findAll();
  }

  // 返回 tag_ids
  async findTagsById(sid) {
    return await this.ctx.model.SiteTag.findAll({
      where: {
        site_id: sid,
      },
    }).map(function(item) {
      return item.tag_id;
    });
  }

  async bulkCreate(records) {
    return this.ctx.model.Tag.bulkCreate(records);
  }

  async bulkCreateSite(records) {
    return this.ctx.model.SiteTag.bulkCreate(records);
  }
}

module.exports = TagService;

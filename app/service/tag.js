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

  // 关联关系
  async bulkCreateSite(records) {
    return this.ctx.model.SiteTag.bulkCreate(records);
  }

  // 删除关联关系
  async delBySiteId(site_id) {
    return this.ctx.model.SiteTag.destroy({
      where: { site_id },
    });
  }
}

module.exports = TagService;

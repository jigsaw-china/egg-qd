'use strict';

const Service = require('egg').Service;

class TagsSiteService extends Service {
  // 返回 tag_ids
  async findBySiteId(sid) {
    return await this.ctx.model.SiteTag.findAll({
      where: {
        site_id: sid,
      },
    }).map(function(item) {
      return item.tag_id;
    });
  }

  async findAllByQuery(options) {
    return await this.ctx.model.SiteTag.findAll(options).map(function(item) {
      return item.site_id;
    });
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

module.exports = TagsSiteService;

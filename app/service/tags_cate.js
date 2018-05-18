'use strict';

const Service = require('egg').Service;

class TagsCateService extends Service {
  // 返回 tag_ids
  async findByCateId(sid) {
    return await this.ctx.model.CateTag.findAll({
      where: {
        cate_id: sid,
      },
    }).map(function(item) {
      return item.tag_id;
    });
  }

  // 关联关系
  async bulkCreateSite(records) {
    return this.ctx.model.CateTag.bulkCreate(records);
  }

  // 删除关联关系
  async delByCateId(cate_id) {
    return this.ctx.model.CateTag.destroy({
      where: { cate_id },
    });
  }
}

module.exports = TagsCateService;

'use strict';

const Service = require('egg').Service;

class CateService extends Service {
  async find(id) {
    const tag = await this.ctx.model.Cate.findById(id);
    if (!tag) {
      this.ctx.throw(404, 'tag not found');
    }
    return tag;
  }

  async findAll() {
    return await this.ctx.model.Cate.findAll();
  }

  // 查询分类下的标签
  async findTagsByCid(cid) {
    this.ctx.model.Tag.hasOne(this.ctx.model.CateTag);
    return await this.ctx.model.Tag.findAll({ include: [{
      model: this.ctx.model.CateTag,
      where: { cate_id: cid },
    }] });
  }

  // 保存
  async newAndSave(title, iconfont) {
    const cate = new this.ctx.model.Cate();
    cate.title = title;
    cate.iconfont = iconfont;

    return cate.save();
  }

  // 删除
  async destroy(id) {
    return await this.ctx.model.Cate.destroy({
      where: {
        id,
      },
    });
  }
}

module.exports = CateService;

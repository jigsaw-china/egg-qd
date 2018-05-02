'use strict';

const Service = require('egg').Service;

class NewsService extends Service {
  async find(id) {
    const user = await this.ctx.model.User.findById(id);
    if (!user) {
      this.ctx.throw(404, 'user not found');
    }
    return user;
  }
}

module.exports = NewsService;

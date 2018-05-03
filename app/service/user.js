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

  async getUsersByName(username) {
    return await this.ctx.model.User.findOne({
      where: {
        username,
      },
    });
  }

  newAndSave(loginname, pass, email) {
    const user = new this.ctx.model.User();
    user.username = loginname;
    user.pass = pass;
    user.email = email;

    return user.save();
  }
}

module.exports = NewsService;

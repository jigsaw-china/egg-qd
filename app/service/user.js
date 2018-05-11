'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async find(id) {
    const user = await this.ctx.model.User.findById(id);
    if (!user) {
      this.ctx.throw(404, 'user not found');
    }
    return user;
  }

  /*
   * 根据用户ID，查找用户
   * @param {String} id 用户ID
   * @return {Promise[user]} 承载用户的 Promise 对象
   */
  async getUserById(id) {
    const user = await this.ctx.model.User.findById(id);
    if (!user) {
      this.ctx.throw(404, 'user not found');
    }
    return user;
  }

  /*
   * 根据用户username，查找用户
   * @param {String} username 用户username
   * @return {Promise[user]} 承载用户的 Promise 对象
   */
  async getUsersByName(username) {
    return await this.ctx.model.User.findOne({
      where: {
        username,
      },
    });
  }

  /*
   * 根据用户ID，查找用户
   * @param {String} id 用户qqId
   * @return {Promise[user]} 承载用户的 Promise 对象
   */
  async getUserByQQId(qqId) {
    return await this.ctx.model.User.findOne({
      where: {
        qqId,
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

module.exports = UserService;

'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async index() {
    this.ctx.body = 'hi, egg';
  }

  async user() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.user.find(ctx.params.id);
  }
}

module.exports = UserController;

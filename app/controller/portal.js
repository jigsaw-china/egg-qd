'use strict';

const Controller = require('egg').Controller;

class PortalController extends Controller {
  async index() {
    const ctx = this.ctx;
    const locals = { username: 'egg' };

    await ctx.render('portal/index', locals);
  }
}

module.exports = PortalController;

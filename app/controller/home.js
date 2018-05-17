'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const ctx = this.ctx;
    const locals = { username: 'egg' };
    await ctx.render('index', locals);
  }
}

module.exports = HomeController;

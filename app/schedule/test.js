'use strict';

const Subscription = require('egg').Subscription;

class Test extends Subscription {
  // 通过 schedule 属性来设置定时任务的执行间隔等配置
  static get schedule() {
    return {
      interval: '1s', // 间隔
      type: 'all', // 指定所有的 worker 都需要执行
    };
  }

  // subscribe 是真正定时任务执行时被运行的函数
  async subscribe() {
    // const res = await this.ctx.curl('', {
    //   dataType: 'json',
    // });
    // this.ctx.app.cache = res.data;
    // console.log('task ..');
    // await this.ctx.curl('https://cnodejs.org/topic/5b038d5c41c819fd1c832bcf', {
    //   method: 'GET',
    // });
    // console.log(1);
  }
}

module.exports = Test;

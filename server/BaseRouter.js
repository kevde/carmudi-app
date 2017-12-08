'use strict';
const KoaRouter = require('koa-router');

class BaseRouter {

  constructor() {
    this.prefix = '';
  }

  async getBase(context, next) {
    return await context.render('index');
}

  createKoaRouter() {
    const router = new KoaRouter({ prefix: this.prefix });
    return router.get('/', (context, next) => this.getBase(context, next))
  }
}

module.exports = BaseRouter;

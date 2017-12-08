const sinon = require('sinon');
const KoaRouter = require('koa-router');
const BaseRouter = require('../../server/BaseRouter');

describe('BaseRouter', () => {
  it('should create a KoaRouter', () => {
    // given
    const router = new BaseRouter();

    // when
    const koaRouter = router.createKoaRouter();

    // then
    koaRouter.should.be.instanceof(KoaRouter);
    koaRouter.opts.prefix.should.be.equals(router.prefix);
  });
});

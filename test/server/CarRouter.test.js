const _ = require('lodash');
const sinon = require('sinon');
const KoaRouter = require('koa-router');
const CarRouter = require('../../server/CarRouter');
const CarRepository = require('../../server/CarRepository');

describe('CarRouter', () => {
  let repository, router, mockContext;

  beforeEach(() => {
    mockContext = {};
    repository = sinon.createStubInstance(CarRepository);
    router = new CarRouter(repository);
  });

  it('should call getCars function of CarRepository', () => {
    // given
    repository.getCars.returns([{ data: 1 }]);

    // when
    const result = router.getCars(mockContext);

    // then
    repository.getCars.should.have.been.called;
    mockContext.body.should.be.equals(repository.getCars());
    mockContext.status.should.be.equals(200);
    mockContext.type.should.be.equals('application/json');
  });

  it('should call getCars function of CarRepository with paging parameters ', () => {
    // given
    _.set(mockContext, 'data', 1);
    _.set(mockContext, 'request.query.page', 1);
    _.set(mockContext, 'request.query.limit', 10);
    repository.getCars.returns([mockContext]);

    // when
    const result = router.getCars(mockContext);

    // then
    repository.getCars.should.have.been.called;
    mockContext.body.should.be.equals(repository.getCars());
    mockContext.status.should.be.equals(200);
    mockContext.type.should.be.equals('application/json');
  });


  it('should call getCarById function of CarRepository', () => {
    // given
    mockContext = { params: { id: 1 } };
    repository.getCarById.withArgs(1).returns({ data: 1 });

    // when
    const result = router.getCarById(mockContext);

    // then
    repository.getCarById.should.have.been.calledWith(1);
    mockContext.body.should.be.equals(repository.getCarById(1));
    mockContext.status.should.be.equals(200);
    mockContext.type.should.be.equals('application/json');
  });

  it('should call countCars function of CarRepository', () => {
    // given
    repository.countCars.returns(345);

    // when
    const result = router.countCars(mockContext);

    // then
    repository.countCars.should.have.been.called;
    mockContext.body.should.be.equals(repository.countCars());
    mockContext.status.should.be.equals(200);
    mockContext.type.should.be.equals('application/json');
  });

  it('should create a KoaRouter', () => {
    // given

    const repository = sinon.createStubInstance(CarRepository);
    const router = new CarRouter(repository);

    // when
    const koaRouter = router.createKoaRouter();

    // then
    koaRouter.should.be.instanceof(KoaRouter);
    koaRouter.opts.prefix.should.be.equals(router.prefix);
  });
});

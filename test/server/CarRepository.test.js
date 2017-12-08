const CarRepository = require('../../server/CarRepository');
const cars = require('../../server/resources/cars.json');
const _ = require('lodash');

describe('CarRepository', () => {
  it('should return json instances', () => {
    // given
    const repository = new CarRepository();

    // when
    const result = repository.getCars();

    // then
    result.should.be.instanceof(Array);
    result.should.all.be.instanceof(Object);
    result.should.not.be.empty;
    result.should.be.equals(cars.cars);
  });

  it('should return json instances with page', () => {
    // given
    const repository = new CarRepository();
    const page = 1;
    const limit = 10;

    // when
    const result = repository.getCars(page, limit);

    // then
    result.should.be.instanceof(Array);
    result.length.should.be.equals(limit);
    result.should.all.be.instanceof(Object);
    result.should.not.be.empty;
    result.should.be.deep.equals(_.chunk(cars.cars, limit)[page - 1]);
  });

  it('should json of one car instance', () => {
    // given
    const repository = new CarRepository();

    // when
    const result = repository.getCarById('57dfed773dec9b376c9aeaa7');

    // then
    result.should.be.instanceof(Object);
    result.should.be.equals(_.find(cars.cars, { id: '57dfed773dec9b376c9aeaa7' }));
  });

  it('should count cars', () => {
    // given
    const repository = new CarRepository();

    // when
    const result = repository.countCars();

    // then
    result.should.be.equals(cars.cars.length);
  });

});

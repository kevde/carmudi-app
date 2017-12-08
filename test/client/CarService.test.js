import Vue from 'vue';
import CarService from '../../client/CarService';
import Car from '../../client/models/Car';

describe('CarService', () => {
  it('should get all cars', (done) => {
    // given
    const cars = [{ name: 'Ferrari', location: 'Manila' }];
    const axiosStub = { get: (path) => new Promise((resolve) => resolve({ data: cars })) };
    const carService = new CarService(axiosStub);

    // when
    const carPromise = carService.getCars();

    // then
    carPromise.then((cars) => {
      cars.should.all.be.instanceof(Car);
      done();
    });
  });

  it('should get car by id', (done) => {
    // given
    const rawCar = { name: 'Mustang', id: 2 };
    const axiosStub = { get: async(path) => await { data: rawCar } };
    const carService = new CarService(axiosStub);

    // when
    const carPromise = carService.getCarById(2);

    // then
    carPromise.then((car) => {
      car.should.be.instanceof(Car);
      car.id.should.be.equals(rawCar.id);
      car.name.should.be.equals(rawCar.name);
      done();
    });
  });

  it('should get car count', (done) => {
    // given
    const rawCarCount = 345;
    const axiosStub = { get: async(path) => await { data: rawCarCount } };
    const carService = new CarService(axiosStub);

    // when
    const carPromise = carService.countCars();

    // then
    carPromise.then((carCount) => {
      carCount.should.be.equals(rawCarCount);
      done();
    });
  });
});

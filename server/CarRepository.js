'use strict';
const CARS_JSON = require('./resources/cars.json');
const _ = require('lodash');

class CarRepository {
  getCars(page, limit) {
    return this.isPagingEnabled(page, limit) ? this.getChunkedCars(page, limit) : CARS_JSON.cars;
  }

  isPagingEnabled(page, limit) {
    return _.isNumber(page) && _.isNumber(limit) && page > 0;
  }

  getChunkedCars(page, limit) {
    const carChunks = _.chunk(CARS_JSON.cars, limit);
    return _.get(carChunks, page - 1, []);
  }

  getCarById(carId) {
    return _.find(CARS_JSON.cars, { id: carId });
  }

  countCars() {
    return CARS_JSON.cars.length;
  }
}

module.exports = CarRepository;

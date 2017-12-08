'use strict';
const KoaRouter = require('koa-router');

class CarRouter {

  constructor(repository) {
    this.repository = repository;
    this.prefix = '/api/cars';
  }

  getCars(context, next) {
    const cars = this.repository.getCars();
    this.decorateContext(context, cars, 200, 'application/json');
    return cars;
  }

  getCarById(context, next) {
    const car = this.repository.getCarById(context.params.id);
    this.decorateContext(context, car, 200, 'application/json');
    return car;
  }

  countCars(context, next) {
    const car = this.repository.countCars();
    this.decorateContext(context, car, 200, 'application/json');
    return car;
  }

  decorateContext(context, body, status, type) {
    context.body = body;
    context.status = status;
    context.type = type;
  }

  createKoaRouter() {
    const router = new KoaRouter({ prefix: this.prefix });
    return router.get('/', (context, next) => this.getCars(context, next))
      .get('/count', (context, next) => this.countCars(context, next))
      .get('/:id', (context, next) => this.getCarById(context, next))
  }
}

module.exports = CarRouter;

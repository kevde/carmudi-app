import Vue from 'vue';
import VueRouter from 'vue-router';
import CarPage from '../../client/CarPage';
import CarService from '../../client/CarService';
import Car from '../../client/models/Car';

describe('CarPage', () => {
  it('should contain necessary information', (done) => {
    // given
    const car = new Car({
      id: '57dfed773dec9b376c9aeaa7',
      main_picture: 'path/to/main_picture.png',
      description: 'Lorem ipsum est',
      name: 'Ferrari',
      location: 'Manila',
      thumbnail: 'path/to/thumbnail.png',
      price: 'P300,000,000'
    });
    const carService = sinon.createStubInstance(CarService);
    carService.getCarById.withArgs(car.id).resolves(car);
    const opts = { propsData: { carService, id: car.id, car: new Car({}) } };
    const carPage = new CarPage(opts);

    // when
    const vm = carPage.$mount();

    // then
    vm.$nextTick(() => {
      carPage.should.be.instanceof(Vue);
      carPage.should.have.property('id');
      carPage.should.have.property('carService');
      carPage.should.have.property('car');

      carPage.carService.getCarById.calledWith(car.id).should.be.true;
      vm.$el.querySelector('#mainpicture').src.should.have.string(car.main_picture);
      vm.$el.querySelector('#description').textContent.should.have.string(car.description);
      vm.$el.querySelector('#name').textContent.should.have.string(car.name);
      vm.$el.querySelector('#location').textContent.should.have.string(car.location);
      vm.$el.querySelector('#price').textContent.should.have.string(car.price);
      done();
    });
  });
});

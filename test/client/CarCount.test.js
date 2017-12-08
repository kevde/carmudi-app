import Vue from 'vue';
import VueRouter from 'vue-router';
import CarCount from '../../client/CarCount';
import CarService from '../../client/CarService';

Vue.use(VueRouter);

describe('CarCount', () => {
  it('should contain necessary information', (done) => {
    // given
    const carService = sinon.createStubInstance(CarService);
    carService.countCars.resolves(345);
    const opts = { propsData: { carService } };
    const carCount = new CarCount(opts);

    // when
    const vm = carCount.$mount();

    // then
    vm.$nextTick(() => {
      carCount.should.be.instanceof(Vue);
      carCount.carService.countCars.called.should.be.true;
      vm.$el.querySelector('#carcount').textContent.should.be.equals(`${345}`);
      done();
    });
  });
});

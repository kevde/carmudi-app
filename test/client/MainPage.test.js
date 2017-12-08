import Vue from 'vue';
import MainPage from '../../client/MainPage';
import CarPanel from '../../client/CarPanel';
import CarService from '../../client/CarService';

describe('MainPage', () => {
  let carService, mainPage, vm, cars;

  before(() => {
    cars = [{}, {}];
    carService = sinon.createStubInstance(CarService);
    carService.getCars.resolves(cars);
    mainPage = new MainPage({ propsData: { carService } });
    vm = mainPage.$mount();
  });

  it('should have children with CarPanel', (done) => {
    // given

    // when

    // then
    return Vue.nextTick(() => {
      mainPage.$options.components.CarPanel.should.be.equals(CarPanel)
      mainPage.should.be.instanceof(Vue);
      done();
    });
  });

  it('should have property of CarService', (done) => {
    // given

    // when

    // then
    return Vue.nextTick(() => {
      mainPage.$props.carService.should.be.equals(carService);
      mainPage.cars.should.be.equals(cars);
      mainPage.carService.getCars.called.should.be.equals(true);
      done();
    });

  });
});

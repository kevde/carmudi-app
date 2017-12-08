import Vue from 'vue';
import CarPanel from '../../client/CarPanel';
import Car from '../../client/models/Car';

describe('CarPanel', () => {
  it('should contain necessary information', (done) => {
    // given
    const car = new Car({ name: 'Ferrari', location: 'Manila', thumbnail: 'path/to/thumbnail.png', price: 'P300,000,000' });
    const opts = { propsData: { car } };
    const carPanel = new CarPanel(opts);

    // when
    const vm = carPanel.$mount();

    // then
    Vue.nextTick(() => {
      carPanel.should.be.instanceof(Vue);
      carPanel.should.have.property('name');
      carPanel.should.have.property('location');
      carPanel.should.have.property('thumbnail');
      carPanel.should.have.property('price');
      vm.$el.querySelector('#thumbnail').src.should.have.string(car.thumbnail);
      vm.$el.querySelector('#location').textContent.should.have.string(car.location);
      vm.$el.querySelector('#price').textContent.should.have.string(car.price);
      done();
    });
  });

  it('should trigger click method when clicked', (done) => {
    // given
    const car = new Car({ name: 'Ferrari', location: 'Manila', thumbnail: 'path/to/thumbnail.png', price: 'P300,000,000' });
    const opts = { propsData: { car } };
    const carPanel = new CarPanel(opts);
    carPanel.$router = { push: () => {} };
    const clickMethod = sinon.spy(carPanel, 'click');

    // when
    const vm = carPanel.$mount();
    vm.$el.click()

    // then
    Vue.nextTick(() => {
      clickMethod.called.should.be.true;
      done();
    });
  });
});

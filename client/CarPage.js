import Vue from 'vue';
import Component from 'vue-class-component';
import Car from './models/Car';
import CarService from './CarService';
import template from './views/car-page.pug';

@Component({ template: template(), props: { carService: CarService, id: String, car: Car } })
export default class CarPage extends Vue {

  get name() {
    return (this.car) ? this.car.name : '';
  }

  get location() {
    return (this.car) ? this.car.location : '';
  }

  get thumbnail() {
    return (this.car) ? this.car.thumbnail : '';
  }

  get price() {
    return (this.car) ? this.car.price : '';
  }

  async created() {
    this.car = await this.carService.getCarById(this.id);
    this.$mount();
  }
}

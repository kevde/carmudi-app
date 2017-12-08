import Vue from 'vue';
import Component from 'vue-class-component';
import Car from './models/Car';
import CarService from './CarService';
import template from './views/car-count.pug';

@Component({ template: template(), props: { carService: CarService, carcount: String } })
export default class CarCount extends Vue {

  async created() {
    this.carcount = await this.carService.countCars();
    this.$mount();
  }

  get results() {
    return this.carcount > 1 ? 'Results' : 'Result';
  }
}

import Vue from 'vue';
import Component from 'vue-class-component';
import template from './views/main-page.pug';
import CarPanel from './CarPanel';
import CarCount from './CarCount';
import CarService from './CarService';

@Component({ template: template(), components: { CarPanel, CarCount }, props: { carService: CarService, cars: Array } })
export default class MainPage {
  async created() {
    this.cars = await this.carService.getCars();
    this.$mount();
  }
}

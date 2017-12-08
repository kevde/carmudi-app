import Vue from 'vue';
import Component from 'vue-class-component';
import Car from './models/Car';
import template from './views/car-panel.pug';

@Component({ template: template(), props: { car: Car } })
export default class CarPanel extends Vue {

  get name() {
    return this.car.name;
  }

  get location() {
    return this.car.location;
  }

  get thumbnail() {
    return this.car.thumbnail;
  }

  get price() {
    return this.car.price;
  }

  click() {
    console.log(`I'm clicked`);
    this.$router.push(`cars/${this.car.id}`);
  }
}

import Vue from 'vue';
import VueRouter from 'vue-router';
import Component from 'vue-class-component';
import template from './views/index.pug';
import CarService from './CarService';
import MainPage from './MainPage';
import CarPage from './CarPage';
import axios from 'axios';

Vue.use(VueRouter);

const carService = new CarService(axios);
const mainPage = new MainPage({ propsData: { carService } });
const routes = [{
  path: '/',
  component: MainPage,
  props: { carService }
}, {
  path: '/cars/:id',
  component: CarPage,
  props: (route) => ({ id: route.params.id, carService, car: {} })
}];

const router = new VueRouter({ routes });
const app = new Vue({ router, template: template() })
  .$mount('#app')
  .$nextTick(() => {
    $('.ui.sticky').sticky({ context: '#context' });
  });

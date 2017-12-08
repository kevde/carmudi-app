import _ from 'lodash';
import Car from './models/Car';

export default class CarService {

  constructor(axios) {
    this.axios = axios;
  }

  getCars() {
    return this.axios.get('/api/cars')
      .then((response) => _.map(response.data, (car) => new Car(car)));
  }

  getCarById(carId) {
    return this.axios.get(`/api/cars/${carId}`)
      .then((response) => new Car(response.data));
  }

  countCars() {
    return this.axios.get('/api/cars/count')
      .then((response) => {
        console.log(response);
        return response.data;
      });
  }
}

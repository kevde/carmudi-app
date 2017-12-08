const Koa = require('koa');
const serve = require('koa-static');
const views = require('koa-render-view');
const path = require('path');

const CarRepository = require('./server/CarRepository');
const CarRouter = require('./server/CarRouter');
const BaseRouter = require('./server/BaseRouter');
const WebpackLoader = require('./server/WebpackLoader');

const app = new Koa();
const carRepository = new CarRepository();
const carRouter = new CarRouter(carRepository);
const baseRouter = new BaseRouter();
const webpackLoader = new WebpackLoader();
const carKoaRouter = carRouter.createKoaRouter();
const baseKoaRouter = baseRouter.createKoaRouter();

app.use(views(path.join(__dirname, '/server/views')));
app.use(serve(path.join(__dirname, '/client/resources')));
app.use(serve(path.join(__dirname, '/dist')));
app.use(carKoaRouter.routes());
app.use(baseKoaRouter.routes());
app.use(webpackLoader.getDev());
app.use(webpackLoader.getHot());
app.listen(3000, () => console.log('App is running'));

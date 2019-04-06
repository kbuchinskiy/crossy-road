import * as PIXI from "pixi.js";
import { getRandomInt } from "./utils.js";

export default class Road {
  constructor(carImage, rendererWidth) {
    this.update = this.update.bind(this);
    this.container = new PIXI.Container();
    this.carsList = [];
    this.direction = Math.random() < 0.5 ? -1 : 1;
    this._initCars(carImage);
  }

  _initCars(carImage) {
    window.setInterval(() => {
      const car = new PIXI.Sprite(PIXI.loader.resources[carImage].texture);
      car.y = 0;

      if (this.direction > 0) {
        car.x = -64;
      } else {
        car.x = 400 + car.width * 4;
        car.scale.x = -1;
        car.anchor.x = 1;
      }
      this.container.addChildAt(car);
      this.carsList.push(car);
    }, getRandomInt(1, 3) * 1000);
  }

  update(rendererWidth) {
    this.carsList.forEach((car, index, array) => {
      car.position.x += 2 * this.direction;

      if (this.direction > 0) {
        if (car.position.x > rendererWidth) {
          removeCar(car, array);
        }
      } else {
        if (car.position.x < 0 - car.width) {
          removeCar(car, array);
        }
      }
    });

    function removeCar(car, carsList) {
      car.destroy();
      carsList.splice(0, 1);
    }
  }
}

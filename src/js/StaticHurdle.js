import * as PIXI from "pixi.js";
import { getRandomInt, hitTestRectangle } from "./utils.js";

export default class StaticHurdle {
  constructor(backgroundImage, staticItemImage) {
    this.container = new PIXI.Container();
    const background = new PIXI.Sprite(
      PIXI.loader.resources[backgroundImage].texture
    );

    this.container.addChild(background);
    this.staticItems = [];
    this.initStaticItems(staticItemImage);
  }

  initStaticItems(staticItemImage) {
    const itemsAmount = getRandomInt(3, 6);

    for (let i = 0; i <= itemsAmount; i++) {
      const staticItem = new PIXI.Sprite(
        PIXI.loader.resources[staticItemImage].texture
      );

      staticItem.x = getRandomInt(i * staticItem.width, 600 - staticItem.width);
      this.container.addChild(staticItem);
      this.staticItems.push(staticItem);
    }
  }
}

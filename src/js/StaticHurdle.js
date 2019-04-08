import * as PIXI from "pixi.js";
import { getRandomInt, hitTestRectangle } from "./utils.js";

export default class StaticHurdle {
  constructor(backgroundImage, staticItemImage) {
    this.container = new PIXI.Container();
    
    const background = new PIXI.Sprite(
      PIXI.loader.resources[backgroundImage].texture
    );

    this.container.addChild(background);
    this.items = [];
    this.backgroundTexture = background;
    this._initStaticItems(staticItemImage);
  }

  _initStaticItems(staticItemImage) {
    const itemsAmount = getRandomInt(3, 6);

    for (let i = 0; i <= itemsAmount; i++) {
      const staticItem = new PIXI.Sprite(
        PIXI.loader.resources[staticItemImage].texture
      );

      staticItem.x = getRandomInt(i * staticItem.width, 600 - staticItem.width);

      if (!this.items.some(item => hitTestRectangle(staticItem, item, true))) {
        this.items.push(staticItem);
        this.container.addChild(staticItem);
      }
    }
  }
}

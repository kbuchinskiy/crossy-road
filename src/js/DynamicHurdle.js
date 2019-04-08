import * as PIXI from "pixi.js";
import {
  getRandomInt
} from "./utils.js";

export default class DynamicHurdle {
  constructor(backgroundImage, dynamicItemImage) {
    this.update = this.update.bind(this);

    this.container = new PIXI.Container();
    const background = new PIXI.Sprite(
      PIXI.loader.resources[backgroundImage].texture
    );

    this.container.addChild(background);
    this.items = [];
    this.backgroundTexture = background;
    this.direction = Math.random() < 0.5 ? -1 : 1;
    this.initDynamicItems(dynamicItemImage);
  }

  initDynamicItems(dynamicItemImage) {
    window.setInterval(() => {

      setTimeout(() => {
        const dynamicItem = new PIXI.Sprite(
          PIXI.loader.resources[dynamicItemImage].texture
        );

        dynamicItem.y = 0;

        if (this.direction > 0) {
          dynamicItem.x = -64 -
            getRandomInt(
              dynamicItem.height,
              dynamicItem.height * 2
            );
        } else {
          dynamicItem.x = 400 + dynamicItem.width * 4;
          dynamicItem.scale.x = -1;
          dynamicItem.anchor.x = 1;
        }
        this.container.addChild(dynamicItem);
        this.items.push(dynamicItem);
      }, getRandomInt(1, 3) * 1000);

    }, 3000);
  }

  update(rendererWidth) {
    this.items.forEach((dynamicItem, index, array) => {
      dynamicItem.position.x += 2 * this.direction;

      if (this.direction > 0) {
        if (dynamicItem.position.x > rendererWidth) {
          removeDynamicItem(dynamicItem, array);
        }
      } else {
        if (dynamicItem.position.x < 0 - dynamicItem.width) {
          removeDynamicItem(dynamicItem, array);
        }
      }
    });

    function removeDynamicItem(dynamicItem, items) {
      dynamicItem.destroy();
      items.splice(0, 1);
    }
  }
}
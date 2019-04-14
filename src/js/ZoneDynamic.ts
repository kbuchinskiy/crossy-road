
import { getRandomInt } from './utils';
import Zone from './Zone';
import Item from './Item';
import { SpriteProps } from './SpriteItem';

export default class ZoneDynamic extends Zone {
  private readonly direction: number = Math.random() < 0.5 ? -1 : 1;

  constructor(backgroundImage: string, isSafe: boolean, stageWidth: number, spriteSettings: SpriteProps) {
    super(backgroundImage, isSafe, stageWidth, spriteSettings);

    this.itemsBuilder();
    this.updateItems();
  }

  private itemsBuilder() {

    setInterval(() => {
      setTimeout(() => {
        const item = new Item(this.itemConfig);

        if (this.direction > 0) {
          item.x = -item.width -
            getRandomInt(
              item.width,
              item.width * 2
            );
        } else {
          item.x = 400 + item.width * 4;
          item.scale.x = -1;
          item.anchor.x = 1;
        }
        this.itemsContainer.addChild(item);
      }, getRandomInt(1, 3) * 1000);

    }, 3000);
  }

  updateItems() {
    this.itemsContainer.children.forEach((item: PIXI.Sprite) => {
      item.position.x += 2 * this.direction;

      if (this.direction > 0) {
        if (item.position.x > 600) {
          item.destroy();
        }
      } else {
        if (item.position.x < 0 - item.width) {
          item.destroy();
        }
      }
    });
  }

}
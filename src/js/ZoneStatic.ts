
import { getRandomInt, hitTestRectangle, SpriteProps } from './utils';
import Zone from './Zone';
import Item from './Item';
export default class ZoneStatic extends Zone {
  readonly itemsAmount: number;

  constructor(backgroundImage: string, isSafe: boolean, SpriteProps) {
    super(backgroundImage, isSafe, SpriteProps);
    this.itemsAmount = getRandomInt(3, 6);

    this.mountItems();
  }

  private mountItems() {
    for (let i = 0; i < this.itemsAmount; i++) {
      const item = new Item(this.itemConfig);

      item.x = getRandomInt(0, 600 - item.width);

      if (!this.itemsContainer.children.some(child => hitTestRectangle(child, item, true))) {
        this.itemsContainer.addChild(item);
      }
    }
  }
}
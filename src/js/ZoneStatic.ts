
import { getRandomInt, hitTestRectangle } from './utils';
import Zone from './Zone';
import { SpriteItem, SpriteProps } from './SpriteItem';
export default class ZoneStatic extends Zone {
  readonly itemsAmount: number;
  ;

  constructor(backgroundImage: string, readonly stageWidth, readonly itemIntersectionEnabled: boolean = false, spriteSettings: SpriteProps) {
    super(backgroundImage, stageWidth, spriteSettings);
    this.itemsAmount = getRandomInt(3, 6);

    this.mountItems();
  }

  private mountItems() {
    for (let i = 0; i < this.itemsAmount; i++) {
      const item = new SpriteItem(this.itemConfig);

      item.x = getRandomInt(0, this.stageWidth - item.width);

      if (!this.itemsContainer.children.some(child => hitTestRectangle(child, item, true))) {
        this.itemsContainer.addChild(item);
      }
    }
  }
}
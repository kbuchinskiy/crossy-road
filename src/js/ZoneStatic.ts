
import { getRandomInt, hitTestRectangle } from './utils';
import Zone from './Zone';
import { SpriteItem, SpriteProps } from './SpriteItem';

interface iZoneStatic {
  readonly itemsAmount: number,
  readonly zoneWidth: number,
  readonly itemIntersectionDisabled: boolean
}

export default class ZoneStatic extends Zone implements iZoneStatic {
  readonly itemsAmount: number;

  constructor(backgroundImage: string, readonly zoneWidth: number, readonly zoneHeight: number, readonly itemIntersectionDisabled: boolean = true, spriteSettings: SpriteProps) {
    super(backgroundImage, zoneWidth, zoneHeight, spriteSettings);

    this.itemsAmount = getRandomInt(3, 6);
    this.mountItems();
  }

  private mountItems() {
    let itemHit: boolean = false;
    let itemsToMountAmount: number = this.itemsAmount;

    do {
      const item: PIXI.Sprite = new SpriteItem(this.itemConfig);
      
      item.x = getRandomInt(0, this.zoneWidth - item.width);

      itemHit = this.itemsContainer.children.some(child => hitTestRectangle(child, item, true));

      if (!itemHit) {
        this.itemsContainer.addChild(item);
        itemsToMountAmount--;
      }

    } while (itemsToMountAmount > 0);

  }
}
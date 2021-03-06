
import { getRandomInt } from './utils';
import Zone from './Zone';
import { SpriteItem, SpriteProps } from './SpriteItem';

interface iZoneDynamic {
  readonly direction: number;
  readonly speed: number;
  updateItems(): void
}

export default class ZoneDynamic extends Zone implements iZoneDynamic {
  readonly direction: number = Math.random() < 0.5 ? -1 : 1;

  constructor(backgroundImage: string, zoneWidth: number, zoneHeight: number, readonly isSafe, readonly speed: number, spriteSettings: SpriteProps) {
    super(backgroundImage, zoneWidth, zoneHeight, spriteSettings);

    this.itemsBuilder();
    this.updateItems();
  }

  private itemsBuilder(): void {

    setInterval(() => {
      setTimeout(() => {
        const item = new SpriteItem(this.itemConfig);

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

  updateItems(): void {
    this.itemsContainer.children.forEach((item: PIXI.Sprite) => {
      item.position.x += this.speed * this.direction;

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



import { SpriteProps } from './utils';
interface iZone {
  readonly background: PIXI.Sprite,
  readonly isSafe: boolean,
  itemConfig: SpriteProps
}

export default abstract class Zone extends PIXI.Container implements iZone {
  readonly background: PIXI.Sprite;
  itemsContainer: PIXI.Container = new PIXI.Container;

  constructor(backgroundImage: string, readonly isSafe, readonly itemConfig: SpriteProps) {
    super();
    this.background = PIXI.Sprite.fromImage(backgroundImage);
    this.addChild(this.background);
    this.addChild(this.itemsContainer);
  }
}
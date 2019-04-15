
import { SpriteProps } from './SpriteItem';
interface iZone {
  readonly zoneHeight: number,
  readonly zoneWidth: number,
  readonly background: PIXI.Sprite,
  itemConfig: SpriteProps
}

export default abstract class Zone extends PIXI.Container implements iZone {
  readonly background: PIXI.Sprite;
  itemsContainer: PIXI.Container = new PIXI.Container;

  constructor(backgroundImage: string, readonly zoneWidth: number, readonly zoneHeight: number, readonly itemConfig: SpriteProps) {
    super();
    
    this.background = PIXI.Sprite.fromImage(backgroundImage);
    this.background.width = this.zoneWidth;
    this.background.height = this.zoneHeight;

    this.addChild(this.background);
    this.addChild(this.itemsContainer);
  }
}
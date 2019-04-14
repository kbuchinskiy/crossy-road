import { SpriteProps, SpriteItem } from './SpriteItem';

export default class Player extends SpriteItem {
  speed: number = 2;
  vx: number = 0;
  vy: number = 0;
  prevX: number = 0;
  prevY: number = 0;
  
  constructor(props: SpriteProps) {
    super(props);
    this.update();
  }

  public update() {
    this.x += this.vx;
    this.y += this.vy;
  }

}
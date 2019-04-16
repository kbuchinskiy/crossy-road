import { SpriteProps, SpriteItem } from './SpriteItem';

interface iPlayer {
  speed: number,
  vx: number,
  vy: number,
  update(): void
}

export default class Player extends SpriteItem implements iPlayer {
  speed: number = 2;
  vx: number = 0;
  vy: number = 0;

  constructor(props: SpriteProps) {
    super(props);
    this.update();
  }

  update(): void {
    this.x += this.vx;
    this.y += this.vy;
  }
}
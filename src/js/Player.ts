
import { SpriteProps } from './utils';
export default class Player extends PIXI.Sprite {
  direction: number = 0;
  speed: number = 0;

  constructor(props: SpriteProps) {
    super(PIXI.Texture.fromImage(props.image));

    this.height = props.height;
    this.width = props.width;
  }
}
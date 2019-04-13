
import { SpriteProps } from './utils';
export default class Item extends PIXI.Sprite {
  constructor(props: SpriteProps) {
    super(PIXI.Texture.fromImage(props.image));
    this.width = props.width;
    this.height = props.height;
  }
}
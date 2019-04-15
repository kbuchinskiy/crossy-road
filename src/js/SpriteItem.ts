
export interface SpriteProps {
  image: string,
  width: number,
  height: number
}

export class SpriteItem extends PIXI.Sprite {
  constructor(props: SpriteProps) {
    super(PIXI.loader.resources[props.image].texture);
    this.width = props.width;
    this.height = props.height;
  }
}
import { SpriteProps, SpriteItem } from './SpriteItem';

export default class FinishLine extends SpriteItem {
  direction: number = 0;
  speed: number = 0;

  constructor(props: SpriteProps) {
    super(props);
  }
}
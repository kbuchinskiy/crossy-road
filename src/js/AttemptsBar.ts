
import { SpriteItem, SpriteProps } from './SpriteItem';

interface iAttemptsBar {
  readonly attemptsAmount: number,
  removeAttempt()
}

export default class AttemptsBar extends PIXI.Container implements iAttemptsBar {
  private attemptsLeft: number;
  constructor(readonly attemptsAmount: number, private readonly spaceBetween: number, private readonly attemptItemSetting: SpriteProps) {
    super();
    this.mountAttempts();
    this.attemptsLeft = attemptsAmount;
  }

  private mountAttempts() {
    for (let i = 0; i < this.attemptsAmount; i++) {
      const attemptItem: SpriteItem = new SpriteItem({ image: this.attemptItemSetting.image, width: this.attemptItemSetting.width, height: this.attemptItemSetting.height });
      attemptItem.x = i * this.spaceBetween;
      this.addChild(attemptItem);
    }
  }

  get attemptsAvailable(): number {
    return this.attemptsLeft;
  }


  removeAttempt() {
    this.children.pop();
    this.attemptsLeft--;
  }
}
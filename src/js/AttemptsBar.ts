
import { SpriteItem, SpriteProps } from './SpriteItem';

interface iAttemptsBar {
  readonly attemptsTotal: number,
  readonly spaceBetween: number
  removeAttempt(): void
}

export default class AttemptsBar extends PIXI.Container implements iAttemptsBar {
  private attemptsLeft: number;
  constructor(readonly attemptsTotal: number, readonly spaceBetween: number, private readonly attemptItemSetting: SpriteProps) {
    super();
    this.mountAttempts();
    this.attemptsLeft = attemptsTotal;
  }

  private mountAttempts(): void {
    for (let i = 0; i < this.attemptsTotal; i++) {
      const attemptItem: SpriteItem = new SpriteItem({ image: this.attemptItemSetting.image, width: this.attemptItemSetting.width, height: this.attemptItemSetting.height });
      attemptItem.x = i * this.spaceBetween;
      this.addChild(attemptItem);
    }
  }

  get attemptsAvailable(): number {
    return this.attemptsLeft;
  }

  removeAttempt(): void {
    this.children.pop();
    this.attemptsLeft--;
  }
}
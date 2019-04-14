
import { SpriteItem } from './SpriteItem';

interface iAttemptsBar {
  readonly attemptsAmount: number,
  removeAttempt()
}

export default class AttemptsBar extends PIXI.Container implements iAttemptsBar {
  private _attemptsLeft: number;
  constructor(readonly attemptsAmount: number, private readonly attemptIcon: string, private readonly spaceBetween: number) {
    super();
    this.mountAttempts();
    this._attemptsLeft = attemptsAmount;
  }

  private mountAttempts() {
    for (let i = 0; i < this.attemptsAmount; i++) {
      const attemptItem = new SpriteItem({ image: this.attemptIcon, width: 10, height: 10 });
      attemptItem.x = i * this.spaceBetween;
      this.addChild(attemptItem);
    }
  }

  get attemptsAvailable(): number {
    return this._attemptsLeft;
  }


  removeAttempt() {
    this.children.pop();
    this._attemptsLeft--;
  }
}
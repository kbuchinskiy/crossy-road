import {
  keyboard
} from "./utils";
const left = keyboard(37),
  right = keyboard(39);

export default class Player {
  constructor(playerImage, speed) {
    this.sprite = new PIXI.Sprite(PIXI.loader.resources[playerImage].texture);
    this._initSmoothMovements();
    this._speed = speed;

    this._onKeyDown = this._onKeyDown.bind(this);
    document.addEventListener("keydown", this._onKeyDown);
  }

  _onKeyDown(key) {
    if (key.keyCode === 38) {
      this._resetPrevRecordX();
      this.sprite.position.y -= this.sprite.height;
      this.sprite.prevY = this.sprite.position.y + this.sprite.height;
    }

    if (key.keyCode === 83 || key.keyCode === 40) {
      this._resetPrevRecordX();
      this.sprite.position.y += this.sprite.height;
      this.sprite.prevY = this.sprite.position.y - this.sprite.height;
    }

    if (key.keyCode === 65 || key.keyCode === 37) {
      this._resetPrevRecordY();
      this.sprite.prevX = this.sprite.position.x;
    }

    if (key.keyCode === 68 || key.keyCode === 39) {
      this._resetPrevRecordY();
      this.sprite.prevX = this.sprite.position.x;
    }
  }

  _resetPrevRecordX() {
    this.sprite.prevX = this.sprite.position.x;
  }

  _resetPrevRecordY() {
    this.sprite.prevY = this.sprite.position.y;
  }

  _initSmoothMovements() {
    left.press = function () {
      this.sprite.vx = -this._speed;
      this.sprite.vy = 0;
    }.bind(this);

    left.release = function () {
      if (!right.isDown && this.sprite.vy === 0) {
        this.sprite.vx = 0;
      }
    }.bind(this);


    right.press = function () {
      this.sprite.vx = this._speed;
      this.sprite.vy = 0;
    }.bind(this);
    right.release = function () {
      if (!left.isDown && this.sprite.vy === 0) {
        this.sprite.vx = 0;
      }
    }.bind(this);

  }
}
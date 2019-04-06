import { keyboard } from "./utils";
const left = keyboard(37),
  up = keyboard(38),
  right = keyboard(39),
  down = keyboard(40);

export default class Player {
  constructor(playerImage, speed) {
    this.sprite = new PIXI.Sprite(PIXI.loader.resources[playerImage].texture);
    this._initControls();
    this.speed = speed; 

    // this.onKeyDown = this.onKeyDown.bind(this);
    // document.addEventListener("keydown", this.onKeyDown);
  }

  onKeyDown(key) {
    if (key.keyCode === 38) {
      this.sprite.position.y -= this.sprite.height;
    }

    if (key.keyCode === 83 || key.keyCode === 40) {
      this.sprite.position.y += this.sprite.height;
    }

    if (key.keyCode === 65 || key.keyCode === 37) {
      this.sprite.position.x -= this.sprite.height;
      console.log(key);
    }

    if (key.keyCode === 68 || key.keyCode === 39) {
      this.sprite.position.x += this.sprite.height;
    }
  }

  _initControls() {
    left.press = function() {
      this.sprite.vx = -this.speed;
      this.sprite.vy = 0;
    }.bind(this);

    left.release = function() {
      if (!right.isDown && this.sprite.vy === 0) {
        this.sprite.vx = 0;
      }
    }.bind(this);

    up.press = function() {
      this.sprite.vy = -this.speed;
      this.sprite.vx = 0;
    }.bind(this);
    up.release = function() {
      if (!down.isDown && this.sprite.vx === 0) {
        this.sprite.vy = 0;
      }
    }.bind(this);

    right.press = function() {
      this.sprite.vx = this.speed;
      this.sprite.vy = 0;
    }.bind(this);
    right.release = function() {
      if (!left.isDown && this.sprite.vy === 0) {
        this.sprite.vx = 0;
      }
    }.bind(this);

    down.press = function() {
      this.sprite.vy = this.speed;
      this.sprite.vx = 0;
    }.bind(this);
    down.release = function() {
      if (!up.isDown && this.sprite.vx === 0) {
        this.sprite.vy = 0;
      }
    }.bind(this);
  }
}

import * as PIXI from "pixi.js";
import { hitTestRectangle } from "./utils";
import Player from "./Player.js";

import playerImage from "../images/cat.png";

export default class Game {
  constructor(parentDomElem) {
    this.app = new PIXI.Application({
      width: 600,
      height: 400,
      antialiasing: true,
      transparent: false,
      resolution: 1
    });
    this.state;
    this.playerSprite;
    this.box;
    this.message;

    this.setup = this.setup.bind(this);

    parentDomElem.appendChild(this.app.view);

    PIXI.loader.add(playerImage).load(this.setup);
  }

  setup() {
    this.playerSprite = new Player(playerImage, 5).sprite;
    this._setPlayerInitialProps();

    this.box = new PIXI.Graphics();
    this.box.beginFill(0xccff99);
    this.box.drawRect(0, 0, 64, 64);
    this.box.endFill();
    this.box.x = 120;
    this.box.y = 96;

    this.app.stage.addChild(this.box);

    this.app.stage.addChild(this.playerSprite);

    //Create the text sprite
    let style = new PIXI.TextStyle({
      fontFamily: "sans-serif",
      fontSize: 18,
      fill: "white"
    });
    this.message = new PIXI.Text("No collision...", style);
    this.message.position.set(8, 8);

    this.app.stage.addChild(this.message);
    //Set the game state
    this.state = this.play;

    this.app.ticker.add(delta => this.gameLoop(delta));
  }

  gameLoop(delta) {
    this.state(delta);
  }

  play(delta) {
    this.playerSprite.x += this.playerSprite.vx;
    this.playerSprite.y += this.playerSprite.vy;

    this._disablePlayerDisappearance();

    if (hitTestRectangle(this.playerSprite, this.box)) {
      this.message.text = "hit!";
      this.box.tint = 0xff3300;
    } else {
      this.message.text = "No collision...";
      this.box.tint = 0xccff99;
    }
  }

  _setPlayerInitialProps() {
    this.playerSprite.scale.set(0.5, 0.5);
    const playerY = this.app.renderer.view.height - this.playerSprite.height;
    const playerX = this.app.renderer.view.width / 2;

    this.playerSprite.position.set(playerX, playerY);
    this.playerSprite.position.set(playerX, playerY);

    this.playerSprite.vx = 0;
    this.playerSprite.vy = 0;
  }

  _disablePlayerDisappearance() {
    let playerPosition = this.playerSprite.position;
    let topBorderTouch = playerPosition.y <= 0;
    let rightBorderTouch =
      playerPosition.x >= this.app.view.width - this.playerSprite.width;
    let bottomBorderTouch =
      playerPosition.y >= this.app.view.height - this.playerSprite.height;
    let leftBorderTouch = playerPosition.x <= 0;

    if (topBorderTouch) {
      playerPosition.y = 0;
    }

    if (rightBorderTouch) {
      playerPosition.x = this.app.view.width - this.playerSprite.width;
    }

    if (bottomBorderTouch) {
      playerPosition.y = this.app.view.height - this.playerSprite.height;
    }

    if (leftBorderTouch) {
      playerPosition.x = 0;
    }
  }
}

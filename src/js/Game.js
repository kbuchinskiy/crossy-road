import * as PIXI from "pixi.js";
import { hitTestRectangle } from "./utils";
import Player from "./Player.js";
import Road from "./Road.js";

import playerImage from "../images/cat.png";
import roadImage from "../images/road.jpg";
import carImage from "../images/car.png";

export default class Game {
  constructor(parentDomElem) {
    this._setup = this._setup.bind(this);

    this.app = new PIXI.Application({
      width: 600,
      height: 400,
      antialiasing: true,
      transparent: false,
      resolution: 1
    });

    this.app.renderer.backgroundColor = 0x9999999;
    this.state;
    parentDomElem.appendChild(this.app.view);
    PIXI.loader.add([playerImage, roadImage, carImage]).load(this._setup);
  }
  _addRoad(Road) {
    this.road = new Road(carImage);
    this.roadContainer = this.road.container;
    this.roadContainer.width = this.app.renderer.view.width;
    this.roadContainer.height = 34;

    this.app.stage.addChild(this.roadContainer);
  }

  _addPlayer(Player) {
    this.player = new Player(playerImage, 5);
    this.playerSprite = this.player.sprite;
    this._setPlayerInitialProps();

    this.app.stage.addChild(this.playerSprite);
  }

  _setup() {
    this._addPlayer(Player);
    this._addRoad(Road);

    this.state = this.play;
    this.app.ticker.add(delta => this._gameLoop(delta));
  }

  _gameLoop(delta) {
    this.state(delta);
  }

  play(delta) {
    this.playerSprite.x += this.playerSprite.vx;
    this.playerSprite.y += this.playerSprite.vy;
    this._disablePlayerDisappearance();
    this.road.update(this.app.renderer.width);

    this.road.carsList.forEach(car => {
      if (hitTestRectangle(this.playerSprite, car)) {
        this._setPlayerInitialProps();
      }
    });
  }

  _setPlayerInitialProps() {
    this.playerSprite.width = 32;
    this.playerSprite.height = 32;

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

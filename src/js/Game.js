import * as PIXI from "pixi.js";
import { hitTestRectangle } from "./utils";
import Player from "./Player.js";
import DynamicHurdle from "./DynamicHurdle";
import StaticHurdle from "./StaticHurdle";

import playerImage from "../images/cat.png";
import roadBg from "../images/road.jpg";
import riverBg from "../images/water.jpg";
import treeFieldBg from "../images/grass.jpg";
import carImage from "../images/car.png";
import raftImage from "../images/raft.jpg";
import treeImage from "../images/tree.png";

export default class Game {
  constructor(config) {
    this.setup = this.setup.bind(this);
    this.config = config;
    this.config.hurdles.reverse();

    this.hurdles = [];

    this.app = new PIXI.Application({
      width: 600,
      height: 400,
      antialiasing: true,
      transparent: false,
      resolution: 1
    });

    this.app.renderer.backgroundColor = 0x9999999;
    this.state;
    PIXI.loader
      .add([
        playerImage,
        roadBg,
        riverBg,
        treeFieldBg,
        carImage,
        raftImage,
        treeImage
      ])
      .load(this.setup);
  }

  setup() {
    this.genereteHurdles();
    this.addPlayer(Player);

    this.state = this.play;
    this.app.ticker.add(delta => this.gameLoop(delta));
  }

  gameLoop(delta) {
    this.state(delta);
  }

  play(delta) {
    this.updatePlayer();
    this.disablePlayerDisappearance();
    this.updateDynamicObstalces();

    this.hurdles.forEach(hurdle => {
      if (hitTestRectangle(this.playerSprite, hurdle.container)) {
        this.setPlayerInitialProps();
      }
    });
  }
  addPlayer() {
    this.player = new Player(playerImage, 5);
    this.playerSprite = this.player.sprite;
    this.setPlayerInitialProps();
    this.app.stage.addChild(this.playerSprite);
  }
  updatePlayer() {
    this.playerSprite.x += this.playerSprite.vx;
    this.playerSprite.y += this.playerSprite.vy;
  }

  updateDynamicObstalces() {
    this.hurdles.forEach(hurdle => {
      if (!hurdle.static) {
        hurdle.update();
      }
    });
  }

  setPlayerInitialProps() {
    this.playerSprite.width = 32;
    this.playerSprite.height = 32;

    const playerY = this.app.renderer.view.height - this.playerSprite.height;
    const playerX = this.app.renderer.view.width / 2;

    this.playerSprite.position.set(playerX, playerY);
    this.playerSprite.position.set(playerX, playerY);

    this.playerSprite.vx = 0;
    this.playerSprite.vy = 0;
  }

  disablePlayerDisappearance() {
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

  genereteHurdles() {
    const hurdlesList = this.config.hurdles;

    hurdlesList.forEach((hurdleType, index) => {
      let hurdle;
      switch (hurdleType) {
        case "road":
          hurdle = new DynamicHurdle(roadBg, carImage);
          break;
        case "river":
          hurdle = new DynamicHurdle(riverBg, raftImage);
          break;
        case "treeField":
          hurdle = new StaticHurdle(treeFieldBg, treeImage);
          hurdle.static = true;
          break;
      }
      hurdle.type = hurdleType;
      this.hurdles.push(hurdle);

      hurdle.container.y = index * 32 + 32;
      this.app.stage.addChild(hurdle.container);
    });
  }
}

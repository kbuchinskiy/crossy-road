import * as PIXI from "pixi.js";
import {
  hitTestRectangle
} from "./utils";
import Player from "./Player.js";
import DynamicHurdle from "./DynamicHurdle";
import StaticHurdle from "./StaticHurdle";

import playerImage from "../images/cat.png";
import roadBg from "../images/road.jpg";
import riverBg from "../images/water.jpg";
import treeFieldBg from "../images/grass.jpg";
import finishLineImage from "../images/finishLine.jpg";
import carImage from "../images/car.png";
import raftImage from "../images/raft.jpg";
import treeImage from "../images/tree.png";
import heartImage from "../images/heart.png";

export default class Game {
  constructor(config) {
    this.setup = this.setup.bind(this);
    this.config = config;
    this.config.hurdles.reverse();
    this.attemptsAmount = config.attempts;
    this.hurdles = [];
    this.finishLine;
    this.attemptsBar;
    this.state;

    this.app = new PIXI.Application({
      width: 600,
      height: 400,
      antialiasing: true,
      transparent: false,
      resolution: 1
    });
    console.log(this.app);


    this.app.renderer.backgroundColor = 0x9999999;

    PIXI.loader
      .add([
        playerImage,
        roadBg,
        riverBg,
        treeFieldBg,
        finishLineImage,
        carImage,
        raftImage,
        treeImage,
        heartImage
      ])
      .load(this.setup);
  }

  setup() {
    this.addFinishLine();
    this.addAttemptsBar();
    this.genereteHurdles();
    this.addPlayer();

    this.state = this.play;
    this.app.ticker.add(delta => this.gameLoop(delta));
  }

  gameLoop(delta) {
    this.state(delta);
  }

  gameOver(win) {
    this.app.ticker.stop();

    if (win) {
      alert("You win");
    } else {
      alert("You lost");
    }

    location.reload();
  }
  play(delta) {
    if (this.attemptsAmount === 0) {
      this.gameOver(false)

    } else {
      this.updatePlayer();
      this.disablePlayerDisappearance();
      this.updateDynamicObstalces();

      if (hitTestRectangle(this.playerSprite, this.finishLine)) {
        this.gameOver(true)
      }

      this.hurdles.forEach(hurdle => {
        if (hitTestRectangle(this.playerSprite, hurdle.container)) {
          this.hurdleHitHandler(hurdle);
        }
      });
    }
  }

  deleteAttempt() {
    let attempts = this.attemptsBar.children;
    this.attemptsAmount--;
    attempts[attempts.length - 1].destroy();
    this.setPlayerInitialProps();
  }

  hurdleHitHandler(hurdle) {
    if (hurdle instanceof StaticHurdle) {
      this.staticItemHitHandler(hurdle);
    } else {
      this.dynamicItemHitHandler(hurdle);
    }
  }

  staticItemHitHandler(hurdle) {
    hurdle.items.forEach(item => {
      if (hitTestRectangle(this.playerSprite, item, true)) {
        this.playerSprite.y = this.playerSprite.prevY;
        this.playerSprite.x = this.playerSprite.prevX;
      }
    });
  }

  dynamicItemHitHandler(hurdle) {
    // road
    if (hurdle.type === "road") {
      hurdle.items.forEach(item => {
        if (hitTestRectangle(this.playerSprite, item, true)) {
          this.deleteAttempt();
        }
      });
    }
    // river
    else if (hurdle.type === "river") {
      let itemHit = false;
      hurdle.items.forEach(item => {
        if (hitTestRectangle(this.playerSprite, item, true)) {
          this.playerSprite.x =
            item.x + item.width / 2 - this.playerSprite.width / 2;
          itemHit = true;
        }
      });

      if (itemHit) return;

      this.deleteAttempt();
    }
  }

  addPlayer() {
    this.player = new Player(playerImage, 5);
    this.playerSprite = this.player.sprite;
    this.setPlayerInitialProps();
    this.app.stage.addChild(this.playerSprite);
  }

  addFinishLine() {
    this.finishLine = new PIXI.Sprite(
      PIXI.loader.resources[finishLineImage].texture
    );
    this.finishLine.y = 16;
    this.app.stage.addChild(this.finishLine);
  }

  addAttemptsBar() {
    this.attemptsBar = new PIXI.Container();
    for (let i = 0; i < this.config.attempts; i++) {
      let attempt = new PIXI.Sprite(PIXI.loader.resources[heartImage].texture);
      attempt.x += i * attempt.width;
      this.attemptsBar.addChild(attempt);
    }

    this.app.stage.addChild(this.attemptsBar);
  }

  updatePlayer() {
    this.playerSprite.x += this.playerSprite.vx;
    this.playerSprite.y += this.playerSprite.vy;
  }

  updateDynamicObstalces() {
    this.hurdles.forEach(hurdle => {
      if (hurdle instanceof DynamicHurdle) {
        hurdle.update();
      }
    });
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
          break;
      }
      hurdle.type = hurdleType;
      this.hurdles.push(hurdle);

      hurdle.container.y = index * 32 + 48;
      this.app.stage.addChild(hurdle.container);
    });
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
}
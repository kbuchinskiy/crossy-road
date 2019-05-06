import "pixi.js";
import Player from "./Player";
import Zone from "./Zone";
import ZoneStatic from "./ZoneStatic";
import ZoneDynamic from "./ZoneDynamic";
import FinishLine from "./FinishLine";
import AttemptsBar from "./AttemptsBar";
import { SpriteItem } from "./SpriteItem";
import { ZoneFactory, zoneTypes } from "./ZoneFactory";
import { hitTestRectangle, keyboard } from "./utils";

const playerImage = require("../images/cat.png");
const roadBg = require("../images/road.jpg");
const riverBg = require("../images/water.jpg");
const treeBg = require("../images/grass.jpg");
const finishLineImage = require("../images/finishLine.jpg");
const carImage = require("../images/car.png");
const raftImage = require("../images/raft.jpg");
const treeImage = require("../images/tree.png");
const heartImage = require("../images/heart.png");

enum keys {
  left = 37,
  up = 38,
  right = 39,
  down = 40,
}

interface iGame {
  readonly stageWidth: number,
  readonly stageHight: number,
  readonly stageColor: number,
  readonly stepY: number,
  readonly finishLineY: number,
  readonly attemptsBarY: number,
  gameOver(): void,
  setPlayerInitialPosition(): void
}

export interface gameConfig {
  attempts: number,
  zones: zoneTypes[],
  level: number
}

export class Game implements iGame {
  private app: PIXI.Application;
  private player: Player;
  private playerPrevX: number = 0;
  private playerPrevY: number = 0;
  private finishLine: FinishLine;
  private attemptsBar: AttemptsBar;
  private zones: Zone[] = [];
  private attemptsAmount: number;
  private zoneTypesList: zoneTypes[];
  private difficulty: number;

  readonly stageWidth: number = 600;
  readonly stageHight: number = 400;
  readonly stageColor: number = 0x999999;
  readonly stepY: number = 32;
  readonly finishLineY: number = 16;
  readonly attemptsBarY: number = 0;

  constructor(config: gameConfig) {

    this.configHandler(config);

    this.app = new PIXI.Application(this.stageWidth, this.stageHight, {
      backgroundColor: this.stageColor
    });

    document.body.appendChild(this.app.view);

    PIXI.loader
      .add([
        playerImage,
        roadBg,
        riverBg,
        treeBg,
        finishLineImage,
        carImage,
        raftImage,
        treeImage,
        heartImage
      ])
      .load(() => this.setup());
  }

  configHandler(config: gameConfig) {
    if (config.attempts > 0 && config.attempts <= 10) {
      this.attemptsAmount = config.attempts;
    } else {
      throw new Error("Available attempts value is 1-10");
    }

    if (config.level > 1 && config.level <= 5) {
      this.difficulty = config.level;
    } else {
      throw new Error("Available level value is 1-5");
    }

    if (config.zones.length === 10) {
      this.zoneTypesList = config.zones;
    } else {
      throw new Error("Game should contain 10 zones");
    }
  }

  private setup(): void {
    this.mountZones();
    this.mountFinishLine();
    this.mountAttemptsBar();
    this.mountPlayer(playerImage);

    this.enablePlayerPrevPositionRecording();
    this.initSmoothMovements();

    this.app.ticker.add(() => this.gameLoop());
  }

  private gameLoop(): void {
    this.updateDynamicZones();
    this.preventPlayerDisappearance();
    this.player.update();

    // hits
    this.finishLineHitHandler();
    this.zonesHitHandler();
  }

  private zonesHitHandler(): void {
    this.zones.forEach((zone: Zone) => {
      if (hitTestRectangle(this.player, zone)) {
        if (zone instanceof ZoneDynamic) {
          this.dynamicZoneHitHandler(zone);
        } else if (zone instanceof ZoneStatic) {
          this.staticZoneHitHandler(zone);
        }
      }
    })
  }

  private dynamicZoneHitHandler(zone: ZoneDynamic): void {
    if (!zone.isSafe) {
      let hit: boolean = false;

      zone.itemsContainer.children.forEach((item: SpriteItem) => {
        if (hitTestRectangle(this.player, item, true)) {
          this.player.x =
            item.x + item.width / 2 - this.player.width / 2;

          hit = true;
        }
      });

      if (hit) return;
      this.loseAttempt();

    } else {
      zone.itemsContainer.children.forEach(item => {
        if (hitTestRectangle(this.player, item, true)) {
          this.loseAttempt();
        }
      });
    }

  }

  private staticZoneHitHandler(zone): void {
    zone.itemsContainer.children.forEach(item => {
      if (hitTestRectangle(this.player, item, true)) {
        if (zone.itemIntersectionDisabled) {
          this.player.y = this.playerPrevY;
          this.player.x = this.playerPrevX;
        }
      }
    });
  }

  private loseAttempt(): void {
    this.attemptsBar.removeAttempt();
    this.checkAvailableAttempts();
    this.setPlayerInitialPosition();
  }

  private finishLineHitHandler(): void {
    if (hitTestRectangle(this.player, this.finishLine)) {
      this.gameOver(true);
    }
  }

  private enablePlayerPrevPositionRecording(): void {
    document.addEventListener("keydown", (key) => {
      if (key.keyCode === keys.up) {
        this.playerPrevX = this.player.x;
        this.playerPrevY = this.player.y;
      }
      if (key.keyCode === keys.down) {
        this.playerPrevX = this.player.x;
        this.playerPrevY = this.player.y;
      }
      if (key.keyCode === keys.left) {
        this.playerPrevY = this.player.y;
        this.playerPrevX = this.player.x;
      }
      if (key.keyCode === keys.right) {
        this.playerPrevY = this.player.y;
        this.playerPrevX = this.player.x;
      }
    });
  }

  private initSmoothMovements(): void {
    const left = keyboard(keys.left),
      up = keyboard(keys.up),
      right = keyboard(keys.right),
      down = keyboard(keys.down);

    left.press = () => {
      this.player.vx = -this.player.speed;
      this.player.vy = 0;
    };
    left.release = () => {
      if (!right.isDown && this.player.vy === 0) {
        this.player.vx = 0;
      }
    };

    // up
    up.press = () => {
      this.player.y -= this.stepY;
      this.player.vx = 0;
    };
    up.release = () => {
      if (!down.isDown && this.player.vx === 0) {
        this.player.vy = 0;
      }
    };

    // right
    right.press = () => {
      this.player.vx = this.player.speed;
      this.player.vy = 0;
    };
    right.release = () => {
      if (!left.isDown && this.player.vy === 0) {
        this.player.vx = 0;
      }
    };

    // down
    down.press = () => {
      this.player.y += this.stepY;
      this.player.vx = 0;
    };
    down.release = () => {
      if (!up.isDown && this.player.vx === 0) {
        this.player.vy = 0;
      }
    };

  }


  private checkAvailableAttempts(): void {
    if (this.attemptsBar.attemptsAvailable <= 0) {
      this.gameOver(false);
    }
  }

  gameOver(win: boolean = false): void {
    this.app.ticker.stop();
    if (win) {
      alert('You win!');
    }
    else {
      alert('You lost!')
    }
    location.reload();
  }

  private updateDynamicZones(): void {
    this.zones.forEach(zone => {
      if (zone instanceof ZoneDynamic) {
        zone.updateItems();
      }
    })
  }

  private mountPlayer(playerImage: string): void {
    this.player = new Player({ height: 32, width: 32, image: playerImage });
    this.setPlayerInitialPosition();

    this.app.stage.addChild(this.player);
  }

  private mountZones(): void {
    this.zoneTypesList.forEach((type, index) => {
      const zone = ZoneFactory.createZone(type, this.stageWidth, this.stepY, this.difficulty);
      zone.y = index * this.stepY + 48;
      this.zones.push(zone);

      this.app.stage.addChild(zone);
    });

  }

  private mountFinishLine() {
    this.finishLine = new FinishLine({ image: finishLineImage, width: this.stageWidth, height: this.stepY });
    this.finishLine.y = this.finishLineY;
    this.app.stage.addChild(this.finishLine);
  }

  private mountAttemptsBar() {
    this.attemptsBar = new AttemptsBar(this.attemptsAmount, 15, { width: 10, height: 10, image: heartImage });
    this.attemptsBar.y = this.attemptsBarY;
    this.app.stage.addChild(this.attemptsBar);
  }

  private preventPlayerDisappearance() {
    // top border touch
    if (this.player.y <= 0) {
      this.player.y = 0;
    }
    // right border touch 
    if (this.player.x >= this.stageWidth - this.player.width) {
      this.player.x = this.stageWidth - this.player.width;
    }
    // bottom border touch 
    if (this.player.y >= this.stageHight - this.player.height) {
      this.player.y = this.stageHight - this.player.height;
    }
    // left border touch 
    if (this.player.x <= 0) {
      this.player.x = 0;
    }
  }

  setPlayerInitialPosition(): void {
    const playerY = this.stageHight - this.player.height;
    const playerX = this.stageWidth / 2 - this.player.width;

    this.playerPrevX = playerX;
    this.playerPrevY = playerY;
    this.player.position.set(playerX, playerY);
  }
}
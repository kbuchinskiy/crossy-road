import "pixi.js";
import Player from "./Player";
import Zone from "./Zone";
// import ZoneStatic from "./ZoneStatic";
import ZoneDynamic from "./ZoneDynamic";
import FinishLine from "./FinishLine";
import AttemptsBar from "./AttemptsBar";
import { ZoneFactory, zoneTypes } from "./ZoneFactory";

const playerImage = require("../images/cat.png");
const roadBg = require("../images/road.jpg");
const riverBg = require("../images/water.jpg");
const treeBg = require("../images/grass.jpg");
const finishLineImage = require("../images/finishLine.jpg");
const carImage = require("../images/car.png");
const raftImage = require("../images/raft.jpg");
const treeImage = require("../images/tree.png");
const heartImage = require("../images/heart.png");

export default class Game {
  private app: PIXI.Application;
  private player: PIXI.Sprite;
  private finishLine: PIXI.Sprite;
  private attemptsBar: AttemptsBar;
  private readonly stageWidth: number = 600;
  private readonly stageHight: number = 400;
  private readonly stageColor: number = 0x999999;
  private readonly stepY: number = 32;
  private readonly finishLineY: number = 16;
  private readonly attempsBarY: number = 0;
  private zones: Zone[] = [];


  constructor(readonly attemptsAmount, readonly zoneTypesList: zoneTypes[]) {

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

  private setup(): void {
    this.mountPlayer(playerImage);
    this.mountZones();
    this.mountFinishLine();
    this.mountAttemptsBar();

    this.app.ticker.add(() => this.gameLoop());
  }

  private gameLoop(): void {
    this.updateDynamicZones();
    this.checkAvailableAttempts();
  }

  private checkAvailableAttempts() {
    if (this.attemptsBar.attemptsAvailable <= 0) {
      this.gameOver(false);
    }
  }

  gameOver(win: boolean): void {
    this.app.ticker.stop();
    if (win) {
      alert('You win!');
    }
    else {
      alert('You lost!')
    }
    location.reload();
  }

  updateDynamicZones(): void {
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
    const zoneFactory = new ZoneFactory();

    this.zoneTypesList.forEach((type, index) => {
      const zone = zoneFactory.createZone(type, this.stageWidth);
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
    this.attemptsBar = new AttemptsBar(this.attemptsAmount, heartImage, 15);
    this.attemptsBar.y = this.attempsBarY;
    this.app.stage.addChild(this.attemptsBar);
  }

  setPlayerInitialPosition(): void {
    const playerY = this.stageHight - this.player.height;
    const playerX = this.stageWidth / 2 - this.player.width;

    this.player.position.set(playerX, playerY);
  }
}
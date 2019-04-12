import "pixi.js";
import { Player } from "./Player";
import { ZoneStatic } from "./ZoneStatic";

const playerImage = require("../images/cat.png");
const roadBg = require("../images/road.jpg");
const riverBg = require("../images/water.jpg");
const treeFieldBg = require("../images/grass.jpg");
const finishLineImage = require("../images/finishLine.jpg");
const carImage = require("../images/car.png");
const raftImage = require("../images/raft.jpg");
const treeImage = require("../images/tree.png");
const heartImage = require("../images/heart.png");

export default class Game {
  private app: PIXI.Application;
  private player: PIXI.Sprite;
  private readonly stageWidth = 600;
  private readonly stageHight = 400;
  private readonly stageColor = 0xeeeeeee;

  constructor() {
    this.setup = this.setup.bind(this);

    this.app = new PIXI.Application(this.stageWidth, this.stageHight, {
      backgroundColor: this.stageColor
    });

    document.body.appendChild(this.app.view);

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

  private setup(): void {
    this.initPlayer(playerImage);
    this.setPlayerInitialPosition();

    this.addZone();

    this.app.ticker.add((delta: number) => this.gameLoop(delta));
  }

  private gameLoop(delta): void {
    // updated content
  }

  private initPlayer(playerImage: string): void {
    this.player = new Player(32, 32, playerImage);
    this.app.stage.addChild(this.player);
  }

  private addZone(): void {
    const zone = new ZoneStatic(roadBg, true);
    this.app.stage.addChild(zone);
  }

  setPlayerInitialPosition(): void {
    const playerY = this.stageHight - this.player.height;
    const playerX = this.stageWidth / 2 - this.player.width;

    this.player.position.set(playerX, playerY);
  }
}
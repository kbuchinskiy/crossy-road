import "pixi.js";
import Player from "./Player";
import Zone from "./Zone";
import ZoneStatic from "./ZoneStatic";
import ZoneDynamic from "./ZoneDynamic";
import ZoneFactory from "./ZoneFactory";

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
  private readonly stageWidth = 600;
  private readonly stageHight = 400;
  private readonly stageColor = 0x999999;

  private zones: Zone[] = [];


  constructor(private zonesList: string[]) {
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
        treeBg,
        finishLineImage,
        carImage,
        raftImage,
        treeImage,
        heartImage
      ])
      .load(this.setup);

  }

  private setup(): void {
    this.mountPlayer(playerImage);
    this.addZones();

    this.app.ticker.add(() => this.gameLoop());
  }

  private gameLoop(): void {
    this.updateDynamicZones();
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

  private addZones(): void {
    const zoneFactory = new ZoneFactory();

    this.zonesList.forEach((type, index) => {
      const zone = zoneFactory.createZone(type);
      zone.y = index * zone.height;
      this.zones.push(zone);

      this.app.stage.addChild(zone);
    });

  }

  setPlayerInitialPosition(): void {
    const playerY = this.stageHight - this.player.height;
    const playerX = this.stageWidth / 2 - this.player.width;

    this.player.position.set(playerX, playerY);
  }
}
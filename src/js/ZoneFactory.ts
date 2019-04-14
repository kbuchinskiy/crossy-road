import Zone from './Zone';
import ZoneStatic from "./ZoneStatic";
import ZoneDynamic from "./ZoneDynamic";

const roadBg = require("../images/road.jpg");
const riverBg = require("../images/water.jpg");
const treeBg = require("../images/grass.jpg");
const carImage = require("../images/car.png");
const raftImage = require("../images/raft.jpg");
const treeImage = require("../images/tree.png");

export enum zoneTypes {
  Road,
  River,
  Tree
}
export interface iFactory {
  createZone(type: zoneTypes, stageWidth): Zone;
}

export class ZoneFactory implements iFactory {
  createZone(type: zoneTypes, stageWidth: number) {
    switch (type) {
      case zoneTypes.Road:
        return new ZoneDynamic(roadBg, stageWidth, true, { image: carImage, width: 64, height: 32 });
      case zoneTypes.River:
        return new ZoneDynamic(riverBg, stageWidth, false, { image: raftImage, width: 64, height: 32 });
      case zoneTypes.Tree:
        return new ZoneStatic(treeBg, stageWidth, true, { image: treeImage, width: 30, height: 32 });
    }
  }
}
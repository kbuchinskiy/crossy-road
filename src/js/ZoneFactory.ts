
import Zone from './Zone';
import ZoneStatic from "./ZoneStatic";
import ZoneDynamic from "./ZoneDynamic";

const roadBg = require("../images/road.jpg");
const riverBg = require("../images/water.jpg");
const treeBg = require("../images/grass.jpg");
const carImage = require("../images/car.png");
const raftImage = require("../images/raft.jpg");
const treeImage = require("../images/tree.png");

enum zoneTypes {
  road = 'road',
  river = 'river',
  tree = 'tree'
}
interface iFactory {
  createZone(type: string): Zone;
}

export default class ZoneFactory implements iFactory {
  createZone(type) {
    switch (type) {
      case zoneTypes.road:
        return new ZoneDynamic(roadBg, true, { image: carImage, width: 64, height: 32 });
      case zoneTypes.river:
        return new ZoneDynamic(riverBg, true, { image: raftImage, width: 64, height: 32 });
      case zoneTypes.tree:
        return new ZoneStatic(treeBg, true, { image: treeImage, width: 30, height: 32 });
    }
  }
}
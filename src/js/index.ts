import Game from "./Game";
import { zoneTypes } from "./ZoneFactory";

const config = {
  attempts: 3,
  zones: [
    zoneTypes.Road,
    zoneTypes.River,
    zoneTypes.Road,
    zoneTypes.Tree,
    zoneTypes.Road,
    zoneTypes.River,
    zoneTypes.Road,
    zoneTypes.Tree,
    zoneTypes.Road,
    zoneTypes.Tree
  ]
};

(<any>window).game = new Game(config.attempts, config.zones);

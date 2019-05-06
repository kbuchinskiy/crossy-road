import { Game, gameConfig } from "./Game";
import { zoneTypes } from "./ZoneFactory";

const config: gameConfig = {
  level: 3,
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

declare global {
  interface Window { game: Game; }
}

window.game = new Game(config);

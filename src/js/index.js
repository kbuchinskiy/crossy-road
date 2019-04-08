import Game from "./Game";

const config = {
  attempts: 3,
  hurdles: [
    "treeField",
    "river",
    "road",
    "treeField",
    "road",
    "river",
    "road",
    "treeField",
    "road",
    "treeField"
  ]
};


const crossyRoad = new Game(config);
document.body.appendChild(crossyRoad.app.view);

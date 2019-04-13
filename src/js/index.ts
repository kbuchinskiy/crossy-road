import Game from "./Game";

const config = {
  attempts: 3,
  zones: [
    "tree",
    "river",
    "road",
    "tree",
    "road",
    "river",
    "road",
    "tree",
    "road",
    "tree"
  ]
};


new Game(config.zones);

// setTimeout(() => {
//   crossyRoad.ba
// }, 200);
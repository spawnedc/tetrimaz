const tileO = [
  [1, 1],
  [1, 1]
];

const tileL = [
  [1, 0],
  [1, 0],
  [1, 1]
];

const tileL2 = [
  [1, 1],
  [1, 0],
  [1, 0]
];

const tileZ = [
  [1, 1, 0],
  [0, 1, 1]
];

const tileS = [
  [0, 1, 1],
  [1, 1, 0]
];

const tileI = [
  [1],
  [1],
  [1],
  [1]
];

const tilesData = [tileO, tileL, tileL2, tileZ, tileS, tileI];

const TILE_SIZE = 30;
const NUM_TILES = 5;

export {tilesData, TILE_SIZE, NUM_TILES};

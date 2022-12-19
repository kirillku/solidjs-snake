export type Point = [number, number];

export type Snake = Point[];

export enum Direction {
  UP = "up",
  DOWN = "down",
  LEFT = "left",
  RIGHT = "right",
}

export enum GameStatus {
  IDLE = "idle",
  PLAYING = "playing",
  LOOSE = "loose",
  WIN = "win",
}

import { Direction, Point } from "../types";

export const getNextPoint = ([x, y]: Point, direction: Direction): Point => {
  switch (direction) {
    case Direction.UP:
      return [x, y - 1];
    case Direction.DOWN:
      return [x, y + 1];
    case Direction.RIGHT:
      return [x + 1, y];
    case Direction.LEFT:
      return [x - 1, y];
  }
};

const Y_DIRECTIONS = [Direction.UP, Direction.DOWN];
const X_DIRECTIONS = [Direction.RIGHT, Direction.LEFT];

export const getNextDirection = (
  currentDirection: Direction,
  nextDirection: Direction
): Direction => {
  if (
    (X_DIRECTIONS.includes(currentDirection) &&
      X_DIRECTIONS.includes(nextDirection)) ||
    (Y_DIRECTIONS.includes(currentDirection) &&
      Y_DIRECTIONS.includes(nextDirection))
  ) {
    return currentDirection;
  }

  return nextDirection;
};

export const isSamePoint = ([x1, y1]: Point, [x2, y2]: Point): boolean => {
  return x1 === x2 && y1 === y2;
};

export const includesPoint = (points: Point[], point: Point): boolean => {
  return points.some((p) => isSamePoint(p, point));
};

export const isOutOfField = (fieldSize: number, [x, y]: Point): boolean => {
  return x >= fieldSize || x < 0 || y >= fieldSize || y < 0;
};

const getRandomInt = (max: number): number => {
  return Math.floor(Math.random() * max);
};

export const getRandomPoint = (
  fieldSize: number,
  busyPoints: Point[]
): Point => {
  let randomPoint: Point;

  do {
    randomPoint = [getRandomInt(fieldSize), getRandomInt(fieldSize)];
  } while (includesPoint(busyPoints, randomPoint));

  return randomPoint;
};

export const getMiddlePoint = (fieldSize: number): Point => {
  const middle = Math.floor(fieldSize / 2);
  return [middle, middle];
};

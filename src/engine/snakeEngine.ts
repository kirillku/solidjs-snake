import { batch, createSignal } from "solid-js";
import { gameFieldSize, gameSpeed } from "./settings";
import { Direction, GameStatus, Point, Snake } from "../types";
import {
  getMiddlePoint,
  getNextDirection,
  getNextPoint,
  getRandomPoint,
  includesPoint,
  isOutOfField,
  isSamePoint,
} from "../utils";

const [gameStatus, setGameStatus] = createSignal<GameStatus>(GameStatus.IDLE);

const [snake, setSnake] = createSignal<Snake>([]);

const head = (): Point => {
  return snake().at(-1)!;
};

const [food, setFood] = createSignal<Point>([0, 0]);

const addNewFood = () => {
  setFood((currentFood) => {
    return getRandomPoint(gameFieldSize(), [...snake(), currentFood]);
  });
};

const [direction, setDirection] = createSignal<Direction>(Direction.RIGHT);

const tick = (): GameStatus => {
  const nextPoint = getNextPoint(head(), direction());

  const isOut = isOutOfField(gameFieldSize(), nextPoint);
  const isEatingItself = includesPoint(snake(), nextPoint);

  if (isOut || isEatingItself) {
    return GameStatus.LOOSE;
  }

  const isEatingFood = isSamePoint(nextPoint, food());

  setSnake((currentSnake) => {
    if (!isEatingFood) {
      currentSnake.shift();
    }
    currentSnake.push(nextPoint);

    return [...currentSnake];
  });

  if (isEatingFood) {
    addNewFood();
  }

  return GameStatus.PLAYING;
};

const initGame = () => {
  batch(() => {
    setGameStatus(GameStatus.PLAYING);
    setSnake([getMiddlePoint(gameFieldSize())]);
    addNewFood();
  });
};

const startGame = () => {
  initGame();

  const interval = setInterval(() => {
    const nextGameStatus = tick();
    setGameStatus(nextGameStatus);
    if (nextGameStatus !== GameStatus.PLAYING) {
      clearInterval(interval);
    }
  }, gameSpeed());
};

const changeDirection = (direction: Direction) => {
  if (gameStatus() !== GameStatus.PLAYING) {
    startGame();
  }

  setDirection((currentDirection) =>
    getNextDirection(currentDirection, direction)
  );
};

export { snake, direction, changeDirection, food, startGame, gameStatus };

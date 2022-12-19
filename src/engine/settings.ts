import { createSignal } from "solid-js";

const DEFAULT_GAME_FIELD_SIZE = 10;

const [gameFieldSize, setGameFieldSize] = createSignal<number>(
  DEFAULT_GAME_FIELD_SIZE
);

const DEFAULT_GAME_SPEED = 120;

const [gameSpeed, setGameSpeed] = createSignal<number>(DEFAULT_GAME_SPEED);

export { gameFieldSize, setGameFieldSize, gameSpeed, setGameSpeed };

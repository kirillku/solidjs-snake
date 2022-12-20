import { createSignal } from "solid-js";

// TODO: move url management to app
const searchParams = new URLSearchParams(window.location.search);
const urlSize = searchParams.get("size");
const urlSpeed = searchParams.get("speed");

const DEFAULT_GAME_FIELD_SIZE = 10;

const [gameFieldSize, setGameFieldSize] = createSignal<number>(
  urlSize ? parseInt(urlSize) : DEFAULT_GAME_FIELD_SIZE
);

const DEFAULT_GAME_SPEED = 120;

const [gameSpeed, setGameSpeed] = createSignal<number>(
  urlSpeed ? parseInt(urlSpeed) : DEFAULT_GAME_SPEED
);

export { gameFieldSize, setGameFieldSize, gameSpeed, setGameSpeed };

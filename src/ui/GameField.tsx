import { Component, For, Match, Switch } from "solid-js";
import { food, gameFieldSize, gameStatus, snake } from "../engine";
import { GameStatus, Point } from "../types";
import { includesPoint, isSamePoint } from "../utils";
import styles from "./GameField.module.css";

const IdleView: Component = () => {
  return (
    <div>
      <h2>Welcome! 🐍</h2>
      <p>Cilck any direction key to start</p>
      <p>
        <strong>WASD</strong> or <strong>HJKL</strong> or{" "}
        <strong>arrow keys</strong>
      </p>
    </div>
  );
};

const FOOD_EMOJIS = [
  "🍒",
  "🍓",
  "🍑",
  "🍔",
  "🍰",
  "🐓",
  "🐀",
  "🍇",
  "🍗",
  "🍕",
  "🍅",
];

const getFoodEmoji = ([x, y]: Point): string => {
  return FOOD_EMOJIS[((x + 1) * (y + 1)) % FOOD_EMOJIS.length];
};

const PlayingView: Component = () => {
  const range = () => Array.from({ length: gameFieldSize() }).map((_v, i) => i);

  return (
    <For each={range()}>
      {(y) => (
        <div class={styles.row}>
          <For each={range()}>
            {(x) => {
              const currentPoint: Point = [x, y];
              const isFood = () => isSamePoint(food(), currentPoint);
              const isSnake = () => includesPoint(snake(), currentPoint);
              return (
                <div
                  class={styles.cell}
                  style={isSnake() ? "background: #cbdf9b" : undefined}
                >
                  {isFood() && getFoodEmoji(currentPoint)}
                </div>
              );
            }}
          </For>
        </div>
      )}
    </For>
  );
};

const score = () => snake().length - 1;

const WinView: Component = () => {
  return (
    <div>
      <h2>YOU WIN! 🎉</h2>
      <p>
        Your score is: <strong>{score()}</strong>
      </p>
      <p>Cilck any direction key to start again</p>
    </div>
  );
};

const LooseView: Component = () => {
  return (
    <div>
      <h2>YOU LOSE! 🥲</h2>
      <p>
        Your score is: <strong>{score()}</strong>
      </p>
      <p>Cilck any direction key to start again</p>
    </div>
  );
};

export const GameField: Component = () => {
  const size = () => gameFieldSize() * 30;
  const sizeStyle = () => `width: ${size()}px; height: ${size()}px`;

  return (
    <div class={styles.field} style={sizeStyle()}>
      <Switch>
        <Match when={gameStatus() === GameStatus.IDLE}>
          <IdleView />
        </Match>
        <Match when={gameStatus() === GameStatus.PLAYING}>
          <PlayingView />
        </Match>
        <Match when={gameStatus() === GameStatus.WIN}>
          <WinView />
        </Match>
        <Match when={gameStatus() === GameStatus.LOOSE}>
          <LooseView />
        </Match>
      </Switch>
    </div>
  );
};

import { Component, For, Match, Switch } from "solid-js";
import { food, gameFieldSize, gameStatus, snake } from "../engine";
import { GameStatus, Point } from "../types";
import { includesPoint, isSamePoint } from "../utils";
import styles from "./GameField.module.css";

const IdleView: Component = () => {
  return (
    <div>
      <p>Welcome! 🐍</p>
      <p>Cilck any direction key to start</p>
      <p>
        <strong>WASD</strong> or <strong>HJKL</strong> or{" "}
        <strong>arrow keys</strong>
      </p>
    </div>
  );
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
                <div class={styles.cell}>
                  {isFood() && "🍒"}
                  {isSnake() && "🟩"}
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
      <p>You win! 🎉</p>
      <p>
        Your score is: <strong>{score()}</strong>
      </p>
    </div>
  );
};

const LooseView: Component = () => {
  return (
    <div>
      <p>You loose! 🥲</p>
      <p>
        Your score is: <strong>{score()}</strong>
      </p>
    </div>
  );
};

export const GameField: Component = () => {
  const size = () => gameFieldSize() * 25;
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

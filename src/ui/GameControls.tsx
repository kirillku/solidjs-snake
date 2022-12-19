import { Component } from "solid-js";
import { changeDirection } from "../engine";
import { Direction } from "../types";
import styles from "./GameControls.module.css";

export const GameControls: Component = () => {
  return (
    <div class={styles.controls}>
      <div class={styles.row}>
        <button
          class={styles.button}
          onClick={() => changeDirection(Direction.UP)}
        >
          ↑
        </button>
      </div>
      <div class={styles.row}>
        <button
          class={styles.button}
          onClick={() => changeDirection(Direction.LEFT)}
        >
          ←
        </button>
        <button
          class={styles.button}
          onClick={() => changeDirection(Direction.RIGHT)}
        >
          →
        </button>
      </div>
      <div class={styles.row}>
        <button
          class={styles.button}
          onClick={() => changeDirection(Direction.DOWN)}
        >
          ↓
        </button>
      </div>
    </div>
  );
};

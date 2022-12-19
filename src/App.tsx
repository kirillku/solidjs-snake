import { Component, onCleanup } from "solid-js";

import styles from "./App.module.css";
import { changeDirection, gameStatus, startGame } from "./engine";
import { Direction, GameStatus } from "./types";
import { Debug as Debug } from "./ui/Debug";
import { GameField } from "./ui/GameField";

const keyToDirection = (code: string): Direction | null => {
  switch (true) {
    case ["KeyW", "KeyK", "ArrowUp"].includes(code):
      return Direction.UP;
    case ["KeyS", "KeyJ", "ArrowDown"].includes(code):
      return Direction.DOWN;
    case ["KeyD", "KeyL", "ArrowRight"].includes(code):
      return Direction.RIGHT;
    case ["KeyA", "KeyH", "ArrowLeft"].includes(code):
      return Direction.LEFT;
    default:
      return null;
  }
};

const handleKeydown = (e: KeyboardEvent) => {
  const newDirection = keyToDirection(e.code);

  if (newDirection) {
    e.preventDefault();
    if (gameStatus() !== GameStatus.PLAYING) {
      startGame();
    }

    changeDirection(newDirection);
  }
};

window.addEventListener("keydown", handleKeydown);

const App: Component = () => {
  window.addEventListener("keydown", handleKeydown);

  onCleanup(() => {
    window.removeEventListener("keydown", handleKeydown);
  });

  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <h1>Snake Game</h1>
      </header>
      <main class={styles.main}>
        <GameField />
        {import.meta.env.MODE === "development" && <Debug />}
      </main>
    </div>
  );
};

export default App;

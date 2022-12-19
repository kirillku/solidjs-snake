import { Component } from "solid-js";
import { food, gameFieldSize, snake, direction, gameStatus } from "../engine";

export const Debug: Component = () => {
  return (
    <code>
      <pre style="color: white">
        {JSON.stringify(
          {
            gameStatus: gameStatus(),
            snake: snake(),
            food: food(),
            direction: direction(),
            gameFieldSize: gameFieldSize(),
          },
          null,
          2
        )}
      </pre>
    </code>
  );
};

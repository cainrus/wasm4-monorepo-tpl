import { w4 } from './w4';
import {
  Snake,
} from './Snake';

import {
  Score,
} from './Score';

import {
  Fruit,
} from './Fruit';

import { input } from './input';
import { random } from './random';
import { SIZE_OF_32 } from './constants';
import { InfoBox } from './InfoBox';
import { Point } from './Point';

const snake = new Snake();

export function start(): void {
  store<u32>(w4.PALETTE, 0xfbf7f3, 0);
  store<u32>(w4.PALETTE, 0xe5b083, SIZE_OF_32);
  store<u32>(w4.PALETTE, 0x426e5d, 2 * SIZE_OF_32);
  store<u32>(w4.PALETTE, 0x20283d, 3 * SIZE_OF_32);
}

let frameCountBuffer = 0;
const fruit = new Fruit(random(), random());
const score = new Score();

const DEFAULT_SNAKE_SPEED_IN_FPS = 15.0;
let ACCELERATION_PERCENT: i32 = 100;
const ACCELERATION_STEP = 5;

let isGameOver = false;
const highScore = score.loadHighScore();

const infoBox = new InfoBox(1, 17, 9, 3);

export function update(): void {
  frameCountBuffer++;
  if (!isGameOver) {
    input(snake);
    const fps = DEFAULT_SNAKE_SPEED_IN_FPS / ACCELERATION_PERCENT * 100;
    if (frameCountBuffer >= fps) {
      frameCountBuffer = 0;
      snake.update();

      if (snake.intersectsSelf()) {
        isGameOver = true;
        score.saveHighScore();
        return;
      }

      if (fruit.equals(snake.head)) {
        w4.trace('snake eats fruit');
        snake.grow();
        score.value++;
        ACCELERATION_PERCENT += ACCELERATION_STEP;

        do {
          fruit.move(random(), random());
        } while (fruit.intersects(snake.body))
      }
    }
  }

  snake.draw();
  fruit.draw();

  store<u16>(w4.DRAW_COLORS, 0x4320);

  if (isGameOver || !infoBox.intersects(snake.body) && !infoBox.intersects([fruit])) {
    infoBox.lines = [];
    infoBox.lines.push(` score:${(`${score.value.toString()}  `).slice(0, 3)}`);
    infoBox.lines.push(` best :${(`${highScore.toString()}  `).slice(0, 3)}`);
    if (isGameOver) {
      infoBox.addLine('game over');
    }
    infoBox.draw();
  }
}

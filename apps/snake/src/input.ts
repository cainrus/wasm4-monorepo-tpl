import * as w4 from './wasm4';
import { Snake } from './Snake';

let prevState: u8;

export function input(snake: Snake): void {
  const gamepad = load<u8>(w4.GAMEPAD1);
  const justPressed = gamepad & (gamepad ^ prevState);
  if (justPressed & w4.BUTTON_LEFT) {
    snake.left();
  }
  if (justPressed & w4.BUTTON_RIGHT) {
    snake.right();
  }
  if (justPressed & w4.BUTTON_UP) {
    snake.up();
  }
  if (justPressed & w4.BUTTON_DOWN) {
    snake.down();
  }
}

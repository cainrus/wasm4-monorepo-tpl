import { w4 } from './w4';

import { Point } from './Point';
import { fruit } from './sprites';
import { CELL_SIZE } from './constants';

export class Fruit extends Point {
  draw(): void {
    store<u16>(w4.DRAW_COLORS, 0x4320);
    w4.blit(
      fruit,
      this.x * CELL_SIZE,
      this.y * CELL_SIZE,
      CELL_SIZE,
      CELL_SIZE,
      w4.BLIT_2BPP,
    );
  }
}

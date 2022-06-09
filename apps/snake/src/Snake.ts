import { w4 } from './w4';

import { Point } from './Point';

import {
  CELL_SIZE,
  COLOR_4,
  COLOR_3, GRID_SIZE,
} from './constants';

const up = new Point(0, -1);
const down = new Point(0, 1);
const left = new Point(-1, 0);
const right = new Point(1, 0);

export class Snake {
  body: Array<Point> = [
    new Point(2, 0),
    new Point(1, 0),
    new Point(0, 0),
  ];

  get head(): Point {
    return this.body[0];
  }

  get tail(): Point {
    return this.body[this.body.length - 1];
  }

  direction: Point = right;

  directionChanged: boolean = false;

  update(): void {
    const body = this.body;
    for (let i = body.length - 1; i > 0; i--) {
      unchecked(body[i].x = body[i - 1].x);
      unchecked(body[i].y = body[i - 1].y);
    }

    body[0].x = (body[0].x + this.direction.x) % GRID_SIZE;
    body[0].y = (body[0].y + this.direction.y) % GRID_SIZE;

    if (body[0].x < 0) {
      body[0].x = GRID_SIZE - 1;
    }
    if (body[0].y < 0) {
      body[0].y = GRID_SIZE - 1;
    }
    this.directionChanged = false;
  }

  draw(): void {
    store<u16>(w4.DRAW_COLORS, COLOR_3);

    this.body.forEach((part) => w4.rect(
      part.x * CELL_SIZE,
      part.y * CELL_SIZE,
      CELL_SIZE,
      CELL_SIZE,
    ));

    store<u16>(w4.DRAW_COLORS, COLOR_4);
    w4.rect(
      this.body[0].x * CELL_SIZE,
      this.body[0].y * CELL_SIZE,
      CELL_SIZE,
      CELL_SIZE,
    );
  }

  intersectsSelf(): boolean {
    return this.head.intersects(this.body.slice(1))
  }

  grow(): void {
    const tail = this.tail;
    this.body.push(new Point(tail.x, tail.y));
  }

  down(): void {
    if (!this.directionChanged && this.direction.y === 0) {
      this.direction = down;
      this.directionChanged = true;
    }
  }

  up(): void {
    if (!this.directionChanged && this.direction.y === 0) {
      this.direction = up;
      this.directionChanged = true;
    }
  }

  left(): void {
    if (!this.directionChanged && this.direction.x === 0) {
      this.direction = left;
      this.directionChanged = true;
    }
  }

  right(): void {
    if (!this.directionChanged && this.direction.x === 0) {
      this.direction = right;
      this.directionChanged = true;
    }
  }
}

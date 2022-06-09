import { Point } from './Point';
import { w4 } from './w4';
import { CELL_SIZE } from './constants';

export class InfoBox {
  origin: Point;
  points: Point[] = [];

  constructor(x: i32, y: i32, public width: i32, public height: i32) {
    this.origin = new Point(x, y);
    for (let i1 = 0; i1 < width; i1++) {
      for (let i2 = 0; i2 < height; i2++) {
        this.points.push(new Point(x + i1, y + i2));
      }
    }
  }

  lines: string[] = [];

  resetLines(): void {
    this.lines = [];
  }

  addLine(text: string): void {
    this.lines.push(text);
  }

  intersects(points: Point[]): boolean {
    for (let i = 0; i < points.length; i++) {
      const normalizedPoint = points[i];
      if (normalizedPoint.intersects(this.points)) {
        return true;
      }
    }
    return false;
  }

  draw(): void {
    store<u16>(w4.DRAW_COLORS, 0x4320);
    const x = this.origin.x * CELL_SIZE;
    const y = this.origin.y * CELL_SIZE;
    const height = this.height;
    const linesCount = this.lines.length;
    const maxHeight = linesCount > height ? linesCount : height;

    for (let i = 0; i < linesCount; i++) {
      const line = this.lines[i];
      w4.text(line.slice(0, this.width), x, y + i * CELL_SIZE);
    }
  }
}

export class Point {
  constructor(
    public x: i32,
    public y: i32,
  ) {}

  equals(point: Point): boolean {
    return this.x === point.x && this.y === point.y;
  }

  intersects(points: Point[]): boolean {
    const x = this.x;
    const y = this.y;
    const len = points.length;
    for (let i = 0; i < len; i++) {
      const point = points[i];
      if (this.equals(point)) {
        return true;
      }
    }
    return false
  }

  move(x: i32, y: i32): void {
    this.x = x;
    this.y = y;
  }
}

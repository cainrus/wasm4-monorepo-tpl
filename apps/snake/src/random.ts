import { GRID_SIZE } from './constants';

export function random(n: i32 = GRID_SIZE): u16 {
  return u16(Math.floor(Math.random() * n));
}

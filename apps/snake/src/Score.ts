import { w4 } from './w4';
import { SIZE_OF_32 } from './constants';

export class Score {
  value: i32 = 0;

  saveHighScore(): void {
    const ptr = memory.data(SIZE_OF_32);
    store<i32>(ptr, this.value);
    w4.diskw(ptr, sizeof<i32>());
  }

  loadHighScore(): i32 {
    const ptr = memory.data(SIZE_OF_32);
    w4.diskr(ptr, sizeof<i32>());

    return load<i32>(ptr);
  }
}

import { Hero } from './hero';

export interface ClientGet {
  count: number,
  rows: Hero[],
}

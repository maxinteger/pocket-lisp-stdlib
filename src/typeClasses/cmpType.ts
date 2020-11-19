import type { PLBool } from '../data/bool/PLBool'

/**
 * a.equals(a) === true (reflexivity)
 * a.equals(b) === b.equals(a) (symmetry)
 * If a.equals(b) and b.equals(c), then a.equals(c) (transitivity)
 */
export interface PartialEq<T> {
  // Setoid a => a ~> a -> Boolean
  equals(b: T): PLBool
}

export enum Ordering {
  Less,
  Equal,
  Greater,
}

export interface PartialOrd<T extends PartialEq<T>> {
  partialCmp(other: T): Ordering

  lt?(other: T): PLBool

  le?(other: T): PLBool

  gt?(other: T): PLBool

  ge?(other: T): PLBool
}

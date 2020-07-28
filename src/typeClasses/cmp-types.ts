import { PLBool } from '../data/PLBool'

export const equals = Symbol('equals')
/**
 * a.equals(a) === true (reflexivity)
 * a.equals(b) === b.equals(a) (symmetry)
 * If a.equals(b) and b.equals(c), then a.equals(c) (transitivity)
 */
export interface PartialEq<T> {
  // Setoid a => a ~> a -> Boolean
  [equals](b: T): PLBool
}

export enum Ordering {
  Less,
  Equal,
  Greater
}

export const partialCmp = Symbol('partialCmp')
export const lt = Symbol('lt')
export const le = Symbol('le')
export const gt = Symbol('gt')
export const ge = Symbol('ge')
export interface PartialOrd<T extends PartialEq<T>> {
  [partialCmp](other: T): Ordering
  [lt]?(other: T): PLBool
  [le]?(other: T): PLBool
  [gt]?(other: T): PLBool
  [ge]?(other: T): PLBool
}

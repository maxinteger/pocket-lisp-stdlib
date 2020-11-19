import { PLBool } from '../data/bool/PLBool'
import { assertType } from '../utils/assert'
import { PLBase } from '../data/PLBase'
import { Add, And, Divide, Index, Multiple, Negate, Not, Or } from './opsType'

export const not: (a: Not) => PLBool = (a) => {
  return a.not()
}

//

export const and: <T>(a: And<T>, b: T) => PLBool = (a, b) => {
  return a.and(b)
}

//

export const or: <T>(a: Or<T>, b: T) => PLBool = (a, b) => {
  return a.or(b)
}

//

export const negate: (a: Negate<any>) => PLBool = (a) => {
  return a.negate()
}

//

export const add: <T>(a: Add<T>, b: T) => T = (a, b) => {
  assertType(a, b)
  return a.add(b)
}

//

export interface Subtract<T> {
  subtract(a: T): T
}

export const subtract: <T>(a: Subtract<T>, b: T) => T = (a, b) => {
  assertType(a, b)
  return a.subtract(b)
}

//

export const multiple: <T>(a: Multiple<T>, b: T) => T = (a, b) => {
  assertType(a, b)
  return a.multiple(b)
}

//

export const divide: <T>(a: Divide<T>, b: T) => T = (a, b) => {
  assertType(a, b)
  return a.divide(b)
}

//

export const get: <Idx, Item extends PLBase>(data: Index<Idx, Item>, idx: Idx) => Item = (data, idx) => {
  return data.index(idx)
}

//

export default { negate, not, and, or, '+': add, '-': subtract, '*': multiple, '/': divide, get }

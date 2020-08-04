import { PLBool } from '../data/PLBool'
import { PLNumber } from '../data/PLNumber'
import { assertType, typeCheck } from '../utils/assert'
import { PLBase } from '../data/PLBase'
import { Maybe } from '../data/Maybe'

export interface Not {
  not(): PLBool
}

export const not: (a: Not) => PLBool = (a) => {
  return a.not()
}

//

export interface And<T> {
  and(a: T): PLBool
}

export const and: <T>(a: And<T>, b: T) => PLBool = (a, b) => {
  return a.and(b)
}

//

export interface Or<T> {
  or(a: T): PLBool
}

export const or: <T>(a: Or<T>, b: T) => PLBool = (a, b) => {
  return a.or(b)
}

//

export interface Negate<T> {
  negate(): T
}

export const negate: (a: Negate<any>) => PLBool = (a) => {
  return a.negate()
}

//

export interface Add<T> {
  add(a: T): T
}

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

export interface Multiple<T> {
  multiple(a: T): T
}

export const multiple: <T>(a: Multiple<T>, b: T) => T = (a, b) => {
  assertType(a, b)
  return a.multiple(b)
}

//

export interface Divide<T> {
  divide(a: T): T
}
export const divide: <T>(a: Divide<T>, b: T) => T = (a, b) => {
  assertType(a, b)
  return a.divide(b)
}

//

export interface Index<Idx, Return> {
  index(idx: Idx): Return
}

export const get: <Idx, Item extends PLBase>(
  data: Index<Idx, Maybe<Item>>,
  idx: Idx
) => Maybe<Item> = (data, idx) => {
  typeCheck(PLNumber, idx)
  return data.index(idx)
}

//

export default { negate, not, and, or, '+': add, '-': subtract, '*': multiple, '/': divide, get }

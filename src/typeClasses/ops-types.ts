import { PLBool } from '../data/PLBool'

export const not = Symbol('not')
export interface Not {
  [not](): PLBool
}

export const and = Symbol('and')
export interface And<T> {
  [and](a: T): PLBool
}

export const or = Symbol('or')
export interface Or<T> {
  [or](a: T): PLBool
}

export const negate = Symbol('negate')
export interface Negate<T> {
  [negate](): T
}

export const add = Symbol('add')
export interface Add<T> {
  [add](a: T): T
}

export const subtract = Symbol('subtract')
export interface Subtract<T> {
  [subtract](a: T): T
}

export const multiple = Symbol('multiple')
export interface Multiple<T> {
  [multiple](a: T): T
}

export const divide = Symbol('divide')
export interface Divide<T> {
  [divide](a: T): T
}

export const index = Symbol('index')
export interface Index<Idx, Return> {
  [index](idx: Idx): Return
}

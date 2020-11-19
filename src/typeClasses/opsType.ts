import { PLBool } from '../data/bool/PLBool'

export interface Not {
  not(): PLBool
}

export interface And<T> {
  and(a: T): PLBool
}

export interface Or<T> {
  or(a: T): PLBool
}

export interface Negate<T> {
  negate(): T
}

export interface Add<T> {
  add(a: T): T
}

export interface Multiple<T> {
  multiple(a: T): T
}

export interface Divide<T> {
  divide(a: T): T
}

export interface Index<Idx, Return> {
  index(idx: Idx): Return
}

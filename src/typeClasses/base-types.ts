import { PLString } from '../index'

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore:
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Box<T> {}

export const toJS = Symbol('toJS')
export interface SerializeToJS<T> {
  [toJS](): T
}

export const toString = Symbol('toString')
export interface SerializeToString {
  [toString](): string
}

export interface BoxedValue<T> extends SerializeToJS<T> {
  [toString]: () => string
}

export const fromJS = Symbol('fromJS')
export interface FromJS<JS, T> {
  [fromJS](data: JS): T
}

export const fromStr = Symbol('fromStr')
export interface FromStr<T> {
  [fromStr](source: PLString): T
}

export const copy = Symbol('copy')
export const deepCopy = Symbol('deepCopy')
export interface Copy<T> {
  [copy](): T
  [deepCopy]?(): T
}

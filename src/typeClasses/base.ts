import { plString, PLString } from '../index'
import { assertImpl } from '../utils/assert'

// eslint-disable-next-line @typescript-eslint/no-empty-interface,@typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Box<T> {}

export interface SerializeToJS<T> {
  toJS(): T
}

export interface SerializeToString {
  toString(): string
}

export const str: (value: SerializeToString) => PLString = (value) => plString(value.toString())

export interface BoxedValue<T> extends SerializeToJS<T> {
  toString: () => string
}

export interface FromJS<JS, T> {
  fromJS(data: JS): T
}

export interface FromStr<T> {
  fromStr(source: PLString): T
}

//

export interface Debug {
  debugTypeOf(): PLString
}

export const debugTypeOf: (variable: Debug) => PLString = (v) => {
  return v['debugTypeOf'] ? v.debugTypeOf() : plString('<unknown>')
}

//

export interface Copy<T> {
  copy(): T
  deepCopy?(): T
}

export const copy: <T extends Copy<any>>(item: T) => T = (item) => {
  assertImpl(item, 'copy')
  return item.copy()
}

export const deepCopy: <T extends Copy<any>>(item: T) => T = (item) => {
  assertImpl(item, 'copy')
  if (item.deepCopy) {
    return item.deepCopy?.()
  } else {
    return copy(item)
  }
}

export default {
  typeof: debugTypeOf,
  copy,
  deepCopy,
  str
}

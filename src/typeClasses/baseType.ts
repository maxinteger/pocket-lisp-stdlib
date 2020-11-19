// eslint-disable-next-line @typescript-eslint/no-empty-interface,@typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-empty-interface
import type { PLString } from '../data/string/PLString'

// eslint-disable-next-line @typescript-eslint/no-empty-interface,@typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-empty-interface,@typescript-eslint/no-unused-vars
export interface Box<T> {}

export interface SerializeToJS<T> {
  toJS(): T
}

export interface SerializeToString {
  toString(): string
}

export interface FromJS<JS, T> {
  fromJS(data: JS): T
}

export interface FromStr<T> {
  fromStr(source: PLString): T
}

export interface Debug {
  debugTypeOf(): PLString
}

export interface Copy<T> {
  copy(): T

  deepCopy?(): T
}

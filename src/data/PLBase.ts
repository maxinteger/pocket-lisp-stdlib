import type { Debug, SerializeToJS, SerializeToString } from '../typeClasses'
import type { PLString } from './string/PLString'

export interface PLBase extends SerializeToJS<unknown>, SerializeToString, Debug {
  toString(): string

  toJS(): any

  toJSON(): any

  debugTypeOf(): PLString
}

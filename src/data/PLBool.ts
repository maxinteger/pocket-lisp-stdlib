import { RuntimeError } from 'pocket-lisp'
import { equals, Ordering, partialCmp, PartialEq, PartialOrd } from '../typeClasses/cmp-types'
import { and, And, not, Not, or, Or } from '../typeClasses/all-types'
import { Copy, copy, fromJS, fromStr, toJS, toString } from '../typeClasses/base-types'
import { PLBase } from './PLBase'
import { plString, PLString } from './PLString'

export class PLBool extends PLBase
  implements
    PartialEq<PLBool>,
    Not,
    And<PLBool>,
    Or<PLBool>,
    PartialEq<PLBool>,
    PartialOrd<PLBool>,
    Copy<PLBool> {
  public static [fromJS](value: boolean): PLBool {
    return new PLBool(value)
  }

  public static [fromStr](str: PLString): PLBool {
    switch (str.value) {
      case 'true':
        return plBool(true)
      case 'false':
        return plBool(false)
      default:
        throw new RuntimeError(`Invalid boolean: "${str.value}".`)
    }
  }

  public constructor(private _value: boolean) {
    super()
  }

  public get value() {
    return this._value
  }

  public [not]() {
    return new PLBool(!this._value)
  }

  public [and](other: PLBool) {
    return new PLBool(this._value && other._value)
  }

  public [or](other: PLBool) {
    return new PLBool(this._value || other._value)
  }

  public [equals](other: PLBool) {
    return new PLBool(this._value === other._value)
  }

  public [partialCmp](other: PLBool) {
    if (this.value === other.value) {
      return Ordering.Equal
    } else if (this.value) {
      return Ordering.Greater
    } else {
      return Ordering.Less
    }
  }

  public [copy]() {
    return new PLBool(this._value)
  }

  public [toString]() {
    return this._value ? 'true' : 'false'
  }

  public [toJS]() {
    return this._value
  }
}

///

export const plBool = (value: boolean) => new PLBool(value)

export const parseBool = (value: string) => PLBool[fromStr](plString(value))

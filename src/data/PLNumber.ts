import { RuntimeError } from 'pocket-lisp'
import { PLBase } from './PLBase'
import { plBool } from './PLBool'
import { plString, PLString } from './PLString'
import { copy, Copy, fromJS, fromStr, toJS, toString } from '../typeClasses/base-types'
import { equals, Ordering, partialCmp, PartialEq, PartialOrd } from '../typeClasses/cmp-types'
import {
  add,
  Add,
  divide,
  Divide,
  multiple,
  Multiple,
  Negate,
  negate,
  subtract,
  Subtract
} from '../typeClasses/ops-types'

export class PLNumber extends PLBase
  implements
    PartialEq<PLNumber>,
    Add<PLNumber>,
    Subtract<PLNumber>,
    Multiple<PLNumber>,
    Divide<PLNumber>,
    Negate<PLNumber>,
    PartialOrd<PLNumber>,
    Copy<PLNumber> {
  public static [fromJS](value: number) {
    return new PLNumber(value)
  }

  public static [fromStr](source: PLString) {
    const val = parseFloat(source.value)
    if (isNaN(val)) {
      throw new RuntimeError(`Invalid number: "${source.value}".`)
    }
    return new PLNumber(val)
  }

  public constructor(private _value: number) {
    super()
  }

  public get value() {
    return this._value
  }

  public [equals](other: PLNumber) {
    return plBool(this._value === other.value)
  }

  public [negate]() {
    return new PLNumber(-this._value)
  }

  public [add](other: PLNumber) {
    return new PLNumber(this._value + other.value)
  }

  public [subtract](other: PLNumber) {
    return new PLNumber(this._value - other.value)
  }

  public [multiple](other: PLNumber) {
    return new PLNumber(this._value * other.value)
  }

  public [divide](other: PLNumber) {
    return new PLNumber(this._value / other.value)
  }

  public [copy]() {
    return new PLNumber(this._value)
  }
  public [partialCmp](other: PLNumber): Ordering {
    if (this.value < other.value) {
      return Ordering.Less
    } else if (this.value > other.value) {
      return Ordering.Greater
    } else {
      return Ordering.Equal
    }
  }

  public [toJS]() {
    return this._value
  }

  public [toString]() {
    return this._value.toString()
  }
}

export const plNumber = (value: number) => new PLNumber(value)

export const parseNumber = (value: string) => PLNumber[fromStr](plString(value))

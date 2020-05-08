import {
  add,
  BaseNumberOp,
  divide,
  equals,
  multiple,
  negate,
  of,
  SerializeToJS,
  Setoid,
  subtract,
  toJS
} from '../types'
import { RuntimeError } from 'pocket-lisp'
import { plBool } from './PLBool'

export class PLNumber implements SerializeToJS<number>, Setoid<PLNumber>, BaseNumberOp<PLNumber> {
  public static [of](value: number) {
    return plNumber(value)
  }

  public constructor(private _value: number) {}

  public get value() {
    return this._value
  }

  public [equals](a: PLNumber) {
    return plBool(this._value === a.value)
  }

  public [negate]() {
    return new PLNumber(-this._value)
  }

  public [add](a: PLNumber) {
    return new PLNumber(this._value + a.value)
  }

  public [subtract](a: PLNumber) {
    return new PLNumber(this._value - a.value)
  }

  public [multiple](a: PLNumber) {
    return new PLNumber(this._value * a.value)
  }

  public [divide](a: PLNumber) {
    return new PLNumber(this._value / a.value)
  }

  public [toJS]() {
    return this._value
  }

  public toString() {
    return this._value.toString()
  }
}

export const plNumber = (value: number) => new PLNumber(value)

export const str2PLNumber = (str: string) => {
  const val = parseFloat(str)
  if (isNaN(val)) {
    throw new RuntimeError(`Invalid number: ${str}.`)
  }
  return new PLNumber(val)
}

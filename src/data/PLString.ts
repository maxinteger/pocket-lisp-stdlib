import { concat, of, SerializeToJS, toJS } from '../types'

export class PLString implements SerializeToJS<string> {
  public static [of](value: string) {
    return plString(value)
  }

  public constructor(private _value: string) {}

  public get value() {
    return this._value
  }

  public [concat](a: PLString) {
    return plString(this._value + a.value)
  }

  public [toJS]() {
    return this._value
  }

  public toString() {
    return this._value
  }
}

export const plString = (value = '') => new PLString(value)

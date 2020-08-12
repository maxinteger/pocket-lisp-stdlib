import { PLBase } from './PLBase'
import { PLString, plString } from './PLString'
import { isNothing } from '../utils/convert'

export type Maybe<T extends PLBase> = Just<T> | typeof Nothing

///

export class Just<T extends PLBase> extends PLBase {
  public constructor(private _value: T) {
    super()
  }

  public get value(): T {
    return this._value
  }

  public toJS(): unknown {
    return this._value.toJS && this._value.toJS()
  }

  public toString(): string {
    return `Just(${this._value.toString()})`
  }

  public debugTypeOf(): PLString {
    return plString(`Just(${this._value.debugTypeOf()})`)
  }
}

///

class NothingClass extends PLBase {
  public get value() {
    return Nothing
  }

  public toJS() {
    return undefined
  }

  public toString() {
    return 'Nothing'
  }

  debugTypeOf(): PLString {
    return plString('Nothing')
  }
}

export const Nothing = new NothingClass()

///

export const maybe: <T extends PLBase>(v: any) => Maybe<T> = (value) => {
  if (isNothing(value)) {
    return Nothing
  } else {
    return new Just(value)
  }
}

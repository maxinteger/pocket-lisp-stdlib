import { toJS, toString } from '../typeClasses/base-types'
import { PLBase } from './PLBase'

export type Maybe<T extends PLBase> = Just<T> | typeof Nothing

///

export class Just<T extends PLBase> extends PLBase {
  public constructor(private _value: T) {
    super()
  }

  public get value() {
    return this._value
  }

  public [toJS](): unknown {
    return this._value[toJS] && this._value[toJS]()
  }

  public [toString]() {
    return `Just(${this._value[toString]()})`
  }
}

///

class NothingClass extends PLBase {
  public get value() {
    return Nothing
  }

  public [toJS]() {
    return undefined
  }

  public [toString]() {
    return 'Nothing'
  }
}

export const Nothing = new NothingClass()

///

export const maybe: <T extends PLBase>(v: any) => Maybe<T> = (value) => {
  if (value === undefined || value === null || (value as any) === Nothing) {
    return Nothing
  } else {
    return new Just(value)
  }
}

import { PLBase } from '../PLBase'
import { PLString } from '../string/PLString'
import { plString } from '../string/stringFn'

export class Just<T extends PLBase> implements PLBase {
  public static kind = 'Just'

  public constructor(private _value: T) {}

  public get value(): T {
    return this._value
  }

  public toJS<Return>(): Return {
    return this._value?.toJS?.()
  }

  public toJSON<Return>(): Return {
    return this.toJS()
  }

  public toString(): string {
    return `Just(${this._value.toString()})`
  }

  public debugTypeOf(): PLString {
    return plString(Just.kind)
  }
}

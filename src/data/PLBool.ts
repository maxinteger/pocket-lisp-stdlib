import { StdRuntimeError } from '../utils/StdRuntimeError'
import { Ordering, PartialEq, PartialOrd } from '../typeClasses/cmp'
import { And, Not, Or } from '../typeClasses'
import { Copy } from '../typeClasses/base'
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
  public static fromJS(value: boolean): PLBool {
    return new PLBool(value)
  }

  public static fromStr(str: PLString): PLBool {
    switch (str.value) {
      case 'true':
        return plBool(true)
      case 'false':
        return plBool(false)
      default:
        throw new StdRuntimeError(`Invalid boolean: "${str.value}".`)
    }
  }

  public constructor(private _value: boolean) {
    super()
  }

  public get value(): boolean {
    return this._value
  }

  public not(): PLBool {
    return new PLBool(!this._value)
  }

  public and(other: PLBool): PLBool {
    return new PLBool(this._value && other._value)
  }

  public or(other: PLBool): PLBool {
    return new PLBool(this._value || other._value)
  }

  public equals(other: PLBool): PLBool {
    return new PLBool(this._value === other._value)
  }

  public partialCmp(other: PLBool): Ordering {
    if (this.value === other.value) {
      return Ordering.Equal
    } else if (this.value) {
      return Ordering.Greater
    } else {
      return Ordering.Less
    }
  }

  public copy(): PLBool {
    return new PLBool(this._value)
  }

  public toString(): string {
    return this._value ? 'true' : 'false'
  }

  public toJS(): boolean {
    return this._value
  }

  public debugTypeOf(): PLString {
    return plString('Bool')
  }
}

///

export const plBool = (value: boolean): PLBool => new PLBool(value)

export const parseBool = (value: string): PLBool => PLBool.fromStr(plString(value))

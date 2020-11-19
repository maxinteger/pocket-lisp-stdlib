import { StdRuntimeError } from '../../utils/StdRuntimeError'
import { PLBase } from '../PLBase'
import { PLString } from '../string/PLString'
import { plString } from '../string/stringFn'
import { Copy } from '../../typeClasses/baseType'
import { Ordering, PartialEq, PartialOrd } from '../../typeClasses/cmpType'
import { And, Not, Or } from '../../typeClasses/opsType'

export class PLBool
  implements
    PLBase,
    PartialEq<PLBool>,
    Not,
    And<PLBool>,
    Or<PLBool>,
    PartialEq<PLBool>,
    PartialOrd<PLBool>,
    Copy<PLBool> {
  public static kind = 'Bool'

  public static fromJS(value: boolean): PLBool {
    return new PLBool(value)
  }

  public static fromStr(str: PLString): PLBool {
    switch (str.value) {
      case 'true':
        return new PLBool(true)
      case 'false':
        return new PLBool(false)
      default:
        throw new StdRuntimeError(`Invalid boolean: "${str.value}".`)
    }
  }

  public constructor(private _value: boolean) {}

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
    return plString(PLBool.kind)
  }
}

///

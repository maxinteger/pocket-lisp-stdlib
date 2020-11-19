import { StdRuntimeError } from '../../utils/StdRuntimeError'
import { PLBase } from '../PLBase'
import { PLBool } from '../bool/PLBool'
import { PLString } from '../string/PLString'
import { plBool } from '../bool/boolFn'
import { plString } from '../string/stringFn'
import { Subtract } from '../../typeClasses/ops'
import { Copy } from '../../typeClasses/baseType'
import { Ordering, PartialEq, PartialOrd } from '../../typeClasses/cmpType'
import { Add, Divide, Multiple, Negate } from '../../typeClasses/opsType'

export class PLNumber
  implements
    PLBase,
    PartialEq<PLNumber>,
    Add<PLNumber>,
    Subtract<PLNumber>,
    Multiple<PLNumber>,
    Divide<PLNumber>,
    Negate<PLNumber>,
    PartialOrd<PLNumber>,
    Copy<PLNumber> {
  public static kind = 'Number'

  public static fromJS(value: number): PLNumber {
    return new PLNumber(value)
  }

  public static fromStr(source: PLString): PLNumber {
    const val = parseFloat(source.value)
    if (isNaN(val)) {
      throw new StdRuntimeError(`Invalid number: "${source.value}".`)
    }
    return new PLNumber(val)
  }

  public constructor(private _value: number) {}

  public get value(): number {
    return this._value
  }

  public equals(other: PLNumber): PLBool {
    return plBool(this._value === other.value)
  }

  public negate(): PLNumber {
    return new PLNumber(-this._value)
  }

  public add(other: PLNumber): PLNumber {
    return new PLNumber(this._value + other.value)
  }

  public subtract(other: PLNumber): PLNumber {
    return new PLNumber(this._value - other.value)
  }

  public multiple(other: PLNumber): PLNumber {
    return new PLNumber(this._value * other.value)
  }

  public divide(other: PLNumber): PLNumber {
    return new PLNumber(this._value / other.value)
  }

  public copy(): PLNumber {
    return new PLNumber(this._value)
  }

  public partialCmp(other: PLNumber): Ordering {
    if (this.value < other.value) {
      return Ordering.Less
    } else if (this.value > other.value) {
      return Ordering.Greater
    } else {
      return Ordering.Equal
    }
  }

  public toJS(): number {
    return this._value
  }

  public toString(): string {
    return this._value.toString()
  }

  public debugTypeOf(): PLString {
    return plString(PLNumber.kind)
  }
}

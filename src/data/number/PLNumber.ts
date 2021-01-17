import { expandDecimals, getDecimalString, simplifyDecimal } from './numberFn'
import { PLBool } from '../bool/PLBool'
import { plBool } from '../bool/boolFn'
import { PLBase } from '../PLBase'
import { PLString } from '../string/PLString'
import { plString } from '../string/stringFn'
import { RuntimeError } from 'pocket-lisp'
import { Subtract } from '../../typeClasses/ops'
import { Copy } from '../../typeClasses/baseType'
import { Ordering, PartialEq, PartialOrd } from '../../typeClasses/cmpType'
import { Add, Divide, Multiple, Negate } from '../../typeClasses/opsType'
import { floatEq } from '../../utils/math'

const MAXDECIMALS = 12

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

  private readonly _intValue: number
  private readonly _decimals: number

  public constructor(intValue: number, decimals = 0) {
    const decimalObj = simplifyDecimal(intValue, decimals)
    this._decimals = decimalObj.decimals
    this._intValue = decimalObj.intValue
  }

  public get intValue(): number {
    return this._intValue
  }

  public get decimals(): number {
    return this._decimals
  }

  public get value(): number {
    return this._intValue * Math.pow(10, -this._decimals)
  }

  public equals(d: PLNumber): PLBool {
    return plBool(floatEq(this.value, d.value))
  }

  public negate(): PLNumber {
    return new PLNumber(-this.intValue, this.decimals)
  }

  public add(d: PLNumber): PLNumber {
    const decimalObj = expandDecimals(this, d)
    const totalIntValue = decimalObj.intValue1 + decimalObj.intValue2
    return new PLNumber(totalIntValue, decimalObj.maxDecimal)
  }

  public subtract(d: PLNumber): PLNumber {
    const decimalObj = expandDecimals(this, d)
    const totalIntValue = decimalObj.intValue1 - decimalObj.intValue2
    return new PLNumber(totalIntValue, decimalObj.maxDecimal)
  }

  public multiple(d: PLNumber): PLNumber {
    return new PLNumber(this.intValue * d.intValue, this.decimals + d.decimals)
  }

  public divide(d: PLNumber): PLNumber {
    if (d.intValue === 0) {
      throw new RuntimeError('Cannot divide by zero!')
    }
    const decimalObj = expandDecimals(this, d)
    const divideIntValue = Math.round((decimalObj.intValue1 / decimalObj.intValue2) * Math.pow(10, MAXDECIMALS))
    return new PLNumber(divideIntValue, MAXDECIMALS)
  }

  public partialCmp(other: PLNumber): Ordering {
    const decimalObj = expandDecimals(this, other)

    if (decimalObj.intValue1 < decimalObj.intValue2) return Ordering.Less
    if (decimalObj.intValue1 > decimalObj.intValue2) return Ordering.Greater
    return Ordering.Equal
  }

  public toJS(): { intValue: number; decimals: number } {
    return {
      intValue: this._intValue,
      decimals: this._decimals,
    }
  }

  public toString(): string {
    return `${getDecimalString(this.intValue, this.decimals)}`
  }

  public copy(): PLNumber {
    return new PLNumber(this.intValue, this.decimals)
  }

  public debugTypeOf(): PLString {
    return plString(PLNumber.kind)
  }
}

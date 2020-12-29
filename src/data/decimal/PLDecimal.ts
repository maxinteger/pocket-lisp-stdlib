import { expandDecimals, getDecimalParts, getDecimalString, createSimplifiedDecimal } from './decimalFn'
import { PLBool } from '../bool/PLBool'
import { plBool } from '../bool/boolFn'

export class PLDecimal {
  public static kind = 'Decimal'

  private readonly _strValue: string
  private readonly _intValue: number
  private readonly _decimals: number

  public constructor(strValue: string) {
    const decimalParts = getDecimalParts(strValue)
    this._decimals = decimalParts.length === 1 ? 0 : decimalParts[1].length
    this._intValue = parseInt(strValue.replace('.', ''))
    this._strValue = strValue
  }

  public get strValue(): string {
    return this._strValue
  }

  public get intValue(): number {
    return this._intValue
  }

  public get decimals(): number {
    return this._decimals
  }

  public equals(d: PLDecimal): PLBool {
    const decimals = expandDecimals(this, d)
    return plBool(decimals.intValue1 === decimals.intValue2)
  }

  public negate(): PLDecimal {
    const resultString = getDecimalString(-this.intValue, this.decimals)
    return new PLDecimal(resultString)
  }

  public add(d: PLDecimal): PLDecimal {
    const decimals = expandDecimals(this, d)
    const totalIntValue = decimals.intValue1 + decimals.intValue2
    const resultString = getDecimalString(totalIntValue, decimals.maxDecimal)
    return createSimplifiedDecimal(resultString)
  }

  public subtract(d: PLDecimal): PLDecimal {
    const decimals = expandDecimals(this, d)
    const totalIntValue = decimals.intValue1 - decimals.intValue2
    const resultString = getDecimalString(totalIntValue, decimals.maxDecimal)
    return createSimplifiedDecimal(resultString)
  }
}

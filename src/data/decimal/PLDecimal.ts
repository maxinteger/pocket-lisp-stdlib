import { StdRuntimeError } from '../../utils/StdRuntimeError'
import { isNumeric } from './decimalFn'

export class PLDecimal {
  public static kind = 'Decimal'

  private readonly _strValue: string
  private readonly _intValue: number
  private readonly _decimals: number

  public constructor(strValue: string) {
    if (!isNumeric(strValue)) {
      throw new StdRuntimeError('Invalid decimal number parameters!')
    } else {
      const decimalParts = strValue.split('.')
      this._decimals = decimalParts.length === 1 ? 0 : decimalParts[1].length
      this._intValue = parseFloat(strValue.replace('.', ''))
    }
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
}

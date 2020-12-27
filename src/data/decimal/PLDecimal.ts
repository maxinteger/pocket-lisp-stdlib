import { StdRuntimeError } from '../../utils/StdRuntimeError'

export class PLDecimal {
  public static kind = 'Decimal'

  private readonly _strValue: string

  public constructor(strValue: string) {
    if (strValue === '') {
      throw new StdRuntimeError('Invalid decimal number parameters!')
    }
    this._strValue = strValue
  }

  public get strValue(): string {
    return this._strValue
  }
}

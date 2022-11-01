import { DecimalResult } from './numberFn'
import { PLBool } from '../bool/PLBool'
import { plBool } from '../bool/boolFn'
import { PLBase } from '../PLBase'
import { PLString } from '../string/PLString'
import { plString } from '../string/stringFn'
import { Subtract } from '../../typeClasses'
import { Copy } from '../../typeClasses'
import { Ordering, PartialEq, PartialOrd } from '../../typeClasses'
import { Add, Divide, Multiple, Negate } from '../../typeClasses'
import Decimal from 'decimal.js'

export type PLNumberInput = `${number}` | number | Decimal

export const PL_NUMBER_PRECISION = 16

Decimal.set({ precision: PL_NUMBER_PRECISION })

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
    Copy<PLNumber>
{
  public static kind = 'Number'

  private readonly decimal: Decimal

  public constructor(data: PLNumberInput) {
    try {
      this.decimal = new Decimal(data)
    } catch (e) {
      throw new Error(`Invalid number: "${data}"`)
    }
  }

  public get data(): Decimal {
    return this.decimal
  }

  public get value(): number {
    return this.decimal.toNumber()
  }

  public equals(d: PLNumber): PLBool {
    return plBool(this.decimal.equals(d.decimal))
  }

  public negate(): PLNumber {
    return new PLNumber(this.decimal.negated())
  }

  public add(num: PLNumber): PLNumber {
    return new PLNumber(this.decimal.add(num.decimal))
  }

  public subtract(num: PLNumber): PLNumber {
    return new PLNumber(this.decimal.sub(num.decimal))
  }

  public multiple(num: PLNumber): PLNumber {
    return new PLNumber(this.decimal.mul(num.decimal))
  }

  public divide(num: PLNumber): PLNumber {
    if (num.data.isZero()) {
      throw new Error('Cannot divide by zero!')
    }
    return new PLNumber(this.decimal.div(num.decimal))
  }

  public partialCmp(other: PLNumber): Ordering {
    if (this.decimal.lessThan(other.decimal)) return Ordering.Less
    if (this.decimal.greaterThan(other.decimal)) return Ordering.Greater
    return Ordering.Equal
  }

  public toJS(): DecimalResult {
    const { s, d, e } = this.decimal
    return { s, d, e }
  }

  public toString(): string {
    return this.decimal.toString()
  }

  public copy(): PLNumber {
    return new PLNumber(new Decimal(this.decimal))
  }

  public debugTypeOf(): PLString {
    return plString(PLNumber.kind)
  }

  public isInteger(): PLBool {
    return plBool(this.decimal.isInteger())
  }

  public toJSON(): DecimalResult {
    return this.toJS()
  }
}

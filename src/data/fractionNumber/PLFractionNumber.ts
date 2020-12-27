import { StdRuntimeError } from '../../utils/StdRuntimeError'
import { gcd } from '../../utils/math'
import { PLBool } from '../bool/PLBool'
import { PLBase } from '../PLBase'
import { PLString } from '../string/PLString'
import { plBool } from '../bool/boolFn'
import { plString } from '../string/stringFn'
import { isValid } from './utils'
import { Subtract } from '../../typeClasses/ops'
import { Copy } from '../../typeClasses/baseType'
import { Ordering, PartialEq, PartialOrd } from '../../typeClasses/cmpType'
import { Add, Divide, Multiple, Negate } from '../../typeClasses/opsType'

///

export function createSimplifiedFraction(numerator: number, denominator: number): PLFractionNumber {
  if (denominator < 0) {
    numerator *= -1
    denominator *= -1
  }
  const divisor = gcd(Math.abs(numerator), Math.abs(denominator))
  return new PLFractionNumber(numerator / divisor, denominator / divisor)
}

export class PLFractionNumber
  implements
    PLBase,
    PartialEq<PLFractionNumber>,
    Add<PLFractionNumber>,
    Subtract<PLFractionNumber>,
    Multiple<PLFractionNumber>,
    Divide<PLFractionNumber>,
    Negate<PLFractionNumber>,
    PartialOrd<PLFractionNumber>,
    Copy<PLFractionNumber> {
  public static kind = 'Fraction'

  private readonly _n: number
  private readonly _d: number

  public constructor(numerator: number, denominator: number) {
    if (!isValid(numerator, denominator)) {
      throw new StdRuntimeError('Invalid fraction number parameters!')
    }

    this._n = numerator
    this._d = denominator
  }

  public get numerator(): number {
    return this._n
  }

  public get denominator(): number {
    return this._d
  }

  public equals(a: PLFractionNumber): PLBool {
    const frac1 = createSimplifiedFraction(a.numerator, a.denominator)
    const frac2 = createSimplifiedFraction(this.numerator, this.denominator)
    return plBool(frac1.numerator === frac2.numerator && frac1.denominator === frac2.denominator)
  }

  public negate(): PLFractionNumber {
    return new PLFractionNumber(-this._n, this._d)
  }

  public add(a: PLFractionNumber): PLFractionNumber {
    const numerator = this.numerator * a.denominator + this.denominator * a.numerator
    const denominator = this.denominator * a.denominator
    return createSimplifiedFraction(numerator, denominator)
  }

  public subtract(a: PLFractionNumber): PLFractionNumber {
    const numerator = this.numerator * a.denominator - this.denominator * a.numerator
    const denominator = this.denominator * a.denominator
    return createSimplifiedFraction(numerator, denominator)
  }

  public multiple(a: PLFractionNumber): PLFractionNumber {
    const numerator = this.numerator * a.numerator
    const denominator = this.denominator * a.denominator
    return createSimplifiedFraction(numerator, denominator)
  }

  public divide(a: PLFractionNumber): PLFractionNumber {
    const numerator = this.numerator * a.denominator
    const denominator = this.denominator * a.numerator
    return createSimplifiedFraction(numerator, denominator)
  }

  public partialCmp(other: PLFractionNumber): Ordering {
    const lcm = (this._d * other._d) / gcd(this._d, other._d)
    const a = (this._n * lcm) / this._d
    const b = (other._n * lcm) / other._d

    if (a < b) return Ordering.Less
    if (a > b) return Ordering.Greater
    return Ordering.Equal
  }

  public toJS(): { numerator: number; denominator: number } {
    return {
      numerator: this._n,
      denominator: this._d,
    }
  }

  public toString(): string {
    return `${this._n}/${this._d}`
  }

  public copy(): PLFractionNumber {
    return new PLFractionNumber(this._n, this._d)
  }

  public debugTypeOf(): PLString {
    return plString(PLFractionNumber.kind)
  }
}

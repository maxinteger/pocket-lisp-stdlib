import { PLBase } from './PLBase'
import { PLBool } from './PLBool'
import { PLNumber } from './PLNumber'
import { Copy } from '../typeClasses/base'
import { Index } from '../typeClasses/ops'
import { Ordering, PartialEq, PartialOrd } from '../typeClasses/cmp'

export class PLString extends PLBase
  implements Index<PLNumber, PLString>, PartialEq<PLString>, PartialOrd<PLString>, Copy<PLString> {
  public static fromJS(value: string): PLString {
    return new PLString(value)
  }

  public static fromStr(value: PLString): PLString {
    return value.copy()
  }

  public constructor(private _value: string) {
    super()
  }

  public get value(): string {
    return this._value
  }

  public add(other: PLString): PLString {
    return new PLString(this._value + other.value)
  }

  public index(idx: PLNumber): PLString {
    if (Number.isInteger(idx.value)) {
      return new PLString(this._value.charAt(idx.value) ?? '')
    } else {
      return new PLString('')
    }
  }

  public equals(other: PLString): PLBool {
    return new PLBool(this._value === other.value)
  }

  public partialCmp(other: PLString): Ordering {
    const ord = this._value.localeCompare(other.value)
    if (ord < 0) return Ordering.Less
    if (ord === 0) return Ordering.Equal
    return Ordering.Greater
  }

  public copy(): PLString {
    return new PLString(this._value)
  }

  public toJS(): string {
    return this._value
  }

  public toString(): string {
    return `${this._value}`
  }

  public debugTypeOf(): PLString {
    return plString('String')
  }
}

export const plString = (value = ''): PLString => new PLString(value)

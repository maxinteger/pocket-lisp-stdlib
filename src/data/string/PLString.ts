import { PLBase } from '../PLBase'
import type { PLBool } from '../bool/PLBool'
import type { PLNumber } from '../number/PLNumber'
import { plBool } from '../bool/boolFn'
import { plNumber } from '../number/numberFn'
import { Copy } from '../../typeClasses/baseType'
import { Ordering, PartialEq, PartialOrd } from '../../typeClasses/cmpType'
import { Container, Slice } from '../../typeClasses/iterType'
import { Index } from '../../typeClasses/opsType'

export class PLString
  implements
    PLBase,
    Index<PLNumber, PLString>,
    PartialEq<PLString>,
    PartialOrd<PLString>,
    Copy<PLString>,
    Container<PLString>,
    Slice<PLString> {
  public static kind = 'String'

  public static fromJS(value: string): PLString {
    return new PLString(value)
  }

  public static fromStr(value: PLString): PLString {
    return value.copy()
  }

  public constructor(private _value: string) {}

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

  public slice(start: PLNumber, end: PLNumber): PLString {
    return new PLString(this.value.slice(start.value, end.value))
  }

  public equals(other: PLString): PLBool {
    return plBool(this._value === other.value)
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
    return new PLString(PLString.kind)
  }

  public contains(item: PartialEq<PLString>): PLBool {
    return plBool(this.value.indexOf((item as any).value) > -1)
  }

  public count(): PLNumber {
    return plNumber(this.value.length)
  }
}

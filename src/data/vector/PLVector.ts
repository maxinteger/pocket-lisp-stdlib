import { PLBase } from '../PLBase'
import { PLBool } from '../bool/PLBool'
import { PLNumber } from '../number/PLNumber'
import { PLString } from '../string/PLString'
import { assertType, assetNothing, typeCheck } from '../../utils/assert'
import { plBool } from '../bool/boolFn'
import { plString } from '../string/stringFn'
import { copy } from '../../typeClasses/base'
import { equals } from '../../typeClasses/cmp'
import { Copy } from '../../typeClasses/baseType'
import { PartialEq } from '../../typeClasses/cmpType'
import { Iterable, Slice } from '../../typeClasses/iterType'
import { Add } from '../../typeClasses/opsType'
import type { StrictArray } from '../types'

type VectorItem = PLBase

export class PLVector<Item extends VectorItem>
  implements PLBase, Add<PLVector<Item>>, Iterable<Item>, Copy<PLVector<Item>>, Slice<PLVector<Item>> {
  public static kind = 'Vector'

  private readonly _value: StrictArray<Item>

  public constructor(value: StrictArray<Item>) {
    value.map((item) => assertType(value[0], item))
    this._value = value
  }

  public get value(): StrictArray<Item> {
    return this._value
  }

  public contains(item: PartialEq<Item>): PLBool {
    return plBool(this.value.find((el) => equals(el as any, item).value) !== undefined)
  }

  public add(a: PLVector<any>): PLVector<any> {
    return new PLVector(this._value.concat(a.value))
  }

  public count(): PLNumber {
    return new PLNumber(this._value.length ?? 0)
  }

  public map<MapItem extends VectorItem>(fn: (item: Item) => MapItem): PLVector<MapItem> {
    return new PLVector<MapItem>(this.value.map((item) => fn(item)))
  }

  public filter(fn: (item: Item) => PLBool): PLVector<Item> {
    return new PLVector<Item>(this.value.filter((item) => fn(item).toJS()))
  }

  public reduce<Result>(init: Result, fn: (acc: Result, item: Item) => Result): Result {
    return this.value.reduce(fn, init) as Result
  }

  public intersperse(elem: Item): PLVector<Item> {
    const lastIdx = this.value.length - 1
    return new PLVector(
      this.value.reduce((res, item, idx) => {
        res.push(item)
        if (idx < lastIdx) {
          res.push(elem)
        }
        return res
      }, [] as StrictArray<Item>),
    )
  }

  public toJS(): unknown[] {
    return this._value.map((i) => i.toJS())
  }

  public toString(): string {
    return `[${this._value.map((i) => i.toString()).join(',')}]`
  }

  public index(idx: PLNumber): Item {
    typeCheck(PLNumber, idx)
    return assetNothing(this.value[idx.value], `Vector index ${idx.toString()} is not defined`)
  }

  public slice(start: PLNumber, end: PLNumber): PLVector<Item> {
    typeCheck(PLNumber, start)
    typeCheck(PLNumber, end)
    return new PLVector<Item>(this.value.slice(start.value, end.value))
  }

  public copy(): PLVector<Item> {
    return new PLVector([...this._value] as StrictArray<Item>)
  }

  public deepCopy(): PLVector<Item> {
    return new PLVector(this._value.map((i) => copy(i as any)))
  }

  public debugTypeOf(): PLString {
    return plString(PLVector.kind)
  }
}

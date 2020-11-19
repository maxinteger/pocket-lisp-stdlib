import { PLBase } from '../PLBase'
import { PLBool } from '../bool/PLBool'
import { PLNumber } from '../number/PLNumber'
import { PLString } from '../string/PLString'
import { assertType } from '../../utils/assert'
import { plBool } from '../bool/boolFn'
import { plString } from '../string/stringFn'
import { copy } from '../../typeClasses/base'
import { equals } from '../../typeClasses/cmp'
import { Copy } from '../../typeClasses/baseType'
import { PartialEq } from '../../typeClasses/cmpType'
import { Iterable } from '../../typeClasses/iterType'
import { PLVector } from '../vector/PLVector'
import { plVector } from '../vector/vectorFn'
import type { StrictArray } from '../types'

type SetItem = PLBase

export class PLSet<Item extends SetItem> implements PLBase, Iterable<Item>, Copy<PLSet<Item>> {
  public static kind = 'Set'

  private readonly _value: StrictArray<Item>

  public constructor(list: PLVector<Item>) {
    const arr = list.value
    arr.map((item) => assertType(arr[0], item))
    // Filter out identical items
    this._value = arr.reduce((list, item) => {
      if (!list.find((el) => equals(el as any, item).value)) {
        list.push(item)
      }
      return list
    }, [] as Item[])
  }

  public get value(): Item[] {
    return this._value
  }

  public contains(item: PartialEq<PLBase>): PLBool {
    return plBool(this.value.find((el) => equals(el as any, item).value) !== undefined)
  }

  public union(a: PLSet<Item>): PLSet<Item> {
    return new PLSet<Item>(plVector<Item>(...this._value.concat(a.value)))
  }

  public difference(a: PLSet<Item>): PLSet<Item> {
    return new PLSet<Item>(plVector<Item>(...this.value.filter((item) => !a.contains(item as any).value)))
  }

  public intersection(a: PLSet<Item>): PLSet<Item> {
    return new PLSet<Item>(
      plVector<Item>(
        ...this.value.concat(a.value).filter((el) => a.contains(el as any).value && this.contains(el as any).value),
      ),
    )
  }

  public symmetricDifference(a: PLSet<Item>): PLSet<Item> {
    return new PLSet<Item>(
      plVector<Item>(
        ...this.value.concat(a.value).filter((el) => !(a.contains(el as any).value && this.contains(el as any).value)),
      ),
    )
  }

  public count(): PLNumber {
    return new PLNumber(this._value.length ?? 0)
  }

  public map<MapItem extends SetItem>(fn: (item: Item) => MapItem): PLSet<MapItem> {
    return new PLSet<MapItem>(plVector<MapItem>(...this.value.map(fn)))
  }

  public filter(fn: (item: Item) => PLBool): PLSet<Item> {
    return new PLSet<Item>(plVector<Item>(...this.value.filter((item) => fn(item).toJS())))
  }

  public reduce<Result>(init: Result, fn: (acc: Result, item: Item) => Result): Result {
    return this.value.reduce(fn, init) as Result
  }

  public toJS(): unknown[] {
    return this.value.map((i) => i.toJS())
  }

  public toString(): string {
    return `[${this.value.map((i) => i.toString()).join(',')}]`
  }

  public copy(): PLSet<Item> {
    return new PLSet<Item>(plVector<Item>(...this.value))
  }

  public deepCopy(): PLSet<Item> {
    return new PLSet(plVector(...this.value.map((i) => copy(i as any))))
  }

  public debugTypeOf(): PLString {
    return plString(PLSet.kind)
  }
}

import { PLBase } from './PLBase'
import { copy, Copy, deepCopy, toJS, toString } from '../typeClasses/base-types'
import { add } from '../typeClasses/ops-types'
import { count, filter, Iterator, map } from '../typeClasses/iter-types'
import * as fn from '../typeClasses/base-fn'
import { PLNumber } from './PLNumber'
import { PLBool } from './PLBool'

type VectorItem = PLBase

export class PLVector<Item extends VectorItem> extends PLBase
  implements Iterator<Item>, Copy<PLVector<Item>> {
  public constructor(private _value: Item[]) {
    super()
  }

  public get value() {
    return this._value
  }

  public [add](a: PLVector<any>) {
    return plVector(...this._value.concat(a.value))
  }

  public [count](): PLNumber {
    return new PLNumber(this._value.length ?? 0)
  }

  public [map]<MapItem extends VectorItem>(fn: (item: Item) => MapItem): PLVector<MapItem> {
    return new PLVector<MapItem>(this.value.map(fn))
  }

  public [filter](fn: (item: Item) => PLBool): PLVector<Item> {
    return new PLVector<Item>(this.value.filter((item) => fn(item)[toJS]()))
  }

  public [toJS]() {
    return this._value.map((i) => i[toJS]())
  }

  public [toString]() {
    return `[${this._value.map((i) => i[toString]()).join(',')}]`
  }

  public [copy]() {
    return new PLVector([...this._value])
  }

  public [deepCopy]() {
    return new PLVector(this._value.map((i) => fn.copy(i as any)))
  }
}

export const plVector: <T extends VectorItem>(...value: T[]) => PLVector<T> = (...value) =>
  new PLVector(value)

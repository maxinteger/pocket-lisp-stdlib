import { PLBase } from './PLBase'
import { copy, Copy } from '../typeClasses/base'
import { Iterable } from '../typeClasses/iter'
import { plNumber, PLNumber } from './PLNumber'
import { PLBool } from './PLBool'
import { Maybe, maybe } from './Maybe'
import { add } from '../typeClasses'
import { PLString, plString } from './PLString'
import { typeCheck } from '../utils/assert'

type VectorItem = PLBase

export class PLVector<Item extends VectorItem> extends PLBase
  implements Iterable<Item>, Copy<PLVector<Item>> {
  public constructor(private _value: Item[]) {
    super()
  }

  public get value(): Item[] {
    return this._value
  }

  public add(a: PLVector<any>): PLVector<any> {
    return plVector(...this._value.concat(a.value))
  }

  public count(): PLNumber {
    return new PLNumber(this._value.length ?? 0)
  }

  public map<MapItem extends VectorItem>(fn: (item: Item) => MapItem): PLVector<MapItem> {
    return new PLVector<MapItem>(this.value.map(fn))
  }

  public filter(fn: (item: Item) => PLBool): PLVector<Item> {
    return new PLVector<Item>(this.value.filter((item) => fn(item).toJS()))
  }

  public reduce<Result>(init: Result, fn: (acc: Result, item: Item) => Result): Result {
    return this.value.reduce(fn, init) as Result
  }

  public toJS(): unknown[] {
    return this._value.map((i) => i.toJS())
  }

  public toString(): string {
    return `[${this._value.map((i) => i.toString()).join(',')}]`
  }

  public index(idx: PLNumber): Maybe<Item> {
    typeCheck(PLNumber, idx)
    return maybe(this.value[idx.value])
  }

  public copy(): PLVector<Item> {
    return new PLVector([...this._value])
  }

  public deepCopy(): PLVector<Item> {
    return new PLVector(this._value.map((i) => copy(i as any)))
  }

  public debugTypeOf(): PLString {
    return plString('Vector')
  }
}

export const plVector: <T extends VectorItem>(...value: T[]) => PLVector<T> = (...value) =>
  new PLVector(value)

export const sum: (list: PLVector<PLNumber>) => PLNumber = (list) => {
  typeCheck(PLVector, list)
  return list.reduce(plNumber(0), add)
}

export const join: (list: PLVector<PLString>) => PLString = (list) => {
  typeCheck(PLVector, list)
  return list.reduce(plString(''), add)
}

export const head: <T extends PLBase>(list: PLVector<T>) => Maybe<T> = (list) => {
  typeCheck(PLVector, list)
  return maybe(list.value[0])
}

export const tail: <T extends PLBase>(list: PLVector<T>) => Maybe<T> = (list) => {
  typeCheck(PLVector, list)
  return maybe(plVector(...list.value.slice(1)))
}

export const functions = {
  sum,
  join,
  head,
  tail
}

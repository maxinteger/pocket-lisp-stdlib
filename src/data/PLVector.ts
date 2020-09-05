import { PLBase } from './PLBase'
import { copy, Copy } from '../typeClasses/base'
import { Iterable } from '../typeClasses/iter'
import { plNumber, PLNumber } from './PLNumber'
import { PLBool } from './PLBool'
import { add } from '../typeClasses'
import { PLString, plString } from './PLString'
import { assetNothing, typeCheck } from '../utils/assert'

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

  public intersperse(elem: Item): PLVector<Item> {
    const lastIdx = this.value.length - 1
    return new PLVector(
      this.value.reduce((res, item, idx) => {
        res.push(item)
        if (idx < lastIdx) {
          res.push(elem)
        }
        return res
      }, [] as Item[])
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

export const intersperse: <T extends PLBase>(separator: T, list: PLVector<T>) => PLVector<T> = (
  separator,
  list
) => {
  typeCheck(PLVector, list)
  return list.intersperse(separator)
}

export const join: (list: PLVector<PLString>) => PLString = (list) => {
  typeCheck(PLVector, list)
  return list.reduce(plString(''), add)
}

export const joinWith: (separator: PLString, list: PLVector<PLString>) => PLString = (
  separator,
  list
) => {
  typeCheck(PLVector, list)
  return list.intersperse(separator).reduce(plString(''), add)
}

export const head: <T extends PLBase>(list: PLVector<T>) => T = (list) => {
  typeCheck(PLVector, list)
  return assetNothing(list.value[0], 'Vector is empty')
}

export const tail: <T extends PLBase>(list: PLVector<T>) => PLVector<T> = (list) => {
  typeCheck(PLVector, list)
  assetNothing(list.value.length, 'Vector is not defined correctly')
  return plVector(...list.value.slice(1))
}

export const functions = {
  sum,
  intersperse,
  join,
  'join-with': joinWith,
  head,
  tail
}

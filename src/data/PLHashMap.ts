import { RuntimeError } from 'pocket-lisp'
import { PLBase } from './PLBase'
import { PLString, plString } from './PLString'
import { chunk } from '../utils/list'
import { Index } from '../typeClasses/ops'
import { maybe, Maybe } from './Maybe'
import { plVector, PLVector } from './PLVector'
import { typeCheck } from '../utils/assert'

export class PLHashMap<Item extends PLBase> extends PLBase implements Index<PLString, Maybe<Item>> {
  private readonly _value: Map<string, Item>

  public constructor(list: unknown[] = []) {
    super()
    if (list.length % 2 !== 0) {
      throw new RuntimeError(
        'Invalid hash map definition.\nDefinition must contains key value pairs'
      )
    }
    const entries = chunk(list) as [[any, any]]
    const isInvalidKeys = entries.some((item) => PLString !== item[0].constructor)
    if (isInvalidKeys) {
      throw new RuntimeError('Invalid hash map definition.\n Keys are must be string or keyword')
    }
    this._value = new Map(entries)
  }

  public get value(): Map<string, Item> {
    return this._value
  }

  public toJS(): Map<string, any> {
    return this._value
  }

  public toString(): string {
    return `{${Array.from(this._value.entries())
      .map(([k, v]) => `${k.toString()} -> ${v.toString()}`)
      .join(', ')}}`
  }

  public debugTypeOf(): PLString {
    return plString('HashMap')
  }

  public index(idx: PLString): Maybe<any> {
    return maybe(this._value.get(idx.value))
  }
}

export const plHashMap: <T extends PLBase>(...list: unknown[]) => PLHashMap<T> = (...list) =>
  new PLHashMap(list)

export const keys: (map: PLHashMap<any>) => PLVector<PLString> = (map) => {
  typeCheck(PLHashMap, map)
  return plVector(...Array.from(map.value.keys()).map((k) => plString(k)))
}

export const values: (map: PLHashMap<any>) => PLVector<any> = (map) => {
  typeCheck(PLHashMap, map)
  return plVector(...Array.from(map.value.values()))
}

export const functions = {
  values,
  keys
}

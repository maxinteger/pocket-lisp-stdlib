import { StdRuntimeError } from '../../utils/StdRuntimeError'
import { PLBase } from '../PLBase'
import { PLString } from '../string/PLString'
import { assetNothing, typeCheck } from '../../utils/assert'
import { plString } from '../string/stringFn'
import { chunk } from '../../utils/list'
import { Index } from '../../typeClasses/opsType'

export class PLHashMap<Item extends PLBase> implements PLBase, Index<PLString, Item> {
  public static kind = 'HashMap'

  private readonly _value: Map<string, Item>

  public constructor(list: unknown[] = []) {
    if (list.length % 2 !== 0) {
      throw new StdRuntimeError('Invalid hash map definition.\nDefinition must contains key value pairs')
    }
    const entries = chunk(list).map(([key, value]) => {
      if (PLString !== key.constructor) {
        throw new StdRuntimeError('Invalid hash map definition.\n Keys are must be string or keyword')
      }
      return [key.value, value]
    }) as [[any, any]]
    this._value = new Map(entries)
  }

  public get value(): Map<string, Item> {
    return this._value
  }

  public toJS(): Map<string, any> {
    return new Map(Array.from(this._value.entries()).map(([k, v]) => [k, v.toJS()]))
  }

  public toString(): string {
    return `{${Array.from(this._value.entries())
      .map(([k, v]) => `${k.toString()} -> ${v.toString()}`)
      .join(', ')}}`
  }

  public debugTypeOf(): PLString {
    return plString(PLHashMap.kind)
  }

  public index(idx: PLString): Item {
    typeCheck(PLString, idx)
    return assetNothing(this._value.get(idx.value) as Item, `HashMap key ${idx.toString()} not defined`)
  }
}

import { PLBase } from './PLBase'
import { toJS, toString } from '../typeClasses/base-types'

type Entries = [any, any][]

export class PLHashMap extends PLBase{
  private readonly _value: Map<any, any>

  public constructor(entries?: Entries) {
    super()
    this._value = new Map(entries)
  }

  public [toJS]() {
    return this._value
  }

  public [toString]() {
    return `{${Array.from(this._value.entries())
      .map(([k, v]) => `${k}: ${v}`)
      .join(', ')}}`
  }
}

export const plHashMap = (entries?: Entries) => new PLHashMap(entries || [])

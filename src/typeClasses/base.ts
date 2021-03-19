import { PLString } from '../data/string/PLString'
import { plString } from '../data/string/stringFn'
import { assertImpl } from '../utils/assert'
import { Copy, Debug, SerializeToJS, SerializeToString } from './baseType'

export const str: (value: SerializeToString) => PLString = (value) => plString(value.toString())

export interface BoxedValue<T> extends SerializeToJS<T> {
  toString: () => string
}

export const toJSON: (value: any) => PLString = (value) => {
  let js = null
  if (typeof value.toJSON === 'function') {
    js = value.toJSON()
  } else if (typeof value.toJS === 'function') {
    js = value.toJS()
  }

  return plString(JSON.stringify(js))
}

//

export const debugTypeOf: (variable: Debug) => PLString = (v) => {
  const result: any = v['debugTypeOf'] ? v.debugTypeOf() : plString('<unknown>')
  return result instanceof String ? plString(result as string) : result
}

//

export const copy: <T extends Copy<any>>(item: T) => T = (item) => {
  assertImpl(item, 'copy')
  return item.copy()
}

export const deepCopy: <T extends Copy<any>>(item: T) => T = (item) => {
  assertImpl(item, 'copy')
  if (item.deepCopy) {
    return item.deepCopy?.()
  } else {
    return copy(item)
  }
}

export default {
  typeof: debugTypeOf,
  copy,
  'deep-copy': deepCopy,
  str,
  'to-json': toJSON,
}

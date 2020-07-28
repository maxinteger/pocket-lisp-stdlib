import * as op from './base-types'
import { assertImpl } from '../utils/assert'

export const copy: <T extends op.Copy<any>>(item: T) => T = (item) => {
  assertImpl(item, op.copy)
  return item[op.copy]()
}

export const deepCopy: <T extends op.Copy<any>>(item: T) => T = (item) => {
  assertImpl(item, op.copy)
  if (item[op.deepCopy]) {
    return item[op.deepCopy]?.()
  } else {
    return copy(item)
  }
}

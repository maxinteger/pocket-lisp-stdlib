import { StdRuntimeError } from './StdRuntimeError'
import { isNothing } from './convert'

///

export const assert = (val: boolean, msg: string): boolean => {
  // TODO remove lang dependency
  if (val) throw new StdRuntimeError(msg)
  return true
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const assertType = (a: any, b: any): boolean =>
  assert(
    a.constructor !== b.constructor,
    `Type Error! Expected '${a?.constructor.name}', but got '${b?.constructor.name}'`
  )

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const typeCheck = (type: any, value: any): boolean =>
  assert(
    type !== value.constructor,
    `Expected '${type.name}', but got '${value.constructor.name}'.`
  )

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const assertImpl = (instance: any, method: string): boolean =>
  assert(!instance[method], `"${method.toString()}" is not defined on ${instance}`)

export const assetNothing: <T>(value: T, msg: string) => T = (value, msg) => {
  assert(isNothing(value), msg)
  return value
}

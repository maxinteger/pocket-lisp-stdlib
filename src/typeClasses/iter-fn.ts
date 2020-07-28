import { Interpreter, PLCallable } from 'pocket-lisp'
import { PLBase } from '../data/PLBase'
import * as op from './iter-types'
import { PLBool, PLNumber } from '../index'
import { Box } from './base-types'

export const count: (collection: op.Iterator<unknown>) => PLNumber = (collection) => {
  return collection[op.count]()
}

export function map<T extends PLBase, B extends PLBase>(
  this: Interpreter,
  fn: PLCallable,
  f: op.Iterator<T>
): Box<B> {
  return f[op.map]((x) => this.evalFn(fn, [x]) as B)
}

export function filter<T extends PLBase>(
  this: Interpreter,
  fn: PLCallable,
  f: op.Iterator<T>
): Box<T> {
  return f[op.filter]((x) => this.evalFn(fn, [x]) as PLBool)
}

export default {
  count,
  map,
  filter
}

import type { Interpreter, PLCallable } from 'pocket-lisp'
import { PLNumber } from '../data/number/PLNumber'
import { PLBool } from '../data/bool/PLBool'
import { PLBase } from '../data/PLBase'
import { Box } from './baseType'
import { PartialEq } from './cmpType'
import { Container, Iterable, Slice } from './iterType'

export const count: (collection: Container<unknown>) => PLNumber = (collection) => {
  return collection.count()
}

export function contains<T extends PLBase, Item extends PartialEq<T>>(item: Item, collection: Container<T>): PLBool {
  return collection.contains(item)
}

export function slice<T extends PLBase>(start: PLNumber, end: PLNumber, container: Slice<T>): Slice<T> {
  return container.slice(start, end)
}

export function map<T extends PLBase, B extends PLBase>(this: Interpreter, fn: PLCallable, f: Iterable<T>): Box<B> {
  return f.map((x) => this.evalFn(fn, [x]) as B)
}

export function filter<T extends PLBase>(this: Interpreter, fn: PLCallable, f: Iterable<T>): Box<T> {
  return f.filter((x) => this.evalFn(fn, [x]) as PLBool)
}

export function reduce<T extends PLBase, Result>(
  this: Interpreter,
  init: Result,
  fn: PLCallable,
  f: Iterable<T>,
): Result {
  return f.reduce(init, (accumulator, item) => this.evalFn(fn, [accumulator, item]) as Result)
}

export default {
  count,
  contains,
  map,
  filter,
  reduce,
  slice,
}

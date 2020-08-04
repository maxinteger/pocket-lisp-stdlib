import { PLNumber } from '../data/PLNumber'
import { PLBool } from '../data/PLBool'
import { PLBase } from '../data/PLBase'
import { Box } from './base'
import { Interpreter, PLCallable } from 'pocket-lisp'

export interface Iterable<Item> {
  count(): PLNumber
  map<MapItem extends PLBase>(fn: (item: Item) => MapItem): Box<MapItem>
  filter(fn: (item: Item) => PLBool): Box<Item>
  reduce<Result>(init: Result, fn: (acc: Result, item: Item) => Result): Result
}

export const count: (collection: Iterable<unknown>) => PLNumber = (collection) => {
  return collection.count()
}

export function map<T extends PLBase, B extends PLBase>(
  this: Interpreter,
  fn: PLCallable,
  f: Iterable<T>
): Box<B> {
  return f.map((x) => this.evalFn(fn, [x]) as B)
}

export function filter<T extends PLBase>(
  this: Interpreter,
  fn: PLCallable,
  f: Iterable<T>
): Box<T> {
  return f.filter((x) => this.evalFn(fn, [x]) as PLBool)
}

export function reduce<T extends PLBase, Result>(
  this: Interpreter,
  init: Result,
  fn: PLCallable,
  f: Iterable<T>
): Result {
  return f.reduce(init, (accumulator, item) => this.evalFn(fn, [accumulator, item]) as Result)
}

export default {
  count,
  map,
  filter,
  reduce
}

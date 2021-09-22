import { PLNumber } from '../data/number/PLNumber'
import { PartialEq } from './cmpType'
import { PLBool } from '../data/bool/PLBool'
import { PLBase } from '../data/PLBase'
import { Box } from './baseType'
import { PLString } from '..'

export interface Container<Item> {
  count(): PLNumber

  contains(item: PartialEq<Item>): PLBool
}

export interface Slice<Item> {
  slice(start: PLNumber, end: PLNumber): Slice<Item>
}

export interface Replace<Item> {
  replace(from: PLString, to: PLString): Replace<Item>
}

export interface Iterable<Item> extends Container<Item> {
  map<MapItem extends PLBase>(fn: (item: Item) => MapItem): Box<MapItem>

  filter(fn: (item: Item) => PLBool): Box<Item>

  reduce<Result>(init: Result, fn: (acc: Result, item: Item) => Result): Result
}

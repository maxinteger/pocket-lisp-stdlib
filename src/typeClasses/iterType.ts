import { PLNumber } from '../data/number/PLNumber'
import { PartialEq } from './cmpType'
import { PLBool } from '../data/bool/PLBool'
import { PLBase } from '../data/PLBase'
import { Box } from './baseType'

export interface Container<Item> {
  count(): PLNumber

  contains(item: PartialEq<Item>): PLBool
}

export interface Iterable<Item> extends Container<Item> {
  map<MapItem extends PLBase>(fn: (item: Item) => MapItem): Box<MapItem>

  filter(fn: (item: Item) => PLBool): Box<Item>

  reduce<Result>(init: Result, fn: (acc: Result, item: Item) => Result): Result
}

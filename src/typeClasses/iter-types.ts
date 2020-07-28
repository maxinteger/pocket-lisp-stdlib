import { PLNumber } from '../data/PLNumber'
import { PLBool } from '../data/PLBool'
import { PLBase } from '../data/PLBase'
import { Box } from './base-types'

export const count = Symbol('count')
export const map = Symbol('map')
export const filter = Symbol('filter')
export interface Iterator<Item> {
  [count](): PLNumber
  [map]<MapItem extends PLBase>(fn: (item: Item) => MapItem): Box<MapItem>
  [filter](fn: (item: Item) => PLBool): Box<Item>
}

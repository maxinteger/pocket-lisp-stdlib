export interface StrictArray<Item> extends Array<Item> {
  filter(predicate: (value: Item, index: number, array: Item[]) => boolean, thisArg?: any): Item[]
  find(predicate: (value: Item, index: number, obj: Item[]) => unknown, thisArg?: any): Item | undefined
  find(predicate: (value: Item, index: number, obj: Item[]) => unknown, thisArg?: any): number | undefined
  concat(...items: ConcatArray<Item>[]): StrictArray<Item>
}

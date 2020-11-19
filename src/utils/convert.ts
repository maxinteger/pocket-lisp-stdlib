// https://stackoverflow.com/questions/596467/how-do-i-convert-a-float-number-to-a-whole-number-in-javascript
import { Nothing } from '../data/maybe/Nothing'

export const toInt = (a: number): number => ~~a

export const isNothing: (value: any) => boolean = (value) =>
  value === undefined || value === null || (value as any) === Nothing

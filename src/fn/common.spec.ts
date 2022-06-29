import { unboxing } from './common'
import { plBool } from '../data/bool/boolFn'
import { plString } from '../data/string/stringFn'
import { plFractionNumber } from '../data/fractionNumber/fractionNumberFn'
import { plNumber } from '../data/number/numberFn'
import { plVector } from '../data/vector/vectorFn'

describe('stdlib/fn/common', () => {
  describe('unboxing', () => {
    it('should unbox any stdlib value', () => {
      expect(unboxing(plBool(true))).toBe(true)
      expect(unboxing(plNumber(42))).toStrictEqual({ d: [42], e: 1, s: 1 })
      expect(unboxing(plFractionNumber(1, 2))).toEqual({ numerator: 1, denominator: 2 })
      expect(unboxing(plString('hello world'))).toBe('hello world')
      expect(unboxing(plVector(plNumber(1)))).toEqual([{ d: [1], e: 0, s: 1 }])
    })
  })
})

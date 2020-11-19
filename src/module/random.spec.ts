import { random, randomInt, shuffle } from '../module/random'
import { plNumber } from '../data/number/numberFn'
import { plVector } from '../data/vector/vectorFn'

describe('stdlib/module/random', () => {
  describe('random function', () => {
    it('should return with PLNumber between 0 and 1', () => {
      const value = random().value
      expect(value <= 1).toBe(true)
      expect(value >= 0).toBe(true)
    })
  })

  describe('randomInt', () => {
    it('should return with integer PLNumber', () => {
      const value = randomInt(plNumber(10), plNumber(20)).value
      expect(value <= 20).toBe(true)
      expect(value >= 10).toBe(true)
      expect(~~value).toBe(value)
    })
  })

  describe('shuffle', () => {
    it('should return with a new vector where the length does not change', () => {
      const value = shuffle(plVector(plNumber(1), plNumber(2), plNumber(3))).value
      expect(value.length).toBe(3)
    })
  })
})

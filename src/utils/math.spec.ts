import { gcd, isBelowEpsilon } from './math'

describe('math utils', () => {
  describe('gcd', () => {
    it('should calculate great common divisor', () => {
      expect(gcd(0, 0)).toBe(0)
      expect(gcd(1, 1)).toBe(1)
      expect(gcd(1, 2)).toBe(1)
      expect(gcd(2, 5)).toBe(1)
      expect(gcd(20, 50)).toBe(10)
      expect(gcd(0, 100)).toBe(100)
      expect(gcd(100, 0)).toBe(100)
    })
  })

  describe('isBelowEpsilon', () => {
    it('should work correctly', () => {
      expect(isBelowEpsilon(-Infinity)).toBe(false)
      expect(isBelowEpsilon(-42)).toBe(false)
      expect(isBelowEpsilon(-1)).toBe(false)
      expect(isBelowEpsilon(-Number.EPSILON)).toBe(false)
      expect(isBelowEpsilon(-Math.sin(Math.PI))).toBe(true)
      expect(isBelowEpsilon(0)).toBe(true)
      expect(isBelowEpsilon(Math.sin(Math.PI))).toBe(true)
      expect(isBelowEpsilon(Number.EPSILON)).toBe(false)
      expect(isBelowEpsilon(1)).toBe(false)
      expect(isBelowEpsilon(42)).toBe(false)
      expect(isBelowEpsilon(Infinity)).toBe(false)
      expect(isBelowEpsilon(NaN)).toBe(false)
    })
  })
})

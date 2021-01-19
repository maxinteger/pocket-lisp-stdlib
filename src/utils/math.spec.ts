import { gcd, isBelowEpsilon, floatEq } from './math'

describe('math utils', () => {
  describe('gcd', () => {
    it('should calculate great common divisor', () => {
      expect(gcd(1, 1)).toBe(1)
      expect(gcd(1, 2)).toBe(1)
      expect(gcd(2, 5)).toBe(1)
      expect(gcd(20, 50)).toBe(10)
    })
  })

  describe('isBelowEpsilon', () => {
    it('should work correctly', () => {
      expect(isBelowEpsilon(-Infinity)).toBe(false)
      expect(isBelowEpsilon(-42)).toBe(false)
      expect(isBelowEpsilon(-1)).toBe(false)
      expect(isBelowEpsilon(-Number.EPSILON)).toBe(true)
      expect(isBelowEpsilon(-Math.sin(Math.PI))).toBe(true)
      expect(isBelowEpsilon(0)).toBe(true)
      expect(isBelowEpsilon(Math.sin(Math.PI))).toBe(true)
      expect(isBelowEpsilon(Number.EPSILON)).toBe(true)
      expect(isBelowEpsilon(1)).toBe(false)
      expect(isBelowEpsilon(42)).toBe(false)
      expect(isBelowEpsilon(Infinity)).toBe(false)
      expect(isBelowEpsilon(NaN)).toBe(false)
    })
  })

  describe('floatEq', () => {
    it('should work correctly', () => {
      expect(floatEq(2, 3)).toBe(false)
      expect(floatEq(3, 3)).toBe(true)
      expect(floatEq(0.1 + 0.2, 0.3)).toBe(true)
      expect(floatEq(1 + Number.EPSILON, 1)).toBe(true)
      expect(floatEq(1 + Number.EPSILON * 2, 1)).toBe(false)
      expect(floatEq(NaN, 1)).toBe(false)
      expect(floatEq(NaN, NaN)).toBe(false)
    })
  })
})

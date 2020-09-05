import { expect } from 'chai'
import { gcd, isBelowEpsilon } from './math'

describe('math utils', () => {
  describe('gcd', () => {
    expect(gcd(1, 1)).equals(1)
    expect(gcd(1, 2)).equals(1)
    expect(gcd(2, 5)).equals(1)
    expect(gcd(20, 50)).equals(10)
  })

  describe('isBelowEpsilon', () => {
    expect(isBelowEpsilon(-Infinity)).equals(false)
    expect(isBelowEpsilon(-42)).equals(false)
    expect(isBelowEpsilon(-1)).equals(false)
    expect(isBelowEpsilon(-Number.EPSILON)).equals(false)
    expect(isBelowEpsilon(-Math.sin(Math.PI))).equals(true)
    expect(isBelowEpsilon(0)).equals(true)
    expect(isBelowEpsilon(Math.sin(Math.PI))).equals(true)
    expect(isBelowEpsilon(Number.EPSILON)).equals(false)
    expect(isBelowEpsilon(1)).equals(false)
    expect(isBelowEpsilon(42)).equals(false)
    expect(isBelowEpsilon(Infinity)).equals(false)
    expect(isBelowEpsilon(NaN)).equals(false)
  })
})

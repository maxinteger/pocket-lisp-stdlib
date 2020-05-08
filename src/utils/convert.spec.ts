import { expect } from 'chai'
import { toInt } from './convert'

describe('convert utils', () => {
  describe('toInt', () => {
    it('should convert any valid number to integer', () => {
      const tests = [{ a: 1, e: 1 }, { a: 1.1, e: 1 }, { a: 0.9, e: 0 }]
      tests.map(({ a, e }) => expect(toInt(a)).equals(e))
    })

    it('should return with 0 for any other value', () => {
      const tests = [NaN, 'asd', [], {}]
      tests.map(v => expect(toInt(v as any)).equals(0))
    })
  })
})

import { range, range0 } from '../module/vector'
import { plNumber } from '../data/number/numberFn'

describe('stdlib/module/vector', () => {
  describe('range0', () => {
    it('should return with a empty vector for range0(0)', () => {
      const res = range0(plNumber(0))
      expect(res.value.length).toBe(0)
    })

    it('should return with range from 0 to 9 range for range0(10)', () => {
      const res = range0(plNumber(3))
      expect(res.value).toEqual([plNumber(0), plNumber(1), plNumber(2)])
    })

    it('should trim the parameter to integer', () => {
      const res = range0(plNumber(3.5))
      expect(res.value).toEqual([plNumber(0), plNumber(1), plNumber(2)])
    })
  })

  describe('range', () => {
    it('should return with a empty vector for range(0, 0, 0)', () => {
      const res = range(plNumber(0), plNumber(0), plNumber(1))
      expect(res.value.length).toBe(0)
    })

    it('should return with range from 0 to 9 range for range(0, 10, 1)', () => {
      const res = range(plNumber(0), plNumber(3), plNumber(1))
      expect(res.value).toEqual([plNumber(0), plNumber(1), plNumber(2)])
    })

    it('should work with negative step', () => {
      const res = range(plNumber(3), plNumber(3), plNumber(-1))
      expect(res.value).toEqual([plNumber(3), plNumber(2), plNumber(1)])
    })

    it('should work with float parameters', () => {
      const res = range(plNumber(0), plNumber(0.9), plNumber(0.1))
      const exp = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8]
      for (const i in res.value) {
        expect(res.value[i].value < exp[i] + Number.EPSILON).toBe(true)
        expect(res.value[i].value > exp[i] - Number.EPSILON).toBe(true)
      }
    })
  })
})

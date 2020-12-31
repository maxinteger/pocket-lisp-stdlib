import { plNumber, modulo } from './numberFn'

const pln = plNumber

describe('stdlib/data/numberFn', () => {
  describe('modulo', () => {
    it('should calculate modulo correctly', () => {
      expect(() => modulo(pln(-3), pln(1))).toThrow(`Number (-3) cannot be negative.`)
      expect(() => modulo(pln(4), pln(-1))).toThrow(`Modulo (-1) must be positive.`)
      const tests = [
        { num: 3, mod: 3, res: 0 },
        { num: 4, mod: 3, res: 1 },
        { num: 14, mod: 4, res: 2 },
        { num: 11, mod: 4, res: 3 },
        { num: 17, mod: 6, res: 5 },
      ]
      tests.map(({ num, mod, res }) => {
        expect(modulo(pln(num), pln(mod))).toEqual(pln(res))
      })
    })
  })
})

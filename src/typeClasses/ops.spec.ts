import { add, and, divide, get, multiple, negate, not, or, subtract } from './ops'
import { plBool } from '../data/bool/boolFn'
import { plNumber } from '../data/number/numberFn'
import { plString } from '../data/string/stringFn'

describe('type classes operations', () => {
  describe('not', () => {
    it('should call not method', () => {
      expect(not(plBool(true))).toEqual(plBool(false))
    })
  })
  describe('and', () => {
    it('should call and method', () => {
      expect(and(plBool(true), plBool(true))).toEqual(plBool(true))
      expect(and(plBool(true), plBool(false))).toEqual(plBool(false))
      expect(and(plBool(false), plBool(true))).toEqual(plBool(false))
      expect(and(plBool(false), plBool(false))).toEqual(plBool(false))
    })
  })
  describe('or', () => {
    it('should call or method', () => {
      expect(or(plBool(true), plBool(true))).toEqual(plBool(true))
      expect(or(plBool(true), plBool(false))).toEqual(plBool(true))
      expect(or(plBool(false), plBool(true))).toEqual(plBool(true))
      expect(or(plBool(false), plBool(false))).toEqual(plBool(false))
    })
  })
  describe('negate', () => {
    it('should call negate method', () => {
      expect(negate(plNumber(42))).toEqual(plNumber(-42))
      expect(negate(plNumber(-42))).toEqual(plNumber(42))
    })
  })
  describe('add', () => {
    it('should call add method', () => {
      expect(add(plNumber(21), plNumber(21))).toEqual(plNumber(42))
    })
  })
  describe('subtract', () => {
    it('should call subtract method', () => {
      expect(subtract(plNumber(21), plNumber(21))).toEqual(plNumber(0))
    })
  })
  describe('multiple', () => {
    it('should call multiple method', () => {
      expect(multiple(plNumber(2), plNumber(10))).toEqual(plNumber(20))
    })
  })
  describe('divide', () => {
    it('should call divide method', () => {
      expect(divide(plNumber(10), plNumber(2))).toEqual(plNumber(5))
    })
  })
  describe('get', () => {
    it('should call get method', () => {
      expect(get(plString('hello'), plNumber(0))).toEqual(plString('h'))
    })
  })
})

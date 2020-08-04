import { expect } from 'chai'
import { PLBase } from './PLBase'
import { plString } from './PLString'

describe('stdlib/data/PLBool', () => {
  const Base = class extends PLBase {}
  const base = new Base()

  describe('fromJS', () => {
    it('should throw error', () => {
      expect(() => Base.fromJS('')).throw('fromJS not implemented')
    })
  })
  describe('fromStr', () => {
    it('should throw error', () => {
      expect(() => Base.fromStr(plString(''))).throw('fromStr not implemented')
    })
  })

  describe('toJS', () => {
    it('should throw error', () => {
      expect(() => base.toJS()).throw('toJS not implemented')
    })
  })

  describe('toString', () => {
    it('should throw error', () => {
      expect(() => base.toString()).throw('toString not implemented')
    })
  })

  describe('debugTypeOf', () => {
    it('should throw error', () => {
      expect(() => base.debugTypeOf()).throw('typeof not implemented')
    })
  })
})

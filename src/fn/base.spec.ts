import { constFn } from './base'

describe('constFn', () => {
  it('should return with function which return with the first call parameter', () => {
    expect(typeof constFn(42)).toBe('function')
    expect(constFn(42)()).toBe(42)
  })
})

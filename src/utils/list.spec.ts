import { chunk } from './list'

describe('list utils', () => {
  describe('chunk', () => {
    it('should return with empty array if the input is empty', () => {
      const actual = chunk([])
      const expected: any = []
      expect(actual).toEqual(expected)
    })
    it('should return with proper chunked array', () => {
      const tests = [
        { input: [1], output: [[1]] },
        { input: [1, 2], output: [[1, 2]] },
        { input: [1, 2, 3], output: [[1, 2], [3]] },
        {
          input: [1, 2, 3, 4],
          output: [
            [1, 2],
            [3, 4],
          ],
        },
      ]
      tests.map(({ input, output }) => {
        expect(chunk(input)).toEqual(output)
      })
    })
    it('should return with proper chunked array if chunk size is 3', () => {
      const tests = [
        { input: [1], output: [[1]] },
        { input: [1, 2], output: [[1, 2]] },
        { input: [1, 2, 3], output: [[1, 2, 3]] },
        { input: [1, 2, 3, 4], output: [[1, 2, 3], [4]] },
      ]
      tests.map(({ input, output }) => {
        expect(chunk(input, 3)).toEqual(output)
      })
    })
  })
})

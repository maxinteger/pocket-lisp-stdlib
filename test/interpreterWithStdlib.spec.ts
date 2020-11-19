import { Interpreter, Parser, Scanner } from 'pocket-lisp'
import { literals, runtime } from '../src'
import { plNumber } from '../src/data/number/numberFn'

describe('stdlib', () => {
  it('should be compatible with the interpreter', (done) => {
    let counter = 0
    const check = (expected: any) => {
      counter++
      return (input: any) => {
        expect(input).toEqual(expected)
        counter--
        if (counter === 0) done()
      }
    }

    const interpreter = new Interpreter(
      {
        globals: {
          ...runtime,
          ...{
            print1: check(plNumber(3)),
            print2: check(plNumber(7))
          }
        }
      },
      literals
    )
    const programCode = `
      (def x (fn [a b] (+ a b)))
      (print1 (x 1 2))
      
      (def a (+ 5))
      (print2 (a 2))
    `

    const parserResult = new Parser(new Scanner(programCode), literals).parse()

    if (!!parserResult.errors.length) {
      throw parserResult.errors
    }

    try {
      interpreter.interpret(parserResult.program)
    } catch (error) {
      expect(error).toBe(undefined)
      done()
    }
  })
})

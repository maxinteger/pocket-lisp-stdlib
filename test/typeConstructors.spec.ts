import { Interpreter, InterpreterOptions, Parser, Scanner } from 'pocket-lisp'
import { literals, plBool, plFractionNumber, plHashMap, plNumber, plString, plVector, runtime } from '../src'

const interpret = (src: string, globals?: InterpreterOptions['globals']) =>
  new Interpreter({ globals: { ...runtime, ...globals } }, literals).interpret(
    new Parser(new Scanner(src), literals).parse().program,
  )

describe('Type constructors', () => {
  describe('Bool', () => {
    it('should work ', () => {
      interpret(`(print (Bool true))`, { print: (data: any) => expect(data).toEqual(plBool(true)) })
      interpret(
        `
      (def b true)
      (print (Bool b))
      `,
        { print: (data: any) => expect(data).toEqual(plBool(true)) },
      )
    })
  })

  describe('Number', () => {
    it('should work ', () => {
      interpret(`(print (Int 1))`, { print: (data: any) => expect(data).toEqual(plNumber(1)) })
      interpret(
        `
      (def n 1)
      (print (Int 1))
      `,
        { print: (data: any) => expect(data).toEqual(plNumber(1)) },
      )
      interpret(`(print (Float 1))`, { print: (data: any) => expect(data).toEqual(plNumber(1)) })
      interpret(
        `
      (def n 1)
      (print (Float 1))
      `,
        { print: (data: any) => expect(data).toEqual(plNumber(1)) },
      )
    })
  })

  describe('Fraction number', () => {
    it('should work ', () => {
      interpret(`(print (FractionNumber 1 2))`, {
        print: (data: any) => expect(data).toEqual(plFractionNumber(1, 2)),
      })

      interpret(
        `
      (def n 1)
      (def d 2)
      (print (FractionNumber n d))`,
        {
          print: (data: any) => expect(data).toEqual(plFractionNumber(1, 2)),
        },
      )
    })
  })

  describe('String', () => {
    it('should work ', () => {
      interpret(`(print (String "Hello"))`, {
        print: (data: any) => expect(data).toEqual(plString('Hello')),
      })

      interpret(
        `
      (def s "Hello")
      (print (String s))`,
        {
          print: (data: any) => expect(data).toEqual(plString('Hello')),
        },
      )
    })
  })

  describe('Vector', () => {
    it('should work ', () => {
      const result = plVector(plNumber(1), plNumber(2), plNumber(3))

      interpret(`(print (Vector 1 2 3))`, {
        print: (data: any) => expect(data).toEqual(result),
      })

      interpret(
        `
      (def a 1)
      (def b 2)
      (def c 3)
      (print (Vector a b c))`,
        {
          print: (data: any) => expect(data).toEqual(result),
        },
      )
    })
  })

  describe('HashMap', () => {
    it('should work ', () => {
      const result = plHashMap(plString('a'), plNumber(1), plString('b'), plNumber(2))
      interpret(`(print (HashMap "a" 1 :b 2))`, {
        print: (data: any) => expect(data).toEqual(result),
      })

      interpret(
        `
      (def a :a)
      (def av 1)
      (def b :b)
      (def bv 2)
      (print (HashMap a av b bv))`,
        {
          print: (data: any) => expect(data).toEqual(result),
        },
      )
    })
  })
})

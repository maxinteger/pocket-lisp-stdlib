import { Interpreter, InterpreterOptions, Scanner, Parser } from 'pocket-lisp'

export const initInterpret = (src: string, globals: InterpreterOptions['globals']) =>
  new Interpreter({ globals }).interpret(new Parser(new Scanner(src)).parse().program)

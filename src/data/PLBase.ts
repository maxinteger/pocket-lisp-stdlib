import { RuntimeError } from 'pocket-lisp'
import { fromJS, fromStr, SerializeToJS, SerializeToString, toJS, toString } from '../typeClasses/base-types'
import { PLString } from './PLString'

export abstract class PLBase implements SerializeToJS<unknown>, SerializeToString {
  public static [fromJS](_inout: unknown): unknown {
    throw new RuntimeError('toString not implemented')
  }

  public static [fromStr](_source: PLString): unknown {
    throw new RuntimeError('fromStr not implemented')
  }

  public [toString](): string {
    throw new RuntimeError('toString not implemented')
  }

  public [toJS]() {
    throw new RuntimeError('toJS not implemented')
  }
}

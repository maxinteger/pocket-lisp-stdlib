import { RuntimeError } from 'pocket-lisp'
import { Debug, SerializeToJS, SerializeToString } from '../typeClasses/base'
import { PLString } from './PLString'

export abstract class PLBase implements SerializeToJS<unknown>, SerializeToString, Debug {
  public static fromJS(_inout: unknown): unknown {
    throw new RuntimeError('fromJS not implemented')
  }

  public static fromStr(_source: PLString): unknown {
    throw new RuntimeError('fromStr not implemented')
  }

  public toString(): string {
    throw new RuntimeError('toString not implemented')
  }

  public toJS() {
    throw new RuntimeError('toJS not implemented')
  }

  public debugTypeOf(): PLString {
    throw new RuntimeError('typeof not implemented')
  }
}

import { StdRuntimeError } from '../utils/StdRuntimeError'
import { Debug, SerializeToJS, SerializeToString } from '../typeClasses/base'
import { PLString } from './PLString'

export abstract class PLBase implements SerializeToJS<unknown>, SerializeToString, Debug {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public static fromJS(_inout: unknown): unknown {
    throw new StdRuntimeError('fromJS not implemented')
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public static fromStr(_source: PLString): unknown {
    throw new StdRuntimeError('fromStr not implemented')
  }

  public toString(): string {
    throw new StdRuntimeError('toString not implemented')
  }

  public toJS(): any {
    throw new StdRuntimeError('toJS not implemented')
  }

  public debugTypeOf(): PLString {
    throw new StdRuntimeError('typeof not implemented')
  }
}

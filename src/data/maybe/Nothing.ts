import { PLBase } from '../PLBase'
import { PLString } from '../string/PLString'
import { plString } from '../string/stringFn'

class NothingClass implements PLBase {
  public static kind = 'Nothing'

  public get value() {
    return Nothing
  }

  public toJS() {
    return undefined
  }

  public toString() {
    return 'Nothing'
  }

  debugTypeOf(): PLString {
    return plString(NothingClass.kind)
  }
}

export const Nothing = new NothingClass()

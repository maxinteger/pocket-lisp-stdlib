import * as op from '../typeClasses/base'

export const unboxing = (x: op.SerializeToJS<unknown>): unknown => x.toJS()

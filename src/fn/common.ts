import * as op from '../typeClasses/base-types'

export const unboxing = (x: op.SerializeToJS<unknown>): unknown => x[op.toJS]()

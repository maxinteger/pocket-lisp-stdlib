import { SerializeToJS } from '../typeClasses/baseType'

export const unboxing = (x: SerializeToJS<unknown>): unknown => x.toJS()

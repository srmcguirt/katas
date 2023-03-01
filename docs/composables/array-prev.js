import { moduloHack as m } from './modhack'

export const arrayPrev = (a, i) => a[m(i - 1, a.length)]
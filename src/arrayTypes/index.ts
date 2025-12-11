import { ascending } from './ascending';
import { descending } from './descending';
import { shuffle } from './random';
import { semi } from './semi';

type IArrayTypeFn = (array: number[]) => void;

export const arrayTypesMap = {
  'Random': shuffle,
  'Ascending': ascending,
  'Descending': descending,
  'Semi': semi,
} satisfies Record<string, IArrayTypeFn>;

export type IArrayType = keyof typeof arrayTypesMap;

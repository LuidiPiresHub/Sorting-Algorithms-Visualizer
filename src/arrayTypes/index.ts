import type { IArrayType } from '../interfaces/array';
import { ascending } from './ascending';
import { descending } from './descending';
import { shuffle } from './random';
import { semi } from './semi';

export const generateArrayType = (array: number[], type?: IArrayType): void => {
  switch (type) {
    case 'Random': {
      shuffle(array);
      break;
    }
    case 'Ascending': {
      ascending(array)
      break;
    }
    case 'Descending': {
      descending(array)
      break;
    }
    case 'Semi': {
      semi(array);
      break;
    }
  }
}


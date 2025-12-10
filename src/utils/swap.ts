export const swap = (array: number[], indexA: number, indexB: number): void => {
  [array[indexA], array[indexB]] = [array[indexB], array[indexA]];
};

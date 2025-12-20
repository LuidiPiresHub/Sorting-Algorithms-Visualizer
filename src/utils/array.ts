export const generateArray = (length: number): number[] => {
  const array = Array.from({ length }, (_, i) => i + 1);
  return array;
};

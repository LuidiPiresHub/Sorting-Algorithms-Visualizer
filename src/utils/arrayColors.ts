export const defaultColors = (ratio: number): string => {
  return `rgb(${255 * ratio}, ${255 * (1 - ratio)}, 255)`
};

export const rainbowColors = (ratio: number): string => {
  return `hsl(${360 * ratio}, 100%, 50%)`;
};

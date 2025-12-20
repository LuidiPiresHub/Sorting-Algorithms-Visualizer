const defaultColors = (ratio: number): string => {
  return `rgb(${255 * ratio}, ${255 * (1 - ratio)}, 255)`
};

const rainbowColors = (ratio: number): string => {
  return `hsl(${360 * ratio}, 100%, 50%)`;
};

export const getColors = (colored: boolean, ratio: number): string => {
  if (colored) return rainbowColors(ratio)
  return defaultColors(ratio)
}

import type { IFrame } from '../interfaces/animation';

export const globalFrames: IFrame[] = [];

export const recordAlgorithmFrame = (frame: IFrame): void => {
  globalFrames.push(frame);
};

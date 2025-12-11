import type { RefObject } from 'react';
import type { IAnimationOptions, IFrame } from '../interfaces/animation';
import { swap } from '../utils/swap';

const frames: IFrame[] = [];

export const recordTransitionFrame = (frame: IFrame): void => {
  frames.push(frame);
};

export const animateTransition = (
  ctx: CanvasRenderingContext2D,
  array: number[],
  duration = 1000,
  optionsRef: RefObject<IAnimationOptions>,
  onFinish: () => void = () => { }
) => {
  const n = frames.length;
  let start: number | null = null;
  let lastIdx = 0;

  const step = (time: number) => {
    if (!optionsRef.current.rafId) {
      frames.length = 0;
      return;
    }
    if (!start) start = time;

    const progress = Math.min((time - start) / duration, 1);
    const idx = Math.floor(progress * n);

    while (lastIdx < idx) {
      const f = frames[lastIdx];
      if (f.type === 'swap') swap(array, f.indexA, f.indexB);
      if (f.type === 'set') array[f.index] = f.value;
      lastIdx++;
    }

    optionsRef.current.drawFn(ctx, array, optionsRef);

    if (progress < 1) {
      optionsRef.current.rafId = requestAnimationFrame(step);
    } else {
      frames.length = 0;
      onFinish();
    }
  };

  optionsRef.current.rafId = requestAnimationFrame(step);
};

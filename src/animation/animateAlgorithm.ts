import type { RefObject } from 'react';
import { swap } from '../utils/swap';
import type { IAnimationOptions, IFrame } from '../interfaces/animation';

const frames: IFrame[] = [];

export const recordAlgorithmFrame = (frame: IFrame): void => {
  frames.push(frame);
};


export const animateAlgorithm = (
  ctx: CanvasRenderingContext2D,
  array: number[],
  optionsRef: RefObject<IAnimationOptions>,
  onFinish: () => void = () => { }
): void => {
  const ONE_SEC = 1000;
  const n = frames.length;
  let idx = 0;
  let lastTime = 0;
  let acc = 0;

  const step = (time: number) => {
    if (idx >= n || !optionsRef.current.rafId) {
      frames.length = 0;
      onFinish();
      return;
    }

    if (!lastTime) lastTime = time;
    const delta = (time - lastTime) / ONE_SEC;
    lastTime = time;

    const speed = optionsRef.current.speed ** 2;
    acc += speed * delta;
    let steps = Math.floor(acc);
    acc -= steps;

    while (steps > 0 && idx < n) {
      const f = frames[idx];

      if (f.type === 'swap') swap(array, f.indexA, f.indexB);
      if (f.type === 'set') array[f.index] = f.value;

      idx++;
      steps--;
    }

    optionsRef.current.drawFn(ctx, array, optionsRef);
    optionsRef.current.rafId = requestAnimationFrame(step);
  };

  optionsRef.current.rafId = requestAnimationFrame(step);
};

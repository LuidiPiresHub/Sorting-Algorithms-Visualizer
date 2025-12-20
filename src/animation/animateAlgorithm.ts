import type { IAnimateAlgorithm } from '../interfaces/animation';
import { swap } from '../utils/swap';
import { playNote } from '../audio/playNote';
import { globalFrames } from './recordFrame';

export const animateAlgorithm = ({ ctx, array, optionsRef, duration }: IAnimateAlgorithm): Promise<void> => {
  return new Promise((resolve) => {
    const frames = globalFrames.splice(0);
    const ONE_SEC = 1000;
    const n = frames.length;
    let idx = 0;
    let lastTime = 0;
    let acc = 0;

    const step = (time: number): void => {
      if (idx >= n || !optionsRef.current.isAnimating) {
        resolve();
        return;
      }

      if (!lastTime) lastTime = time;
      const delta = (time - lastTime) / ONE_SEC;
      lastTime = time;

      if (duration) {
        acc += (n / (duration / 1000)) * delta;
      } else {
        const speed = optionsRef.current.speed ** 2;
        acc += speed * delta;
      }

      let steps = Math.floor(acc);
      acc -= steps;

      while (steps > 0 && idx < n) {
        const sound = optionsRef.current.sound;
        const f = frames[idx];

        if (f.type === 'swap') {
          playNote(sound, array[f.indexA], array.length - 1);
          swap(array, f.indexA, f.indexB);
        }

        if (f.type === 'set') {
          array[f.index] = f.value;
          playNote(sound, array[f.index], array.length - 1)
        }

        idx++;
        steps--;
      }

      optionsRef.current.drawFn({ ctx, array, optionsRef });
      requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  })
};

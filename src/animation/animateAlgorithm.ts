import type { IAnimateAlgorithm } from '../interfaces/animation';
import { swap } from '../utils/swap';
import { playNote } from '../audio/playNote';
import { globalFrames } from './recordFrame';

export const animateAlgorithm = ({ ctx, array, optionsRef, duration }: IAnimateAlgorithm): Promise<void> => {
  return new Promise((resolve) => {
    const { current } = optionsRef
    current.sortedSet.clear();

    const frames = globalFrames.splice(0);
    const ONE_SEC = 1000;
    const n = frames.length;

    let idx = 0;
    let lastTime = 0;
    let acc = 0;

    const step = (time: number): void => {
      if (idx >= n || !current.isAnimating) {
        resolve();
        return;
      }

      if (!lastTime) lastTime = time;
      const delta = (time - lastTime) / ONE_SEC;
      lastTime = time;

      if (duration) {
        acc += (n / (duration / 1000)) * delta;
      } else {
        acc += current.speed ** 2 * delta;
      }

      let steps = Math.floor(acc);
      acc -= steps;

      while (steps > 0 && idx < n) {
        current.highlightSet.clear();
        const f = frames[idx];

        if (f.type === 'swap') {
          playNote(optionsRef, array[f.indexA]);
          swap(array, f.indexA, f.indexB);
          current.highlightSet.add(f.indexA)
          current.highlightSet.add(f.indexB)
        }

        if (f.type === 'set') {
          array[f.index] = f.value;
          playNote(optionsRef, array[f.index])
          current.highlightSet.add(f.index);
        }

        if (f.type === 'current') {
          current.highlightSet.add(f.index);
          playNote(optionsRef, array[f.index]);
        }

        if (f.type === 'check') {
          current.sortedSet.add(f.index);
          playNote(optionsRef, array[f.index]);
        }

        if (f.type === 'compare') {
          current.highlightSet.add(f.indices[0]);
          current.highlightSet.add(f.indices[1]);
          playNote(optionsRef, array[f.indices[0]]);
        }

        idx++;
        steps--;
      }

      current.drawFn({ ctx, array, optionsRef });
      requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  })
};

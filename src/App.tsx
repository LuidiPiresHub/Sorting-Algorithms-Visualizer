import { useEffect, useMemo, useRef, useState } from 'react';
import { drawBars } from './arrayModes/drawBars';
import { CANVAS_SIZE } from './constants/canvas';
import { animateAlgorithm } from './animation/animateAlgorithm';
import type { IAnimationOptions } from './interfaces/animation';
import { animateTransition } from './animation/animateTransition';
import type { IArrayMode, IArrayType } from './interfaces/array';
import { generateArrayType } from './arrayTypes';
import { algorithms, type IAlgorithm } from './algorithms';

const arrayTypes: IArrayType[] = ['Random', 'Descending', 'Semi'];
const arrayModes: IArrayMode[] = ['Bars', 'Circular', 'Spiral', 'Image'];

const generateArray = (length: number): number[] => {
  const array = Array.from({ length }, (_, i) => i + 1);
  return array;
}

const sleep = (ms: number = 500) => new Promise<void>((res) => setTimeout(res, ms));

export default function App() {
  const [speed, setSpeed] = useState<number>(50);
  const [arraySize, setArraySize] = useState<string>('256');
  const [selectedType, setSelectedType] = useState<IArrayType>('Random');
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<IAlgorithm>('Bubble Sort');
  const [isSorting, setIsSorting] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const optionsRef = useRef<IAnimationOptions>({
    speed: 50,
    rafId: null,
    color: true,
    sound: false,
  });

  const array = useMemo(() => generateArray(Math.max(Number(arraySize), 10)), [arraySize]);

  const handleArraySize = (sizeStr: string): void => {
    const size = Number(sizeStr);
    const newSize = Math.min(size, CANVAS_SIZE);
    setArraySize(newSize === 0 ? '' : String(newSize));
  }

  const handleSpeedChange = (speed: number): void => {
    optionsRef.current.speed = speed;
    setSpeed(speed);
  }

  const handleAnimate = (): void => {
    const ctx = canvasRef.current!.getContext('2d')!;

    if (isSorting && optionsRef.current.rafId) {
      optionsRef.current.rafId = null;
      drawBars(ctx, array);
      setIsSorting(false);
      return;
    }

    setIsSorting(true);
    const algorithmArray = [...array];
    const animationArray = [...array];
    generateArrayType(algorithmArray, selectedType);
    animateTransition(ctx, animationArray, 800, optionsRef, async () => {
      await sleep()
      const sortFn = algorithms[selectedAlgorithm]
      sortFn(algorithmArray)
      animateAlgorithm(ctx, animationArray, optionsRef, () => setIsSorting(false));
    })
  };

  useEffect(() => {
    const ctx = canvasRef.current!.getContext('2d')!;
    drawBars(ctx, array)
  }, [array])

  return (
    <main className='h-dvh text-white flex flex-col lg:flex-row'>
      <canvas width={CANVAS_SIZE} height={CANVAS_SIZE} ref={canvasRef} className='bg-[rgb(30,30,50)] aspect-video w-full lg:flex-1 lg:h-dvh lg:min-w-0' />
      <aside id='sidebar' className='bg-[rgb(40,40,60)] py-4 px-6 flex flex-col gap-4 h-full w-full lg:w-[400px] lg:shrink-0 overflow-y-auto scrollbar'>
        <h1 className='text-lg sm:text-2xl font-bold text-blue-400 text-center sm:whitespace-nowrap'>Sorting Algorithms Visualizer</h1>

        <div className='flex max-[300px]:flex-col gap-4 justify-evenly'>
          <label htmlFor="color" className='flex items-center gap-2 hover:text-blue-400 transition-colors cursor-pointer select-none'>
            <input id='color' type="checkbox" className='custom-checkbox' defaultChecked onChange={({ target: { checked } }) => optionsRef.current.color = checked} />
            <span>Color?</span>
          </label>

          <label htmlFor="sound" className='flex items-center gap-2 hover:text-blue-400 transition-colors cursor-pointer select-none'>
            <input id='sound' type="checkbox" className='custom-checkbox' />
            <span>Sound?</span>
          </label>

          <label htmlFor="image" className='flex items-center gap-2 hover:text-blue-400 transition-colors cursor-pointer select-none'>
            <input id='image' type="checkbox" className='custom-checkbox' />
            <span>Highlight?</span>
          </label>
        </div>

        <label id='fileLabel' htmlFor="file" className='border-2 rounded-md border-dashed border-gray-600 hover:border-blue-500 transition-colors p-4 hidden justify-center w-full mx-auto items-center gap-2 cursor-pointer'>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-upload-icon lucide-upload"><path d="M12 3v12" /><path d="m17 8-5-5-5 5" /><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /></svg>
          <span>Upload Image</span>
          <input id='file' type="file" accept='image/*' className='hidden' />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-bold">{`Speed: ${speed}`}</span>
          <input
            type="range"
            min={0}
            max={500}
            value={speed}
            onChange={({ target: { value } }) => handleSpeedChange(Number(value))}
            className="w-full cursor-grab active:cursor-grabbing appearance-none outline-none bg-linear-to-r from-blue-600 to-blue-400 h-2 rounded-full accent-blue-500 range-input"
          />
        </label>

        <button
          type='button'
          onClick={handleAnimate}
          className={` px-4 py-2 mt-2 rounded-md cursor-pointer ${isSorting ? 'bg-red-600 hover:bg-red-500' : 'bg-indigo-700 hover:bg-indigo-600'}`}>{isSorting ? 'Stop' : 'Start'}
        </button>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-bold">Array Size</span>
          <input
            id="arraySize"
            type="number"
            value={arraySize}
            disabled={isSorting}
            onChange={({ target: { value } }) => handleArraySize(value)}
            placeholder={`min: 10 - max: 2048`}
            className={`bg-gray-800 border border-gray-700 rounded px-2 py-1 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 no-spinner ${isSorting ? 'opacity-50 cursor-default' : 'cursor-auto'}`}
          />
        </label>

        <label className="flex flex-col gap-2 w-full">
          <span className="text-sm font-bold">Array Type</span>
          <div className="relative">
            <select onChange={({ target: { value }}) => setSelectedType(value as IArrayType)} className="w-full appearance-none bg-gray-800 border border-gray-700 text-gray-100 rounded px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-400 transition-colors cursor-pointer">
              {arrayTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <svg
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </label>

        <label className="flex flex-col gap-2 w-full">
          <span className="text-sm font-bold">Array Mode</span>
          <div className="relative">
            <select className="w-full appearance-none bg-gray-800 border border-gray-700 text-gray-100 rounded px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-400 transition-colors cursor-pointer">
              {arrayModes.map((mode) => (
                <option key={mode} value={mode}>{mode}</option>
              ))}
            </select>
            <svg
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </label>

        <div className='flex flex-col gap-2 lg:overflow-y-auto'>
          <span className='text-sm font-bold'>Algorithms</span>
          <div className='flex flex-col lg:overflow-y-auto scrollbar'>
            {Object.keys(algorithms).map((algorithm) => (
              <label key={algorithm} htmlFor={algorithm} className={`flex py-0.5 gap-2 transition-colors select-none ${isSorting ? 'opacity-50 cursor-default' : 'cursor-pointer hover:text-blue-400 '}`}>
                <input
                  id={algorithm}
                  type="radio"
                  disabled={isSorting}
                  checked={algorithm === selectedAlgorithm}
                  onChange={() => setSelectedAlgorithm(algorithm as IAlgorithm)}
                  className={`custom-radio ${isSorting ? 'cursor-default' : 'cursor-pointer'}`}
                />
                <span>{algorithm}</span>
              </label>
            ))}
          </div>
        </div>
      </aside>
    </main>
  )
}

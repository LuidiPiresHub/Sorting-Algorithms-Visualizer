import { useEffect, useMemo, useRef, useState, type ChangeEvent } from 'react';
import { CANVAS_SIZE } from './constants/canvas';
import { animateAlgorithm } from './animation/animateAlgorithm';
import type { IAnimationOptions } from './interfaces/animation';
import { algorithmsMap, type IAlgorithm } from './algorithms';
import { arrayModesMap, type IArrayMode } from './arrayModes';
import defaultImage from './images/defaultImage.png';
import { arrayTypesMap, type IArrayType } from './arrayTypes';
import Modal from './components/Modal';
import { generateArray } from './utils/array';
import { sleep } from './utils/sleep';

const img = new Image();
img.src = defaultImage

export default function App() {
  const [isColored, setisColored] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(50);
  const [arraySize, setArraySize] = useState<string>('256');
  const [selectedType, setSelectedType] = useState<IArrayType>('Random');
  const [selectedMode, setSelectedMode] = useState<IArrayMode>('Bars');
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<IAlgorithm>('Bubble Sort');
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const baseRef = useRef<number>(4);
  const optionsRef = useRef<IAnimationOptions>({
    speed: 50,
    isAnimating: isSorting,
    isColored,
    sound: false,
    drawFn: arrayModesMap[selectedMode],
    image: img,
  });

  const array = useMemo(() => generateArray(Math.max(Number(arraySize), 10)), [arraySize]);

  const handleColorChange = (checked: boolean): void => {
    setisColored(checked);
    optionsRef.current.isColored = checked;
  }

  const handleSpeedChange = (speed: number): void => {
    optionsRef.current.speed = speed;
    setSpeed(speed);
  }

  const handleArraySize = (sizeStr: string): void => {
    const size = Number(sizeStr);
    const newSize = Math.min(size, CANVAS_SIZE);
    setArraySize(newSize <= 0 ? '' : String(newSize));
  }

  const handleArrayMode = (mode: IArrayMode): void => {
    optionsRef.current.drawFn = arrayModesMap[mode];
    setSelectedMode(mode);
  };

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>): void => {
    const ctx = canvasRef.current!.getContext('2d')!;
    const files = event.target.files;
    if (files) {
      const file = files[0];
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        optionsRef.current.image = img;
        const drawFn = arrayModesMap[selectedMode];
        drawFn({ ctx, array, optionsRef });
      };
    }
  };

  const handleAnimate = async (): Promise<void> => {
    const ctx = canvasRef.current!.getContext('2d')!;

    if (isSorting) {
      optionsRef.current.isAnimating = false;

      const drawFn = arrayModesMap[selectedMode];
      drawFn({ ctx, array, optionsRef });

      setIsSorting(false);
      return;
    }

    if (selectedAlgorithm.includes('Radix') && !modalIsOpen) {
      setModalIsOpen(true);
      return;
    }

    setIsSorting(true);
    optionsRef.current.isAnimating = true;

    const algorithmArray = [...array];
    const animationArray = [...array];

    const arrayTypeFn = arrayTypesMap[selectedType];
    arrayTypeFn(algorithmArray);

    await animateAlgorithm({ ctx, array: animationArray, optionsRef, duration: 800 });
    await sleep(500);
    const sortFn = algorithmsMap[selectedAlgorithm]
    sortFn(algorithmArray, baseRef.current)

    await animateAlgorithm({ ctx, array: animationArray, optionsRef });
    setIsSorting(false);
  };

  useEffect(() => {
    const ctx = canvasRef.current!.getContext('2d')!;
    const drawFn = arrayModesMap[selectedMode];
    drawFn({ ctx, array, optionsRef });

    const handleResize = (): void => {
      drawFn({ ctx, array, optionsRef });
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize);

  }, [array, selectedMode, isColored])

  return (
    <main className='h-dvh text-white flex flex-col lg:flex-row'>
      <Modal
        isOpen={modalIsOpen}
        onBaseChange={(base) => baseRef.current = base}
        onCancel={() => setModalIsOpen(false)}
        onConfirm={async () => {
          setModalIsOpen(false);
          await sleep(500)
          handleAnimate();
        }}
      />
      <div className="relative">
        {selectedMode === 'Image' && (
          <label htmlFor='file' className="absolute inset-0 z-10 bg-black/70 flex justify-center items-center cursor-pointer image-overlay">
            <span className="text-white text-lg font-semibold image-overlay-text">
              Toque para trocar a imagem
            </span>
            <input id='file' type="file" accept='image/*' onChange={handleImageUpload} className='hidden' />
          </label>
        )}
        <canvas
          width={CANVAS_SIZE}
          height={CANVAS_SIZE}
          ref={canvasRef}
          className="bg-[rgb(30,30,50)] aspect-video w-full lg:flex-1 lg:h-dvh lg:min-w-0"
        />
      </div>

      <aside className='bg-[rgb(40,40,60)] py-4 px-6 flex flex-col gap-4 h-full w-full lg:w-[400px] lg:shrink-0 overflow-y-auto scrollbar'>
        <h1 className='text-lg sm:text-2xl font-bold text-blue-400 text-center sm:whitespace-nowrap'>Sorting Algorithms Visualizer</h1>

        <div className='flex max-[350px]:flex-col gap-4 justify-evenly'>
          <label htmlFor="color" className='flex items-center gap-2 hover:text-blue-400 transition-colors cursor-pointer select-none'>
            <input id='color' type="checkbox" className='custom-checkbox' checked={isColored} onChange={({ target: { checked } }) => handleColorChange(checked)} />
            <span>Colored?</span>
          </label>

          <label htmlFor="sound" className='flex items-center gap-2 hover:text-blue-400 transition-colors cursor-pointer select-none'>
            <input id='sound' type="checkbox" className='custom-checkbox' onChange={({ target: { checked } }) => optionsRef.current.sound = checked} />
            <span>Sound?</span>
          </label>

          <label htmlFor="image" className='flex items-center gap-2 hover:text-blue-400 transition-colors cursor-pointer select-none'>
            <input id='image' type="checkbox" className='custom-checkbox' />
            <span>Highlight?</span>
          </label>
        </div>

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
            placeholder='Min: 10 - Max: 2048'
            className={`bg-gray-800 border border-gray-700 rounded px-2 py-1 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 no-spinner ${isSorting ? 'opacity-50 cursor-default' : 'cursor-auto'}`}
          />
        </label>

        <label className="flex flex-col gap-2 w-full">
          <span className="text-sm font-bold">Array Type</span>
          <div className="relative">
            <select value={selectedType} onChange={({ target: { value } }) => setSelectedType(value as IArrayType)} className="w-full appearance-none bg-gray-800 border border-gray-700 text-gray-100 rounded px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-400 transition-colors cursor-pointer">
              {Object.keys(arrayTypesMap).map((type) => (
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
            <select value={selectedMode} onChange={({ target: { value } }) => handleArrayMode(value as IArrayMode)} className="w-full appearance-none bg-gray-800 border border-gray-700 text-gray-100 rounded px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-400 transition-colors cursor-pointer">
              {Object.keys(arrayModesMap).map((mode) => (
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
            {Object.keys(algorithmsMap).map((algorithm) => (
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

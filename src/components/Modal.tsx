import { useState, type ChangeEvent } from 'react';
import type { IModal } from '../interfaces/modal';
import { bases } from '../constants/bases';

export default function Modal({ isOpen, onBaseChange, onCancel, onConfirm }: IModal) {
  const [radixBase, setRadixBase] = useState<string>('');

  const handleBaseChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    const maxBase = 2049;
    const base = Math.min(Number(value), maxBase);
    onBaseChange(base);
    setRadixBase(base <= 0 ? '' : String(base));
  }

  const handleBasePreset = (base: number): void => {
    onBaseChange(base);
    setRadixBase(String(base));
  }

  return (
    <section className={`fixed inset-0 z-20 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className={`bg-[rgb(30,30,50)] w-full max-w-[420px] rounded-xl shadow-xl p-5 flex flex-col gap-5 transition-all duration-300 ${isOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-5 scale-95'}`}>
        <h1 className="text-xl font-semibold text-white">Radix Sort - Base</h1>

        <label htmlFor="base" className="flex flex-col gap-2">
          <span className="text-sm text-gray-300 font-medium">Base</span>
          <input
            id="base"
            type="number"
            min={2}
            max={2049}
            value={radixBase}
            placeholder="Min: 2 - Max: 2049"
            onChange={handleBaseChange}
            className="bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 no-spinner"
          />
          <span className="text-xs text-gray-400">
            Bases maiores = menos iterações, mais memória
          </span>
        </label>

        <div className="flex flex-col gap-2">
          <span className="text-sm text-gray-300 font-medium">Presets</span>

          <div className="grid grid-cols-3 gap-2">
            {bases.map((base) => (
              <button
                key={base}
                type="button"
                onClick={() => handleBasePreset(base)}
                className={`${base === Number(radixBase) ? 'bg-indigo-600 border-indigo-500' : 'bg-gray-800 border-gray-700'} border rounded-md py-2 text-sm hover:bg-indigo-600 hover:border-indigo-500 transition-colors cursor-pointer`}
              >
                {`Base ${base}`}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-red-600 hover:bg-red-500 rounded-md py-2 transition-colors cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={!radixBase || Number(radixBase) <= 1}
            onClick={onConfirm}
            className={`${!radixBase || Number(radixBase) <= 1 ? 'opacity-50 cursor-default' : 'cursor-pointer'} flex-1 bg-indigo-700 hover:bg-indigo-600 rounded-md py-2 font-medium transition-colors`}
          >
            Play
          </button>
        </div>

      </div>
    </section>
  )
}

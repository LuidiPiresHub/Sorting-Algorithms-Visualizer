// let audioCtx: AudioContext | null = null;
// let masterGain: GainNode | null = null;

// let activeNotes = 0;
// const MAX_NOTES = 32;

// export const initAudio = () => {
//   if (!audioCtx) {
//     audioCtx = new AudioContext();

//     masterGain = audioCtx.createGain();
//     masterGain.gain.value = 0.04; // volume baixo e estável
//     masterGain.connect(audioCtx.destination);
//   }

//   if (audioCtx.state === "suspended") {
//     audioCtx.resume();
//   }
// };

// const valueToFrequency = (value: number, maxValue: number) => {
//   const minFreq = 120;
//   const maxFreq = 1212;
//   return minFreq + (value / maxValue) * (maxFreq - minFreq);
// };

// export const playNote = (
//   value: number,
//   maxValue: number,
//   duration = 0.025
// ) => {
//   if (!audioCtx || !masterGain) return;
//   if (activeNotes >= MAX_NOTES) return;

//   activeNotes++;

//   const osc = audioCtx.createOscillator();
//   const gain = audioCtx.createGain();

//   osc.type = "triangle";
//   osc.frequency.value = valueToFrequency(value, maxValue);

//   const now = audioCtx.currentTime;

//   // envelope simples (igual ao original)
//   gain.gain.setValueAtTime(0.04, now);
//   gain.gain.linearRampToValueAtTime(0, now + duration);

//   osc.connect(gain);
//   gain.connect(masterGain);

//   osc.start(now);
//   osc.stop(now + duration);

//   osc.onended = () => {
//     activeNotes--;
//   };
// };

const audioCtx = new window.AudioContext();
let activeNotes = 0;
const MAX_NOTES = 100;

const GLOBAL_VOLUME = 0.3;

export function playNote(value: number, arrayLength: number): void {
  if (activeNotes >= MAX_NOTES) return;
  activeNotes++;

  const now = audioCtx.currentTime;

  const osc = audioCtx.createOscillator();
  const filter = audioCtx.createBiquadFilter();
  const gain = audioCtx.createGain();

  const freq = 120 + Math.pow(value / arrayLength, 1.2) * 1400;

  osc.type = "triangle";
  osc.frequency.value = freq;

  filter.type = "lowpass";
  filter.frequency.value = 1800 + (value / arrayLength) * 2500;
  filter.Q.value = 0.6;

  const duration = 0.045;

  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.05 * GLOBAL_VOLUME, now + 0.006);
  gain.gain.linearRampToValueAtTime(0, now + duration);

  const lfo = audioCtx.createOscillator();
  const lfoGain = audioCtx.createGain();
  lfo.frequency.value = 6;
  lfoGain.gain.value = 1.5;

  lfo.connect(lfoGain);
  lfoGain.connect(osc.frequency);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(audioCtx.destination);

  lfo.start(now);
  osc.start(now);
  osc.stop(now + duration);
  lfo.stop(now + duration);

  osc.onended = () => {
    activeNotes--;
  };
}

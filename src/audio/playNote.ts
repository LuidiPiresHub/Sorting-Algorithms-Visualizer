const audioCtx = new window.AudioContext();
let activeNotes = 0;
const MAX_NOTES = 100;

const GLOBAL_VOLUME = 0.3;

export function playNote(sound: boolean, value: number, arrayLength: number): void {
  if (!sound ||activeNotes >= MAX_NOTES) return;
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

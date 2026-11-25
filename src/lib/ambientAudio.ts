/**
 * Lightweight Web Audio API gentle ambient pad / chime soundscape.
 * Requires zero external MP3s and starts only on explicit user interaction.
 */

let ctx: AudioContext | null = null;
let intervalId: ReturnType<typeof setInterval> | null = null;
let masterGain: GainNode | null = null;

// Warm pentatonic frequencies (D major / B minor peaceful modal)
const NOTES = [293.66, 329.63, 369.99, 440.0, 493.88, 587.33];

function playSoftTone(freq: number) {
  if (!ctx || !masterGain) return;
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(freq, now);

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.08, now + 0.45);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.4);

  osc.connect(gain);
  gain.connect(masterGain);

  osc.start(now);
  osc.stop(now + 3.6);
}

export function startAmbientSound(): boolean {
  if (typeof window === "undefined") return false;
  const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  if (!AudioCtx) return false;

  if (!ctx) {
    ctx = new AudioCtx();
    masterGain = ctx.createGain();
    masterGain.gain.value = 0.5;
    masterGain.connect(ctx.destination);
  }
  if (ctx.state === "suspended") {
    void ctx.resume();
  }

  let idx = 0;
  playSoftTone(NOTES[0]);
  setTimeout(() => playSoftTone(NOTES[2]), 600);

  if (intervalId) clearInterval(intervalId);
  intervalId = setInterval(() => {
    idx = (idx + 1) % NOTES.length;
    playSoftTone(NOTES[idx]);
  }, 2200);

  return true;
}

export function stopAmbientSound() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
  if (ctx && ctx.state === "running") {
    void ctx.suspend();
  }
}

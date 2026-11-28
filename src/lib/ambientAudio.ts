/**
 * Background song player (/audio/nikah-song.mp3) in a continuous loop.
 * Starts on explicit user gesture (tapping BismillahIntro or Gate).
 */

let audioEl: HTMLAudioElement | null = null;
let isPlaying = false;

export function startAmbientSound(): boolean {
  if (typeof window === "undefined") return false;

  if (!audioEl) {
    audioEl = new Audio("/audio/nikah-song.mp3");
    audioEl.loop = true;
    audioEl.preload = "auto";
    audioEl.volume = 0.75;
  }

  if (isPlaying && !audioEl.paused) {
    return true;
  }

  const playPromise = audioEl.play();
  if (playPromise !== undefined) {
    playPromise
      .then(() => {
        isPlaying = true;
      })
      .catch(() => {
        isPlaying = false;
      });
  } else {
    isPlaying = true;
  }

  return true;
}

export function stopAmbientSound() {
  if (audioEl) {
    audioEl.pause();
    audioEl.currentTime = 0;
  }
  isPlaying = false;
}

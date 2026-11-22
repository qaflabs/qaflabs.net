// Tiny shared handle so the menu can pause smooth scrolling without importing Lenis itself.
interface Pausable {
  stop: () => void;
  start: () => void;
}

let instance: Pausable | null = null;

export function registerSmoothScroll(lenis: Pausable | null) {
  instance = lenis;
}

export function setScrollLocked(locked: boolean) {
  if (locked) instance?.stop();
  else instance?.start();
}

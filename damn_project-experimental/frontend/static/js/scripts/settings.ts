import { setLanguage } from '../utils/languages.js';
import { moveNoise } from '../visual/effects.js';
//@ts-ignore
import { ids, BIG_TEXT, DEFAULT_TEXT } from '../index.js';

export function settings(): void {
  // Graphics settings elements
  const onRadio = document.getElementById("graphics-on-radio") as HTMLInputElement;
  const offRadio = document.getElementById("graphics-off-radio") as HTMLInputElement;
  const noiseCheckbox = document.getElementById("graphics-noise-checkbox") as HTMLInputElement;

  // Background elements
  const gradientsContainer = document.querySelector('.gradients-container') as HTMLElement;
  const videoBackground = document.getElementById('video-background') as HTMLElement;
  const starField = document.getElementById('star-field') as HTMLElement;
  const bgNoise = document.querySelector('.background-noise') as HTMLElement;


/**
   * Smoothly hides the element with a fade-out effect.
   */
  const fadeOut = (element: HTMLElement) => {
    element.style.opacity = '1';
    element.style.transition = 'opacity 0.5s ease-out';
    element.style.opacity = '0';
    setTimeout(() => {
      element.style.display = 'none';
    }, 500);
  };

  /**
   * Smoothly shows the element with a fade-in effect.
   */
  const fadeIn = (element: HTMLElement) => {
    element.style.display = 'block';
    element.style.opacity = '0';
    element.style.transition = 'opacity 0.5s ease-in';
    setTimeout(() => {
      element.style.opacity = '1';
    }, 50);
  };

  // ---- Graphic quality radios ----
  onRadio.addEventListener("change", () => {
    if (onRadio.checked) {
      localStorage.setItem('graphics', 'on');
      fadeIn(gradientsContainer);
      fadeIn(videoBackground);
      fadeIn(starField);
    }
  });

  offRadio.addEventListener("change", () => {
    if (offRadio.checked) {
      localStorage.setItem('graphics', 'off');
      fadeOut(gradientsContainer);
      fadeOut(videoBackground);
      fadeOut(starField);
    }
  });

  // ---- Noise toggle ----
  noiseCheckbox.addEventListener("change", () => {
    if (noiseCheckbox.checked) {
      localStorage.setItem('noise', 'on');
      bgNoise.style.display = 'block';
      ids.moveNoiseInterval = window.setInterval(moveNoise, 100);
    } else {
      localStorage.setItem('noise', 'off');
      bgNoise.style.display = 'none';
      clearInterval(ids.moveNoiseInterval);
    }
  });

  // Apply stored graphics settings
  const graphicsSetting = localStorage.getItem('graphics');
  switch (graphicsSetting) {
    case 'on':
      onRadio.checked = true;
      fadeIn(gradientsContainer);
      fadeIn(videoBackground);
      fadeIn(starField);
      break;
    default:
      offRadio.checked = true;
      fadeOut(gradientsContainer);
      fadeOut(videoBackground);
      fadeOut(starField);
  }

  // Apply stored noise setting
  if (localStorage.getItem('noise') === 'on') {
    noiseCheckbox.checked = true;
    bgNoise.style.display = 'block';
  } else {
    bgNoise.style.display = 'none';
  }

  // ---- Language switcher ----
  const languageSwitcher = document.getElementById('languageSwitcher') as HTMLSelectElement;
  languageSwitcher.addEventListener('change', (event) => {
    const value = (event.target as HTMLSelectElement).value;
    setLanguage(value);
    localStorage.setItem('language', value);
  });
  languageSwitcher.value = localStorage.getItem('language') ?? 'en';

  // ---- Big text toggle ----
  const bigTextCheckbox = document.getElementById('big-text-checkbox') as HTMLInputElement;
  bigTextCheckbox.addEventListener('change', () => {
    if (bigTextCheckbox.checked) {
      document.documentElement.style.fontSize = BIG_TEXT;
      localStorage.setItem('bigText', 'on');
    } else {
      document.documentElement.style.fontSize = DEFAULT_TEXT;
      localStorage.setItem('bigText', 'off');
    }
  });
  if (localStorage.getItem('bigText') === 'on') {
    bigTextCheckbox.checked = true;
    document.documentElement.style.fontSize = BIG_TEXT;
  }
}

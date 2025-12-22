const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;

const EFFECTS = {
  none: {filter: '', min: 0, max: 100, step: 1, unit: '', start: 100, showSlider: false },
  chrome: { filter: 'grayscale', min: 0, max: 1, step: 0.1, unit: '', start: 1, showSlider: true },
  sepia: { filter: 'sepia', min: 0, max: 1, step: 0.1, unit: '', start: 1, showSlider: true },
  marvin: { filter: 'invert', min: 0, max: 100, step: 1, unit: '%', start: 100, showSlider: true },
  phobos: { filter: 'blur', min: 0, max: 3, step: 0.1, unit: 'px', start: 3, showSlider: true },
  heat: { filter: 'brightness', min: 1, max: 3, step: 0.1, unit: '', start: 3, showSlider: true }
};

const smallerButtonElement = document.querySelector('.scale__control--smaller');
const biggerButtonElement = document.querySelector('.scale__control--bigger');
const scaleInputElement = document.querySelector('.scale__control--value');
const previewImageElement = document.querySelector('.img-upload__preview img');

const effectsRadioElements = document.querySelectorAll('.effects__radio');
const effectLevelContainerElement = document.querySelector('.img-upload__effect-level');
const effectLevelSliderElement = document.querySelector('.effect-level__slider');
const effectLevelValueElement = document.querySelector('.effect-level__value');

let currentEffect = 'none';

scaleInputElement.value = '100%';

const applyScale = (value) => {
  const scale = value / 100;
  previewImageElement.style.transform = `scale(${scale})`;
};

const setScale = (newValue) => {
  scaleInputElement.value = `${newValue}%`;
  applyScale(newValue);
};

smallerButtonElement.addEventListener('click', () => {
  const currentValue = parseInt(scaleInputElement.value, 10);

  if (currentValue > SCALE_MIN) {
    setScale(currentValue - SCALE_STEP);
  }
});

biggerButtonElement.addEventListener('click', () => {
  const currentValue = parseInt(scaleInputElement.value, 10);

  if (currentValue < SCALE_MAX) {
    setScale(currentValue + SCALE_STEP);
  }
});

noUiSlider.create(effectLevelSliderElement, {
  start: EFFECTS.none.start,
  range: {
    min: EFFECTS.none.min,
    max: EFFECTS.none.max
  },
  step: EFFECTS.none.step,
  connect: 'lower'
});

effectLevelContainerElement.style.display = 'none';

const applyEffect = (effectName, value) => {
  const effect = EFFECTS[effectName];
  if (effect.filter) {
    previewImageElement.style.filter = `${effect.filter}(${value}${effect.unit})`;
  } else {
    previewImageElement.style.filter = '';
  }
  const numValue = Number(value);
  effectLevelValueElement.value = numValue % 1 === 0 ? numValue.toString() : numValue.toFixed(1);
};

effectsRadioElements.forEach((radio) => {
  radio.addEventListener('change', () => {
    currentEffect = radio.value;
    const effect = EFFECTS[currentEffect];

    effectLevelContainerElement.style.display = effect.showSlider ? 'block' : 'none';

    effectLevelSliderElement.noUiSlider.updateOptions({
      start: effect.start,
      range: { min: effect.min, max: effect.max },
      step: effect.step
    });

    applyEffect(currentEffect, effect.start);
  });
});

effectLevelSliderElement.noUiSlider.on('update', (values, handle) => {
  const value = values[handle];
  applyEffect(currentEffect, value);
});

export const resetDesign = () => {
  scaleInputElement.value = '100%';
  previewImageElement.style.transform = 'scale(1)';
  previewImageElement.style.filter = 'none';
  effectLevelContainerElement.style.display = 'none';
};

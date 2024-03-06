const Effect = {
  DEFAULT: 'none',
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat',
};

const effectSettings = {
  [Effect.DEFAULT]: {
    min: 0,
    max: 100,
    step: 1,
  },
  [Effect.CHROME]: {
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
    style: 'grayscale',
  },
  [Effect.SEPIA]: {
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
    style: 'sepia',
  },
  [Effect.MARVIN]: {
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
    style: 'invert',
  },
  [Effect.PHOBOS]: {
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
    style: 'blur',
  },
  [Effect.HEAT]: {
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
    style: 'brightness',
  }
};

const imgUploadElement = document.querySelector('.img-upload__overlay');
const imgPreview = imgUploadElement.querySelector('.img-upload__preview img');
const sliderElement = imgUploadElement.querySelector('.effect-level__slider');
const sliderContainer = imgUploadElement.querySelector('.img-upload__effect-level');
const effectLevel = imgUploadElement.querySelector('.effect-level__value');
const effectElements = imgUploadElement.querySelectorAll('.effects__radio');

let selectedEffect = Effect.DEFAULT;

//создание слайдера
noUiSlider.create(sliderElement, {
  range: {
    min: effectSettings[selectedEffect].min,
    max: effectSettings[selectedEffect].max,
  },
  start: effectSettings[selectedEffect].max,
  step: effectSettings[selectedEffect].step,
  connect: 'lower',
});

//добавление значений слайдера к картинке
const setImgFilter = (effect) => {
  if (effect === Effect.DEFAULT) {
    imgPreview.style.filter = null;
  } else {
    const filter = effectSettings[effect].style;
    const val = effectLevel.value;
    const unit = effectSettings[effect].unit;
    imgPreview.style.filter = `${filter}(${val}${unit})`;
  }
};

sliderElement.noUiSlider.on('update', () => {
  effectLevel.value = sliderElement.noUiSlider.get();
  setImgFilter(selectedEffect);
});

const setEffect = (evt) => {
  //добавляется к изображению класс с нужным эффектом
  imgPreview.classList.remove(`effects__preview--${selectedEffect}`);
  selectedEffect = evt.target.value;
  if (selectedEffect !== 'none') {
    imgPreview.classList.add(`effects__preview--${selectedEffect}`);
    sliderContainer.classList.remove('hidden');
  } else {
    sliderContainer.classList.add('hidden');
  }

  //изменение настройки слайдера
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: effectSettings[selectedEffect].min,
      max: effectSettings[selectedEffect].max,
    },
    start: effectSettings[selectedEffect].max,
    step: effectSettings[selectedEffect].step,
  });

};

const chooseEffect = () => {
  sliderContainer.classList.add('hidden');
  effectElements.forEach((element) => {
    element.addEventListener('change', setEffect);
  });
};

const resetEffect = () => {
  imgPreview.classList.remove(`effects__preview--${selectedEffect}`);
  selectedEffect = Effect.DEFAULT;
  setImgFilter(selectedEffect);
  effectElements[0].checked = true;
  sliderContainer.classList.add('hidden');
  effectElements.forEach((element) => {
    element.removeEventListener('change', setEffect);
  });
};

export {chooseEffect, resetEffect};

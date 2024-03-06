const SCALE_STEP = 25;
const DEFAULT_SCALE = 100;
const MIN_SCALE = 25;
const MAX_SCALE = 100;

const imgUploadElement = document.querySelector('.img-upload__overlay');
const smallerButton = imgUploadElement.querySelector('.scale__control--smaller');
const biggerButton = imgUploadElement.querySelector('.scale__control--bigger');
const imgPreview = imgUploadElement.querySelector('.img-upload__preview img');
const scaleInput = imgUploadElement.querySelector('.scale__control--value');

const changeScale = (value) => {
  imgPreview.style.transform = `scale(${value / 100})`;
  scaleInput.value = `${value}`;
};

const clickSmallerButton = () => {
  changeScale(Math.max(parseInt(scaleInput.value, 10) - SCALE_STEP, MIN_SCALE));
};

const clickBiggerButton = () => {
  changeScale(Math.min(parseInt(scaleInput.value, 10) + SCALE_STEP, MAX_SCALE));
};

const resetScale = () => {
  changeScale(DEFAULT_SCALE);
};

biggerButton.addEventListener('click', clickBiggerButton);
smallerButton.addEventListener('click', clickSmallerButton);

export {resetScale};

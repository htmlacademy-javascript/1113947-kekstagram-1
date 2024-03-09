import {resetScale} from './img-scale.js';
import {chooseEffect, resetEffect} from './img-effects.js';
import {sendData, notificationVisibleStatus} from './network.js';

const UploadFormRules = {
  HASHTAG_VALID_SYMBOLS: /^#[a-zа-яё0-9]{1,19}$/i,
  HASHTAG_MAX_COUNT: 5,
  DESCRIPTION_MAX_LENGTH: 140,
};
const errorText = {
  COUNT_ERROR: `Не более ${UploadFormRules.HASHTAG_MAX_COUNT} хэштегов`,
  UNIQUE_ERROR: 'Хэштег уже используется',
  SYMBOLS_ERROR: 'Хэштег должен начинаться с решетки и содержать от 1 до 19 букв или цифр',
  LENGTH_ERROR: 'Сообщение не может быть длиннее 140 символов',
};

const imgUploadForm = document.querySelector('.img-upload__form');
const uploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const uploadedFilePreview = imgUploadForm.querySelector('.img-upload__preview').querySelector('img');
const uploadedFile = imgUploadForm.querySelector('#upload-file');
const closeUploadFormButton = imgUploadForm.querySelector('#upload-cancel');
const hashtagInputField = imgUploadForm.querySelector('.text__hashtags');
const commentInputField = imgUploadForm.querySelector('.text__description');
const submitButton = imgUploadForm.querySelector('#upload-submit');

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__text',
  errorClass: 'form-input__invalid',
  successClass: 'form-input__valid',
  errorTextParent: 'img-upload__text',
  errorTextTag: 'span',
  errorTextClass: 'form__error',
});

//убрать всплытие события нажатия esc
const disableEscClick = (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
};

//валидация
const validateComment = function (text) {
  return (text.length <= UploadFormRules.DESCRIPTION_MAX_LENGTH);
};

const validateHashtag = function (value) {
  const hashtagArray = value.trim().split(' ').filter((word) => word.length >= 1);
  const symbolsTestResult = [];
  let i = 0;
  for (let z = 0; z < hashtagArray.length; z++) {
    symbolsTestResult[i] = UploadFormRules.HASHTAG_VALID_SYMBOLS.test(hashtagArray[z]);
    i++;
  }
  if (symbolsTestResult.includes(false)) {
    return false;
  } else {
    return true;
  }
};

const validateHashtagCount = function (value) {
  const hashtags = value.split('#');
  return (hashtags.length - 1 <= UploadFormRules.HASHTAG_MAX_COUNT);
};

const validateHashtagUnique = function (value) {
  const hashtags = value.toLowerCase().replaceAll(' ', '').split('#');
  hashtags.shift();
  for(let i = 0; i < hashtags.length; i++) {
    let z = i + 1;
    while (hashtags[i] !== hashtags[z] && hashtags[z]) {
      z++;
    }
    if (hashtags[i] === hashtags[z]) {
      return (false);
    }
  }

  return (true);
};

pristine.addValidator(
  commentInputField,
  validateComment,
  errorText.LENGTH_ERROR,
);
pristine.addValidator(
  hashtagInputField,
  validateHashtag,
  errorText.SYMBOLS_ERROR,
);
pristine.addValidator(
  hashtagInputField,
  validateHashtagCount,
  errorText.COUNT_ERROR,
);
pristine.addValidator(
  hashtagInputField,
  validateHashtagUnique,
  errorText.UNIQUE_ERROR,
);

const validateButton = function () {
  if (!validateComment(commentInputField.value) ||
      !validateHashtag(hashtagInputField.value) ||
      !validateHashtagCount(hashtagInputField.value) ||
      !validateHashtagUnique(hashtagInputField.value)) {
    submitButton.disabled = true;
  } else {
    submitButton.disabled = false;
  }
};

//отправка формы
const formSubmit = async (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    try {
      submitButton.disabled = true;
      const formData = new FormData(evt.target);
      await sendData(formData);
      closeUploadForm();
      submitButton.disabled = false;
    } catch {
      submitButton.disabled = false;
    }
  }
};

//создать урл загруженного фото
const createFile = function () {
  return (uploadedFile.files[0]);
};
const getUrl = function (file) {
  return (URL.createObjectURL(file));
};
const deleteUrl = function (file) {
  URL.revokeObjectURL(file);
};

//закрытие формы
const closeFormWithButton = function () {
  closeUploadForm();
};
const closeFormWithEscape = (evt) => {
  if (evt.key === 'Escape' && !notificationVisibleStatus()) {
    closeUploadForm();
  }
};
function closeUploadForm () {
  uploadOverlay.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');

  resetScale();
  resetEffect();
  uploadedFile.value = '';
  commentInputField.value = '';
  hashtagInputField.value = '';

  closeUploadFormButton.removeEventListener('click', closeFormWithButton);
  document.removeEventListener('keydown', closeFormWithEscape);
  hashtagInputField.removeEventListener('keydown', disableEscClick);
  commentInputField.removeEventListener('keydown', disableEscClick);
  hashtagInputField.removeEventListener('input', validateButton);
  commentInputField.removeEventListener('input', validateButton);
  imgUploadForm.addEventListener('submit', formSubmit);
  deleteUrl(createFile());
  //тутв
}

//открытие формы
const openForm = function () {
  uploadOverlay.classList.remove('hidden');
  document.querySelector('body').classList.remove('modal-open');

  imgUploadForm.addEventListener('submit', formSubmit);

  uploadedFilePreview.src = getUrl(createFile());
  chooseEffect();

  hashtagInputField.addEventListener('keydown', disableEscClick);
  commentInputField.addEventListener('keydown', disableEscClick);
  hashtagInputField.addEventListener('input', validateButton);
  commentInputField.addEventListener('input', validateButton);

  closeUploadFormButton.addEventListener('click', closeFormWithButton);
  document.addEventListener('keydown', closeFormWithEscape);
};

const openFormLoader = function () {
  uploadedFile.addEventListener('change', openForm);
};

export {openFormLoader};

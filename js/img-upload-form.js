const UPLOAD_FORM_RULES = {
  HASHTAG_VALID_SYMBOLS: /^#[a-zа-яё0-9]{1,19}$/i,
  VALID_SYMBOLS: /^[a-zа-яё0-9#]{1,1}$/i,
  HASHTAG_MAX_COUNT: 5,
  DESCRIPTION_MAX_LENGTH: 140,
};
const ERROR_TEXT = {
  COUNT_ERROR: `Не более ${UPLOAD_FORM_RULES.HASHTAG_MAX_COUNT} хэштегов`,
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
  return (text.length <= UPLOAD_FORM_RULES.DESCRIPTION_MAX_LENGTH);
};

const validateHashtag = function (value) {
  const hashtagArray = value.trim().split(' ').filter((word) => word.length >= 1);
  const symbolsTestResult = [];
  let i = 0;
  for (let z = 0; z < hashtagArray.length; z++) {
    symbolsTestResult[i] = UPLOAD_FORM_RULES.HASHTAG_VALID_SYMBOLS.test(hashtagArray[z]);
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
  return (hashtags.length - 1 <= UPLOAD_FORM_RULES.HASHTAG_MAX_COUNT);
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
  ERROR_TEXT.LENGTH_ERROR,
);
pristine.addValidator(
  hashtagInputField,
  validateHashtag,
  ERROR_TEXT.SYMBOLS_ERROR,
);
pristine.addValidator(
  hashtagInputField,
  validateHashtagCount,
  ERROR_TEXT.COUNT_ERROR,
);
pristine.addValidator(
  hashtagInputField,
  validateHashtagUnique,
  ERROR_TEXT.UNIQUE_ERROR,
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

//открытие формы
const openForm = function () {
  uploadOverlay.classList.remove('hidden');
  document.querySelector('body').classList.remove('modal-open');

  imgUploadForm.addEventListener('submit', (evt) => {
    if (!pristine.validate()) {
      evt.preventDefault();
    }
  });

  //содержимое формы
  const file = uploadedFile.files[0];
  uploadedFilePreview.src = URL.createObjectURL(file);

  hashtagInputField.addEventListener('keydown', disableEscClick);
  commentInputField.addEventListener('keydown', disableEscClick);

  hashtagInputField.addEventListener('keyup', validateButton);
  commentInputField.addEventListener('keyup', validateButton);

  //Закрытие окна загрузки фото
  const closeFormWithButton = function () {
    closeUploadForm();
  };
  const closeFormWithEscape = (evt) => {
    if (evt.key === 'Escape') {
      closeUploadForm();
    }
  };

  closeUploadFormButton.addEventListener('click', closeFormWithButton);
  document.addEventListener('keydown', closeFormWithEscape);

  function closeUploadForm () {
    uploadOverlay.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');

    closeUploadFormButton.removeEventListener('click', closeFormWithButton);
    document.removeEventListener('keydown', closeFormWithEscape);
    hashtagInputField.removeEventListener('keydown', disableEscClick);
    commentInputField.removeEventListener('keydown', disableEscClick);
    hashtagInputField.removeEventListener('keyup', validateButton);
    commentInputField.removeEventListener('keyup', validateButton);
    URL.revokeObjectURL(file);
    uploadedFile.value = '';
  }

  //тратата
};

const openFormLoader = function () {
  uploadedFile.addEventListener('change', openForm);
};

export {openFormLoader};

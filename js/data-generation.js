import {getRandomInteger, getRandomFromArray} from './utils.js';

const NAMES = [
  'Кекс',
  'Барон',
  'Рудольф',
  'Лиана',
  'Мурка',
  'Оливия',
];

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
  'Восхитительный пример того, как можно запечатлеть на фотографии для себя и близких памятные моменты жизни.',
];

const DESCRIPTIONS = [
  'Дни проходят, годы мчатся',
  'Вижу я себя в темнице',
  'Между стен сырых, холодных',
  'Чьи-то стоны и проклятья',
  'То мне грезятся потоки',
  'То хочу труда, мучений',
];

const PHOTO_ID_MIN = 1;
const PHOTO_ID_MAX = 25;
const AVATAR_ID_MIN = 1;
const AVATAR_ID_MAX = 6;
const LIKES_MIN = 15;
const LIKES_MAX = 200;
const COMMENT_MAX = 10;

//рандомизировать id
const getId = function (min, max) {
  let previousIds = [];

  return (function () {
    let currentId = getRandomInteger(min, max);
    if (previousIds.length >= (max - min + 1)) {
      previousIds = [];
    }

    while (previousIds.includes(currentId)) {
      currentId = getRandomInteger(min, max);
    }
    previousIds.push(currentId);

    return (currentId);
  });
};

const getPhotoId = getId(PHOTO_ID_MIN, PHOTO_ID_MAX);
const getUrlId = getId(PHOTO_ID_MIN, PHOTO_ID_MAX);

//генерация комментария
const generateComment = function (getCount) {
  const messages = [];
  messages[0] = getRandomFromArray(COMMENTS);
  messages[1] = getRandomFromArray(COMMENTS);
  while (messages[1] === messages[0]) {
    messages[1] = getRandomFromArray(COMMENTS);
  }
  const firstAvatarString = 'img/avatar-';
  const secondAvatarString = '.svg';
  return ({
    id: getCount(),
    avatar: firstAvatarString + getRandomInteger(AVATAR_ID_MIN, AVATAR_ID_MAX).toString() + secondAvatarString,
    messege: messages.join(' '),
    name: getRandomFromArray(NAMES),
  });
};

//создания массива с рандомным количеством сгенерированных комментариев
const createComments = function() {
  const commentCount = getRandomInteger(1, COMMENT_MAX);
  const commentsArray = [];
  const getCount = getId(1, commentCount);
  for(let i = 0; i < commentCount; i++) {
    commentsArray[i] = generateComment(getCount);
  }
  return commentsArray;
};

//генерация фото
const generatePhoto = function () {
  const firstUrl = 'photos/';
  const secondUrl = '.jpg';
  return {
    id: getPhotoId(),
    url: firstUrl + getUrlId() + secondUrl,
    description: getRandomFromArray(DESCRIPTIONS),
    likes: getRandomInteger(LIKES_MIN, LIKES_MAX),
    comments: createComments(),
  };
};

//создание массива фотографий
const createPhotos = function() {
  return Array.from({length: PHOTO_ID_MAX}, generatePhoto);
};

export {createPhotos};

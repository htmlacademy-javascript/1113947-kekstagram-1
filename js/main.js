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

//рандомит число
const getRandomInteger = function (min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return (Math.floor(result));
};

//вытаскивает рандомный элемент переданного массива
const getRandomFromArray = function (array) {
  return (array[getRandomInteger(0, array.length - 1)]);
};

//рандомизировать id
const getId = function (min, max) {
  const previousIds = [];

  return (function () {
    let currentId = getRandomInteger(min, max);
    if (previousIds.length >= (max - min + 1)) {
      return (null);
    }

    while (previousIds.includes(currentId)) {
      currentId = getRandomInteger(min, max);
    }
    previousIds.push(currentId);

    return (currentId);
  });
};

const getPhotoId = getId(PHOTO_ID_MIN, PHOTO_ID_MAX);
const getCommentId = getId(1, 1000);
const getUrlId = getId(PHOTO_ID_MIN, PHOTO_ID_MAX);

//генерация комментария
const generateComment = function () {
  const messageText = getRandomFromArray(COMMENTS);
  let messageText2 = getRandomFromArray(COMMENTS);
  while (messageText2 === messageText) {
    messageText2 = getRandomFromArray(COMMENTS);
  }
  return ({
    id: getCommentId(),
    avatar: 'img/avatar-' + getRandomInteger(AVATAR_ID_MIN, AVATAR_ID_MAX).toString() + '.svg',
    messege: messageText + ' ' + messageText2,
    name: getRandomFromArray(NAMES),
  });
};

//создания массива сгенерированных комментариев
const createComments = function() {
  return Array.from({length: getRandomInteger(1, COMMENT_MAX - 1)}, generateComment);
};

//генерация фото
const generatePhoto = function () {
  return {
    id: getPhotoId(),
    url: 'photos/' + getUrlId() + '.jpg',
    description: getRandomFromArray(DESCRIPTIONS),
    likes: getRandomInteger(LIKES_MIN, LIKES_MAX),
    comments: createComments(),
  };
};

//создание массива фотографий
const createPhotos = function () {
  return Array.from({length: PHOTO_ID_MAX}, generatePhoto);
};

const arr = createPhotos();

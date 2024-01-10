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

export {getRandomInteger, getRandomFromArray};

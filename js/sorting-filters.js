import {getRandomFromArray} from './utils.js';
import {createThumbnails} from './thumbnails.js';
import {debounce} from './utils.js';

const filtersBlock = document.querySelector('.img-filters');
const defaultSortButton = filtersBlock.querySelector('#filter-default');
const randomSortButton = filtersBlock.querySelector('#filter-random');
const discussedSortButton = filtersBlock.querySelector('#filter-discussed');

const eraseData = () => {
  document.querySelectorAll('.picture').forEach((item) => item.remove());
};

const inactivateButton = (filterName) => {
  filtersBlock.querySelectorAll('button').forEach((button) => {
    button.disabled = false;
    button.classList.remove('img-filters__button--active');
  });
  filtersBlock.querySelector(`#filter-${filterName}`).disabled = true;
  filtersBlock.querySelector(`#filter-${filterName}`).classList.add('img-filters__button--active');
};

const sortDefault = (data) => {
  eraseData();

  createThumbnails(data);
};
const sortRandom = (data) => {
  eraseData();
  const array = [];
  let randomElement;
  for(let i = 0; i < data.length && i < 10; i++) {
    randomElement = getRandomFromArray(data);
    while (array.includes(randomElement)) {
      randomElement = getRandomFromArray(data);
    }
    array[i] = randomElement;
  }

  createThumbnails(array);
};
const sortDiscussed = (data) => {
  eraseData();
  const dataCopy = data.slice();

  createThumbnails(dataCopy.sort((a, b) => b.comments.length - a.comments.length));
};

const filtersList = {
  'default': sortDefault,
  'random': sortRandom,
  'discussed': sortDiscussed,
};

const changeFilter = (data, filter) => {
  filtersList[filter](data);
};

const debounceReturn = debounce(changeFilter);

const openFiltersBlock = (data) => {
  if (!data) {
    return null;
  }
  filtersBlock.classList.remove('img-filters--inactive');
  inactivateButton('default');
  createThumbnails(data);
  discussedSortButton.addEventListener('click', () => {
    inactivateButton('discussed');
    debounceReturn(data, 'discussed');
  });

  defaultSortButton.addEventListener('click', () => {
    inactivateButton('default');
    debounceReturn(data, 'default');
  });

  randomSortButton.addEventListener('click', () => {
    inactivateButton('random');
    debounceReturn(data, 'random');
  });
};

export {openFiltersBlock};

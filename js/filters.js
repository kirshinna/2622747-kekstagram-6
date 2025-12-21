import { initPictures } from './thumbnails.js';
import { debounce } from './utils.js';

const filterButtonDefault = document.querySelector('#filter-default');
const filterButtonRandom = document.querySelector('#filter-random');
const filterButtonDiscussed = document.querySelector('#filter-discussed');

const setActive = (button) => {
  const activeElement = document.querySelector('.img-filters__button--active');
  activeElement.classList.remove('img-filters__button--active');

  button.classList.add('img-filters__button--active');
};

const debouncedRender = debounce((filter) => {
  initPictures(filter);
});

filterButtonDefault.addEventListener('click', () => {
  setActive(filterButtonDefault);
  debouncedRender('default');
});

filterButtonRandom.addEventListener('click', () => {
  setActive(filterButtonRandom);
  debouncedRender('random');
});

filterButtonDiscussed.addEventListener('click', () => {
  setActive(filterButtonDiscussed);
  debouncedRender('discussed');
});

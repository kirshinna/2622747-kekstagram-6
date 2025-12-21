import { openBigPicture } from './big-picture.js';
import { getData } from './api.js';
import { showAlert } from './utils.js';

const picturesContainerElement = document.querySelector('.pictures');
const pictureTemplateElement = document.querySelector('#picture').content;

const createPictureElement = (photo) => {
  const pictureElement = pictureTemplateElement.cloneNode(true);

  const imgElement = pictureElement.querySelector('.picture__img');
  imgElement.src = photo.url;
  imgElement.alt = photo.description;

  pictureElement.querySelector('.picture__likes').textContent = photo.likes;
  pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;

  imgElement.addEventListener('click', () => openBigPicture(photo));

  return pictureElement;
};

const renderPictures = (photos) => {
  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    fragment.append(createPictureElement(photo));
  });

  picturesContainerElement.append(fragment);
};

let photosList = [];

const getFilteredPhotos = (filter) => {
  switch (filter) {
    case 'random':
      return [...photosList]
        .sort(() => Math.random() - 0.5)
        .slice(0, 10);

    case 'discussed':
      return [...photosList]
        .sort((a, b) => b.comments.length - a.comments.length);

    default:
      return photosList;
  }
};

const clearPictures = () => {
  picturesContainerElement
    .querySelectorAll('.picture')
    .forEach((el) => el.remove());
};

const initPictures = (filter = 'default') => {
  clearPictures();
  renderPictures(getFilteredPhotos(filter));
};

const loadPictures = () =>
  getData()
    .then((loadedPhotos) => {
      photosList = loadedPhotos;
      initPictures();
    })
    .catch((error) => {
      showAlert(error.message);
    });

export { initPictures, loadPictures };


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

const initPictures = () => {
  getData()
    .then((photos) => {
      renderPictures(photos);
    })
    .catch(
      (error) => {
        showAlert(error.message);
      });
};

export {initPictures, renderPictures};

import { openModal } from './utils.js';

const bigPictureElement = document.querySelector('.big-picture');
const closeButtonElement = document.querySelector('.big-picture__cancel');
const commentsCountElement = bigPictureElement.querySelector('.social__comment-count');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
const commentsListElement = bigPictureElement.querySelector('.social__comments');

const COMMENTS_PER_PAGE = 5;
let currentComments = [];
let currentCommentsCount = 0;

const createComment = ({ avatar, name, message }) => {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  commentElement.innerHTML = `
        <img class="social__picture"
             src="${avatar}"
             alt="${name}"
             width="35" height="35">
        <p class="social__text">${message}</p>
    `;
  return commentElement;
};

const updateCommentsCounter = () => {
  const totalComments = currentComments.length;
  commentsCountElement.innerHTML = `${currentCommentsCount} из <span class="comments-count">${totalComments}</span> комментариев`;

  if (currentCommentsCount >= totalComments) {
    commentsLoaderElement.classList.add('hidden');
  } else {
    commentsLoaderElement.classList.remove('hidden');
  }
};

const renderComments = () => {
  const commentsPortion = currentComments.slice(currentCommentsCount, currentCommentsCount + COMMENTS_PER_PAGE);

  commentsPortion.forEach((comment) => {
    commentsListElement.append(createComment(comment));
  });

  currentCommentsCount += commentsPortion.length;

  updateCommentsCounter();
};

const onCommentsLoaderClick = () => {
  renderComments();
};

const resetComments = () => {
  currentComments = [];
  currentCommentsCount = 0;
  commentsListElement.innerHTML = '';
  commentsCountElement.classList.remove('hidden');
  commentsLoaderElement.classList.remove('hidden');

  commentsLoaderElement.removeEventListener('click', onCommentsLoaderClick);
};

const openBigPicture = (photo) => {
  resetComments();

  bigPictureElement.querySelector('.big-picture__img img').src = photo.url;
  bigPictureElement.querySelector('.big-picture__img img').alt = photo.description;
  bigPictureElement.querySelector('.likes-count').textContent = photo.likes;
  bigPictureElement.querySelector('.social__caption').textContent = photo.description;

  currentComments = photo.comments;

  const totalCommentsElement = bigPictureElement.querySelector('.comments-count');
  totalCommentsElement.textContent = currentComments.length;

  renderComments();

  commentsLoaderElement.addEventListener('click', onCommentsLoaderClick);

  const closeModal = openModal(bigPictureElement, () => {
    resetComments();
  });

  const onCloseButtonClick = () => {
    closeModal();
  };

  closeButtonElement.addEventListener('click', onCloseButtonClick);

  closeButtonElement._closeHandler = onCloseButtonClick;
};

export { openBigPicture };

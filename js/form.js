import { resetDesign } from './photo-editing.js';
import { sendData } from './api.js';
import { pristine } from './form-validation.js';
import { showMessage, openModal } from './utils.js';

const uploadInputElement = document.querySelector('#upload-file');
const overlayElement = document.querySelector('.img-upload__overlay');
const bodyElement = document.body;
const closeButtonElement = document.querySelector('.img-upload__cancel');
const hashtagsInputElement = document.querySelector('.text__hashtags');
const descriptionInputElement = document.querySelector('.text__description');
const formElement = document.querySelector('.img-upload__form');
const submitButtonElement = document.querySelector('.img-upload__submit');

let closeFormModal;

const resetForm = () => {
  formElement.reset();
  pristine.reset();
  resetDesign();
};

const onEscPress = (evt) => {
  if (evt.key === 'Escape') {
    if (
      document.activeElement === hashtagsInputElement ||
      document.activeElement === descriptionInputElement
    ) {
      return;
    }
    closeFormModal();
  }
};

const closeForm = () => {
  overlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscPress);
};

const openForm = () => {
  closeFormModal = openModal(overlayElement, closeForm);
  closeButtonElement.addEventListener('click', closeFormModal, { once: true });
};

uploadInputElement.addEventListener('change', () => {
  if (uploadInputElement.files.length) {
    openForm();
  }
});

document.addEventListener('keydown', onEscPress);

const showSuccessMessage = () => {
  showMessage({
    templateId: '#success',
    elementClass: '.success',
    buttonClass: '.success__button',
  });
};

const showErrorMessage = () => {
  overlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');

  showMessage({
    templateId: '#error',
    elementClass: '.error',
    buttonClass: '.error__button',
  });

  const errorElement = document.querySelector('.error');
  const errorInner = errorElement.querySelector('.error__inner');
  const errorButton = errorElement.querySelector('.error__button');

  const returnForm = () => {
    errorElement.remove();
    overlayElement.classList.remove('hidden');
    bodyElement.classList.add('modal-open');

    document.removeEventListener('keydown', onEscError);
    document.removeEventListener('click', onClickOutside);
  };

  function onEscError(evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      returnForm();
    }
  }

  function onClickOutside(evt) {
    if (evt.target === errorElement && !errorInner.contains(evt.target)) {
      returnForm();
    }
  }

  errorButton.addEventListener('click', returnForm);

  document.addEventListener('keydown', onEscError);
  document.addEventListener('click', onClickOutside);
};

const blockSubmit = () => {
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = 'Публикую';
};

const unblockSubmit = () => {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = 'Опубликовать';
};

formElement.addEventListener('submit', (evt) => {
  evt.preventDefault();

  if (!pristine.validate()) {
    return;
  }

  blockSubmit();

  sendData(new FormData(formElement))
    .then(() => {
      showSuccessMessage();
      resetForm();
      closeForm();
    })
    .catch(() => {
      showErrorMessage();
    })
    .finally(() => {
      unblockSubmit();
    });
});

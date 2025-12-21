import { resetDesign } from './photo-editing.js';
import { sendData } from './api.js';
import { pristine } from './form-validation.js';
import { showMessage, openModal } from './utils.js';

const uploadInputElement = document.querySelector('#upload-file');
const overlayElement = document.querySelector('.img-upload__overlay');
const closeButtonElement = document.querySelector('.img-upload__cancel');
const formElement = document.querySelector('.img-upload__form');
const submitButtonElement = document.querySelector('.img-upload__submit');

let closeFormModal;

const resetForm = () => {
  formElement.reset();
  pristine.reset();
  uploadInputElement.value = '';
  resetDesign();
};

const openForm = () => {
  closeFormModal = openModal(overlayElement, resetForm);
  closeButtonElement.addEventListener('click', closeFormModal, { once: true });
};

uploadInputElement.addEventListener('change', () => {
  if (uploadInputElement.files.length > 0) {
    openForm();
  }
});

const showSuccessMessage = () => showMessage({
  templateId: '#success',
  elementClass: '.success',
  buttonClass: '.success__button',
});

const showErrorMessage = () => showMessage({
  templateId: '#error',
  elementClass: '.error',
  buttonClass: '.error__button',
});

formElement.addEventListener('submit', (evt) => {
  evt.preventDefault();

  if (!pristine.validate()) {
    return;
  }

  submitButtonElement.disabled = true;

  sendData(new FormData(formElement))
    .then(() => {
      showSuccessMessage();
      closeFormModal();
    })
    .catch(() => {
      showErrorMessage();
    })
    .finally(() => {
      submitButtonElement.disabled = false;
    });
});

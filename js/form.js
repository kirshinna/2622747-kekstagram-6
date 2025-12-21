import { resetDesign } from './photo-editing.js';
import { sendData } from './api.js';
import { pristine } from './form-validation.js';

const uploadInputElement = document.querySelector('#upload-file');
const overlayElement = document.querySelector('.img-upload__overlay');
const bodyElement = document.body;
const closeButtonElement = document.querySelector('.img-upload__cancel');
const hashtagsInputElement = document.querySelector('.text__hashtags');
const descriptionInputElement = document.querySelector('.text__description');
const formElement = document.querySelector('.img-upload__form');
const submitButtonElement = document.querySelector('.img-upload__submit');

const openForm = () => {
  overlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onEscPress);
};

const resetForm = () => {
  formElement.reset();
  pristine.reset();
  uploadInputElement.value = '';
  resetDesign();
};

const closeForm = () => {
  overlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscPress);
  resetForm();
};

uploadInputElement.addEventListener('change', () => {
  if (uploadInputElement.files.length > 0) {
    openForm();
  }
});

closeButtonElement.addEventListener('click', closeForm);

function onEscPress(evt) {
  if (evt.key === 'Escape') {
    if (
      document.activeElement === hashtagsInputElement ||
      document.activeElement === descriptionInputElement
    ) {
      return;
    }
    closeForm();
  }
}

const showSuccessMessage = () => {
  const successElement = document.querySelector('#success').content.cloneNode(true).querySelector('.success');

  document.body.append(successElement);

  const onEsc = (evt) => {
    if (evt.key === 'Escape') {
      close();
    }
  };

  const close = () => {
    successElement.remove();
    document.removeEventListener('keydown', onEsc);
  };

  successElement.querySelector('.success__button').addEventListener('click', close);
  successElement.addEventListener('click', (evt) => {
    if (evt.target === successElement) {
      close();
    }
  });

  document.addEventListener('keydown', onEsc);
};


const showErrorMessage = () => {
  const errorElement = document.querySelector('#error').content.cloneNode(true).querySelector('.error');

  document.body.append(errorElement);

  const close = () => {
    errorElement.remove();
    document.removeEventListener('keydown', onEsc);
  };

  const onEsc = (evt) => {
    if (evt.key === 'Escape') {
      close();
    }
  };

  errorElement.querySelector('.error__button').addEventListener('click', close);
  errorElement.addEventListener('click', (evt) => {
    if (evt.target === errorElement) {
      close();
    }
  });

  document.addEventListener('keydown', onEsc);
};

formElement.addEventListener('submit', (evt) => {
  evt.preventDefault();

  if (!pristine.validate()) {
    return;
  }

  submitButtonElement.disabled = true;

  sendData(new FormData(formElement))
    .then(() => {
      showSuccessMessage();
      closeForm();
    })
    .catch(() => {
      showErrorMessage();
    })
    .finally(() => {
      submitButtonElement.disabled = false;
    });
});

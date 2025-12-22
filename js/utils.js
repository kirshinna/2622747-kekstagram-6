const DEBOUNCE_DELAY = 500;

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const isEscapeKey = (evt) => evt.key === 'Escape';

const showMessage = ({ templateId, elementClass, buttonClass }) => {
  const element = document
    .querySelector(templateId)
    .content
    .cloneNode(true)
    .querySelector(elementClass);

  document.body.append(element);

  // eslint-disable-next-line prefer-const
  let onEsc;

  const close = () => {
    element.remove();
    document.removeEventListener('keydown', onEsc);
  };

  onEsc = function(evt) {
    if (isEscapeKey(evt)) {
      close();
    }
  };

  element.querySelector(buttonClass).addEventListener('click', close);

  element.addEventListener('click', (evt) => {
    if (evt.target === element) {
      close();
    }
  });

  document.addEventListener('keydown', onEsc);
};

const openModal = (modalElement, onClose) => {
  modalElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  const onClickOutside = (evt) => {
    if (evt.target === modalElement) {
      closeModal();
    }
  };

  function closeModal() {
    modalElement.classList.add('hidden');
    document.body.classList.remove('modal-open');

    modalElement.removeEventListener('click', onClickOutside);

    if (onClose) {
      onClose();
    }
  }

  modalElement.addEventListener('click', onClickOutside);

  return closeModal;
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);
};

function debounce (callback, timeoutDelay = DEBOUNCE_DELAY) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export{getRandomInteger, getRandomArrayElement, showAlert, debounce, showMessage, openModal, isEscapeKey};



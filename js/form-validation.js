const hashtagsInputElement = document.querySelector('.text__hashtags');
const descriptionInputElement = document.querySelector('.text__description');
const formElement = document.querySelector('.img-upload__form');

const pristine = new Pristine(formElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error',
});

const validateComment = (value) => value.length <= 140;

pristine.addValidator(
  descriptionInputElement,
  validateComment,
  'Комментарий не должен быть длиннее 140 символов'
);

const validateHashtags = (value) => {
  if (!value.trim()) {
    return true;
  }

  const hashtags = value.trim().split(/\s+/);
  const regex = /^#[a-zA-Zа-яА-Я0-9]{1,19}$/;

  if (hashtags.length > 5) {
    return false;
  }

  const lower = hashtags.map((tag) => tag.toLowerCase());
  if (new Set(lower).size !== lower.length) {
    return false;
  }

  return hashtags.every((tag) => regex.test(tag));
};

const hashtagsErrorMessage = (value) => {
  const hashtags = value.trim().split(/\s+/);
  const regex = /^#[a-zA-Zа-яА-Я0-9]{1,19}$/;

  if (hashtags.length > 5) {
    return 'Не более 5 хэштегов';
  }

  const lower = hashtags.map((tag) => tag.toLowerCase());
  if (new Set(lower).size !== lower.length) {
    return 'Хэштеги повторяются';
  }

  if (!hashtags.every((tag) => regex.test(tag))) {
    return 'Неверный формат хэштега';
  }

  return 'Ошибка в хэштегах';
};

pristine.addValidator(
  hashtagsInputElement,
  validateHashtags,
  hashtagsErrorMessage
);

export{pristine};

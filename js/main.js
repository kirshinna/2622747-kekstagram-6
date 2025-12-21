import './thumbnails.js';
import './form.js';
import './photo-editing.js';
import { loadPictures} from './thumbnails.js';
import './filters.js';


const filterElement = document.querySelector('.img-filters');

loadPictures().then(() => {
  filterElement.classList.remove('img-filters--inactive');
});

import { fetchImages } from './js/pixabay-api.js';
import {
  renderGallery,
  showLoader,
  hideLoader,
  clearGallery,
} from './js/render-functions.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const gallery = document.querySelector('.gallery');
  const loader = document.querySelector('.loader');
  let lightbox;

  // Initialize SimpleLightbox
  function initLightbox() {
    if (lightbox) {
      lightbox.refresh();
    } else {
      lightbox = new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionDelay: 250,
      });
    }
  }

  // Handle form submission
  form.addEventListener('submit', async event => {
    event.preventDefault();
    const searchQuery = event.target.elements.searchQuery.value.trim();

    if (!searchQuery) {
      iziToast.error({
        title: 'Error',
        message: 'Please enter a search query',
        position: 'topRight',
      });
      return;
    }

    clearGallery(gallery);
    showLoader(loader);

    try {
      const data = await fetchImages(searchQuery);

      hideLoader(loader);

      if (data.hits.length === 0) {
        iziToast.info({
          title: 'Info',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
        return;
      }

      renderGallery(data.hits, gallery);
      initLightbox();
    } catch (error) {
      hideLoader(loader);
      iziToast.error({
        title: 'Error',
        message: `An error occurred: ${error.message}`,
        position: 'topRight',
      });
    }
  });
});

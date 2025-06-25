import { fetchImages } from './js/pixabay-api.js';
import {
  renderGallery,
  showLoader,
  hideLoader,
  clearGallery,
  showLoadMoreButton,
  hideLoadMoreButton,
  showEndMessage,
  hideEndMessage,
  smoothScroll
} from './js/render-functions.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const gallery = document.querySelector('.gallery');
  const loader = document.querySelector('.loader');
  const loadMoreBtn = document.querySelector('.load-more-button');
  const loadMoreLoader = document.querySelector('.load-more-loader');
  const endMessage = document.querySelector('.end-message');
  let lightbox;
  let currentPage = 1;
  let currentQuery = '';
  let totalHits = 0;


  hideLoadMoreButton(loadMoreBtn);
  hideEndMessage(endMessage);
  hideLoader(loadMoreLoader);


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


    currentPage = 1;
    currentQuery = searchQuery;
    clearGallery(gallery);
    hideLoadMoreButton(loadMoreBtn);
    hideEndMessage(endMessage);
    showLoader(loader);

    try {
      const data = await fetchImages(searchQuery, currentPage);
      totalHits = data.totalHits;

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


      if (data.hits.length < totalHits) {
        showLoadMoreButton(loadMoreBtn);
      } else {
        showEndMessage(endMessage);
      }

    } catch (error) {
      hideLoader(loader);
      iziToast.error({
        title: 'Error',
        message: `An error occurred: ${error.message}`,
        position: 'topRight',
      });
    }
  });


  loadMoreBtn.addEventListener('click', async () => {
    hideLoadMoreButton(loadMoreBtn);
    showLoader(loadMoreLoader);
    currentPage += 1;

    try {
      const data = await fetchImages(currentQuery, currentPage);
      hideLoader(loadMoreLoader);

      renderGallery(data.hits, gallery, true);
      initLightbox();
      smoothScroll();


      const loadedImagesCount = currentPage * 15;
      if (loadedImagesCount >= totalHits) {
        hideLoadMoreButton(loadMoreBtn);
        showEndMessage(endMessage);
      } else {
        showLoadMoreButton(loadMoreBtn);
      }
    } catch (error) {
      hideLoader(loadMoreLoader);
      iziToast.error({
        title: 'Error',
        message: `An error occurred: ${error.message}`,
        position: 'topRight',
      });
    }
  });
});

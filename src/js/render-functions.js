export function renderGallery(images, galleryElement, append = false) {
  const galleryMarkup = images
    .map(image => {
      const {
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      } = image;

      return `
      <li class="gallery-item">
        <a class="gallery-link" href="${largeImageURL}">
          <img class="gallery-image" src="${webformatURL}" alt="${tags}" loading="lazy" />
          <div class="info">
            <p class="info-item">
              <b>Likes</b>
              ${likes}
            </p>
            <p class="info-item">
              <b>Views</b>
              ${views}
            </p>
            <p class="info-item">
              <b>Comments</b>
              ${comments}
            </p>
            <p class="info-item">
              <b>Downloads</b>
              ${downloads}
            </p>
          </div>
        </a>
      </li>
    `;
    })
    .join('');

  if (append) {
    galleryElement.insertAdjacentHTML('beforeend', galleryMarkup);
  } else {
    galleryElement.innerHTML = galleryMarkup;
  }
}

export function showLoader(loaderElement) {
  loaderElement.style.display = 'flex';
}

export function hideLoader(loaderElement) {
  loaderElement.style.display = 'none';
}

export function clearGallery(galleryElement) {
  galleryElement.innerHTML = '';
}

export function showLoadMoreButton(buttonElement) {
  buttonElement.style.display = 'block';
}

export function hideLoadMoreButton(buttonElement) {
  buttonElement.style.display = 'none';
}

export function showEndMessage(messageElement) {
  messageElement.style.display = 'block';
}

export function hideEndMessage(messageElement) {
  messageElement.style.display = 'none';
}

export function smoothScroll() {
  const cardHeight = document.querySelector('.gallery-item')?.getBoundingClientRect().height || 0;

  if (cardHeight) {
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth'
    });
  }
}

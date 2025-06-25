export function renderGallery(images, galleryElement) {
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

  galleryElement.innerHTML = galleryMarkup;
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

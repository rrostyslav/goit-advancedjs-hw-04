import axios from 'axios';

export async function fetchImages(searchQuery) {
  const API_KEY = '16531795-762868b1c54a77ec034bf5734';
  const BASE_URL = 'https://pixabay.com/api/';

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      }
    });

    return response.data;
  } catch (error) {
    throw new Error(`HTTP error! Status: ${error.response?.status || 'Unknown'}`);
  }
}

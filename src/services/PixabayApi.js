import axios from 'axios';

// id - унікальний ідентифікатор
// webformatURL - посилання на маленьке зображення для списку карток
// largeImageURL - посилання на велике зображення для модального вікна

export async function fetchPhotos(query, page) {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '40339102-285f8e8d43f489e3ff509d674';
  try {
    const { data } = await axios.get(`${BASE_URL}`, {
      params: {
        q: query,
        page: page,
        per_page: 12,
        key: API_KEY,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
      },
    });
    return data;
  } catch (err) {
    console.log(err);
  }
}

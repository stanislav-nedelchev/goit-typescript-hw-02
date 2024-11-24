import axios from 'axios';

axios.defaults.baseURL = 'https://api.unsplash.com/search/photos';
axios.defaults.params = {
  client_id: 'jTYhCu1CVKwYUnTT5Semc_YK6oEoe1_WuenYa7SVNXs',
  orientation: 'landscape',
  per_page: 20,
};

export const findImages = async <T,>(
  query: string,
  page: number,
): Promise<T> => {
  const response = await axios.get(`/?query=${query}&page=${page}`);
  return response.data;
};

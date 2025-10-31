import axios from 'axios';

const BASE_URL = 'https://api.tvmaze.com';

// TVMaze API çağrıları
export const searchShows = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/search/shows?q=${encodeURIComponent(query)}`);
    return response.data.map(item => item.show);
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Diziler getirilirken bir hata oluştu');
  }
};

export const getShowDetails = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/shows/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Dizi detayları getirilirken bir hata oluştu');
  }
};

export const getShowEpisodes = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/shows/${id}/episodes`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Bölümler getirilirken bir hata oluştu');
  }
};


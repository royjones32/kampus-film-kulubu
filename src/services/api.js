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

// Popüler dizileri getir (farklı arama terimleriyle)
export const getPopularShows = async () => {
  try {
    // Birden fazla popüler dizi terimiyle arama yap
    const queries = ['game of thrones', 'breaking bad', 'stranger things', 'the office', 'better call saul', 'dark'];
    const allShows = [];
    const seenIds = new Set();

    for (const query of queries) {
      try {
        const response = await axios.get(`${BASE_URL}/search/shows?q=${encodeURIComponent(query)}`);
        response.data.forEach(item => {
          if (!seenIds.has(item.show.id)) {
            seenIds.add(item.show.id);
            allShows.push(item.show);
          }
        });
      } catch (err) {
        console.error(`Error fetching shows for ${query}:`, err);
      }
    }

    // Karıştır (randomize)
    return allShows.sort(() => Math.random() - 0.5);
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Popüler diziler getirilirken bir hata oluştu');
  }
};


// Dizileri filtreleme fonksiyonu
export const filterShows = (shows, filters) => {
  let filtered = [...shows];

  // Tür filtresi
  if (filters.genre) {
    filtered = filtered.filter(show => {
      if (!show.genres || show.genres.length === 0) return false;
      return show.genres.some(genre => 
        genre.toLowerCase().includes(filters.genre.toLowerCase())
      );
    });
  }

  // Dil filtresi
  if (filters.language) {
    filtered = filtered.filter(show => {
      return show.language && 
             show.language.toLowerCase().includes(filters.language.toLowerCase());
    });
  }

  // Min puan filtresi
  if (filters.minRating) {
    const minRating = parseFloat(filters.minRating);
    filtered = filtered.filter(show => {
      const rating = show.rating?.average;
      return rating && rating >= minRating;
    });
  }

  return filtered;
};

// Tüm unique türleri çıkar
export const getAllGenres = (shows) => {
  const genres = new Set();
  shows.forEach(show => {
    if (show.genres && Array.isArray(show.genres)) {
      show.genres.forEach(genre => genres.add(genre));
    }
  });
  return Array.from(genres).sort();
};

// Tüm unique dilleri çıkar
export const getAllLanguages = (shows) => {
  const languages = new Set();
  shows.forEach(show => {
    if (show.language) {
      languages.add(show.language);
    }
  });
  return Array.from(languages).sort();
};



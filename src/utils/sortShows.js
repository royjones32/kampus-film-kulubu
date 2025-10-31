// Dizileri sıralama fonksiyonu
export const sortShows = (shows, sortBy) => {
  const sorted = [...shows];

  switch (sortBy) {
    case 'name':
      return sorted.sort((a, b) => {
        const nameA = a.name?.toLowerCase() || '';
        const nameB = b.name?.toLowerCase() || '';
        return nameA.localeCompare(nameB, 'tr');
      });

    case 'rating':
      return sorted.sort((a, b) => {
        const ratingA = a.rating?.average || 0;
        const ratingB = b.rating?.average || 0;
        return ratingB - ratingA; // Yüksek puandan düşüğe
      });

    case 'premiered':
      return sorted.sort((a, b) => {
        const dateA = a.premiered ? new Date(a.premiered) : new Date(0);
        const dateB = b.premiered ? new Date(b.premiered) : new Date(0);
        return dateB - dateA; // Yeni tarihten eskiye
      });

    default:
      return sorted;
  }
};



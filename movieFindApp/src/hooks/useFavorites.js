import { useEffect, useState } from 'react';
import { FAVORITES_KEY } from '../utils/constants';

const readFavorites = () => {
  try {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY)) ?? [];
  } catch {
    return [];
  }
};

export const useFavorites = () => {
  const [favorites, setFavorites] = useState(readFavorites);

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const isFavorite = (movieId) =>
    favorites.some((movie) => String(movie.id) === String(movieId));

  const addFavorite = (movie) => {
    setFavorites((currentFavorites) => {
      const alreadySaved = currentFavorites.some(
        (item) => String(item.id) === String(movie.id),
      );

      if (alreadySaved) return currentFavorites;

      return [
        ...currentFavorites,
        {
          id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
          vote_average: movie.vote_average,
          release_date: movie.release_date,
          genre_ids: movie.genre_ids ?? movie.genres?.map((genre) => genre.id) ?? [],
        },
      ];
    });
  };

  const removeFavorite = (movieId) => {
    setFavorites((currentFavorites) =>
      currentFavorites.filter((movie) => String(movie.id) !== String(movieId)),
    );
  };

  const toggleFavorite = (movie) => {
    if (isFavorite(movie.id)) {
      removeFavorite(movie.id);
      return;
    }

    addFavorite(movie);
  };

  return {
    favorites,
    isFavorite,
    toggleFavorite,
    removeFavorite,
  };
};

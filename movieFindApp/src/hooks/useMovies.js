import { useCallback, useEffect, useMemo, useState } from 'react';
import { getRecommendedMovies, getPopularMovies, searchMovies } from '../api/tmdb';

export const useMovies = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const hasSearchQuery = query.trim().length > 0;
  const hasInterestFilters =
    selectedGenres.length > 0 || Boolean(selectedYear) || Boolean(selectedCountry);

  const applyInterestFilters = useCallback(
    (movieList) =>
      movieList
        .filter((movie) => {
          const matchesGenres = selectedGenres.every((genreId) =>
            movie.genre_ids?.includes(Number(genreId)),
          );
          const matchesYear =
            !selectedYear || movie.release_date?.startsWith(String(selectedYear));

          return matchesGenres && matchesYear;
        })
        .sort((a, b) => b.vote_average - a.vote_average),
    [selectedGenres, selectedYear],
  );

  const toggleGenre = useCallback((genreId) => {
    setSelectedGenres((currentGenres) =>
      currentGenres.includes(genreId)
        ? currentGenres.filter((id) => id !== genreId)
        : [...currentGenres, genreId],
    );
  }, []);

  const clearFilters = useCallback(() => {
    setSelectedGenres([]);
    setSelectedYear('');
    setSelectedCountry('');
  }, []);

  const loadMovies = useCallback(
    async ({ nextPage = 1, append = false } = {}) => {
      setLoading(true);
      setError('');

      try {
        let nextMovies;

        if (hasSearchQuery) {
          const searchedMovies = await searchMovies(query);
          nextMovies = hasInterestFilters
            ? applyInterestFilters(searchedMovies)
            : searchedMovies.sort((a, b) => b.vote_average - a.vote_average);
        } else if (hasInterestFilters) {
          nextMovies = await getRecommendedMovies({
            genreIds: selectedGenres,
            year: selectedYear,
            country: selectedCountry,
          });
        } else {
          nextMovies = await getPopularMovies(nextPage);
        }

        setMovies((currentMovies) =>
          append ? [...currentMovies, ...nextMovies] : nextMovies,
        );
        setPage(nextPage);
      } catch {
        setError('영화 정보를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.');
      } finally {
        setLoading(false);
      }
    },
    [
      applyInterestFilters,
      hasInterestFilters,
      hasSearchQuery,
      query,
      selectedCountry,
      selectedGenres,
      selectedYear,
    ],
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadMovies();
  }, [loadMovies]);

  const loadMore = useCallback(() => {
    if (loading || hasSearchQuery || hasInterestFilters) return;
    loadMovies({ nextPage: page + 1, append: true });
  }, [hasInterestFilters, hasSearchQuery, loadMovies, loading, page]);

  const filteredTitle = useMemo(() => {
    if (hasSearchQuery && hasInterestFilters) {
      return `"${query}" 검색 결과 중 추천 영화`;
    }
    if (hasSearchQuery) return `"${query}" 검색 결과`;
    if (hasInterestFilters) return '나에게 맞는 추천 영화';
    return '평점 높은 추천 영화';
  }, [hasInterestFilters, hasSearchQuery, query]);

  return {
    movies,
    query,
    setQuery,
    selectedGenres,
    selectedYear,
    selectedCountry,
    setSelectedYear,
    setSelectedCountry,
    toggleGenre,
    clearFilters,
    loading,
    error,
    loadMore,
    filteredTitle,
    canLoadMore: !hasSearchQuery && !hasInterestFilters,
  };
};

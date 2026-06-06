import axios from 'axios';
import { sampleMovies } from '../utils/sampleMovies';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const LANGUAGE = 'ko-KR';

const tmdbClient = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: LANGUAGE,
  },
});

const useSampleData = !API_KEY;

const withFallback = async (request, fallback) => {
  if (useSampleData) return fallback();

  try {
    return await request();
  } catch (error) {
    console.error('TMDB API request failed:', error);
    return fallback();
  }
};

const findSampleMovie = (id) =>
  sampleMovies.find((movie) => String(movie.id) === String(id));

export const getPopularMovies = async (page = 1) =>
  withFallback(
    async () => {
      const { data } = await tmdbClient.get('/discover/movie', {
        params: {
          page,
          sort_by: 'vote_average.desc',
          'vote_count.gte': 300,
          include_adult: false,
        },
      });
      return data.results;
    },
    () => [...sampleMovies].sort((a, b) => b.vote_average - a.vote_average),
  );

export const searchMovies = async (query) =>
  withFallback(
    async () => {
      const { data } = await tmdbClient.get('/search/movie', {
        params: { query, include_adult: false },
      });
      return data.results;
    },
    () => {
      const normalizedQuery = query.trim().toLowerCase();
      return sampleMovies.filter((movie) =>
        movie.title.toLowerCase().includes(normalizedQuery),
      );
    },
  );

export const getMoviesByGenre = async (genreId) =>
  withFallback(
    async () => {
      const { data } = await tmdbClient.get('/discover/movie', {
        params: {
          with_genres: genreId,
          sort_by: 'popularity.desc',
        },
      });
      return data.results;
    },
    () => sampleMovies.filter((movie) => movie.genre_ids.includes(Number(genreId))),
  );

export const getRecommendedMovies = async ({
  genreIds = [],
  year = '',
  country = '',
}) =>
  withFallback(
    async () => {
      const { data } = await tmdbClient.get('/discover/movie', {
        params: {
          with_genres: genreIds.join(',') || undefined,
          primary_release_year: year || undefined,
          with_origin_country: country || undefined,
          sort_by: 'vote_average.desc',
          'vote_count.gte': 100,
        },
      });
      return data.results;
    },
    () =>
      sampleMovies
        .filter((movie) =>
          genreIds.every((genreId) => movie.genre_ids.includes(Number(genreId))),
        )
        .filter((movie) => !year || movie.release_date?.startsWith(String(year)))
        .sort((a, b) => b.vote_average - a.vote_average),
  );

export const getMovieDetail = async (movieId) =>
  withFallback(
    async () => {
      const [detailResponse, videoResponse] = await Promise.all([
        tmdbClient.get(`/movie/${movieId}`),
        tmdbClient.get(`/movie/${movieId}/videos`, {
          params: { language: 'en-US' },
        }),
      ]);

      const trailer = videoResponse.data.results.find(
        (video) => video.site === 'YouTube' && video.type === 'Trailer',
      );

      return {
        ...detailResponse.data,
        trailerKey: trailer?.key,
      };
    },
    () => findSampleMovie(movieId) ?? sampleMovies[0],
  );

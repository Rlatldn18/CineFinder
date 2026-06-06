import MovieCard from '../MovieCard/MovieCard';

const MovieList = ({ movies, favorites, onToggleFavorite, emptyMessage }) => {
  if (!movies.length) {
    return <p className="empty-message">{emptyMessage}</p>;
  }

  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          isFavorite={favorites.some((item) => String(item.id) === String(movie.id))}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
};

export default MovieList;

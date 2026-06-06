import MovieCard from '../../components/MovieCard/MovieCard';
import { useFavorites } from '../../hooks/useFavorites';

const Favorites = () => {
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <section className="content-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">My List</p>
          <h1>즐겨찾기 영화</h1>
        </div>
      </div>

      {favorites.length ? (
        <div className="movie-grid">
          {favorites.map((movie) => (
            <MovieCard
              compact
              key={movie.id}
              movie={movie}
              isFavorite
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      ) : (
        <p className="empty-message">
          아직 저장한 영화가 없습니다. 마음에 드는 영화를 추가해 보세요.
        </p>
      )}
    </section>
  );
};

export default Favorites;

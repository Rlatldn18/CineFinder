import { Link } from 'react-router-dom';
import { FiHeart, FiStar, FiTrash2 } from 'react-icons/fi';
import { TMDB_IMAGE_BASE_URL } from '../../utils/constants';

const MovieCard = ({ movie, isFavorite, onToggleFavorite, compact = false }) => {
  const imageUrl = movie.poster_path
    ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}`
    : 'https://placehold.co/500x750/151923/f8fafc?text=No+Poster';

  const releaseYear = movie.release_date?.slice(0, 4) || '개봉일 미정';

  return (
    <article className="movie-card">
      <Link to={`/movies/${movie.id}`} className="poster-link">
        <img src={imageUrl} alt={`${movie.title} 포스터`} loading="lazy" />
      </Link>

      <div className="movie-card-body">
        <div>
          <h3>{movie.title}</h3>
          <p>{releaseYear}</p>
        </div>

        <div className="card-meta">
          <span>
            <FiStar aria-hidden="true" />
            {Number(movie.vote_average ?? 0).toFixed(1)}
          </span>
          <button
            className={isFavorite ? 'favorite-button saved' : 'favorite-button'}
            type="button"
            onClick={() => onToggleFavorite(movie)}
            aria-label={isFavorite ? '즐겨찾기 삭제' : '즐겨찾기 추가'}
          >
            {compact ? <FiTrash2 /> : <FiHeart />}
          </button>
        </div>
      </div>
    </article>
  );
};

export default MovieCard;

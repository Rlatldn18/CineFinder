import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FiCalendar, FiClock, FiHeart, FiStar } from 'react-icons/fi';
import { getMovieDetail } from '../../api/tmdb';
import Loading from '../../components/Loading/Loading';
import { useFavorites } from '../../hooks/useFavorites';
import { TMDB_BACKDROP_BASE_URL, TMDB_IMAGE_BASE_URL } from '../../utils/constants';

const MovieDetail = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    const loadDetail = async () => {
      setLoading(true);
      const detail = await getMovieDetail(movieId);
      setMovie(detail);
      setLoading(false);
    };

    loadDetail();
  }, [movieId]);

  if (loading) return <Loading />;
  if (!movie) return <p className="empty-message">영화 정보를 찾을 수 없습니다.</p>;

  const backdropUrl = movie.backdrop_path
    ? `${TMDB_BACKDROP_BASE_URL}${movie.backdrop_path}`
    : '';
  const posterUrl = movie.poster_path
    ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}`
    : 'https://placehold.co/500x750/151923/f8fafc?text=No+Poster';
  const saved = isFavorite(movie.id);

  return (
    <section
      className="detail-page"
      style={backdropUrl ? { '--backdrop': `url(${backdropUrl})` } : undefined}
    >
      <div className="detail-overlay">
        <img className="detail-poster" src={posterUrl} alt={`${movie.title} 포스터`} />

        <div className="detail-info">
          <p className="eyebrow">Movie Detail</p>
          <h1>{movie.title}</h1>
          <div className="detail-meta">
            <span>
              <FiStar />
              {Number(movie.vote_average ?? 0).toFixed(1)}
            </span>
            <span>
              <FiCalendar />
              {movie.release_date || '개봉일 미정'}
            </span>
            {movie.runtime && (
              <span>
                <FiClock />
                {movie.runtime}분
              </span>
            )}
          </div>

          <div className="genre-tags">
            {(movie.genres ?? []).map((genre) => (
              <span key={genre.id}>{genre.name}</span>
            ))}
          </div>

          <p className="overview">
            {movie.overview || '등록된 줄거리가 없습니다.'}
          </p>

          <div className="detail-actions">
            <button
              className={saved ? 'primary-action saved' : 'primary-action'}
              type="button"
              onClick={() => toggleFavorite(movie)}
            >
              <FiHeart />
              {saved ? '즐겨찾기 삭제' : '즐겨찾기 추가'}
            </button>
            {movie.trailerKey && (
              <a
                className="secondary-action"
                href={`https://www.youtube.com/watch?v=${movie.trailerKey}`}
                target="_blank"
                rel="noreferrer"
              >
                트레일러 보기
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MovieDetail;

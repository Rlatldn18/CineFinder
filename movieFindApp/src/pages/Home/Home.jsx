import { useEffect } from 'react';
import GenreFilter from '../../components/GenreFilter/GenreFilter';
import Loading from '../../components/Loading/Loading';
import MovieList from '../../components/MovieList/MovieList';
import SearchBar from '../../components/SearchBar/SearchBar';
import { useFavorites } from '../../hooks/useFavorites';
import { useMovies } from '../../hooks/useMovies';

const Home = () => {
  const {
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
    canLoadMore,
  } = useMovies();
  const { favorites, toggleFavorite } = useFavorites();

  useEffect(() => {
    const handleScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 500;

      if (nearBottom && canLoadMore) {
        loadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [canLoadMore, loadMore]);

  return (
    <>
      <section className="hero-section">
        <div className="hero-copy">
          <h1>영화 검색부터 즐겨찾기까지 한 번에 탐색하세요.</h1>
        </div>
        <SearchBar value={query} onChange={setQuery} />
      </section>

      <section className="content-section" id="interests">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Explore</p>
            <h2>{filteredTitle}</h2>
          </div>
          <GenreFilter
            selectedGenres={selectedGenres}
            selectedYear={selectedYear}
            selectedCountry={selectedCountry}
            onToggleGenre={toggleGenre}
            onClearFilters={clearFilters}
            onSelectYear={setSelectedYear}
            onSelectCountry={setSelectedCountry}
          />
        </div>

        {error && <p className="error-message">{error}</p>}
        {loading && !movies.length ? (
          <Loading />
        ) : (
          <MovieList
            movies={movies}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            emptyMessage="검색 결과가 없습니다. 다른 키워드나 조건을 선택해 보세요."
          />
        )}
        {loading && movies.length > 0 && <Loading />}
      </section>
    </>
  );
};

export default Home;

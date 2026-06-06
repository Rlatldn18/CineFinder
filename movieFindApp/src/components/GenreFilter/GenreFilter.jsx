import { useState } from 'react';
import { FiChevronDown, FiSliders } from 'react-icons/fi';
import { COUNTRIES, GENRES } from '../../utils/constants';

const YEARS = Array.from({ length: 37 }, (_, index) => 2026 - index);

const GenreFilter = ({
  selectedGenres,
  selectedYear,
  selectedCountry,
  onToggleGenre,
  onClearFilters,
  onSelectYear,
  onSelectCountry,
}) => {
  const [open, setOpen] = useState(false);
  const selectedCount =
    selectedGenres.length + (selectedYear ? 1 : 0) + (selectedCountry ? 1 : 0);

  return (
    <div className="interest-panel">
      <button
        className="interest-toggle"
        type="button"
        onClick={() => setOpen((currentOpen) => !currentOpen)}
        aria-expanded={open}
      >
        <FiSliders aria-hidden="true" />
        내 관심사 찾기
        {selectedCount > 0 && <span>{selectedCount}</span>}
        <FiChevronDown className={open ? 'open' : ''} aria-hidden="true" />
      </button>

      {open && (
        <div className="interest-menu">
          <div className="filter-row">
            <div>
              <p className="filter-label">장르</p>
              <div className="genre-filter" aria-label="장르 필터">
                {GENRES.map((genre) => {
                  const selected = selectedGenres.includes(genre.id);

                  return (
                    <button
                      className={selected ? 'active' : ''}
                      key={genre.id}
                      type="button"
                      onClick={() => onToggleGenre(genre.id)}
                    >
                      {genre.name}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="select-group">
              <div>
                <p className="filter-label">개봉 연도</p>
                <select
                  className="year-select"
                  value={selectedYear}
                  onChange={(event) => onSelectYear(event.target.value)}
                  aria-label="개봉 연도"
                >
                  <option value="">전체 연도</option>
                  {YEARS.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <p className="filter-label">국가</p>
                <select
                  className="year-select"
                  value={selectedCountry}
                  onChange={(event) => onSelectCountry(event.target.value)}
                  aria-label="국가"
                >
                  {COUNTRIES.map((country) => (
                    <option key={country.code || 'all'} value={country.code}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="interest-actions">
            <button type="button" onClick={onClearFilters}>
              초기화
            </button>
            <button type="button" onClick={() => setOpen(false)}>
              적용
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenreFilter;

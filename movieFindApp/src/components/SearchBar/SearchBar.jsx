import { FiSearch, FiX } from 'react-icons/fi';

const SearchBar = ({ value, onChange }) => (
  <div className="search-bar">
    <FiSearch aria-hidden="true" />
    <input
      type="search"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder="영화 제목을 검색하세요. 예: Avengers"
      aria-label="영화 검색"
    />
    {value && (
      <button type="button" onClick={() => onChange('')} aria-label="검색어 지우기">
        <FiX aria-hidden="true" />
      </button>
    )}
  </div>
);

export default SearchBar;

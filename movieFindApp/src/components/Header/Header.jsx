import { NavLink } from 'react-router-dom';
import { FiHeart, FiMoon, FiSliders, FiSun } from 'react-icons/fi';
import { useTheme } from '../../hooks/useTheme';

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  const moveToRecommendations = () => {
    document.getElementById('interests')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="site-header">
      <NavLink className="brand" to="/">
        <span className="brand-mark">C</span>
        <span>CineFinder</span>
      </NavLink>

      <nav className="nav-links" aria-label="주요 메뉴">
        <NavLink to="/">Home</NavLink>
        <button type="button" onClick={moveToRecommendations}>
          <FiSliders aria-hidden="true" />
          추천 영화
        </button>
        <NavLink to="/favorites">
          <FiHeart aria-hidden="true" />
          Favorites
        </NavLink>
      </nav>

      <button className="theme-toggle" type="button" onClick={toggleTheme}>
        {theme === 'dark' ? <FiSun /> : <FiMoon />}
        {theme === 'dark' ? 'Light' : 'Dark'}
      </button>
    </header>
  );
};

export default Header;

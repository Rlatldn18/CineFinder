import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from '../components/Header/Header';
import Favorites from '../pages/Favorites/Favorites';
import Home from '../pages/Home/Home';
import MovieDetail from '../pages/MovieDetail/MovieDetail';

const Router = () => (
  <BrowserRouter>
    <Header />
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies/:movieId" element={<MovieDetail />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </main>
  </BrowserRouter>
);

export default Router;

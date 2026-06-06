import ThemeProvider from './context/ThemeProvider';
import Router from './router/Router';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
}

export default App;

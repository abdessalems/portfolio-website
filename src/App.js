import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Boxing from './pages/Boxing';
import Layout from './components/Layout';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    Aos.init({
      once: true,
      disable: () =>
        window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    });
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="boxing" element={<Boxing />} />
      </Route>
    </Routes>
  );
}

export default App;

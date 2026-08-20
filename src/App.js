import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Boxing from './pages/Boxing';
import NotFound from './pages/NotFound';
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

    /*
     * AOS measures every element's trigger point once, at init. The page grows
     * afterwards — lazy images load, the project carousel builds — so anything
     * far down the page keeps an offset calculated against a much shorter
     * document and its trigger can land past the end of it. It then never
     * animates in, and because `[data-aos^=fade]` sets `opacity: 0`, the
     * section renders but shows nothing. Languages was invisible for exactly
     * this reason.
     *
     * Re-measuring after load, and again on the next frames, costs nothing and
     * removes the whole class of problem.
     */
    const remeasure = () => Aos.refreshHard();

    window.addEventListener('load', remeasure);
    const settle = window.setTimeout(remeasure, 600);

    return () => {
      window.removeEventListener('load', remeasure);
      window.clearTimeout(settle);
    };
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="boxing" element={<Boxing />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;

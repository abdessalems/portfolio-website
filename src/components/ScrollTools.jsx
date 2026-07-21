import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';

/**
 * Global scroll helpers used on every page:
 *   • a thin progress bar showing how far down the page you are
 *   • a back-to-top button that appears once you scroll down
 */
export default function ScrollTools() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const height =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(height > 0 ? (scrollTop / height) * 100 : 0);
      setVisible(scrollTop > 500);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <>
      <div className="scroll-progress" style={{ width: `${progress}%` }} />
      <button
        type="button"
        className={`back-to-top ${visible ? 'show' : ''}`}
        onClick={toTop}
        aria-label="Back to top"
      >
        <Icon icon="bi:arrow-up" />
      </button>
    </>
  );
}

import React, { useState, useEffect, useCallback } from 'react';
import { Icon } from '@iconify/react';
import Aos from 'aos';
import SectionHeading from './SectionHeading';

const FALLBACK_IMG = '/images/about-banner.png';
const INITIAL_COUNT = 15;

export default function BoxingGallery({ data }) {
  const { sectionHeading, photos } = data;
  const [index, setIndex] = useState(null); // index into full photos array, or null
  const [showAll, setShowAll] = useState(false);

  const isOpen = index !== null;
  const visible = showAll ? photos : photos?.slice(0, INITIAL_COUNT);

  const close = useCallback(() => setIndex(null), []);
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + photos.length) % photos.length),
    [photos]
  );
  const next = useCallback(
    () => setIndex((i) => (i + 1) % photos.length),
    [photos]
  );

  // Keyboard controls + body scroll lock while the lightbox is open
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, close, prev, next]);

  // Re-run AOS when more photos are revealed
  useEffect(() => {
    Aos.refresh();
  }, [showAll]);

  return (
    <section className="section" id="boxing-gallery">
      <div className="container">
        <SectionHeading
          miniTitle={sectionHeading.miniTitle}
          title={sectionHeading.title}
        />
        <div className="row gy-4">
          {visible?.map((photo, i) => (
            <div className="col-6 col-sm-6 col-lg-4" key={photo.src}>
              <div
                className="gallery-item"
                role="button"
                tabIndex={0}
                aria-label={photo.caption || `Open photo ${i + 1}`}
                data-aos="fade-up"
                data-aos-duration="700"
                onClick={() => setIndex(i)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setIndex(i);
                  }
                }}
              >
                <img
                  src={photo.src}
                  alt={photo.caption || `Boxing photo ${i + 1}`}
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    e.currentTarget.src = FALLBACK_IMG;
                  }}
                />
                <span className="gallery-zoom">
                  <Icon icon="bi:plus" />
                </span>
                {photo.caption && (
                  <span className="gallery-caption">{photo.caption}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {photos?.length > INITIAL_COUNT && (
          <div className="gallery-more">
            <button
              type="button"
              className="px-btn"
              onClick={() => setShowAll((s) => !s)}
            >
              {showAll ? 'Show less' : `Show all ${photos.length} photos`}
            </button>
          </div>
        )}
      </div>

      {isOpen && (
        <div className="lightbox" role="dialog" aria-modal="true">
          <div className="lightbox-bg" onClick={close}></div>

          <button
            type="button"
            className="lightbox-close"
            aria-label="Close"
            onClick={close}
          >
            <Icon icon="bi:x-lg" />
          </button>

          <button
            type="button"
            className="lightbox-nav prev"
            aria-label="Previous photo"
            onClick={prev}
          >
            <Icon icon="bi:chevron-left" />
          </button>

          <div className="lightbox-stage">
            <img
              src={photos[index].src}
              alt={photos[index].caption || `Boxing photo ${index + 1}`}
              onError={(e) => {
                e.currentTarget.src = FALLBACK_IMG;
              }}
            />
            <div className="lightbox-meta">
              {photos[index].caption && <span>{photos[index].caption}</span>}
              <span className="lightbox-counter">
                {index + 1} / {photos.length}
              </span>
            </div>
          </div>

          <button
            type="button"
            className="lightbox-nav next"
            aria-label="Next photo"
            onClick={next}
          >
            <Icon icon="bi:chevron-right" />
          </button>
        </div>
      )}
    </section>
  );
}

import React, { useState, useCallback } from 'react';
import { Icon } from '@iconify/react';
import SectionHeading from './SectionHeading';

/**
 * Videos are shown as facades: the poster frame and a play button, with the
 * real YouTube player inserted only when someone asks for it.
 *
 * Eight live <iframe> embeds were loading on this one page. Each one pulls
 * well over a megabyte of Google's own script and stylesheets, so scrolling to
 * the bottom cost several megabytes and dozens of requests before a single
 * video had been watched - on a phone, which is where most people open this.
 * A poster frame costs around fifteen kilobytes.
 *
 * The embed is nocookie and only appears after a click, so nothing is
 * requested from Google until the visitor has chosen to watch something.
 */

function VideoCard({ item, featured }) {
  const [playing, setPlaying] = useState(false);

  const play = useCallback(() => setPlaying(true), []);

  const embed =
    `https://www.youtube-nocookie.com/embed/${item.youtubeId}` +
    `?autoplay=1&rel=0&modestbranding=1${item.start ? `&start=${item.start}` : ''}`;

  return (
    <div
      className={[
        'video-card',
        item.vertical ? 'vertical' : '',
        featured ? 'featured' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      data-aos="fade-up"
      data-aos-duration="800"
    >
      <div className="video-frame">
        {playing ? (
          <iframe
            src={embed}
            title={item.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <button
            type="button"
            className="video-facade"
            onClick={play}
            aria-label={`Play ${item.title}`}
          >
            {/* Resolved and stored by scripts/fetch-video-posters.mjs, so
                the right frame is chosen once rather than guessed at in the
                browser, where YouTube's grey placeholder loads successfully
                and no error handler ever runs. */}
            <img
              src={item.poster}
              alt=""
              loading={featured ? 'eager' : 'lazy'}
              decoding="async"
            />
            <span className="video-play" aria-hidden="true">
              <Icon icon="bi:play-fill" />
            </span>
          </button>
        )}
      </div>

      {item.title && (
        <h5 className="video-title">
          {featured && <span className="video-badge">Highlight</span>}
          {item.title}
        </h5>
      )}
    </div>
  );
}

export default function BoxingVideos({ data }) {
  const { sectionHeading, items } = data;
  const available = items?.filter((item) => item.youtubeId);

  if (!available || available.length === 0) {
    return null;
  }

  return (
    <section className="section gray-bg" id="boxing-videos">
      <div className="container">
        <SectionHeading
          miniTitle={sectionHeading.miniTitle}
          title={sectionHeading.title}
        />

        {/*
          One grid, every card the same. The knockout used to sit on its own
          row above this, and because it is a vertical clip it was three times
          the height of everything under it - the section read as two
          unrelated blocks rather than one wall of videos. It still comes
          first and still carries the badge; it is simply the first card.

          Eight cards divide evenly into four columns and into two, so no row
          is ever left short.
        */}
        <div className="video-grid">
          {available.map((item, index) => (
            <VideoCard key={item.youtubeId} item={item} featured={index === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}

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

/** YouTube publishes no maxres frame for some uploads; hq always exists. */
function posterSources(youtubeId) {
  return {
    max: `https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`,
    hq: `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`,
  };
}

function VideoCard({ item, featured }) {
  const [playing, setPlaying] = useState(false);
  const poster = posterSources(item.youtubeId);

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
            <img
              src={poster.max}
              alt=""
              loading="lazy"
              decoding="async"
              onError={(e) => {
                // Fall back once, then stop: a second failure would loop.
                if (e.currentTarget.dataset.fallback) return;
                e.currentTarget.dataset.fallback = '1';
                e.currentTarget.src = poster.hq;
              }}
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

  const [lead, ...rest] = available;

  return (
    <section className="section gray-bg" id="boxing-videos">
      <div className="container">
        <SectionHeading
          miniTitle={sectionHeading.miniTitle}
          title={sectionHeading.title}
        />

        {/* The knockout leads on its own row: it is the one video someone
            watches if they watch only one, and a vertical clip stranded in a
            grid of landscape cards reads as a mistake rather than a choice. */}
        <div className="video-lead">
          <VideoCard item={lead} featured />
        </div>

        {/* A grid rather than Bootstrap columns: every card is the same width
            and the same height, so the frames line up across rows however
            long a title happens to be. */}
        <div className="video-grid">
          {rest.map((item) => (
            <VideoCard key={item.youtubeId} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import { Icon } from '@iconify/react';
import SectionHeading from './SectionHeading';

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
        <div className="row gy-4">
          {available.map((item, index) => (
            <div className={item.vertical ? 'col-sm-6 col-lg-4' : 'col-md-6'} key={index}>
              <div
                className={`video-card${item.vertical ? ' vertical' : ''}`}
                data-aos="fade-up"
                data-aos-duration="800"
              >
                <div className="video-frame">
                  <iframe
                    src={`https://www.youtube.com/embed/${item.youtubeId}${
                      item.start ? `?start=${item.start}` : ''
                    }`}
                    title={item.title}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                {item.title && (
                  <h5 className="video-title">
                    <Icon icon="bi:play-circle" /> {item.title}
                  </h5>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
